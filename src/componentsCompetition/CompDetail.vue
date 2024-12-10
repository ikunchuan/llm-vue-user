<template>
    <!-- 根模板，包含整个布局 -->
    <div>
    
  
      <!-- 主内容区域 -->
      <div class="main">
        <!-- 左侧内容区 -->
        <aside class="left-panel">
          <!-- 左侧标题 -->
          <div class="title">{{ competitionDetail.competitionName }}</div>
          
          <!-- 左侧内容块 -->
          <div class="box"></div>
          <div class="box"></div>
        </aside>
  
        <!-- 右侧内容区 -->
        <section class="right-panel">
          <!-- 右侧顶部内容 -->
          <div class="header"></div>
          
          <!-- 右侧主内容 -->
          <div class="content">
          
          <p>竞赛名称：{{ competitionDetail.competitionName }}</p>
          <p>竞赛描述：{{ competitionDetail.competitionDescription }}</p>
          <p>竞赛主办方：{{ competitionDetail.competitionOrganizer }}</p>
          <p>竞赛开始时间：{{ competitionDetail.startDate }}</p>
          <p>竞赛结束时间：{{ competitionDetail.endDate }}</p>
          <p>官方报名链接：{{ competitionDetail.competitionUrl }}</p>
          <p>截止日期：{{ competitionDetail.registrationDeadline }}</p>
          <p>竞赛日程安排：{{ competitionDetail.competitionSchedule }}</p>
          <p>竞赛详情：{{ competitionDetail.detail }}</p>
            
            
            

          <!-- 其他竞赛详情信息 -->
      
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default  {
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
    }
  }
};
</script>
  
  <style scoped>
  /* 全局背景色 */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #F4F6F8; /* 浅灰背景 */
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
  }
  </style>
  