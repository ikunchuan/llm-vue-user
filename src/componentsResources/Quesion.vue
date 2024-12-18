<template>
  <el-container class="main-page">
    <el-main>
      <el-row :gutter="20">
        <!-- 左侧主内容区域 -->
        <el-col :span="18">

          <!-- 题库列表 -->
          <div class="content-list">
            <el-row :gutter="20">
              <el-col :span="8" v-for="card in cards" :key="card.id">
                <el-card class="question-card" @click="goToAnswerDetail(card.id)">
                  <div class="question-content">
                    <div class="question-header">
                      <img :src="card.image" :alt="card.title" class="question-icon" />
                      <h3 class="question-title">{{ card.title }}</h3>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <!-- 搜索与分类筛选 -->
          <div class="search-filter bg-white p-3 rounded shadow-sm">
            <h3 class="section-title">推荐题目</h3>
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
              <el-input v-model="searchName" placeholder="搜索题目关键字" class="mt-3" prefix-icon="el-icon-search" />
              <el-tab-pane label="最热" name="hot">
                <!-- 热门内容 -->
              </el-tab-pane>
              <el-tab-pane label="推荐" name="recommend">
                <!-- 推荐内容 -->
              </el-tab-pane>
              <el-tab-pane label="最新" name="latest">
                <!-- 最新内容 -->
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 推荐题目列表 -->
          <div class="recommended-list">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in recommendedQuestions" :key="index">
                <el-card class="recommended-card" shadow="hover">
                  <div class="recommended-content">
                    <div class="recommended-header">
                      <img :src="item.image" :alt="item.title" class="question-icon" />
                      <h4 class="recommended-title">{{ item.title }}</h4>
                    </div>
                    <div class="recommended-info">
                      <span class="difficulty">难度: {{ item.difficulty }}</span>
                      <span class="solved-count">已解答: {{ item.solvedCount }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </el-col>

        <!-- 右侧推荐区域 -->
        <el-col :span="6">
          <!-- 热门题目推荐 -->
          <el-card shadow="hover" class="recommend-card">
            <div class="recommend-header">
              <h3>热门题目</h3>
            </div>
            <el-carousel height="200px" direction="vertical" :autoplay="true">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="carousel-item">热门题目 {{ item }}</h3>
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
      activeTab: 'hot',
      searchName: '',
      categoryInfo: [],
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
      ],
    }
  },
  created() {
    // 获取题目分类信息
    this.$http.get('/cat/v1/allSubcategories')
      .then(response => {
        console.log('获取类别成功:', response.data);
        this.categoryInfo = response.data;
      })
      .catch(error => {
        console.error('获取类别失败:', error);
      });
  },
  methods: {
    handleTabClick(tab) {
      // 处理标签页切换
      console.log('切换到:', tab.props.name);
    },
    goToAnswerDetail(answerId) {
      this.$router.push({ name: 'AnswerDetail', params: { answerId: answerId } });
    },

  },
};
</script>

<style scoped>
.main-page {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #f4f6f8;
  margin-top: 20px;
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
}

.question-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.question-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
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
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  color: #333;
  background-color: #f0f4ff;
  border-radius: 8px;
}

/* Element Plus 组件样式覆盖 */
:deep(.el-tabs__item) {
  font-size: 16px;
}

:deep(.el-input__inner) {
  border-radius: 20px;
}

:deep(.el-carousel__item) {
  border-radius: 8px;
}
</style>