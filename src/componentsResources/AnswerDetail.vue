<template>
  <el-container>
    <!-- 页面头部 -->
    <el-header class="top-info">
      <el-container>
        <el-aside width="200px" class="header-info">
          <el-avatar shape="square" :size="80" :src="url" />
        </el-aside>
        <el-main>
          <h2>{{ categoryName }}</h2>
          <p class="info-footer">{{ categoryDescription }}</p>
        </el-main>
      </el-container>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="250px" class="aside-menu">
        <el-scrollbar>
          <el-menu :default-active="currentProblem" class="el-menu-vertical-demo" @select="selectProblem">
            <el-menu-item v-for="problem in problems" :key="problem.id" :index="problem.id">
              {{ problem.title }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main>
        <el-card shadow="hover" class="content-card">
          <h3>{{ currentProblemTitle }}</h3>
          <p>{{ currentProblemContent }}</p>
          <el-input v-model="answer" placeholder="请输入答案"></el-input>
          <div class="actions">
            <el-button type="primary" @click="startPractice">开始答题</el-button>
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

export default {
  setup() {
    const problems = ref([
      { id: '1', title: '题目一', content: '这是题目一的内容' },
      { id: '2', title: '题目二', content: '这是题目二的内容' },
      { id: '3', title: '题目三', content: '这是题目三的内容' },
    ]);

    const categoryName = ref('数学类别');
    const categoryDescription = ref('这是数学类别的介绍信息');
    const url = ref('https://img95.699pic.com/element/40119/6081.png_860.png');

    const currentProblem = ref(problems.value[0].id);
    const currentProblemTitle = ref(problems.value[0].title);
    const currentProblemContent = ref(problems.value[0].content);

    const answer = ref('');
    const timer = ref(0);
    let timerInterval = null;

    const startPractice = () => {
      timer.value = 0;
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timer.value++;
      }, 1000);
    };

    const selectProblem = (problemId) => {
      const problem = problems.value.find((p) => p.id === problemId);
      if (problem) {
        currentProblem.value = problem.id;
        currentProblemTitle.value = problem.title;
        currentProblemContent.value = problem.content;
        answer.value = '';
        if (timerInterval) clearInterval(timerInterval);
      }
    };

    const submitAnswer = () => {
      alert(`提交答案：${answer.value}`);
    };

    onMounted(() => {
      startPractice();
    });

    return {
      problems,
      categoryName,
      categoryDescription,
      url,
      currentProblem,
      currentProblemTitle,
      currentProblemContent,
      answer,
      timer,
      startPractice,
      selectProblem,
      submitAnswer,
    };
  },
};
</script>

<style scoped>
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
