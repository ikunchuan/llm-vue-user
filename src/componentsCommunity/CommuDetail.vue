<template>
  <div class="commu-detail-page">
    <!-- 社区头部 -->
    <div class="community-header">
      <div class="header-content">
        <!-- 显示社区名称 -->
        <h2>{{ communityName }}的社区</h2>
        <p>
          <!--这里要查询，显示一下社区的category作为标签，还有社区的创建人-->
        </p>
        <div class="header-buttons">
          <el-button type="primary" size="small" @click="goToPostCreat()">发帖</el-button>
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
            <el-tab-pane label="帖子" name="all"></el-tab-pane>
            <el-tab-pane label="社区成员" name="other"></el-tab-pane>
          </el-tabs>

          <!-- 搜索和发帖 -->
          <div class="search-and-post">
            <!-- 搜索框，用于搜索帖子 -->
            <el-input v-model="searchQuery" placeholder="搜索帖子关键字" prefix-icon="el-icon-search" class="search-input" />
          </div>

          <!-- 帖子列表 -->
          <div class="post-list">
            <div v-for="(post, index) in filteredPostsList" :key="index" class="post-item">
              <div class="post-header">
                <el-tag type="info">{{ post.tag }}</el-tag>
                <span class="post-title">{{ post.postTitle }}</span>
              </div>
              <div class="post-content">{{ post.postContent }}</div>
              <!-- <div class="post-info">
                <span>点赞: {{ post.likes }}</span> ·
                <span>评论: {{ post.comments }}</span> ·
                <span>收藏: {{ post.favorites }}</span>
              </div> -->
            </div>
          </div>
        </el-col>

        <!-- 右侧积分排行 -->
        <el-col :span="6">
          <el-card class="ranking-card" shadow="hover">
            <h3>积分排行</h3>
            <div class="ranking-list">
              <!-- 遍历积分排行列表 -->
              <div class="ranking-item" v-for="(user, index) in rankings" :key="index">
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
import axios from 'axios';

export default {
  name: "CommuDetail",
  created() {
    // 组件创建时获取帖子信息
    this.fetchPosts();
  },
  data() {
    return {
      // 社区ID和名称从路由参数中获取
      communityId: this.$route.params.communityId,
      communityName: this.$route.params.communityName,
      activeTab: "all",
      searchQuery: "", // 搜索关键词
      posts: [], // 帖子列表
      rankings: [ // 积分排行列表
        // ...用户数据
      ],
    };
  },
  computed: {
    // 根据搜索关键词过滤帖子列表
    filteredPostsList() {
      if (!this.searchQuery) return this.posts;
      return this.posts.filter((post) =>
        post.postTitle.includes(this.searchQuery) || post.postContent.includes(this.searchQuery)
      );
    },
  },

  methods: {
    // 获取帖子信息的方法
    fetchPosts() {
      if (this.communityName) {
// 请求后端获取特定社区的帖子
        axios.post(`v1/posts/search`, {
          communityName: this.communityName,
          query: this.searchQuery, // 搜索关键词
        })
          .then(response => {
            console.log("获取到的帖子数据：", response.data);
            // 确保后端返回的数据结构中包含 list，并且只包含特定社区的帖子
            this.posts = response.data.list || response.data;
          })
          .catch(error => {
            console.error("获取帖子失败：", error);
          });
      }
    },
    goToPostCreat() {
      // 跳转到帖子详情页
      this.$router.push({
        name: 'PostCreat',
      });
    }
  }
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
  align-items: center;
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
