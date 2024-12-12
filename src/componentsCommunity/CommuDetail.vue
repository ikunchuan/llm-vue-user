<template>
    <div class="commu-detail-page">
      <!-- 社区头部 -->
      <div class="community-header">
        <div class="header-content">
          <h2>{{ userName }}的社区</h2>
          <p>
            版主:
            <el-avatar src="https://via.placeholder.com/32" size="small" />
            精品案例、教程、培训活动
          </p>
          <div class="header-buttons">
            <el-button type="primary" size="small">订阅</el-button>
            <el-button type="success" size="small">+关注</el-button>
          </div>
        </div>
      </div>
  
      <!-- 主体区域 -->
      <div class="main-content">
        <el-row :gutter="20">
          <!-- 左侧帖子区域 -->
          <el-col :span="18">
            <!-- 论坛分类 Tabs -->
            <el-tabs v-model="activeTab">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane label="经验分享" name="experience"></el-tab-pane>
              <el-tab-pane label="问题讨论" name="discussion"></el-tab-pane>
              <el-tab-pane label="其他" name="other"></el-tab-pane>
            </el-tabs>
  
            <!-- 搜索和发帖 -->
            <div class="search-and-post">
              <el-input
                v-model="searchQuery"
                placeholder="搜索帖子"
                prefix-icon="el-icon-search"
                class="search-input"
              />
              <el-button type="primary" size="small">发帖</el-button>
            </div>
  
            <!-- 帖子列表 -->
            <div class="post-list">
              <div
                v-for="(post, index) in filteredPosts"
                :key="index"
                class="post-item"
              >
                <div class="post-header">
                  <el-tag type="info">{{ post.tag }}</el-tag>
                  <span class="post-title">{{ post.title }}</span>
                </div>
                <div class="post-info">
                  <span>{{ post.author }}</span> ·
                  <span>{{ post.time }}</span> · 阅读 {{ post.views }} · 评论
                  {{ post.comments }}
                </div>
              </div>
            </div>
          </el-col>
  
          <!-- 右侧积分排行 -->
          <el-col :span="6">
            <el-card class="ranking-card" shadow="hover">
              <h3>积分排行</h3>
              <div class="ranking-list">
                <div
                  class="ranking-item"
                  v-for="(user, index) in rankings"
                  :key="index"
                >
                  <span class="ranking">{{ index + 1 }}</span>
                  <el-avatar :src="user.avatar" size="small" />
                  <span class="username">{{ user.name }}</span>
                  <span class="score">{{ user.score }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommuDetail",
    data() {
      return {
        userName: this.$route.params.userName || "社区",
        activeTab: "all",
        searchQuery: "",
        posts: [
          {
            id: 1,
            title: "【讨论】构建基础数据集",
            author: "小明",
            time: "4个月前",
            views: 101,
            comments: 15,
            tag: "问题讨论",
          },
          {
            id: 2,
            title: "基于SAT算法的数据分析探讨",
            author: "小王",
            time: "7个月前",
            views: 200,
            comments: 20,
            tag: "问题讨论",
          },
          {
            id: 3,
            title: "三维点云数据重建案例",
            author: "小张",
            time: "2 小时前",
            views: 45,
            comments: 10,
            tag: "经验分享",
          },
        ],
        rankings: [
          {
            name: "傲气的感慨",
            avatar: "https://via.placeholder.com/32",
            score: "4,577",
          },
          {
            name: "隔壁脸袋",
            avatar: "https://via.placeholder.com/32",
            score: "3,767",
          },
          {
            name: "呆呆敲代码的小Y",
            avatar: "https://via.placeholder.com/32",
            score: "3,626",
          },
          {
            name: "晓晓晓晓晓晓晓",
            avatar: "https://via.placeholder.com/32",
            score: "2,637",
          },
          {
            name: "无水先生",
            avatar: "https://via.placeholder.com/32",
            score: "2,500",
          },
        ],
      };
    },
    computed: {
      filteredPosts() {
        if (!this.searchQuery) return this.posts;
        return this.posts.filter((post) =>
          post.title.includes(this.searchQuery)
        );
      },
    },
    methods: {
      openPost(id) {
        console.log(`查看帖子 ID: ${id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .commu-detail-page {
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #f4f6f8;
  }
  
  /* 社区头部 */
  .community-header {
    background-color: #1e88e5;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* 搜索和发帖 */
  .search-and-post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  .search-input {
    width: 70%;
  }
  
  /* 帖子列表 */
  .post-list {
    margin-top: 20px;
  }
  .post-item {
    background: white;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .post-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .post-title {
    font-size: 16px;
    font-weight: bold;
  }
  .post-info {
    font-size: 12px;
    color: #888;
  }
  
  /* 积分排行 */
  .ranking-card {
    padding: 10px;
  }
  .ranking-list {
    margin-top: 10px;
  }
  .ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  .ranking-item:last-child {
    border-bottom: none;
  }
  .ranking {
    font-weight: bold;
    color: #1e88e5;
  }
  .username {
    flex: 1;
    margin-left: 10px;
  }
  .score {
    font-weight: bold;
    color: #333;
  }
  </style>
  