<template>
    <div class="layout-container">
      <!-- 主体内容 -->
      <div class="main-content">
        <el-row :gutter="20">
          <!-- 左侧区域 -->
          <el-col :span="6">
            <!-- 用户信息模块 -->
            <el-card class="user-info-card" shadow="hover">
              <div class="user-info">
                <el-avatar src="https://via.placeholder.com/64" size="large" />
                <h3>每天都要敲代码</h3>
                <p>Java领域新星创作者</p>
                <div class="user-stats">
                  <el-row>
                    <el-col :span="8">
                      <p>232</p>
                      <p>原创</p>
                    </el-col>
                    <el-col :span="8">
                      <p>1061</p>
                      <p>粉丝</p>
                    </el-col>
                    <el-col :span="8">
                      <p>89万</p>
                      <p>获赞</p>
                    </el-col>
                  </el-row>
                </div>
                <el-button type="primary" block>加入社区</el-button>
              </div>
            </el-card>
  
            <!-- 最新评论模块 -->
            <el-card class="recent-comments-card" shadow="hover">
              <h4>最新评论</h4>
              <div v-for="(comment, index) in comments" :key="index" class="comment-item">
                <p class="comment-title">{{ comment.title }}</p>
                <p class="comment-text">{{ comment.text }}</p>
              </div>
            </el-card>
  
            <!-- 社区统计模块 -->
            <el-card class="community-stats-card" shadow="hover">
              <h4>社区统计</h4>
              <div class="stats">
                <p>172,398 会员数</p>
                <p>1,875 讨论数</p>
              </div>
            </el-card>
          </el-col>
  
          <!-- 右侧主要内容 -->
          <el-col :span="18">
            <el-card class="main-content-card" shadow="hover">
              <h3>如何使用营销计划模板</h3>
              <p>步骤1：确定您的关键参与者...</p>
              <p>步骤2：描述您的目标和成功指标...</p>
              <p>步骤3：描述您的目标市场...</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommunityPage",
    data() {
      return {
        comments: [
          { title: "JavaSE项目", text: "出不来的弹框为什么！家人们！" },
          { title: "ONLYOFFICE", text: "公司内部使用的加密插件是收费的吗？" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* 页面整体布局 */
  .layout-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f6f8;
    border-radius: 8px;
  }
  
  /* 主体内容布局 */
  .main-content {
    margin-top: 20px;
  }
  
  /* 用户信息模块 */
  .user-info-card {
    margin-bottom: 20px;
    text-align: center;
  }
  .user-info h3 {
    margin: 10px 0;
  }
  .user-stats {
    margin: 20px 0;
  }
  .user-stats p {
    margin: 0;
  }
  
  /* 最新评论模块 */
  .recent-comments-card {
    margin-bottom: 20px;
  }
  .comment-item {
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  .comment-item:last-child {
    border-bottom: none;
  }
  
  /* 社区统计模块 */
  .community-stats-card {
    text-align: center;
  }
  
  /* 右侧主要内容 */
  .main-content-card {
    padding: 20px;
  }
  </style>
  