<template>
  <div class="main-layout">


    <!-- 推荐模块 -->
    <section class="recommend-section">

      <!-- 左侧推荐导航 -->
      <div class="recommend-sidebar">
        <div class="recommend-sidebar-item" v-for="(item, index) in sidebarItems" :key="index"
          @click="selectSidebarItem(item)">
          {{ item.name }}
        </div>
      </div>
      <!-- 右侧推荐卡片 -->
      <div class="recommend-cards">
        <div class="recommend-card" v-for="(card, index) in recommendCards" :key="index">
          <el-image style="width: 200px; height: 150px; border-radius: 8px"
            :src="'http://localhost:10086/images/upload/' + card" fit="cover"></el-image>
        </div>
      </div>

    </section>

    <!-- 筛选条件 -->
    <section class="filters-section">
      <!-- 竞赛名称搜索框 -->
      <div class="filter-item">
        <el-input placeholder="请输入相应竞赛名称" v-model="searchName"></el-input>
      </div>
      <!-- 开始日期选择器 -->
      <div class="filter-item">
        <el-date-picker v-model="searchStartDate" type="date" placeholder="选择开始日期">
        </el-date-picker>
      </div>
      <!-- 结束日期选择器 -->
      <div class="filter-item">
        <el-date-picker v-model="searchEndDate" type="date" placeholder="选择结束日期">
        </el-date-picker>
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <el-button type="primary" @click="searchCompetitions">搜索</el-button>
      </div>
    </section>


    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-item">
        <div class="icon-container">
          <img src="../assets/img/1.png" alt="Logo" class="logo" @click="onIconClick(1)" />
          <img src="../assets/img/2.png" alt="Image 2" class="logo" @click="onIconClick(2)" />
          <img src="../assets/img/3.png" alt="Image 3" class="logo" @click="onIconClick(3)" />
          <img src="../assets/img/4.png" alt="Image 4" class="logo" @click="onIconClick(4)" />
          <img src="../assets/img/5.png" alt="Image 5" class="logo" @click="onIconClick(5)" />
        </div>
      </div>
    </section>


    <!-- 展示卡片 -->
    <section class="cards-section">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.competitionId)">
        <img :src="'http://localhost:10086/images/upload/' + card.competitionImgUrl" alt="Card Image" />
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

      //条件查询数据
      searchName: '',
      searchStartDate: '',
      searchEndDate: '',

      // 一级导航项
      navItems: [
        {
          name: "关于我们",
          submenu: [
            { name: "公司简介", link: "#" },
            { name: "团队文化", link: "#" },
            { name: "公司历史", link: "#" }
          ]
        },
        {
          name: "服务",
          submenu: [
            { name: "电话支持", link: "#" },
            { name: "在线客服", link: "#" },
            { name: "邮件联系", link: "#" }
          ]
        },
        {
          name: "社区",
          submenu: [] // 社区没有二级菜单
        }
      ],
      activeDrawer: null, // 当前激活的抽屉
      cards: [],//存储后端查询后返回数据
    };
  },
  methods: {

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
      const categoryId = this.iconCategories[iconKey];
      this.searchByCategory(categoryId);
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
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

/* 推荐卡片容器 */
.recommend-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
  /* 均匀分布卡片 */
  flex: 3;
}

/* 单个推荐卡片样式 */
.recommend-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 170px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.recommend-card:hover {
  transform: translateY(-5px);
}
/* 筛选条件样式 */
.filters-section {
  display: flex;
  gap: 10px;
  margin: 20px auto;
  padding: 20px;
  max-width: 960px;
  /* 调整宽度 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /* 添加圆角 */
}

/* 图标分类样式 */
.icon-section {
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  margin: 20px auto;
  max-width: 960px;
  /* 限制宽度 */
  padding: 20px;
  /* 内边距 */
  background-color: #ffffff;
  /* 背景色 */
  border-radius: 10px;
  /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
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
  gap: 110px;
  /* 设置图片之间的间距 */
}

.logo {
  width: 30px;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px auto;
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