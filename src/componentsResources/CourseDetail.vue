<template>
  <div class="course-detail-container">
    <!-- Video and Course Introduction -->
    <div class="top-section">
      <!-- Video Section -->
      <div class="video-container">
        <!-- <video controls :src="bvid" class="video-player"></video> -->
        <BilibiliPlayer bvid="BV1Eb411u7Fw" />
      </div>
      <!-- Course Info -->
      <div class="course-info">
        <h2>{{ courseDetail.courseName }}</h2>
        <p>{{ courseDetail.courseDescription }}</p>
        <div class="course-buttons">
          <el-button type="primary" @click="handleCollect" :disabled="isCollected">{{ isCollected ? '已收藏' : '收藏课程' }}</el-button>
          <el-button @click="onAnswerDetailClick">题目推荐</el-button>
        </div>
        <div class="course-meta">
          <p>用户评分:{{ courseDetail.courseRating }}</p>
          <p>课程等级: {{ courseDetail.courseDifficultyLevel }}</p>
          <p>预计学习时长: {{ courseDetail.courseDuration }}</p>
          <p>课程价格: {{ courseDetail.coursePrice }}</p>
        </div>
      </div>
    </div>

    <!-- Course Content Tabs -->
    <div class="bottom-section">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="介绍" name="intro">
          <!-- <p>{{ course.fullDescription }}</p> -->
        </el-tab-pane>
        <el-tab-pane  label="目录" >
          
          <span> {{ chapterDetail.chapterName }}</span>
        </el-tab-pane>

        <el-tab-pane label="评价" name="reviews">
          <!-- <div v-for="(review, index) in course.reviews" :key="index">
            <p>{{ review.comment }}</p> -->
            <span>评分: {{ courseDetail.courseRating }}</span>
          <!-- </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="content-area">
      <!-- 左侧内容区，仅当章节内容加载完成且需要显示时才呈现 -->
     

      <!-- 右侧推荐课程区 -->
      <aside class="content-right">
        <h2>推荐课程</h2>
        <p>展示与本课程相关的推荐课程。</p>
      </aside>
    </div>


    
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
      activeTab: 'intro',
      courseDetail: {}, // 存储课程详情数据
      chapterDetail: [],//存储章节详情数据
      loading: true,        // 加载状态
      error: null,      // 错误信息
      showChapterContent: false, // 控制章节内容的显示状态
      loadingChapter: false,     // 控制章节内容的加载状态
      courseToCategoryMapping: {
        '1': '13', // 假设课程ID 1 对应 题目类别ID 13
        '2': '14', // 假设课程ID 2 对应 题目类别ID 14
        // 添加更多映射
      },
      courseFavorite:{},
      isCollected : false,
      // userId:'',
      // courseId:'',
    };
  },
  created() {
    this.fetchCourseDetail(); // 在组件创建时获取课程详情
this.fetchChapter();
  },
  mounted() {
    const courseId = this.$route.params.courseId;  // 获取传递的课程 ID


  },
  methods: {
    handleCollect() {
      this.$message.success('课程已收藏');
      const userId = sessionStorage.getItem("userId");
      const courseId = this.$route.params.courseId;
      this.courseFavorite = {
        userId: userId,
        courseId: courseId
      };
      console.log(this.courseFavorite)
      this.$http.post('crs/v1/favorite', this.courseFavorite)
      .then(response => {
        if(response.data == 1){
          console.log("课程收藏成功")
          this.isCollected = true; // 收藏成功后设置为已收藏状态
          this.$message.success('收藏成功');
        }
      })
      .catch(error => {
        this.$message.error('收藏失败，请重试');
        console.error('收藏失败:', error);
      })
    },
    handleRecommend() {
      this.$message.info('推荐的题目已展示');
    },
     //跳转题目详情
     onAnswerDetailClick() {
      const courseId = this.$route.params.courseId;
      const categoryId = this.courseToCategoryMapping[courseId];

      if (categoryId) {
        this.$router.push({ path: `/home/answerdetail/${categoryId}` });
      } else {
        // 如果没有找到对应的categoryId，可以给出提示或者跳转到默认页面
        this.$message.error('没有找到对应的题目推荐');
      }
    },

    // 获取课程详情数据
    fetchCourseDetail() {
      const courseId = this.$route.params.courseId; // 从路由参数中获取 
      this.$http.get(`http://localhost:10086/crs/v1/${courseId}`)
        .then(response => {
          this.courseDetail = response.data; // 将获取到的数据赋值给 courseDetail
          this.loading = false; // 关闭加载状态
          this.fetchBvid(courseId);  // 获取对应的 bvid
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
.course-detail-container {
max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f6f8;


  max-width: 1200px;
  /* 限制页面的最大宽度 */
  margin: 0 auto;
  /* 居中对齐 */
  
 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选：添加阴影效果 */
  border-radius: 10px;
  /* 可选：添加圆角效果 */
}

.top-section {
  display: flex;
  gap: 20px;
}

.video-container {
  flex: 1;
}

.video-player {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  background-color: black;
}

.course-info {
  flex: 1;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-buttons {
  margin: 10px 0;
}

.course-meta p {
  margin: 5px 0;
}

.bottom-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
