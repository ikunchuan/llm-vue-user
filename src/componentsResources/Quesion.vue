<template>
  <el-container class="main-page">
    <el-main>
      <el-row :gutter="20">
        <!-- 左侧主内容区域 -->
        <el-col :span="18">

          <!-- 题库列表 -->
          <div class="content-list">
            <h3 style="margin: 15px;">题库列表</h3>
            <el-row :gutter="20">
              <el-col :span="8" v-for="card in cards" :key="card.id">
                <el-card class="question-card" @click="goToAnswerDetail(card.id)">
                  <div class="question-content">
                    <div class="question-header">
                      <img :src="card.image" :alt="card.title" class="question-icon" />
                      <h3 class="question-title">{{ card.title }}</h3>
                    </div>
                    <div class="question-stats">
                      <el-tag size="small">总题数: {{ card.totalCount }}</el-tag>
                      <el-tag type="success" size="small">已做: {{ card.finishedCount }}</el-tag>
                    </div>
                    <div class="question-history">
                      <div class="stats-row">
                        <span class="stats-label">浏览次数:</span>
                        <span class="stats-value">{{ card.viewCount || 0 }}</span>
                      </div>
                      <!-- <div class="stats-row">
                        <span class="stats-label">解答人数:</span>
                        <span class="stats-value">{{ card.solvedCount || 0 }}</span>
                      </div> -->
                    </div>
                    <div class="related-contests">
                      <span class="contest-title">相关竞赛:</span>
                      <el-tag v-for="(contest, index) in card.relatedContests" :key="index" type="warning" size="small"
                        class="contest-item">
                        {{ contest.name }}
                      </el-tag>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </el-col>

        <!-- 右侧推荐区域 -->
        <el-col :span="6" class="right-sidebar">
          <h3 style="margin: 15px">打卡</h3>
          <!-- 日历组件 -->
          <el-card shadow="hover" class="calendar-card" ref="calendar">
            <el-calendar v-model="date" style="padding: 0;">
              <template #header="">
                <span>
                  {{ date.getFullYear() }}年
                  {{ date.getMonth() + 1 }}月
                </span>
                <el-button size="small" @click="selectDate('today')">
                  打卡
                </el-button>
              </template>
              <template #date-cell="{ data }">
                <div class="calendar-cell">
                  {{ data.day.split('-').slice(2).join('') }}
                  <p>{{ data.isSelected ? '✔️' : '' }}</p>
                </div>
              </template>

            </el-calendar>
            <div style="margin: 10px;">
              <el-text style="color: #5a67d8;">恭喜您！</el-text>
              已经成功打卡<el-text style="font-weight: 900; color: #5a67d8;"> 1</el-text> 天
            </div>
          </el-card>

          <h3>您可能感兴趣的竞赛</h3>
          <!-- 热门题目推荐 -->
          <el-card shadow="hover" class="recommend-card">
            <el-carousel :interval="5000" :autoplay="true">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel-item" @click="goToComp(item.compId)">
                  <h3>竞赛 {{ item.compImg }}</h3>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>

          <h3>你可能感兴趣的课程</h3>
          <!-- 热门题目推荐 -->
          <el-card shadow="hover" class="recommend-card">
            <el-carousel :interval="5000" :autoplay="true">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel-item" @click="goToCourse(item.courseId)">
                  <h3>课程 {{ item.courseImg }}</h3>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>

        </el-col>

      </el-row>

    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "Question",
  data() {
    return {
      date: new Date(),

      activeTab: 'hot',
      searchName: '',
      difficulty: '',
      categoryInfo: [],
      questions: [], // 所有题目
      cards: [
        {
          id: 9, title: "程序设计",
          image: "src/assets/img/6.png",
          // solvedCount: 0,  // 解答人数
          totalCount: 100,  // 总题目数
          finishedCount: 30,  // 已完成数量
          viewCount: 0,  // 浏览次数 
          relatedContests: [],// 相关竞赛
        },
        { id: 10, title: "网络安全", image: "src/assets/img/7.png" },
        { id: 11, title: "人工智能与大数据", image: "src/assets/img/12.png" },
        { id: 12, title: "数据挖掘与分析", image: "src/assets/img/9.png" },
        { id: 13, title: "数学知识", image: "src/assets/img/10.png" },
        { id: 14, title: "数学建模", image: "src/assets/img/14.png" },
        { id: 21, title: "语言表达", image: "src/assets/img/8.png" },
        { id: 22, title: "英语应用", image: "src/assets/img/13.png" },
        { id: 23, title: "跨文化交流", image: "src/assets/img/11.png" },
      ],

      compImg: [],
    }
  },
  computed: {

    // filteredQuestions() {
    //   return this.questions.filter(question => {
    //     const matchSearch = !this.searchName ||
    //       question.title.toLowerCase().includes(this.searchName.toLowerCase());
    //     const matchDifficulty = !this.difficulty ||
    //       question.difficulty === this.difficulty;
    //     return matchSearch && matchDifficulty;
    //   });
    // }
  },

  methods: {

    handleTabClick(tab) {
      const type = tab.props.name;
      this.fetchQuestions(type);
    },

    goToAnswerDetail(answerId) {
      this.$router.push({
        name: 'AnswerDetail',
        params: { answerId: answerId }
      });
    },

    goToComp(compId) {
      this.$router.push({
        name: 'AnswerDetail',
        params: { answerId: answerId }
      });
    },

    goToCourse(courseId) {
      this.$router.push({
        name: 'AnswerDetail',
        params: { answerId: answerId }
      });
    },

  },

  created() {
    // this.fetchQuestions('hot'); // 默认获取推荐课程
  },
  mounted() {
    this.$http.get('/api/question/getQuestionList').then((response) => {
      this.questions = response.data.data;
    });
  }
};
</script>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
}

.calendar-cell {
  height: 30px;
  /* 置格子高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.calendar-card {
  border-radius: 17px;
  font-size: 12px;
  margin-bottom: 10px;
  overflow: hidden;
}

/* 调整日历组件的部样式 */
:deep(.el-calendar-table) {
  width: 100%;
}

:deep(.el-calendar-table td) {
  /* 设置单元格高度 */
  height: 40px;
  width: 40px;
}

:deep(.el-calendar-table .el-calendar-day) {
  height: 100%;
  width: 100%;
  padding: 2px 5px;
}

:deep(.el-calendar__header) {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

:deep(.el-calendar-table thead th) {
  padding: 8px;
  font-size: 13px;
  color: #666;
}

.main-page {
  margin: 0 auto;
  max-width: 1200px;
  background-color: #f4f6f8;
  margin-top: 5px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.search-filter {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.question-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.question-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}

.question-icon {
  width: 40px;
  height: 40px;
  object-fit: fill;
}

.question-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.question-title:hover {
  color: #5a67d8;
}

.recommend-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* 添加宽高比容器 */
  position: relative;
  width: 100%;
}

.recommend-header {
  margin-bottom: 15px;
}

.recommend-header h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.carousel-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  padding: 20px;
  font-size: 14px;
}

/* 轮播图标题样式 */
.carousel-item h3 {
  margin: 0;
  line-height: 1.4;
  font-size: 16px;
}

.question-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.solved-count {
  font-size: 14px;
  color: #666;
}

/* 题库卡片样式 */
.question-stats {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.question-history {
  background-color: #f8fafc;
  padding: 10px;
  border-radius: 6px;
  margin: 0;
}

.history-title,
.contest-title {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}

.history-item,
.contest-item {
  margin: 4px;
}

.related-contests {
  margin-top: 10px;
  margin-bottom: 10px;
}

/* 标签样式统一 */
:deep(.el-tag) {
  margin: 2px;
  border-radius: 4px;
}

:deep(.el-tag--small) {
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
}

/* 右侧边栏样式 */
.right-sidebar {
  position: sticky;
  height: fit-content;
}

/* 标题样式统一 */
h3 {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* 响应式布局优化 */
@media screen and (max-width: 1200px) {
  .el-col-8 {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .el-col-8 {
    width: 100%;
  }

  .right-sidebar {
    margin-top: 20px;
  }
}

/* 修改统计信息样式 */
.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.stats-label {
  color: #666;
  font-size: 14px;
}

.stats-value {
  color: #5a67d8;
  font-weight: 600;
  font-size: 14px;
}

/* 轮播图容器样式 */
:deep(.el-carousel) {
  margin: 0;
  padding: 0;
  height: 0;
  padding-top: 56.25%;
  /* 16:9 比例 */
  position: relative;
}

/* 轮播项样式 */
:deep(.el-carousel__container) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

:deep(.el-carousel__item) {
  padding: 0;
  height: 100%;
}

/* 垂直轮播指示器样式 */
:deep(.el-carousel__indicators--vertical) {
  right: 10px;
}

/* 指示器按钮样式 */
:deep(.el-carousel__button) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 1);
}
</style>