<template>
  <el-container class="answer-detail">
    <!-- 页面头部 -->
    <el-header class="top-info">
      <el-container>
        <el-aside width="200px" class="header-info">
          <el-avatar shape="square" :size="80" :src="url" />
        </el-aside>
        <el-main>
          <h2>{{ categoryInfo.categoryName }}</h2>
          <p class="info-footer">{{ categoryDescription }}</p>
        </el-main>
      </el-container>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="250px" class="aside-menu">
        <el-scrollbar>
          <el-menu :default-active="currentProblem" class="el-menu-vertical-demo" @select="selectQuestion">
            <el-menu-item v-for="problem in answerDetail" :key="problem.questionId" :index="problem.questionId">
              {{ problem.questionTitle }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main>
        <el-card shadow="hover" class="content-card">
          <h3>{{ selectedQuestion.questionTitle }}</h3>
          <p>{{ selectedQuestion.questionText }}</p>
          <el-input v-model="answer" placeholder="请输入答案"></el-input>
          <div class="actions">

            <el-button type="success" @click="submitAnswer">提交答案</el-button>
            <span class="timer">计时：{{ timer }} 秒</span>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus'; // 引入 MessageBox 组件

export default {

  data() {
    return {
      answerDetail: {}, // 存储题目数据
      categoryInfo: [], // 存储类别表信息
      loading: true, // 加载状态
      error: null, // 错误信息
      currentQuestion: 1, // 当前选中的题目ID，默认是第一个
      selectedQuestion: {},// 当前选中的题目详情
      answer: '',
    };
  },

  created() {
    this.fetchAnswerDetail(); // 在组件创建时获取课程详情

  },
  methods: {
    //答案比对
    submitAnswer() {
      // 比较用户输入的答案和正确答案
      if (this.answer === this.selectedQuestion.correctAnswer) {
        // 如果答案正确，显示成功消息
        ElMessageBox.alert('回答正确！', '成功', {
          confirmButtonText: '确定',
          type: 'success'
        });
      } else {
        // 如果答案错误，显示错误消息
        ElMessageBox.alert('回答错误！', '错误', {
          confirmButtonText: '确定',
          type: 'error'
        });
      }
      // 可以根据需要重置答案输入框
      this.answer = '';
    },

    //查询题目数据
    fetchAnswerDetail() {
      const categoryId = this.$route.params.answerId;
      this.$http.get(`http://localhost:10086/qst/v1/cate/${categoryId}`)
        .then(response => {
          this.answerDetail = response.data;
          if (Array.isArray(this.answerDetail)) {
            this.selectedQuestion = this.answerDetail.find(question => question.questionId === this.currentQuestion);
          } else {
            console.error('answerDetail is not an array');
          }
          this.loading = false;
        })
        .catch(error => {
          this.error = error.message;
          this.loading = false;
        });
    },
    //获取类别数据
    fetchcatoryDetail() {
      const categoryId = this.$route.params.answerId; // 从路由参数中获取 answerId
      this.$http.get(`http://localhost:10086/cat/v1/${categoryId}`)
        .then(response => {
          this.categoryInfo = response.data; // 将获取到的数据赋值给 answerDetail
          this.loading = false; // 关闭加载状态
        })
        .catch(error => {
          this.error = error.message; // 捕获错误信息并赋值给 error
          this.loading = false; // 关闭加载状态
        });
    },
    //获取具体题目
    selectQuestion(questionId) {
      this.currentQuestion = questionId;
      this.selectedQuestion = this.answerDetail.find(question => question.questionId === questionId);
      console.log(this.selectedQuestion); // Debug to check if the question is found
    },



  },
  mounted() {
    this.fetchcatoryDetail();
  },
};

</script>

<style scoped>
.answer-detail {
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

.top-info {
  width: 100%;
  height: auto;
  padding: 10px;
  background-color: #f8f8f8;
  padding: 2px;
  border-bottom: 1px solid #e0e0e0;
}

.header-row {
  align-items: center;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.aside-menu {
  background-color: #f5f7fa;
  padding: 10px;
  overflow: hidden;
}

.content-card {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.timer {
  font-weight: bold;
  color: #333;
}

.info-footer {
  color: #888;
  font-size: 14px;
}
</style>
