<template>
  <div class="course-detail-container">
    <!-- Video and Course Introduction -->
    <div class="top-section">
      <!-- Video Section -->
      <div class="video-container">
        <!-- <video controls :src="bvid" class="video-player"></video>  -->
        <BilibiliPlayer :bvid="courseDetail.bvid" />
      </div>
      <!-- Course Info -->
      <div class="course-info">
        <h2 class="course-title">{{ courseDetail.courseName }}</h2>
        <p class="course-description">{{ courseDetail.courseDescription }}</p>

        <div class="course-buttons">
          <el-button type='primary' :plain="isCollected" @click="handleCollect">
            {{ isCollected ? "已收藏" : "收藏课程" }}
          </el-button>
          <el-button @click="onAnswerDetailClick">题目推荐</el-button>
        </div>

        <div class="course-meta">
          <p style="padding: 2px">
            <strong>用户评分:</strong> {{ courseDetail.courseRating }}
          </p>
          <p style="padding: 2px">
            <strong>课程等级:</strong> {{ courseDetail.courseDifficultyLevel }}
          </p>
          <p style="padding: 2px">
            <strong>预计学习时长:</strong> {{ courseDetail.courseDuration }}
          </p>
          <p style="padding: 2px">
            <strong>课程价格:</strong> {{ courseDetail.coursePrice }}
          </p>
        </div>
      </div>
    </div>

    <!-- Course Content Tabs -->
    <div class="bottom-section">
      <el-tabs v-model="activeTab">
        <!-- <el-tab-pane label="介绍" name="intro">
          <p>{{ course.fullDescription }}</p>
        </el-tab-pane> -->
        <el-tab-pane label="目录" name="category">
          <div class="card-container">
            <div class="card" v-for="(card, index) in chapterDetail" :key="index">
              <div class="card-info">{{ card.chapterName }}</div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="评价" name="reviews">
          <!-- 显示评分 -->
          <span>评分: {{ courseDetail.courseRating }}</span><br /><br />

          <span>评论:</span><br /><br />
          <!-- 遍历评论数据 -->
          <div v-for="(comment, index) in courseComment" :key="comment.commentId" class="comment-item">
            <div class="comment-header">
              <strong>用户 {{ index + 1 }}:</strong>
              <!-- 从1开始自增 -->
            </div>
            <div class="comment-body">
              <p>{{ comment.commentContent }}</p>
            </div>
            <!-- <div class="comment-footer">
        <span>点赞数: {{ comment.courseLikes }}</span>
      </div> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="content-area">
      <!-- 左侧内容区，仅当章节内容加载完成且需要显示时才呈现 -->

      <!-- 右侧推荐课程区 -->
      <aside class="content-right">
        <h2>推荐课程</h2>
        <p>展示与本课程相关的推荐课程。</p>
        <div v-if="courseRelated && courseRelated.length > 0" class="courses-container">
          <div v-for="(course, index) in courseRelated" :key="course.courseId" class="recommended-course">
            <!-- 显示课程图片 -->
            <el-image style="
                width: 250px;
                height: 170px;
                border-radius: 8px;
                margin-bottom: 10px;
                cursor: pointer;
              " :src="'http://localhost:10086/images/upload/' + course.courseImgUrl
                " fit="cover" @click="goToCourseDetail(course.courseId)"></el-image>

            <p><strong>课程名称:</strong> {{ course.courseName }}</p>
            <p><strong>课程难度:</strong> {{ course.courseDifficultyLevel }}</p>
          </div>
        </div>

        <!-- 如果没有推荐课程，则显示提示信息 -->
        <p v-else>暂无推荐课程。</p>
      </aside>
    </div>
  </div>
</template>

<script>
import BilibiliPlayer from "../components/BilibiliPlayer.vue";
import axios from 'axios';
export default {
  name: "CoursePage", // 组件名称
  components: {
    BilibiliPlayer,
  },
  data() {
    return {
      activeTab: "category",
      courseDetail: {}, // 存储课程详情数据
      chapterDetail: [], //存储章节详情数据
      loading: true, // 加载状态
      error: null, // 错误信息
      showChapterContent: false, // 控制章节内容的显示状态
      loadingChapter: false, // 控制章节内容的加载状态
      courseFavorite: {},
      isCollected: false,
      // bvid: "BV1dh411e7F7", // 默认bv号
      // userId:'',
      // courseId:'',
      courseComment: {}, //存储课程的评论
      courseRelated: {}, //这个课程的相关课程
      categoryId: "",
    };
  },
  created() {
    this.fetchCourseDetail(); // 在组件创建时获取课程详情
    this.fetchChapter();
    this.getAllCourseComment();
  },

  mounted() {
    this.checkIfCollected();
  },

  methods: {
    goToCourseDetail(courseId) {
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
      // this.$router.push({name:'CourseDetail' , params: { courseId: courseId }});
      this.$router
        .replace({ name: "CourseDetail", params: { courseId } })
        .then(() => {
          // 通过修改路由跳转后，可以触发视图更新
          this.$nextTick(() => {
            // 强制刷新页面内容（通过改变数据或状态触发视图更新）
            this.$router.go(0); // 强制刷新页面
          });
        })
        .catch((err) => {
          console.error("跳转失败:", err);
        });
    },

    getCourseWithCategory() {
      //展示与本课程相关的课程
      const parentId = this.courseDetail.categoryId;
      axios
        .get(`crs/course/byParentId`, {
          params: { parentId },
        })
        .then((response) => {
          if (response) {
            this.courseRelated = response.data;
            console.log(this.courseRelated);
          }
        });
    },

    getAllCourseComment() {
      //获取当前课程的所有评论
      const courseId = this.$route.params.courseId;
      axios.get(`crs/course/comment/${courseId}`).then((response) => {
        if (response) {
          this.courseComment = response.data;
          console.log(this.courseComment);
        }
      });
    },

    checkIfCollected() {
      const userId = sessionStorage.getItem("userId");
      const courseId = this.$route.params.courseId;
      if (!userId) {
        this.$message.error("请先登录");
        return;
      }

      axios.get("/crs/v1/favorite/isCollected", {
        params: { userId, courseId }
      }).then(res => {
        this.isCollected = res.data; // true / false
      });
    },

    handleCollect() {
      const userId = sessionStorage.getItem("userId");
      const courseId = this.$route.params.courseId;

      if (!userId) {
        this.$message.error("请先登录");
        return;
      }
      axios.post("/crs/v1/toggleFavorite", {
        userId: userId,
        courseId: courseId
      }).then(() => {
        this.checkIfCollected(); // 重新拉取状态
        if (this.isCollected) {
          this.$message.success("收藏成功");
        } else {
          this.$message.warn("已取消收藏");
        }
      }).catch(() => {
        this.$message.error("收藏失败，请重试");
      });
    },
    handleRecommend() {
      this.$message.info("推荐的题目已展示");
    },
    //跳转题目详情
    onAnswerDetailClick() {
      const courseId = this.$route.params.courseId;
      const categoryId = this.courseToCategoryMapping[courseId];

      if (categoryId) {
        this.$router.push({ path: `/home/answerdetail/${categoryId}` });
      } else {
        // 如果没有找到对应的categoryId，可以给出提示或者跳转到默认页面
        this.$message.error("没有找到对应的题目推荐");
      }
    },

    // 获取课程详情数据
    fetchCourseDetail() {
      const courseId = this.$route.params.courseId; // 从路由参数中获取
      axios
        .get(`/crs/v1/${courseId}`)
        .then((response) => {
          this.courseDetail = response.data; // 将获取到的数据赋值给 courseDetail
          this.getCourseWithCategory();
          this.loading = false; // 关闭加载状态
        })
        .catch((error) => {
          this.error = error.message; // 捕获错误信息并赋值给 error
          this.loading = false; // 关闭加载状态
        });
    },
    onTabClick(tab) {
      if (tab === "chapter" && !this.showChapterContent) {
        this.fetchChapter(); // 当点击目录标签且章节内容未显示时，加载章节数据
      }
      // 可以根据需要添加其他标签的处理逻辑
    },

    fetchChapter() {
      this.loadingChapter = true; // 开始加载章节内容
      const courseId = this.$route.params.courseId;
      axios
        .get(`/chap/v1/${courseId}`)
        .then((response) => {
          this.chapterDetail = response.data;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
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
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

.course-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.course-description {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.course-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.course-meta p {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.course-meta p strong {
  color: #333;
}

.bottom-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列目录项 */
  gap: 12px;
  /* 目录项之间的垂直间距 */
  padding: 12px;
  /* 容器内边距 */
}

.card {
  background-color: #ffffff;
  /* 背景色 */
  border: 1px solid #ddd;
  /* 边框颜色 */
  border-radius: 6px;
  /* 边角圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  padding: 10px;
  /* 内边距（减小） */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  /* 平滑过渡 */
  font-size: 14px;
  /* 字体大小（减小） */
  height: auto;
  /* 高度自适应内容 */
}

.card:hover {
  background-color: #f5f5f5;
  /* 鼠标悬停时的背景颜色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  /* 鼠标悬停时的阴影效果 */
}

.card-info {
  font-weight: 600;
  /* 字体加粗 */
  text-align: center;
  /* 文字居中 */
  color: #333;
  /* 字体颜色 */
}

.comment-item {
  background-color: #ffffff;
  /* 背景色 */
  border: 1px solid #ddd;
  /* 边框颜色 */
  border-radius: 8px;
  /* 边角圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  padding: 16px;
  /* 内边距 */
  margin-bottom: 16px;
  /* 评论之间的间距 */
  transition: all 0.3s ease;
  /* 平滑过渡 */
}

.comment-item:hover {
  background-color: #f9f9f9;
  /* 鼠标悬停时背景色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  /* 鼠标悬停时阴影效果 */
}

.comment-header {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.comment-body p {
  font-size: 14px;
  color: #555;
  margin: 0;
  padding: 8px 0;
}

.comment-footer {
  font-size: 14px;
  color: #777;
  text-align: right;
}

.comment-footer span {
  font-weight: 600;
  color: #f56c6c;
  /* 点赞数的颜色 */
}

.courses-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* 控制课程之间的间距 */
}

.recommended-course {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 控制内容的对齐方式 */
  width: 250px;
  /* 确保每个课程块的宽度一致 */
}
</style>
