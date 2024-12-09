<template>
  <div class="main-layout">
    <!-- 顶部导航 -->

    <header class="navbar">
    <div class="navbar-container">
      <!-- 左侧 LOGO -->
      <div class="logo">LOGO</div>

      <!-- 中间导航菜单 -->
      <nav class="nav-menu">
        <div 
          class="nav-item" 
          @mouseenter="toggleDrawer('about')" 
          @mouseleave="toggleDrawer(null)"
        >
          关于我们
        </div>
        <div 
          class="nav-item" 
          @mouseenter="toggleDrawer('services')" 
          @mouseleave="toggleDrawer(null)"
        >
          服务
        </div>
        <div 
          class="nav-item" 
          @mouseenter="toggleDrawer('community')" 
          @mouseleave="toggleDrawer(null)"
        >
          社区
        </div>
      </nav>

      <!-- 右侧用户信息 -->
      <div class="user-info">
        <img src="https://via.placeholder.com/32" alt="User" class="user-avatar" />
        <span class="username">张三</span>
      </div>
    </div>
  </header>

  <!-- 抽屉内容 -->
  <div 
    v-if="activeDrawer" 
    class="drawer" 
    @mouseenter="keepDrawerOpen" 
    @mouseleave="toggleDrawer(null)"
  >
    <div class="drawer-content">
      <div v-if="activeDrawer === 'about'">
        <h3 class="drawer-title">关于我们</h3>
        <p class="drawer-text">这里是关于我们的详细介绍...</p>
        <div class="drawer-links">
          <a href="#">公司简介</a>
          <a href="#">团队文化</a>
          <a href="#">公司历史</a>
        </div>
      </div>
      <div v-if="activeDrawer === 'services'">
        <h3 class="drawer-title">服务</h3>
        <p class="drawer-text">这里是我们的服务内容...</p>
        <div class="drawer-links">
          <a href="#">咨询服务</a>
          <a href="#">技术支持</a>
        </div>
      </div>
      <div v-if="activeDrawer === 'community'">
        <h3 class="drawer-title">社区</h3>
        <p class="drawer-text">这里是社区相关信息...</p>
        <div class="drawer-links">
          <a href="#">热门话题</a>
          <a href="#">最新活动</a>
        </div>
      </div>
      <button class="close-btn" @click="toggleDrawer(null)">关闭</button>
    </div>
  </div>





    <!-- 推荐模块 -->
    <section class="recommend-section">
      <!-- 左侧推荐导航 -->
      <div class="recommend-sidebar">
        <div class="recommend-sidebar-item" v-for="(item, index) in sidebarItems" :key="index">
          {{ item }}
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
        <input type="text" placeholder="1" />
      </div>
      <!-- 日期选择器 -->
      <div class="filter-item">
        <input type="date" />
      </div>
      <!-- 人数输入框 -->
      <div class="filter-item">
        <input type="number" placeholder="1" />
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <button>1</button>
      </div>
    </section>

    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-item" v-for="(icon, index) in icons" :key="index">
        {{ icon }}
      </div>
    </section>

    <!-- 展示卡片 -->
    <section class="cards-section">
      <div class="card" v-for="(card, index) in cards" :key="index">
        <img :src="card.image" alt="Card Image" />
        <div class="card-title">{{ card.title }}</div>
        <div class="card-info">{{ card.info }}</div>
        <div class="card-footer">
          <div class="price">{{ card.price }}</div>
          <div class="rating">{{ card.rating }}</div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "MainLayout",
  name: "Navbar",
  data() {
    return {
      // 推荐导航的选项
      sidebarItems: ["推荐数据源", "每日挑战", "机器学习新手必备", "医疗健康数据洞察", "遥感数据探索分析"],
      // 推荐卡片的内容
      recommendCards: ["DDE Platform", "OpenDataLab", "NBSDC.CN"],
      // 图标分类
      icons: ["图标 1", "图标 2", "图标 3", "图标 4", "图标 5", "图标 6", "图标 7", "图标 8", "图标 9", "图标 10"],
      // 展示卡片的内容
      cards: [
        {
          image: "https://via.placeholder.com/300",
          title: "菲律滨 Balamban",
          info: "距离你 2,438 公里 | 1月20日至25日",
          price: "¥1,944 / 晚",
          rating: "4.92"
        },
        {
          image: "https://via.placeholder.com/300",
          title: "斯里兰卡 Miriwadunna",
          info: "距离你 4,292 公里 | 3月6日至13日",
          price: "¥412 / 晚",
          rating: "4.96"
        },
        {
          image: "https://via.placeholder.com/300",
          title: "菲律滨 薄瑙",
          info: "距离你 1,704 公里 | 1月1日至6日",
          price: "¥814 / 晚",
          rating: "4.9"
        }
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
    };
  },
  methods: {
     // 控制抽屉的开关
    // 
    toggleDrawer(menu) {
      this.activeDrawer = menu;
    },
    // 保持抽屉打开
    keepDrawerOpen() {
      // 不做任何操作，保持抽屉打开
    }
  }
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

/* 顶部导航栏整体样式 */
.navbar {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* 导航栏内部容器 */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

/* LOGO 样式 */
.logo {
  font-size: 1.8em;
  font-weight: bold;
  color: #5a67d8;
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  gap: 40px;
  position: relative;
}

.nav-item {
  font-size: 1em;
  color: #333333;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
}

/* 鼠标悬停时文字滑动效果 */
.nav-item:hover {
  color: #5a67d8;
  transform: translateY(-5px); /* 向上滑动效果 */
}

/* 抽屉样式 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh; /* 高度为页面高度的五分之二 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999; /* 确保抽屉位于顶层 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out; /* 添加平滑过渡 */
  transform: translateY(-100%); /* 默认隐藏，抽屉位于上方 */
}

.drawer-content {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

/* 当抽屉打开时，设置transform为0，显示抽屉 */
.drawer {
  transform: translateY(0);
}

/* 标题样式 */
.drawer-title {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

/* 内容文本样式 */
.drawer-text {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

/* 链接列表样式 */
.drawer-links {
  margin-top: 20px;
}

.drawer-links a {
  display: block;
  font-size: 1em;
  color: #5a67d8;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.drawer-links a:hover {
  color: #4c51bf; /* 鼠标悬停时改变链接颜色 */
}

/* 关闭按钮 */
.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #5a67d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #4c51bf;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.username {
  font-size: 1em;
  color: #333;
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
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin: 20px auto;
  max-width: 960px; /* 限制宽度 */
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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