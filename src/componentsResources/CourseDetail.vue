<template>
  <!-- 根模板，包含整个页面的结构 -->
  <div>
    <!-- 顶部导航栏 -->


    <!-- 主内容区域 -->
    <div class="main">
      <!-- 视频和课程信息区域 -->
      <section class="course-info">
        <!-- 视频占位区 -->
        <div class="video"></div>

        <!-- 课程详细信息 -->
        <div class="details">
          <h1>{{ courseDetail.courseName }}</h1>
          <p>课程介绍:{{ courseDetail.courseDescription }}</p>
          <p>预计学习时长:{{ courseDetail.courseDuration }}</p>
          <p>课程等级:{{ courseDetail.courseDifficultyLevel }}</p>
          <p>用户评分:{{ courseDetail.courseRating }}</p>
          <p>课程价格:{{ courseDetail.coursePrice }}</p>

        </div>
      </section>

      <!-- 标签切换区域 -->
      <div class="tabs">
        <!-- 标签按钮 -->
        <div class="tab active">介绍</div>
        <div class="tab" @click="onTabClick('chapter')">目录</div>
        <div class="tab">评价</div>
      </div>

      <!-- 内容区 -->
      <div class="content-area" v-if="!loadingChapter && showChapterContent">
        <!-- 左侧内容区，仅当章节内容加载完成且需要显示时才呈现 -->
        <section class="content-left">
          <h2>章节内容</h2>
          <section class="cards-section">
            <div class="card" v-for="(card, index) in chapterDetail" :key="index">
              <div class="card-title">{{ card.chapterName }}</div>
            </div>
          </section>
        </section>

        <!-- 右侧推荐课程区 -->
        <aside class="content-right">
          <h2>推荐课程</h2>
          <p>展示与本课程相关的推荐课程。</p>
        </aside>
      </div>
    </div>

    <!-- 底部区域 -->
    <footer class="footer">
      © 2024 课程平台 - 版权所有
    </footer>
  </div>
</template>

<script>
export default {
  name: "CoursePage", // 组件名称
  data() {
    return {
      courseDetail: {}, // 存储竞赛详情数据
      chapterDetail: [],//存储章节详情数据
      loading: true,        // 加载状态
      error: null,      // 错误信息
      showChapterContent: false, // 控制章节内容的显示状态
      loadingChapter: false,     // 控制章节内容的加载状态
    };
  },
  created() {
    this.fetchCompetitionDetail(); // 在组件创建时获取竞赛详情

  },
  methods: {
    fetchCompetitionDetail() {
      const courseId = this.$route.params.courseId; // 从路由参数中获取 
      this.$http.get(`http://localhost:10086/crs/v1/${courseId}`)
        .then(response => {
          this.courseDetail = response.data; // 将获取到的数据赋值给 courseDetail
          this.loading = false; // 关闭加载状态
        })
        .catch(error => {
          this.error = error.message; // 捕获错误信息并赋值给 error
          this.loading = false; // 关闭加载状态
        });
    },
    onTabClick(tab) {
      if (tab === 'chapter' && !this.showChapterContent) {
        this.fetchChapter(); // 当点击目录标签且章节内容未显示时，加载章节数据
      }
      // 可以根据需要添加其他标签的处理逻辑
    },

    fetchChapter() {
      this.loadingChapter = true; // 开始加载章节内容
      const courseId = this.$route.params.courseId;
      this.$http.get(`http://localhost:10086/chap/v1/${courseId}`)
        .then(response => {
          this.chapterDetail = response.data;
          this.showChapterContent = true; // 加载完成后显示章节内容
          this.loadingChapter = false; // 关闭加载状态
        })
        .catch(error => {
          this.error = error.message;
          this.loadingChapter = false; // 即使出错也要关闭加载状态
        });
    },

  }

};
</script>

<style scoped>
/* 全局背景色 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #F4F6F8;
  /* 浅灰背景 */
}

/* 主内容区样式 */
.main {
  padding: 20px;
}

/* 视频和课程信息区域样式 */
.course-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.course-info .video {
  width: 50%;
  /* 视频区域宽度占50% */
  height: 300px;
  background-color: #E0E0E0;
  /* 灰色占位背景 */
  border-radius: 5px;
}

.course-info .details {
  flex: 1;
  /* 自适应宽度 */
  background-color: #FFFFFF;
  /* 白色背景 */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.course-info .details h1 {
  font-size: 22px;
  margin-bottom: 10px;
}

.course-info .details p {
  font-size: 14px;
  color: #666666;
}

/* 标签切换区域样式 */
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.tabs div {
  padding: 10px 20px;
  background-color: #FFFFFF;
  /* 白色背景 */
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.tabs div.active {
  background-color: #5A67D8;
  /* 活跃标签背景色：紫色 */
  color: #FFFFFF;
  /* 活跃标签文字颜色：白色 */
}

/* 内容区样式 */
.content-area {
  display: flex;
  gap: 20px;
}

.content-left {
  flex: 3;
  /* 左侧区域占比更大 */
  background-color: #FFFFFF;
  /* 白色背景 */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-left h2 {
  font-size: 18px;
  margin-bottom: 15px;
}

.content-left p {
  font-size: 14px;
  color: #666666;
  /* 字体颜色 */
  line-height: 1.8;
  /* 行高 */
}

.content-right {
  flex: 1;
  /* 右侧区域占比较小 */
  background-color: #FFFFFF;
  /* 白色背景 */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-right h2 {
  font-size: 18px;
  margin-bottom: 15px;
}

/* 底部区域样式 */
.footer {
  background-color: #F4F6F8;
  /* 浅灰背景 */
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666666;
  /* 字体颜色 */
  margin-top: 20px;
}
</style>