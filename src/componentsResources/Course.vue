<template>
  <div class="main-layout">
    <!-- 图片轮播 -->
    <el-carousel :interval="5000" arrow="always" type="card" height="300px">
      <el-carousel-item>
        <img src="../assets/img/76.png" alt="轮播图1" style="width: 100%; height: 100%; object-fit: cover" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/53.png" alt="轮播图2" style="width: 100%; height: 100%; object-fit: cover" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/51.png" alt="轮播图3" style="width: 100%; height: 100%; object-fit: cover" />
      </el-carousel-item>
      <!-- 更多轮播图项目 -->
    </el-carousel>

    <!-- 筛选条件 -->
    <section class="filters-section" shadow="hover">
      <!-- 竞赛名称搜索框 -->
      <div class="filter-item">
        <el-input placeholder="请输入相应课程名称" v-model="searchName" class="search-input"></el-input>
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item">
        <el-button type="primary" v-model="searchName" @click="searchCourses" class="search-button">搜索</el-button>
      </div>
    </section>

    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-container">
        <!-- <img src="../assets/img/1.png" alt="Logo" class="logo" @click="onIconClick(1)" />
        <img src="../assets/img/2.png" alt="Image 2" class="logo" @click="onIconClick(2)" />
        <img src="../assets/img/3.png" alt="Image 3" class="logo" @click="onIconClick(3)" />
        <img src="../assets/img/4.png" alt="Image 4" class="logo" @click="onIconClick(4)" />
        <img src="../assets/img/5.png" alt="Image 5" class="logo" @click="onIconClick(5)" />
          -->
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
      </div>
    </section>

    <!-- 展示卡片 -->
    <section class="cards-section">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.courseId)">
        <img style="width: 360px; height: 170px" :src="'http://localhost:10086/images/upload/' + card.courseImgUrl"
          alt="Card Image" />
        <div class="card-title">{{ card.courseName }}</div>
        <div class="card-info">{{ card.courseDescription }}</div>
        <div class="card-footer">
           
          <div :class="card.courseDifficultyLevel === '初级'
              ? 'level-beginner'
              : card.courseDifficultyLevel === '中级'
                ? 'level-intermediate'
                : 'level-advanced'
            ">
                        {{ card.courseDifficultyLevel }}          
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fi } from "element-plus/es/locales.mjs";
import axios from "axios";
export default {
  name: "MainLayout",
  name: "Navbar",
  data() {
    return {
      iconCategories: [
        { id: 1, src: "../assets/img/1.png" },
        { id: 2, src: "../assets/img/2.png" },
        { id: 3, src: "../assets/img/3.png" },
        { id: 4, src: "../assets/img/4.png" },
        { id: 5, src: "../assets/img/5.png" },
      ],
      // 展示卡片的内容
      cards: [], //存储获取后端课程数据
      searchQuery: "", //存储搜索条件
      filteredCards: [], //用于存储筛选后的卡片
      searchName: "", // 确保这里初始化了 searchName

      activeDrawer: null, // 当前激活的抽屉
    };
  },
  methods: {
    //获取竞赛数据
    fetchCards() {
      this.loading = true;
      this.error = null;
      // 发送GET请求到后端API
      axios
        .get("/crs/v1")
        .then((response) => {
          // 假设后端返回的数据是一个数组，每个元素都是一个卡片对象
          this.cards = response.data;
          this.filteredCards = response.data; // 初始时显示所有卡片
        })
        .catch((error) => {
          this.error = "加载卡片数据失败，请稍后再试。";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 搜索按钮点击事件
    performSearch() {
      if (this.searchQuery) {
        this.filteredCards = this.cards.filter((card) =>
          card.courseName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredCards = this.cards; // 如果搜索框为空，显示所有卡片
      }
    },
    performSearch(categoryId) {
      if (categoryId) {
        this.filteredCards = this.cards.filter(
          (card) => card.categoryId === categoryId
        );
      } else {
        this.filteredCards = this.cards; // 如果没有传递 categoryId，显示所有卡片
      }
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
      const url = `crs/course/byParentId?parentId=${parentId}`;

      // 发送GET请求到后端接口
      this.$http
        .get(url)
        .then((response) => {
          if (response.data) {
            // 确保后端返回的 list 是数组
            // 成功获取数据，更新前端的卡片数据
            console.log(response.data);
            this.cards = response.data; // 更新为正确的属性名
          } else {
            // 后端返回的数据格式不正确
            console.error("后端返回的数据格式不正确:", response.data);
            this.$message.error("数据加载失败，请稍后再试。");
          }
        })
        .catch((error) => {
          // 请求失败处理
          console.error(
            "获取数据失败:",
            error.response ? error.response.data : error.message
          );
          this.$message.error("数据加载失败，请稍后再试。");
        });
    },
    goToDetail(courseId) {
      // 使用路由跳转到CourseDetail页面，并传递ID作为参数
      const userId = sessionStorage.userId;

      axios
        .get("crs/course/view", {
          params: {
            userId: userId,
            courseId: courseId,
          },
        })
        .then((response) => {
          console.log("添加浏览数据成", response.data);
        });
      this.$router.push({
        name: "CourseDetail",
        params: { courseId: courseId },
      });
    },
    searchCourses() {
      const payload = {
        courseName: this.searchName, // 注意这里使用的是 searchName
        // startDate: this.searchStartDate, // Course.vue 中没有这两个属性，所以注释掉
        // endDate: this.searchEndDate,     // Course.vue 中没有这两个属性，所以注释掉
      };
      axios
        .post("crs/search", payload)
        .then((response) => {
          if (response.data && Array.isArray(response.data.list)) {
            this.cards = response.data.list; // 更新 cards 数组
          } else {
            console.error(
              "后端返回的数据格式不正确或 list 属性不存在:",
              response.data
            );
          }
        })
        .catch((error) => {
          console.error(
            "查询失败:",
            error.response ? error.response.data : error.message
          );
        });
    },
  },

  mounted() {
    this.fetchCards();
  },
};
</script>

<style scoped>
/* 图片轮播样式 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
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
  width: 200px;
  /* 根据需要调整宽度 */
}

/* 搜索按钮样式 */
.search-button {
  background-color: #5a67d8;
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
  background-color: #4a54c0;
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
  height: auto;
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
  color: #5a67d8;
  font-size: 12px;
  transition: all 0.3s ease;
}

.icon-item p {
  font-weight: 500;
  margin: 0;
}

.icon-item:hover {
  cursor: pointer;
  transform: scale(1.15);
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  max-width: 100%;
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
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;    */
  display: -webkit-box;
  /*WebKit浏览器限制显示行数 */
  -webkit-line-clamp: 2;
  /*标准浏览器限制显示行数 */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* 难度级别颜色定义 */
.level-beginner {
  color: #28a745;
  /* 绿色 */
  font-weight: 600;
}

.level-intermediate {
  color: #ffc107;
  /* 黄色 */
  font-weight: 600;
}

.level-advanced {
  color: #dc3545;
  /* 红色 */
  font-weight: 600;
}
</style>
