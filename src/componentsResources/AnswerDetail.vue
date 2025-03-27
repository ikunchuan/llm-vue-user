<template>
  <div class="page-wrapper">
    <!-- 页面容器，宽度固定为1200px -->
    <el-container class="page-container">
      <!-- 页面头部 -->
      <el-header class="fixed-header">
        <div class="header-content">
          <div class="header-left">
            <h1>{{ categoryInfo.categoryName }}</h1>
            <p>类别：{{ categoryInfo.categoryName }}</p>
            <div class="tags-section">
              <p />
              配套课程：
              <span v-for="course in courses" :key="course.courseId" @click="goToCourseDetail(course.courseId)"
                class="clickable-text">
                {{ course.courseName }}
              </span>
            </div>
            <div class="tags-section">
              <p />
              适用竞赛：
              <span v-for="competition in competitions" :key="competition.competitionId"
                @click="goToCompetitionDetail(competition.competitionId)" class="clickable-text">
                {{ competition.competitionName || 暂无竞赛 }}
              </span>
            </div>
          </div>

          <!-- 右侧完成进度 -->
          <div class="header-right">
            <p class="completion-status">
              当前完成：<span class="large-text">{{ completedQuestions }}</span>
              /
              <span class="large-text">{{ totalQuestions }}</span>
            </p>
            <p v-if="completedQuestions === totalQuestions" class="completed-tag">
              已完成
            </p>
            <el-button @click="goBack" type="danger">返回</el-button>
          </div>
        </div>
      </el-header>

      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="250px" class="aside-menu">
          <el-scrollbar>
            <el-menu :default-active="currentProblem" class="el-menu-vertical-demo" @select="selectQuestion">
              <el-menu-item v-for="(problem, index) in answerDetail" :key="problem.questionId"
                :index="problem.questionId" :class="{
                  'active-problem': currentProblem === problem.questionId,
                }">
                <el-icon>
                  <document />
                </el-icon>
                <span>{{ index + 1 }}. {{ problem.questionTitle }}</span>

                <!-- 如果题目已完成，显示 ✔
                <span v-if="userAnswers.find(ua => ua.questionId === problem.questionId)?.isCompleted"
                  class="completed-icon">
                  ✔
                </span> -->
                <!-- 根据答案状态显示图标 -->
                <span v-if="
                  userAnswers.find(
                    (ua) => ua.questionId === problem.questionId
                  )?.isCompleted
                ">
                  <span v-if="
                    userAnswers.find(
                      (ua) => ua.questionId === problem.questionId
                    )?.answer ===
                    userAnswers.find(
                      (ua) => ua.questionId === problem.questionId
                    )?.correctAnswer
                  ">
                    ✔
                    <!-- 正确答案 -->
                  </span>
                  <span v-else>
                    ❌
                    <!-- 错误答案 -->
                  </span>
                </span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <!-- 主内容区域 -->
        <el-main class="main-content">
          <el-card shadow="hover" class="content-card">
            <el-tabs v-model="activeTab" type="card">
              <!-- 题目部分 -->
              <el-tab-pane label="题目" name="question">
                <div class="question-content">
                  <h3 class="large-title">
                    {{ selectedQuestion.questionTitle }}
                  </h3>
                  <p>{{ selectedQuestion.questionText }}</p>
                  <!-- <el-input v-model="answer" :disabled="isAnswered" placeholder="请输入答案"></el-input> -->
                  <!-- 替换输入框为ABCD选项按钮 -->
                  <div class="options-container">
                    <el-button v-for="(option, index) in ['A', 'B', 'C', 'D']" :key="index"
                      :class="['option-btn', { selected: answer === option }]" @click="answer = option">
                      {{ option }}. {{ selectedQuestion[`option${option}`] }}
                    </el-button>
                  </div>
                  <el-button type="success" @click="submitAnswer" :disabled="isAnswered">提交答案</el-button>
                </div>
              </el-tab-pane>

              <el-tab-pane label="答案解析" name="analysis">
                <div class="answer-analysis">
                  <h3>答案解析</h3>
                  <p v-if="isAnswered">
                    {{ selectedQuestion.answerAnalysis || "暂无答案解析" }}
                  </p>
                  <p v-if="isAnswered">
                    正确答案：{{ selectedQuestion.correctAnswer }}
                  </p>
                  <p v-if="isAnswered">您的答案：{{ selectedAnswer }}</p>
                  <p v-if="!isAnswered">请先提交答案，再查看解析。</p>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ElMessageBox } from "element-plus";
import axios from 'axios';

export default {
  mounted() {
    this.fetchCategoryDetail(); // 获取类别信息
    this.fetchAnswerDetail(); // 获取题目信息
    this.fetchCompetitionsByCategoryId(); // 获取竞赛信息
    this.fetchCoursesByCategoryId(); // 获取课程信息
    this.activeTab = "question"; // 设置默认选择题目分页标签
  },

  data() {
    return {
      answerDetail: [], // 题目信息
      categoryInfo: {}, // 类别信息
      currentProblem: "1", // 当前选中的题目
      selectedQuestion: {}, // 当前选中的题目对象
      selectedAnswer: "", // 当前用户选中的答案
      answer: "", // 用户输入的答案
      completedQuestions: 0, // 已完成题目数量
      totalQuestions: 0, // 总题目数量
      userAnswers: [], // 用户答题记录
      isAnswered: false, // 是否已答题
      activeTab: "question", // 默认选择题目标签
      competitions: [], // 存储竞赛数据
      courses: [], // 存储课程数据
    };
  },
  created() {
    this.fetchAnswerDetail(); // 在组件创建时获取题目信息
  },
  methods: {
    // 获取题目信息
    fetchAnswerDetail() {
      const categoryId = this.$route.params.answerId;
      axios
        .get(`/qst/v1/cate/${categoryId}`)
        .then((response) => {
          this.answerDetail = response.data;
          this.totalQuestions = this.answerDetail.length; // 获取总题数
          this.initUserAnswers(); // 初始化用户答题记录
          this.selectQuestion(this.answerDetail[0].questionId); // 默认选择第一道题目
        })
        .catch((error) => {
          console.error("查询题目获取错误:", error);
        });
    },

    initUserAnswers() {
      if (this.userAnswers.length === 0) {
        // 避免重复初始化
        this.answerDetail.forEach((question) => {
          this.userAnswers.push({
            questionId: question.questionId,
            questionTitle: question.questionTitle,
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            isCompleted: false,
            answer: null,
          });
        });
      }
    },
    selectQuestion(questionId) {
      const userAnswer = this.userAnswers.find(
        (ua) => ua.questionId === questionId
      );
      if (userAnswer) {
        console.log(
          `Selecting question ${questionId}, isCompleted = ${userAnswer.isCompleted}`
        );
        this.currentProblem = questionId;
        this.selectedQuestion = { ...userAnswer }; // 确保不会直接修改引用
        this.selectedAnswer = userAnswer.answer || ""; // 保留之前的用户答案
        this.isAnswered = userAnswer.isCompleted; // 标记已完成状态
      }
    },

    // 提交答案并请求后端判断
    submitAnswer() {
      if (!this.answer) {
        // 如果没有选择答案，弹出提示
        ElMessageBox.alert("请先选择一个答案！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        });
        return; // 不执行后续的提交操作
      }

      const userAnswer = this.userAnswers.find(
        (ua) => ua.questionId === this.selectedQuestion.questionId
      );
      if (userAnswer) {
        // 创建一个AnswerRecordDTO对象，包含用户答案和问题ID
        const answerRecordDTO = {
          userId: sessionStorage.getItem("userId"), // 从sessionStorage中获取userId
          questionId: this.selectedQuestion.questionId, // 当前选中题目的ID
          answerGiven: this.answer, // 用户输入的答案
        };

        console.log("发送给后端的AnswerRecordDTO对象:", answerRecordDTO);
        // 发送请求到后端进行答案判断
        this.$http
          .post("ans/judge", answerRecordDTO)
          .then((response) => {
            console.log("后端返回的判断结果:", response.data);
            const result = response.data;

            // 更新前端用户答题记录的状态
            userAnswer.isCompleted = true;
            userAnswer.answer = this.answer; // 更新用户答案
            userAnswer.correctAnswer = result.correctAnswer; // 更新正确答案

            // 更新 selectedAnswer 和 selectedQuestion.correctAnswer
            this.selectedAnswer = this.answer; // 用户输入的答案
            this.selectedQuestion.correctAnswer = result.correctAnswer; // 后端返回的正确答案

            this.completedQuestions = this.userAnswers.filter(
              (ua) => ua.isCompleted
            ).length;

            // 判断答案是否正确，显示反馈消息
            if (this.answer === result.correctAnswer) {
              ElMessageBox.alert("回答正确！", "成功", {
                confirmButtonText: "确定",
                type: "success",
              });
            } else {
              ElMessageBox.alert("回答错误！", "错误", {
                confirmButtonText: "确定",
                type: "error",
              });
            }

            // 重置输入框
            this.answer = "";
            this.isAnswered = true;
          })
          .catch((error) => {
            console.error("提交答案错误:", error);
            ElMessageBox.alert("提交答案失败，请重试。", "错误", {
              confirmButtonText: "确定",
              type: "error",
            });
          });
      }
    },

    goBack() {
      if (this.isAnswered) {
        ElMessageBox.confirm("确定要放弃本次答题记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.go(-1); // 返回上一页
          })
          .catch(() => {
            // 用户取消操作，不做任何处理
          });
      } else {
        this.$router.go(-1); // 直接返回上一页
      }
    },

    fetchCategoryDetail() {
      const categoryId = this.$route.params.answerId;
      axios
        .get(`/cat/v1/${categoryId}`)
        .then((response) => {
          this.categoryInfo = response.data;
        })
        .catch((error) => {
          console.error("类别数据获取错误:", error);
        });
    },

    // 查询竞赛
    fetchCompetitionsByCategoryId() {
      const categoryId = this.$route.params.answerId;
      axios
        .get(`comp/v1/comp/byParentId?parentId=${categoryId}`)
        .then((response) => {
          console.log("竞赛数据:", response.data);
          if (Array.isArray(response.data)) {
            this.competitions = response.data;
            console.log("处理后的竞赛数据:", this.competitions);
          } else {
            console.warn("未获取到课程数据或数据格式不正确");
            this.competitions = [];
          }
        })
        .catch((error) => {
          console.error("查询竞赛错误:", error);
          this.competitions = [];
        });
    },

    // 查询课程
    fetchCoursesByCategoryId() {
      const categoryId = this.$route.params.answerId;
      axios
        .get(`crs/course/byParentId?parentId=${categoryId}`)
        .then((response) => {
          console.log("课程数据:", response.data);
          if (Array.isArray(response.data)) {
            // 直接使用数组数据
            this.courses = response.data;
            console.log("处理后的课程数据:", this.courses);
          } else {
            console.warn("未获取到课程数据或数据格式不正确");
            this.courses = [];
          }
        })
        .catch((error) => {
          console.error("查询课程错误:", error);
          this.courses = [];
        });
    }, // 跳转到竞赛详情页面
    goToCompetitionDetail(compId) {
      this.$router.push({ name: "CompDetail", params: { compId: compId } });
    },

    // 跳转到课程详情页面
    goToCourseDetail(courseId) {
      this.$router.push({
        name: "CourseDetail",
        params: { courseId: courseId },
      });
    },
  },
};
</script>

<style scoped>
/* 页面容器 */
.page-wrapper {
  width: 1200px;
  margin: 0 auto;
  background-color: #f4f6f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.fixed-header {
  display: flex;
  /* 使用 Flex 布局 */
  justify-content: space-between;
  /* 左右分散对齐 */
  align-items: center;
  /* 垂直居中 */
  padding: 0 20px;
  /* 增加左右内边距 */
  height: 100px;
  /* 设置头部高度 */
  color: #fff;
  /* 文字颜色 */
  background-color: #5a67d8;
  /* 保留头部背景色 */
  box-sizing: border-box;
}

.header-content {
  display: flex;
  width: 100%;
  /* 内容占满头部 */
  justify-content: space-between;
  /* 左右对齐 */
  align-items: center;
}

.header-left {
  flex: 1;
  /* 左侧内容占据剩余空间 */
}

.header-right {
  white-space: nowrap;
  /* 防止文字换行 */
  text-align: right;
  font-size: 18px;
  color: #ffffff;
  /* 文字颜色与背景一致 */
  font-weight: bold;
}

.large-text {
  font-size: 28px;
  color: #fffb00;
  /* 绿色字体 */
  font-weight: bold;
}

/* 头部样式 */
.fixed-header {
  background-color: #5a67d8;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 200px;
  border-bottom: 2px solid #e6e6e6;
}

/* 题目部分标题放大 */
.large-title {
  font-size: 24px;
  font-weight: bold;
}

/* 左侧导航栏 */
.aside-menu {
  background-color: #ffffff;
  height: 820px;
  border-right: 1px solid #e6e6e6;
  padding-top: 20px;
}

.content-card {
  height: 800px;
}

/* 题目内容样式 */
.question-content {
  font-size: 16px;
  margin-top: 10px;
}

.completion-status {
  font-size: 20px;
  color: #eeff00;
}

.large-text {
  font-size: 24px;
  font-weight: bold;
}

.answer-analysis {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.completed {
  color: #17c964;
  /* 已完成题目字体颜色 */
}

.option-btn {
  margin: 5px;
}

.option-btn.selected {
  background-color: #5a67d8;
  /* 选中时的背景色 */
  color: white;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.clickable-text {
  display: inline-block;
  /* 使标签块级显示，便于设置宽度和高度 */
  margin-right: 5px;
  /* 标签之间的水平间隔 */
  padding: 5px 10px;
  /* 标签内边距 */
  font-size: 14px;
  /* 字体大小 */
  color: #fff;
  /* 字体颜色 */
  background-color: #06bdff;
  /* 背景颜色 */
  border-radius: 5px;
  /* 圆角 */
  border: 1px solid #4a54c4;
  /* 边框 */
  cursor: pointer;
  /* 鼠标悬停时显示手型 */
  transition: background-color 0.3s;
  /* 鼠标悬停时的背景颜色变化效果 */
}

.clickable-text:hover {
  background-color: #4a54c4;
  /* 鼠标悬停时的背景颜色 */
  text-decoration: none;
  /* 去除下划线 */
}

.active-problem {
  color: #6f00ff !important;
  /* 点击后字体变为紫色 */
  font-weight: bold;
  /* 字体加粗 */
}

.completed-icon {
  color: #17c964;
  /* 使用绿色显示 ✔ 标记 */
  margin-right: 30px;
  font-size: 16px;
}
</style>
