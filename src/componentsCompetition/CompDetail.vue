<template>
  <!-- 根模板，包含整个布局 -->
  <div class="container">

    <!-- 主内容区域 -->
    <div class="main">
      <!-- 左侧内容区 -->
      <aside class="left-panel">
        <!-- 左侧标题 -->
        <div class="title">{{ competitionDetail.competitionName }}</div>
        <!-- 左侧内容块 -->
        <div class="box">
          <p>竞赛开始时间：{{ formatDate(competitionDetail.startDate) }}</p>
          <p>竞赛结束时间：{{ formatDate(competitionDetail.endDate) }}</p>
          <p>官方报名链接：{{ competitionDetail.competitionUrl }}</p>
          <el-button type="primary" @click="toggleFavorite">收藏竞赛</el-button>
          <el-button type="primary" @click="goToCourseDetail">课程推荐</el-button>
        </div>
        <div class="box">
          <div class="anchor-nav">
            <a href="#" @click.prevent="scrollTo('schedule')">竞赛日程安排</a>
            <a href="#" @click.prevent="scrollTo('details')">竞赛详情</a>
            <!-- 根据需要添加更多锚点 -->
          </div>
        </div>
      </aside>

      <!-- 右侧内容区 -->
      <section class="right-panel">
        <!-- 右侧顶部内容 -->
        <div class="header"></div>

        <!-- 右侧主内容 -->
        <div class="content">
          <div class="steps-container">
            <el-steps style="max-width: 600px" :active="1">
              <el-step title="未开始" description="摩拳擦掌" />
              <el-step title="进行中" description="火热报名中" />
              <el-step title="已结束" description="来年再战" />
            </el-steps>
          </div>

          <!-- 竞赛名称 -->
          <div class="info-item">竞赛名称：<span class="info-content">{{ competitionDetail.competitionName }}</span></div>

          <!-- 竞赛描述 -->
          <div class="info-item">竞赛描述：<span class="info-content">{{ competitionDetail.competitionDescription }}</span>
          </div>

          <!-- 竞赛主办方 -->
          <div class="info-item">竞赛主办方：<span class="info-content">{{ competitionDetail.competitionOrganizer }}</span>
          </div>

          <!-- 截止日期 -->
          <div class="info-item">截止日期：<span class="info-content">{{ formatDate(competitionDetail.registrationDeadline)
              }}</span>
          </div>

          <!-- 竞赛日程安排 -->
          <div class="info-item" id="schedule">竞赛日程安排：<span class="info-content">{{
            competitionDetail.competitionSchedule }}</span></div>

          <!-- 竞赛详情 -->
          <div class="info-item" id="details">
            <div v-html="competitionDetail.detail"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompDetail',
  data() {
    return {
      competitionDetail: {}, // 存储竞赛详情数据
      loading: true,        // 加载状态
      error: null,           // 错误信息
      headerImageUrl: '',// 后端传入的图片URL
      courseMapping: {
        '23': 1,  // 假设竞赛ID 23 对应 课程ID 1
        '24': 2,  // 假设竞赛ID 24 对应 课程ID 2
        // 可以继续添加更多映射
      },
    };
  },
  created() {
    this.fetchCompetitionDetail(); // 在组件创建时获取竞赛详情
  },
  methods: {
    //跳转课程详情页
    goToCourseDetail() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMapping[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error('没有找到对应的课程推荐');
      }
    },
    // 获取竞赛详情
    fetchCompetitionDetail() {
      const compId = this.$route.params.compId;
      this.$http.get(`http://localhost:10086/comdetail/v1/detail/${compId}`)
        .then(response => {
          this.competitionDetail = response.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    scrollTo(anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    toggleFavorite() {
      // 你的收藏逻辑代码
    },
    // 时间格式化方法
    formatDate(date) {
      if (!date) return '-';
      const d = new Date(date);
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

body {
  margin: 0;
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #F4F6F8;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2em;
  color: #c4c1e0;
}

.header p {
  color: #666;
}

.main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 左侧内容区样式 */
.left-panel {
  flex: 0 0 35%;
  /* 不增长不缩小，基础宽度为30% */
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  /* 增加内边距 */
  box-sizing: border-box;
  /* 确保padding和border包含在宽度内 */
}

/* 右侧内容区样式 */
.right-panel {
  flex: 1;
  /* 占据剩余空间 */
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  /* 增加内边距 */
  box-sizing: border-box;
  /* 确保padding和border包含在宽度内 */
}

/* 右侧主内容样式 */
.content {
  display: flex;
  /* 启用 Flexbox 布局 */
  flex-direction: column;
  /* 子元素垂直排列 */
  align-items: flex-start;
  /* 默认靠左对齐所有子元素 */
  padding: 20px;
  /* 内边距 */
}

/* 步骤容器样式，确保它居中 */
.steps-container {
  max-width: 600px;
  /* 最大宽度 */
  width: 100%;
  /* 充满父容器宽度 */
  margin: 20px auto;
  /* 上下边距，左右自动，实现水平居中 */
}

/* 信息项样式，确保它们靠左对齐 */
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
  /* 禁止换行 */
}

.info-content {
  font-size: 14px;
  color: #666;
  white-space: normal;
  /* 允许内容换行，但不影响标题 */
}

/* 特定信息项的样式，如果需要特殊对齐 */
.special-item {
  text-align: center;
  /* 居中对齐 */
}

.left-panel .title,
.right-panel .header {
  background-color: #c4c1e0;
  color: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.box {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.anchor-nav a {
  display: block;
  padding: 10px;
  color: #7c73e6;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
}

.anchor-nav a:hover {
  background-color: #e0e0e0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.info-content {
  font-size: 1em;
  color: #666;
}

.el-button {
  background-color: #7c73e6;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #ffe9e3;
}
</style>