<template>
    <!-- 根模板，包含整个页面的结构 -->
    <div>
      <!-- 顶部导航栏 -->
      
  
      <!-- 主内容区域 -->
      <div class="main">
        <!-- 视频和课程信息区域 -->
        <section class="course-info">
          <!-- 视频占位区 -->
          <div class="video">   <BilibiliPlayer bvid="BV1Eb411u7Fw" />
          </div>
  
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
          <div class="tab">目录</div>
          <div class="tab">评价</div>
        </div>
  
        <!-- 内容区 -->
        <div class="content-area">
          <!-- 左侧内容区 -->
          <section class="content-left">
            <h2>章节内容</h2>
            <p>这里可以放置详细的章节信息或课程内容。</p>
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
  import BilibiliPlayer from "../components/BilibiliPlayer.vue";
  export default {
    name: "CoursePage", // 组件名称
    components: {
    BilibiliPlayer,
  },
    data() {
    return {
      bvid :null,
      videoList: [
        // { bvid: "BV1Eb411u7Fw" },
        // { bvid: "BV1A54y1s7SM" },
      ],
      courseDetail: {}, // 存储竞赛详情数据
      loading: true,        // 加载状态
      error: null           // 错误信息
    };
  },
  created() {
    this.fetchCompetitionDetail(); // 在组件创建时获取竞赛详情
  },
  mounted() {
  const courseId = this.$route.params.courseId;  // 获取传递的课程 ID
  this.fetchBvid(courseId);  // 获取对应的 bvid
},
  methods: {
    fetchCompetitionDetail() {
      const courseId = this.$route.params.courseId; // 从路由参数中获取 compId
      this.$http.get(`http://localhost:10086/crs/v1/${courseId}`)
        .then(response => {
          this.courseDetail = response.data; // 将获取到的数据赋值给 competitionDetail
          this.loading = false; // 关闭加载状态
        })
        .catch(error => {
          this.error = error.message; // 捕获错误信息并赋值给 error
          this.loading = false; // 关闭加载状态
        });
    },
    fetchBvid(courseId) {
    // 假设有一个函数可以根据课程 ID 获取 bvid
    // 这里的获取过程可以是 API 请求，也可以是静态数据查询
    const courseData = this.getCourseDataById(courseId);  // 获取课程数据
    this.bvid = courseData.bvid;  // 设置对应的 bvid

    // 如果 bvid 存在，就开始播放视频
    if (this.bvid) {
      this.loadVideo(this.bvid);
    }
  },

  // 假设这是通过 bvid 加载视频的方法
  loadVideo(bvid) {
    const videoUrl = `https://www.bilibili.com/video/${bvid}`;
    this.$nextTick(() => {
      // 这里的 videoPlayer 是你在页面右上角的 <video> 元素
      this.$refs.videoPlayer.src = videoUrl;
    });
  },

  // 假设的根据课程 ID 获取课程数据的方法
  getCourseDataById(courseId) {
    // 你可以从数据库或者静态数据中查询课程
    const courses = [
     
    ];
    return courses.find(course => course.id === courseId);
  },
  }
    
  };
  </script>
  
  <style scoped>
  /* 全局背景色 */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #F4F6F8; /* 浅灰背景 */
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
    width: 50%; /* 视频区域宽度占50% */
    height: 300px;
    background-color: #E0E0E0; /* 灰色占位背景 */
    border-radius: 5px;
  }
  
  .course-info .details {
    flex: 1; /* 自适应宽度 */
    background-color: #FFFFFF; /* 白色背景 */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
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
    background-color: #FFFFFF; /* 白色背景 */
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }
  
  .tabs div.active {
    background-color: #5A67D8; /* 活跃标签背景色：紫色 */
    color: #FFFFFF; /* 活跃标签文字颜色：白色 */
  }
  
  /* 内容区样式 */
  .content-area {
    display: flex;
    gap: 20px;
  }
  
  .content-left {
    flex: 3; /* 左侧区域占比更大 */
    background-color: #FFFFFF; /* 白色背景 */
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
    color: #666666; /* 字体颜色 */
    line-height: 1.8; /* 行高 */
  }
  
  .content-right {
    flex: 1; /* 右侧区域占比较小 */
    background-color: #FFFFFF; /* 白色背景 */
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
    background-color: #F4F6F8; /* 浅灰背景 */
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #666666; /* 字体颜色 */
    margin-top: 20px;
  }
  </style>
  