<template>
  <div class="main-layout">

    <div class="block text-center">
    <span class="demonstration">热门题目排行推荐</span>
    <el-carousel height="300px" motion-blur>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>

<!-- 筛选条件 -->
<section class="filters-section">
      <!-- 竞赛名称搜索框 -->
      <div class="filter-item">
        <el-input placeholder="请输入相应题库名称" v-model="searchName" class="search-input"></el-input>
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <el-button type="primary" @click="searchCompetitions" class="search-button">搜索</el-button>
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

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

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
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  display: flex;
  gap: 10px;
  margin: 20px auto;
  padding: 20px;
  max-width: 960px;
  /* 调整宽度 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  /* 添加圆角 */
}
/* 搜索输入框和日期选择器样式 */
.search-input {
  width: 200px; /* 根据需要调整宽度 */
}

/* 搜索按钮样式 */
.search-button {
  background-color: #5A67D8; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none;
  padding: 10px 20px; /* 按钮内边距 */
  border-radius: 5px; /* 按钮圆角 */
  cursor: pointer;
}

.search-button:hover {
  background-color: #4A54C0; /* 按钮悬停背景色 */
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