<template>
    <div class="main-layout">
  
  
  
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
  
    
      <section class="cards-section">
        <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.id)">
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
      
        // 图标分类
        icons: ["图标 1", "图标 2", "图标 3", "图标 4", "图标 5", "图标 6", "图标 7", "图标 8", "图标 9", "图标 10"],
        // 展示卡片的内容
        cards: [
          {id:1,
            image: "https://via.placeholder.com/300",
            title: "菲律滨 Balamban",
            info: "距离你 2,438 公里 | 1月20日至25日",
            price: "¥1,944 / 晚",
            rating: "4.92"
          },
          {
            id:2,
            image: "https://via.placeholder.com/300",
            title: "斯里兰卡 Miriwadunna",
            info: "距离你 4,292 公里 | 3月6日至13日",
            price: "¥412 / 晚",
            rating: "4.96"
          },
          {id:3,
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
      },
      goToDetail(courseId) {
        // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
        this.$router.push({ name: 'CourseDetail', params: { id: courseId} });
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