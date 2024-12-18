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
              <el-col :span="8" v-for="(card, index) in cards" :key="index" v-loading="loading">
                <el-card class="question-card" @click="goToAnswerDetail(card.catId)">
                  <div class="question-content">
                    <div class="question-header">
                      <img :src="card.icon" :alt="card.catName" class="question-icon" />
                      <h3 class="question-title">{{ card.catName }}</h3>
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
              <el-carousel-item v-for="(item, index) in cards" :key="index">
                <el-tooltip :content="item.relatedContests[0]?.name || '暂无名称'" placement="top" effect="light">
                  <div class="carousel-item" v-if="item.relatedContests && item.relatedContests.length"
                    @click="goToComp(item.relatedContests[0].compId)">

                    <img style=" height: 150px;" :src="getImageUrl(item.relatedContests[0]?.url)"
                      :alt="item.relatedContests[0]?.name || '竞赛图片'" />
                  </div>
                  <div class="carousel-item" v-else>
                    <el-empty description="暂无相关竞赛" />
                  </div>
                  <div class="image-overlay">
                    <span class="image-title">{{ item.relatedContests[0]?.name }}</span>
                  </div>
                </el-tooltip>
              </el-carousel-item>
            </el-carousel>
          </el-card>

          <h3>你可能感兴趣的课程</h3>
          <!-- 热门题目推荐 -->
          <el-card shadow="hover" class="recommend-card">
            <el-carousel :interval="5000" :autoplay="true">
              <el-carousel-item v-for="(item, index) in cards" :key="index">
                <el-tooltip :content="item.relatedCourses[0]?.name || '暂无名称'" placement="top" effect="light">
                  <div class="carousel-item" v-if="item.relatedCourses && item.relatedCourses.length"
                    @click="goToCourse(item.relatedCourses[1].courseId)">
                    <img style=" height: 150px;" :src="getImageUrl(item.relatedCourses[0]?.url)"
                      :alt="item.relatedCourses[0]?.name || '课程图片'" />
                  </div>
                  <div class="image-overlay">
                    <span class="image-title">{{ item.relatedCourses[0]?.name }}</span>
                  </div>
                </el-tooltip>
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
      date: new Date(), //获取日期

      categoryInfo: [],//所有有题目的类别
      compInfo: [],  //所有竞赛
      questionInfo: [], // 所有题目
      courseInfo: [], //所有课程
      ansRecInfo: [],//答题记录
      icons: [],

      cards: [
        {
          catId: "",//类别id
          catName: "", //类别
          icon: "", //图标
          totalCount: 0,  // 总题目数
          // finishedCount: 0,  // 已完成数量
          // // solvedCount: 0,  // 解答人数
          viewCount: 0,  // 浏览次数 

          relatedContests: [],// 相关竞赛
          relatedCourses: [], //相关课程
        }
      ],


    }
  },
  computed: {
  },

  methods: {
    goToAnswerDetail(answerId) {
      this.$router.push({
        name: 'AnswerDetail',
        params: { answerId: answerId }
      });
    },

    goToComp(compId) {
      this.$router.push({
        name: 'CompDetail',
        params: { compId: compId }
      });
    },

    goToCourse(courseId) {
      this.$router.push({
        name: 'CourseDetail',
        params: { courseId: courseId }
      });
    },

    getImageUrl(url) {
      if (!url) return ''; // 返回默认图片路径或空字符串
      return `http://localhost:10086/images/upload/${url}`;
    },

    // 创建一个异步函数来处理所有数据加载
    async loadAllData() {
      this.loading = true;
      try {
        const userId = sessionStorage.getItem("userId");
        // 并行获取所有数据
        const [categoryRes, courseRes, compRes, answerRes] = await Promise.all([
          this.$http.get('/cat/v1/qstCat'),
          this.$http.get('/crs/v1'),
          this.$http.get('/comp/v1/compe'),
          this.$http.get(`/ans/v1/rec/${userId}`),
        ]);

        this.categoryInfo = categoryRes.data; console.log(this.categoryInfo);
        this.courseInfo = courseRes.data; console.log(this.courseInfo);
        this.compInfo = compRes.data; console.log(this.compInfo);
        this.ansRecInfo = answerRes.data; console.log(this.ansRecInfo);

        // 创建图片映射
        const imageMapping = {
          '程序设计': '6',
          '网络安全': '7',
          '人工智能与大数据': '8',
          '数据挖掘与分析': '9',
          '数学知识': '10',
          '数学建模': '11',
          '语言表达': '12',
          '英语应用': '13',
          '跨文化交流': '14'
        };

        this.cards = await Promise.all(this.categoryInfo.map(async category => {
          // 并行获取题目数量和答题记录
          const questionsRes = await this.$http.get(`/qst/v1/qstByParentId?parentId=${category.categoryId}`);

          const questions = questionsRes.data || [];
          const questionCount = questions.length;

          // 获取该类别下已完成的题目数量
          // 通过题目ID匹配答题记录
          const questionIds = questions.map(q => q.questionId); // 获取该类别所有题目的ID
          const finishedCount = this.ansRecInfo.filter(record =>
            questionIds.includes(record.questionId)
          ).length;

          // 找到与当前类别相关的竞赛，并提取需要的字段
          const relatedContests = this.compInfo
            .filter(comp => comp.categoryId === category.categoryId)
            .map(comp => ({
              compId: comp.competitionId, // 竞赛ID
              name: comp.competitionName, // 竞赛名称
              url: comp.competitionImgUrl || '' // 竞赛图片URL
            }));

          // 找到与当前类别相关的课程，并提取需要的字段
          const relatedCourses = this.courseInfo
            .filter(course => course.categoryId === category.categoryId)
            .map(course => ({
              courseId: course.courseId, // 课程ID
              name: course.courseName, // 课程名称
              url: course.courseImgUrl || '' // 课程图片URL
            }));

          // 根据类别名称获取对应的图片编号
          const imageNumber = imageMapping[category.categoryName] || '6';

          return {
            catId: category.categoryId,
            catName: category.categoryName,
            icon: `src/assets/img/${imageNumber}.png`,
            title: category.catName,
            totalCount: questionCount, // 使用获取到的题目数量
            finishedCount: finishedCount,// 使用计算得到的已完成题目数量
            // viewCount: category.viewCount || 0,
            relatedContests: relatedContests.slice(0, 2), // 只取前2个相关竞赛,
            relatedCourses: relatedCourses.slice(0, 2) // 只取前2个相关课程
          };
        }));

        console.log('cards', this.cards);

      } catch (error) {
        console.error('数据加载失败：', error);
        this.$message.error('数据加载失败，请稍后重试');
      } finally {
        this.loading = false;
      }

    },

  },

  created() { //先白屏获取数据，再加载DOM
  },

  mounted() { //先加载DOM，再获取数据
    //加载所有
    this.loadAllData();

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