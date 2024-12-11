<template>
  <div class="main-layout">


    <!-- 推荐模块 -->
    <section class="recommend-section">
      <!-- 左侧推荐导航 -->
      <div class="recommend-sidebar">
        <div class="recommend-sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="selectSidebarItem(item)">
          {{ item.name }}
        </div>
      </div>
      <!-- 右侧推荐卡片 -->
      <div class="recommend-cards">
        <div class="recommend-card" v-for="(card, index) in recommendCards" :key="index">
          {{ card }}
        </div>
      </div>
    </section>

    <!-- 筛选条件 -->
    <section class="filters-section">
      <!-- 位置搜索框 -->
      <div class="filter-item">
        <input type="text" placeholder="请输入相应竞赛名称" />
      </div>
      <!-- 日期选择器 -->
      <div class="filter-item">
        <input type="date" />
      </div>
      <!-- 日期选择器 -->
      <div class="filter-item">
        <input type="date" />
      </div>
    
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <button>搜索</button>
      </div>
    </section>


    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-item">
        <div class="icon-container">
          <img src="../assets/img/1.png" alt="Logo" class="logo" />
          <img src="../assets/img/2.png" alt="Image 2" class="logo" />
          <img src="../assets/img/3.png" alt="Image 3" class="logo" />
          <img src="../assets/img/4.png" alt="Image 4" class="logo" />
          <img src="../assets/img/5.png" alt="Image 5" class="logo" />
        </div>
      </div>
    </section>


    <!-- 展示卡片 -->
    <section class="cards-section">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.competitionId)">
        <img :src="'http://localhost:10086/images/upload/'+card.competitionImgUrl" alt="Card Image" />
        <div class="card-title">{{ card.competitionName }}</div>
        <div class="card-info">{{ card.levelName}}</div>
        <div class="card-footer">
          <div class="price">{{ card.competitionStatus }}</div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios'; // 引入axios

export default {
  name: "MainLayout",
  name: "Navbar",
  data() {
    return {
      // 推荐导航的选项
      // 推荐导航的选项
      // sidebarItems: ["推荐竞赛", "热门竞赛", "热门课程", "热门社区", "我的成长"],
      
      // recommendCards: ["DDE Platform", "OpenDataLab", "NBSDC.CN"],
      sidebarItems: [
      { name: "推荐竞赛", recommendCards: ["DDE Platform", "OpenDataLab", "NBSDC.CN"] },
      { name: "热门竞赛", recommendCards: ["Competition A", "Competition B"] },
      { name: "热门课程", recommendCards: ["Course 1", "Course 2"] },
      { name: "热门社区", recommendCards: ["Community 1", "Community 2"] },
      { name: "我的成长", recommendCards: ["My Growth 1", "My Growth 2"] }
    ],
    recommendCards: [], 
   
      // 展示卡片的内容
      cards: [
        
      ],
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
      cards:[],//存储后端查询后返回数据
    };
  },
  methods: {
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
    goToDetail(compId) {
      // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
      this.$router.push({ name: 'CompDetail', params: { compId: compId } });
    },
    selectSidebarItem(item) {
    this.recommendCards = item.recommendCards;
  },
    
  },
  mounted() {
    this.fetchCards();
  },
};
</script>




<style scoped>
/* 外部容器，控制整体布局的宽度和居中 */
.main-layout {
  max-width: 1200px; /* 限制页面的最大宽度 */
  margin: 0 auto; /* 居中对齐 */
  padding: 20px; /* 增加内边距，避免贴边 */
  background-color: #f4f6f8; /* 设置背景颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
  border-radius: 10px; /* 可选：添加圆角效果 */
}



/* 推荐模块样式 */
.recommend-section {
  display: flex;
  gap: 20px;
  margin: 80px auto 20px; /* 顶部添加距离，避免遮挡 */
  padding: 20px;
  max-width: 1200px; /* 限制推荐板块宽度 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* 左侧推荐导航 */
.recommend-sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f0f4ff;
  padding: 10px;
  border-radius: 8px;
}

/* 左侧导航条目样式 */
.recommend-sidebar-item {
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 右侧推荐模块 */
.recommend-cards {
  flex: 3;
  display: flex;
  gap: 20px;
}

.recommend-card {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 筛选条件样式 */
.filters-section {
  display: flex;
  gap: 10px;
  margin: 20px auto;
  padding: 20px;
  max-width: 960px; /* 调整宽度 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px; /* 添加圆角 */
}

/* 图标分类样式 */
.icon-section {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin: 20px auto;
  max-width: 960px; /* 限制宽度 */
  padding: 20px; /* 内边距 */
  background-color: #ffffff; /* 背景色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.icon-container {
  display: flex; /* 使用 flexbox 让图片并排 */
  justify-content: center; /* 居中对齐 */
  align-items: center; /* 垂直居中 */
  margin: 0 auto; /* 让整个容器居中 */
  gap: 110px; /* 设置图片之间的间距 */
}

.logo {
  width: 30px; /* 设置图片宽度 */
  height: auto; /* 保持图片宽高比 */
  transition: transform 0.2s; /* 添加动画效果（可选） */
}

.logo:hover {
  transform: scale(1.2); /* 鼠标悬停放大图片（可选） */
}

/* 展示卡片样式 */
.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px auto;
  max-width: 1200px; /* 限制展示区域的最大宽度 */
}

/* 单个卡片样式 */
.card {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  border-radius: 10px; /* 添加圆角 */
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px; /* 图片圆角 */
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