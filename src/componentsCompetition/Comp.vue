<template>
  <div class="main-layout">


    <!-- 推荐模块 -->
    <section class="recommend-section">

      <!-- 左侧推荐导航 -->
      <div class="recommend-sidebar">
        <div class="recommend-sidebar-item" v-for="(item, index) in sidebarItems" :key="index"
          :class="{ active: index === currentIndex }" @click="selectSidebarItem(item)">
          {{ item.name }}
        </div>
      </div>
      <!-- 右侧推荐卡片 -->
      <div class="recommend-cards">
        <div class="recommend-card" v-for="(card, index) in recommendCards" :key="index">
          <el-image style="width: 250px; height: 170px; border-radius: 8px"
            :src="'http://localhost:10086/images/upload/' + card" fit="cover" class="card-image"></el-image>
        </div>
      </div>

    </section>

    <!-- 筛选条件 -->
    <section class="filters-section">

      <!-- 竞赛名称搜索框 -->
      <div class="filter-item">
        <el-input placeholder="请输入相应竞赛名称" v-model="searchName" class="search-input"></el-input>
      </div>
      <!-- 开始日期选择器 -->
      <div class="filter-item">
        <el-date-picker v-model="searchStartDate" type="date" placeholder="选择开始日期" class="search-input">
        </el-date-picker>
      </div>
      <!-- 结束日期选择器 -->
      <div class="filter-item">
        <el-date-picker v-model="searchEndDate" type="date" placeholder="选择结束日期" class="search-input">
        </el-date-picker>
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <el-button type="primary" @click="searchCompetitions" class="search-button">搜索</el-button>
      </div>

    </section>

    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-item">
        <div class="icon-container">

          <div class="icon-item">
            <el-icon class="icon"><img src="../assets/img/1.png" alt="Logo" class="logo"
                @click="onIconClick(1)" /></el-icon>
            <p>创新创业类</p>
          </div>
          <!-- 信息技术与编程类 -->
          <div class="icon-item">
            <el-icon class="icon"><img src="../assets/img/2.png" class="logo" @click="onIconClick(2)" /></el-icon>
            <p>信息技术与编程类</p>
          </div>

          <!-- 数学类 -->
          <div class="icon-item">
            <el-icon class="icon"><img src="../assets/img/3.png" class="logo" @click="onIconClick(3)" /></el-icon>
            <p>数学类</p>
          </div>

          <!-- 经济与管理类 -->
          <div class="icon-item">
            <el-icon class="icon"><img src="../assets/img/4.png" class="logo" @click="onIconClick(4)" /></el-icon>
            <p>经济与管理类</p>
          </div>

          <!-- 语言与文化类 -->
          <div class="icon-item">
            <el-icon class="icon"><img src="../assets/img/5.png" class="logo" @click="onIconClick(5)" /></el-icon>
            <p>语言与文化类</p>
          </div>




          <!-- <img src="../assets/img/1.png" alt="Logo" class="logo" @click="onIconClick(1)" /> -->
          <!-- <img src="../assets/img/2.png" alt="Image 2" class="logo" @click="onIconClick(2)" />
          <img src="../assets/img/3.png" alt="Image 3" class="logo" @click="onIconClick(3)" />
          <img src="../assets/img/4.png" alt="Image 4" class="logo" @click="onIconClick(4)" />
          <img src="../assets/img/5.png" alt="Image 5" class="logo" @click="onIconClick(5)" /> -->
        </div>
      </div>
    </section>

    <!-- 展示卡片 -->
    <section class="cards-section">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.competitionId)">
        <img style="width: 360px; height: 170px" :src="'http://localhost:10086/images/upload/' + card.competitionImgUrl"
          alt="Card Image" />
        <div class="card-title">{{ card.competitionName }}</div>
        <div class="card-info">{{ card.levelName }}</div>
        <div class="card-footer">
          <div class="price">{{ card.competitionStatus }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MainLayout",
  data() {
    return {

      //推荐板块
      sidebarItems: [
        { name: "热门竞赛", type: "competition", popular: true, recommendCards: [] },
        { name: "热门课程", type: "course", popular: true, recommendCards: [] },
        { name: "热门社区", type: "community", popular: true, recommendCards: [] },
      ],
      recommendCards: [],
      currentType: null,

      iconCategories: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
      },
      // 展示卡片的内容
      cards: [],
      filteredCards: [],
      currentIndex: 0, // 当前激活的导航索引

      //条件查询数据
      searchName: '',
      searchStartDate: '',
      searchEndDate: '',

      activeDrawer: null, // 当前激活的抽屉
      cards: [],//存储后端查询后返回数据
    };
  },
  methods: {
    autoSlideSidebar() {
      this.currentIndex = (this.currentIndex + 1) % this.sidebarItems.length;
      console.log('Current Index:', this.currentIndex); // 调试输出
      this.$forceUpdate(); // 强制视图更新
    },

    fetchRecommendItems(type) {
      const payload = { popular: 1, type: type };
      let apiEndpoint = '';
      switch (type) {
        case 'community':
          apiEndpoint = '/v1/cmns/search';
          break;
        case 'competition':
          apiEndpoint = 'comp/v1/search';
          break;
        case 'course':
          apiEndpoint = 'crs/search';
          break;
        default:
          console.error('未知类型:', type);
          return;
      }
      axios.post(apiEndpoint, payload)
        .then(response => {
          console.log('获取推荐数据成功:', response.data);
          if (response.data && Array.isArray(response.data.list)) {
            // 使用 slice 方法获取前5条数据
            const items = response.data.list.slice(0, 3);
            console.log('推荐详情数据5条:', items);

            this.recommendCards = items.map(item => {
              if (type === 'community') {
                return item.communityImageUrl;
              } else if (type === 'competition') {
                return item.competitionImgUrl;
              } else if (type === 'course') {
                return item.courseImgUrl;
              }
            });
          } else {
            console.error('后端返回的数据格式不正确或 list 属性不存在:', response.data);
          }
        })
        .catch(error => {
          console.error('获取数据失败:', error.response ? error.response.data : error.message);
        });
    },

    // 推荐板块的热门社区和热门竞赛
    selectSidebarItem(item) {
      this.currentType = item.type;
      if (item.popular) {
        this.fetchRecommendItems(item.type);
      }
    },

    //条件查询方法
    searchCompetitions() {
      const payload = {
        competitionName: this.searchName,
        startDate: this.searchStartDate,
        endDate: this.searchEndDate
      };
      axios.post('comp/v1/search', payload)
        .then(response => {
          if (response.data && Array.isArray(response.data.list)) {
            this.cards = response.data.list;
          } else {
            console.error('后端返回的数据格式不正确或 list 属性不存在:', response.data);
          }
        })
        .catch(error => {
          console.error('查询失败:', error.response ? error.response.data : error.message);
        });
    },
    //获取竞赛数据
    fetchCards() {
      this.loading = true;
      this.error = null;
      // 发送GET请求到后端API
      this.$http.get('http://localhost:10086/comp/v1/compe')
        .then(response => {
          // 假设后端返回的数据是一个数组，每个元素都是一个卡片对象
          this.cards = response.data;
        })
        .catch(error => {
          this.error = '加载卡片数据失败，请稍后再试。';
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 
    toggleDrawer(menu) {
      this.activeDrawer = menu;
    },
    // 保持抽屉打开
    keepDrawerOpen() {
      // 不做任何操作，保持抽屉打开
    },
    onIconClick(iconKey) {
    // 假设你的 iconCategories 对象中的值是后端的 parentId
    console.log(iconKey);
    const parentId = iconKey;
    
    // 构建后端接口的URL
    const url = `comp/v1/comp/byParentId?parentId=${parentId}`;
    
    // 发送GET请求到后端接口
    this.$http.get(url)
      .then(response => {
        if (response.data) { // 确保后端返回的 list 是数组
          // 成功获取数据，更新前端的卡片数据
          console.log(response.data)
          this.cards = response.data; // 更新为正确的属性名

        } else {
          // 后端返回的数据格式不正确
          console.error('后端返回的数据格式不正确:', response.data);
          this.$message.error('数据加载失败，请稍后再试。');
        }
      })
      .catch(error => {
        // 请求失败处理
        console.error('获取数据失败:', error.response ? error.response.data : error.message);
        this.$message.error('数据加载失败，请稍后再试。');
      });
  },
    searchByCategory(categoryId) {
      const competitionSearch = { categoryId };
      this.$http.post('comp/v1/search', competitionSearch, {
        params: {
          pageNum: 1,
          pageSize: 5
        }
      })
        .then(response => {
          if (response.data) {
            this.cards = response.data.list;
            this.filteredCards = response.data.list;
          } else {
            console.error('后端返回的数据格式不正确:', response.data);
          }
        })
        .catch(error => {
          console.error('查询失败:', error.response ? error.response.data : error.message);
        });
    },
    goToDetail(compId) {
      // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
      this.$router.push({ name: 'CompDetail', params: { compId: compId } });
    },
    searchCompetitions() {
      this.filteredCards = this.searchName
        ? this.cards.filter(card => card.courseName.includes(this.searchName))
        : this.cards;
    }

  },
  mounted() {
    this.fetchCards();

    // 在组件挂载时，可以自动获取推荐板块的数据
    this.sidebarItems.forEach(item => {
      if (item.popular) {
        this.fetchRecommendItems(item.type);
      }
    });
    this.slideInterval = setInterval(this.autoSlideSidebar, 3000);// 每3秒自动切换导航栏索引

  },
  beforeDestroy() {
    clearInterval(this.slideInterval);
  },
};
</script>

<style scoped>
/* 外部容器，控制整体布局的宽度和居中 */
.main-layout {
  max-width: 1200px;
  /* 限制页面的最大宽度 */
  margin: 0 auto;
  /* 居中对齐 */
  padding: 5px;
  /* 增加内边距，避免贴边 */
  background-color: #f4f6f8;
  /* 设置背景颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选：添加阴影效果 */
  border-radius: 10px;
  /* 可选：添加圆角效果 */
}

/* 推荐模块样式 */
.recommend-section {
  display: flex;
  gap: 20px;
  margin: 20px auto;
  padding: 20px;
  /* background-color: #f9f9f9; */
  background-color: #FFFFFF;
  box-shadow: 0 8px 16px rgba(223, 190, 190, 0.1);
  border-radius: 15px;
  flex-wrap: wrap;
}

/* 左侧推荐导航样式 */
.recommend-sidebar {
  width: 250px;
  background-color: #F4F6F8;
  border-radius: 8px;
  padding: 30px 0;
}

.recommend-sidebar-item {
  padding: 20px 20px;
  font-size: 18px;
  color: #333333;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.recommend-sidebar-item:hover {
  background-color: #E0E6F8;
  border-left: 5px solid #5A67D8;
  color: #5A67D8;
  font-weight: bold;
}

.recommend-sidebar-item.active {

  background-color: #E0E6F8;
  color: #5A67D8;
  font-weight: bold;
  border-left: 5px solid #5A67D8;
}


/* 右侧推荐卡片容器 */
.recommend-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-evenly;
  padding: 40px;
  justify-content: center;
  /* 均匀分布卡片 */
  flex: 1;
}

/* 单个推荐卡片样式 */
.recommend-card {

  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.recommend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 250px;
  height: 170px;
  /* 调整图片高度 */
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.recommend-card:hover .card-image {
  transform: scale(1.05);
}




/* 筛选条件样式 */
.filters-section {
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  display: flex;
  gap: 10px;
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  /* 调整宽度 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  /* 添加圆角 */
}



/* 搜索输入框和日期选择器样式 */
.search-input {
  width: 200px;
  /* 根据需要调整宽度 */
}

/* 搜索按钮样式 */
.search-button {
  background-color: #5A67D8;
  /* 按钮背景色 */
  color: white;
  /* 按钮文字颜色 */
  border: none;
  padding: 10px 20px;
  /* 按钮内边距 */
  border-radius: 5px;
  /* 按钮圆角 */
  cursor: pointer;
}

.search-button:hover {
  background-color: #4A54C0;
  /* 按钮悬停背景色 */
}


/* 图标分类样式 */
.icon-section {
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  margin: 0px auto;
  max-width: 100%;
  /* 限制宽度 */
  padding: 2px 0px 10px 0px;
  /* 内边距 */
  background-color: #ffffff;
  /* 背景色 */
  border-radius: 10px;
  /* border-radius: 10px 10px 0px 0px; */
  /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 1px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-item p {
  font-size: 12px;
  color: #5A67D8;
  /* 主色调 */
  font-weight: 500;
  margin: 0;
}

.icon-container {
  display: flex;
  /* 使用 flexbox 让图片并排 */
  justify-content: center;
  /* 居中对齐 */
  align-items: center;
  /* 垂直居中 */
  margin: 0 auto;
  /* 让整个容器居中 */
  gap: 100px;
  /* 设置图片之间的间距 */
}

.logo {
  width: 23px;
  /* 设置图片宽度 */
  height: auto;
  /* 保持图片宽高比 */
  transition: transform 0.2s;
  /* 添加动画效果（可选） */
}

.logo:hover {
  transform: scale(1.2);
  /* 鼠标悬停放大图片（可选） */
}

/* 展示卡片样式 */
.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin: 0px auto;
  max-width: 1200px;
  /* 限制展示区域的最大宽度 */
}

/* 单个卡片样式 */
.card {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  /* 添加圆角 */
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  /* 图片圆角 */
}

.card-title {
  font-size: 1.2em;
  margin: 10px 0;
}

.card-info {
  color: #777;
  font-size: 0.9em;
}

.card-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #e53935;
  font-weight: bold;
}

.rating {
  color: #5a67d8;
}
</style>