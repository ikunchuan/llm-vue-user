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
          <p>竞赛开始时间：{{ competitionDetail.startDate }}</p>
          <p>竞赛结束时间：{{ competitionDetail.endDate }}</p>
          <p>官方报名链接：{{ competitionDetail.competitionUrl }}</p>
          <el-button type="primary" @click="toggleFavorite">收藏竞赛</el-button>
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
          <div class="info-item">竞赛描述：<span class="info-content">{{ competitionDetail.competitionDescription }}</span></div>
          
          <!-- 竞赛主办方 -->
          <div class="info-item">竞赛主办方：<span class="info-content">{{ competitionDetail.competitionOrganizer }}</span></div>
          
          <!-- 截止日期 -->
          <div class="info-item">截止日期：<span class="info-content">{{ competitionDetail.registrationDeadline }}</span></div>
          
          <!-- 竞赛日程安排 -->
          <div class="info-item" id="schedule">竞赛日程安排：<span class="info-content">{{ competitionDetail.competitionSchedule }}</span></div>
          
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
      error: null           // 错误信息
    };
  },
  created() {
    this.fetchCompetitionDetail(); // 在组件创建时获取竞赛详情
  },
  methods: {
    fetchCompetitionDetail() {
      const compId = this.$route.params.compId; // 从路由参数中获取 compId
      this.$http.get(`http://localhost:10086/comdetail/v1/detail/${compId}`)
        .then(response => {
          this.competitionDetail = response.data; // 将获取到的数据赋值给 competitionDetail
          this.loading = false; // 关闭加载状态
        })
        .catch(error => {
          this.error = error.message; // 捕获错误信息并赋值给 error
          this.loading = false; // 关闭加载状态
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
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.steps-container {
  margin-top: 30px;  /* 距离顶部 30px */
  margin-bottom: 20px; /* 距离下面内容 20px */
  width: 80%; /* 控制宽度，确保不会太宽 */
  margin-left: auto; /* 水平居中 */
  margin-right: auto; /* 水平居中 */
}

/* 全局背景色 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #F4F6F8; /* 浅灰背景 */
}

/* 锚点导航样式 */
.anchor-nav {
  margin-top: 20px;
}
.anchor-nav a {
  display: block;
  margin-bottom: 10px;
  color: #42b983; /* Element UI 主题色 */
  text-decoration: none;
}
.anchor-nav a:hover {
  text-decoration: underline;
}

/* 主内容区样式 */
.main {
  display: flex;
  height: calc(100vh - 60px); /* 减去顶部导航栏的高度 */
}

/* 左侧内容区样式 */
.left-panel {
  width: 30%; /* 左侧区域占30%宽度 */
  background-color: #FFFFFF; /* 白色背景 */
  padding: 20px;
  border-right: 1px solid #E0E0E0; /* 分隔线 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 左侧标题样式 */
.left-panel .title {
  height: 50px;
  background-color: #E0E0E0; /* 浅灰背景 */
  border-radius: 5px;
  text-align: center;
  line-height: 50px; /* 垂直居中 */
  font-weight: bold;
  color: #333333; /* 深灰色字体 */
}

/* 左侧内容块样式 */
.left-panel .box {
  flex: 1; /* 自动填充剩余空间 */
  background-color: #F4F6F8; /* 浅灰背景 */
  border: 1px solid #E0E0E0; /* 边框颜色 */
  border-radius: 5px;
  padding: 15px;
}

/* 右侧内容区样式 */
.right-panel {
  flex: 1; /* 右侧内容占剩余宽度 */
  background-color: #FFFFFF; /* 白色背景 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 右侧顶部内容样式 */
.right-panel .header {
  height: 50px;
  background-color: #E0E0E0; /* 浅灰背景 */
  border-radius: 5px;
}

/* 右侧主内容样式 */
.right-panel .content {
  flex: 1; /* 自动填充剩余空间 */
  background-color: #F4F6F8; /* 浅灰背景 */
  border: 1px solid #E0E0E0; /* 边框颜色 */
  border-radius: 5px;
  padding: 15px;
}

/* 信息项样式 */
.info-item {
  margin-bottom: 10px;
  font-size: 16px; /* 调整字体大小 */
  color: #333; /* 调整字体颜色 */
}

.info-content {
  font-size: 14px; /* 调整内容字体大小 */
  color: #666; /* 调整内容字体颜色 */
}
</style>