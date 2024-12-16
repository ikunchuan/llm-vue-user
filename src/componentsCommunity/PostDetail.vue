<template>
  <div class="layout-container">
    <!-- 主体内容 -->
    <div class="main-content">
      <el-row :gutter="20">
        <!-- 左侧区域 -->
        <el-col :span="18">
          <!-- 帖子信息 -->
          <el-card class="post-detail-card" shadow="hover">
            <h2 class="post-title">{{ post.postTitle }}</h2>
            <div class="post-meta">
              <span>作者: {{ post.authorName }}</span>
              <span>社区: {{ post.communityName }}</span>
              <span>发布时间: {{ post.createdTime }}</span>
            </div>
            <div class="post-content" v-html="post.postContent"></div>
          </el-card>
        </el-col>

        <!-- 右侧区域 -->
        <el-col :span="6">
          <!-- 作者信息模块 -->
          <el-card class="user-info-card" shadow="hover">
            <div class="user-info">
              <el-avatar :src="author.avatar" size="large" />
              <h3 class="user-name">{{ author.userName }}</h3>
              <p class="user-bio">{{ author.userBio }}</p>
            </div>
          </el-card>

          <!-- 社区信息模块 -->
          <el-card class="community-info-card" shadow="hover">
            <h4 class="community-name">{{ community.communityName }}</h4>
            <p class="community-desc">{{ community.communityDescription }}</p>
          </el-card>

          <!-- 最新评论模块 -->
          <el-card class="recent-comments-card" shadow="hover">
            <h4>最新评论</h4>
            <div v-for="comment in comments" :key="comment.commentId" class="comment-item">
              <p class="comment-content">{{ comment.commentContent }}</p>
              <div class="comment-meta">
                <span class="comment-author">- {{ comment.authorName }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostDetail",
  data() {
    return {
      post: {},
      author: {},
      community: {},
      comments: [],
    };
  },
  created() {
    this.fetchPostDetails();
    this.fetchComments();
  },
  methods: {
    fetchPostDetails() {
      const postId = this.$route.params.postId;
      axios.get(`/v1/posts/post/${postId}`)
        .then(response => {
          console.log('拿到的帖子详情:', response.data);
          console.log('帖子数据:', this.post);
          console.log('用户ID:', this.post.userId);
          console.log('社区ID:', this.post.communityId);

          this.post = response.data;
          // 确保在帖子详情拿到后，再获取作者和社区信息
          this.fetchAuthorDetails(this.post.userId);
          this.fetchCommunityDetails(this.post.communityId);
        })
        .catch(error => {
          console.error('获取帖子详情失败:', error);
        });
    },
    fetchAuthorDetails(userId) {
      console.log('拿到的userId:', userId);
      axios.get(`/uis/v1/ui/${userId}`)
        .then(response => {
          console.log('拿到的作者信息:', response.data);
          this.author = response.data;
        })
        .catch(error => {
          console.error('获取作者信息失败:', error);
        });
    },
    fetchCommunityDetails(communityId) {
      console.log('拿到的社区ID:', communityId);

      axios.get(`/v1/cmns/cmn/${communityId}`)
        .then(response => {
          console.log('拿到的社区信息:', response.data);
          this.community = response.data;
        })
        .catch(error => {
          console.error('获取社区信息失败:', error);
        });
    },
    fetchComments() {
      const postId = this.$route.params.postId;
      axios.get(`/v1/posts/post/comment/${postId}`)
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('获取评论失败:', error);
        });
    },
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

/* 帖子信息模块 */
.post-detail-card {
  margin-bottom: 20px;
}

.post-title {
  margin: 0 0 16px;
  font-size: 24px;
}

.post-meta {
  margin-bottom: 16px;
  color: #666;
}

.post-content {
  margin-bottom: 16px;
}

/* 用户信息模块 */
.user-info-card {
  margin-bottom: 20px;
  text-align: center;
}

.user-name {
  margin: 10px 0;
}

.user-bio {
  color: #666;
}

/* 社区信息模块 */
.community-info-card {
  margin-bottom: 20px;
}

.community-name {
  margin: 0 0 8px;
  font-size: 18px;
}

.community-desc {
  color: #666;
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

.comment-content {
  margin-bottom: 5px;
}

.comment-meta {
  color: #666;
  font-size: 12px;
}

.comment-author {
  margin-left: 5px;
}
</style>