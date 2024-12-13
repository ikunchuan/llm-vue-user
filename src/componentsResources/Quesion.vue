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
      <div class="card" v-for="card in cards" :key="card.id" @click="goToAnswerDetail(card.id)">
        <img :src="card.image" alt="card.title" class="card-img" />
        <div class="card-content">
          <div class="card-title">{{ card.title }}</div>
        </div>
      </div>

    </section>
  </div>
</template>


<script>
export default {
  name: "MainLayout",
  name: "Navbar",
  name: "Question",
  data() {
    return {

      // // 图标分类
      // icons: [],
      // 展示卡片的内容
      cards: [
        { id: 9, title: "程序设计", image: "src/assets/img/6.png" },
        { id: 10, title: "网络安全", image: "src/assets/img/7.png" },
        { id: 11, title: "人工智能与大数据", image: "src/assets/img/12.png" },
        { id: 12, title: "数据挖掘与分析", image: "src/assets/img/9.png" },
        { id: 13, title: "数学知识", image: "src/assets/img/10.png" },
        { id: 14, title: "数学建模", image: "src/assets/img/14.png" },
        { id: 21, title: "语言表达", image: "src/assets/img/8.png" },
        { id: 22, title: "英语应用", image: "src/assets/img/13.png" },
        { id: 23, title: "跨文化交流", image: "src/assets/img/11.png" },

        // 添加更多卡片数据
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

    toggleDrawer(menu) {
      this.activeDrawer = menu;
    },
    // 保持抽屉打开
    keepDrawerOpen() {
      // 不做任何操作，保持抽屉打开
    },
    goToAnswerDetail(answerId) {
      this.$router.push({ name: 'AnswerDetail', params: { answerId: answerId } });
    }
    // goToDetail(courseId) {
    //   // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
    //   this.$router.push({ name: 'CourseDetail', params: { courseId: courseId} });
    // }

  },
  mounted() {


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
  padding: 20px;
  /* 增加内边距，避免贴边 */
  background-color: #f4f6f8;
  /* 设置背景颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选：添加阴影效果 */
  border-radius: 10px;
  /* 可选：添加圆角效果 */
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
  overflow: hidden;
}

.card img {
  max-width: 20%;
  height: auto;
  border-radius: 8px;
  /* 图片圆角 */
}

.card-content {
  padding: 10px;
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