<template>
  <div class="commu-detail-page">
    <!-- 社区头部 -->
    <div class="community-header">
      <div class="header-content">
        <h2>{{ communityName }}的社区</h2>
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
            <el-tab-pane label="帖子" name="all"></el-tab-pane>
            <el-tab-pane label="社区成员" name="other"></el-tab-pane>
          </el-tabs>

          <!-- 搜索和发帖 -->
          <div class="search-and-post">
            <el-input v-model="searchQuery" placeholder="搜索帖子" prefix-icon="el-icon-search" class="search-input" />
            <el-button type="primary" size="small">发帖</el-button>
          </div>

          <!-- 帖子列表
          <div class="post-list">
            <div v-for="(post, index) in filteredPostsList" :key="index" class="post-item">
              <div class="post-header">
                <el-tag type="info">{{ post.postname }}</el-tag>
                <span class="post-title">{{ post.title }}</span>
              </div>
              <div class="post-info">
                <span>{{ post.author }}</span> ·
                <span>{{ post.time }}</span> · 阅读 {{ post.views }} · 评论
                {{ post.comments }}
              </div>
            </div>
          </div>
        </el-col> -->

          <!-- 帖子列表 -->
          <div class="post-list">
            <div v-for="(post, index) in filteredPostsList" :key="index" class="post-item">
              <div class="post-header">
                <el-tag type="info">{{ post.postname }}</el-tag>
                <span class="post-title">{{ post.postTitle }}</span>
              </div>
              <div class="post-content">{{ post.postContent }}</div>
              <div class="post-info">
                <span>点赞: {{ post.likes }}</span> ·
                <span>评论: {{ post.comments }}</span> ·
                <span>收藏: {{ post.favorites }}</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧积分排行 -->
        <el-col :span="6">
          <el-card class="ranking-card" shadow="hover">
            <h3>积分排行</h3>
            <div class="ranking-list">
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
    const communityId = this.$route.params.communityId;
    console.log("Community ID from URL:", communityId); // 确保能够获取到 ID
    // 使用 communityId 执行其他操作（如获取社区详细信息等）

    this.fetchPosts();
  },
  data() {
    return {
      communityId: this.$route.params.communityId,
      communityName: this.$route.params.communityName,
      activeTab: "all",
      searchQuery: "",
      posts: [], // 修正变量名为 posts
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
    filteredPostsList() {
      // 根据搜索关键字过滤帖子
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
    fetchPosts() {
      console.log('获得的社区ID:', this.communityId)
      if (this.communityId) {
        // 请求后端获取帖子
        axios.post(`v1/posts/search`, {
          communityId: this.communityId,
        })
          .then(response => {
            console.log('获取的帖子列表：', response.data); // 调试输出
            // 假设后端返回的数据结构
            this.posts = response.data.list || response.data;
          })
          .catch(error => {
            console.error("获取帖子失败：", error);
          });
      }
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
