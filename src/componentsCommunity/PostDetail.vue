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
            <!-- 点赞、收藏、浏览量 -->
            <div class="post-stats">
              <span><i class="el-icon-thumb"></i> {{ post.likeCount || 0 }} 点赞</span>
              <span><i class="el-icon-star-on"></i> {{ post.favoriteCount || 0 }} 收藏</span>
              <span><i class="el-icon-view"></i> {{ post.commentCount || 0 }} 评论</span>
              <span>作者: {{ post.authorName }}</span>
              <span>社区: {{ post.communityName }}</span>
              <span>发布时间: {{ formatDate(post.createdTime) }}</span>
            </div>
            <div class="post-content" v-html="post.postContent"></div>
          </el-card>

          <!-- 评论部分 -->
          <div class="comment-section">
            <h3 class="section-title">评论区</h3>

            <!-- 排序选项 -->
            <div class="comment-actions">
              <el-select v-model="sortOrder" placeholder="排序方式" size="mini" @change="sortComments">
                <el-option label="按时间正序" value="asc"></el-option>
                <el-option label="按时间倒序" value="desc"></el-option>
              </el-select>
            </div>

            <!-- 添加评论 -->
            <div class="add-comment">
              <el-avatar src="https://via.placeholder.com/40" size="medium" class="user-avatar" />
              <el-input type="textarea" placeholder="写下你的评论..." v-model="newComment" autosize class="comment-input"
                :maxlength="100"></el-input>
              <el-button type="primary" size="small" @click="addComment"
                :disabled="newComment.length === 0 || newComment.length > 100">
                提交评论
              </el-button>
            </div>

            <!-- 评论列表 -->
            <div v-for="comment in visibleComments" :key="comment.commentId" class="comment-card">
              <el-avatar :src="comment.avatar || 'https://via.placeholder.com/40'" size="small"
                class="comment-avatar" />
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.userName }}</span>
                  <span class="comment-time">{{ formatDate(comment.createdTime) }}</span>
                </div>
                <p>{{ comment.commentContent }}</p>
              </div>
            </div>
            <div v-if="comments.length > displayedComments" class="more-comments">
              <el-button type="text" @click="displayAllComments">显示更多</el-button>
            </div>

          </div>


        </el-col>

        <!-- 右侧区域 -->
        <el-col :span="6">
          <!-- 作者信息模块 -->
          <el-card class="user-info-card" shadow="hover">
            <div class="user-info">
              <el-avatar :src="author.avatar" size="large" />
              <h3 class="user-name">{{ author.userName }}</h3>
              <p class="user-local">{{ author.userLocal }}</p>
              <p class="user-bio">{{ author.userBio || "暂无简介" }}</p>
              <div class="author-stats">
                <p>粉丝数量: <strong>{{ author.fansCount || 0 }}</strong></p>
                <p>发帖数量: <strong>{{ author.postCount || 0 }}</strong></p>
              </div>
              <el-button type="success" size="small" @click="followAuthor">关注作者</el-button>
            </div>
          </el-card>

          <!-- 社区信息模块 -->
          <el-card class="community-info-card" shadow="hover">
            <h4 class="community-name">{{ community.communityName }}</h4>
            <p class="community-desc">{{ community.communityDescription || "暂无描述" }}</p>
            <div class="community-stats">
              <p>帖子数量: <strong>{{ community.postCount || 0 }}</strong></p>
              <p>成员数量: <strong>{{ community.memberCount || 0 }}</strong></p>
            </div>
            <el-button type="primary" size="small" @click="joinCommunity">
              {{ isMember ? "已加入社区" : "加入社区" }}
            </el-button>
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
      post: {
        postId: "",
        postTitle: "",
        postContent: "",
        likeCount: 0,
        favoriteCount: 0,
        commentCount: 0,
        authorName: "",
        communityName: "",
        createdTime: "",
      },
      author: {},
      community: {},
      isMember: false, // 是否已加入社区

      // 评论参数
      comments: [], // 评论列表
      newComment: "", // 新评论内容
      sortOrder: "desc", // 排序方式（默认倒序）
      displayedComments: 3, // 控制显示的评论数量
    };
  },
  created() {
    this.fetchPostDetails();
    this.fetchComments();
  },

  computed: {
    sortedComments() {
      const sorted = this.comments.slice().sort((a, b) => {
        const timeA = new Date(a.createdTime).getTime();
        const timeB = new Date(b.createdTime).getTime();
        return this.sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
      console.log("排序后的评论:", sorted);
      return sorted;
    },
    visibleComments() {
      const visible = this.sortedComments.slice(0, this.displayedComments);
      console.log("当前显示的评论:", visible);
      return visible;
    },
  },
  methods: {
    fetchPostDetails() {
      const postId = this.$route.params.postId;
      console.log("帖子ID:", postId);
      axios.get(`/v1/posts/post/${postId}`)
        .then((response) => {
          console.log("帖子详情:", response.data);
          this.post = response.data;
          this.fetchAuthorDetails(this.post.userId);
          this.fetchCommunityDetails(this.post.communityId);
          this.getPostCounts(postId); // 获取帖子统计信息
        })
        .catch((error) => {
          console.error("获取帖子详情失败:", error);
        });
    },
    // 获取帖子的点赞数、评论数和收藏数
    getPostCounts(postId) {
      axios.get(`v1/posts/post/allcount/${postId}`)
        .then(response => {
          console.log('帖子统计信息:', response.data);
          if (response.data.length !== 0) {
            this.post.likeCount = response.data.likeCount;
            this.post.commentCount = response.data.commentCount;
            this.post.favoriteCount = response.data.favoriteCount;
          } else {
            console.error('获取帖子统计信息失败:', response.data.message);
          }
        })
        .catch(error => {
          console.error('获取帖子统计信息失败:', error);
        });
    },


    fetchAuthorDetails(userId) {
      axios.get(`/uis/v1/ui/${userId}`)
        .then((response) => {
          this.author = response.data;
        })
        .catch((error) => {
          console.error("获取作者信息失败:", error);
        });
    },
    fetchCommunityDetails(communityId) {
      axios.get(`/v1/cmns/cmn/${communityId}`)
        .then((response) => {
          this.community = response.data;
          this.isMember = this.community.isMember || false;
        })
        .catch((error) => {
          console.error("获取社区信息失败:", error);
        });
    },
    fetchComments() {
      const postId = this.$route.params.postId;
      axios.get(`/v1/posts/post/comment/${postId}`)
        .then((response) => {
          console.log("查询到的评论结果", response.data);
          this.comments = response.data.map((comment) => ({
            ...comment,
            avatar: comment.avatar || null,
            createdTime: comment.createdTime,
          }));
          console.log("评论列表", this.comments);
        })
        .catch((error) => {
          console.error("获取评论失败:", error);
        });
    },
    checkCommentLength() {
      if (this.newComment.length > 100) {
        this.newComment = this.newComment.substring(0, 100);
        this.$message.warning("评论内容不能超过100字");
      }
    },
    addComment() {
      // 从sessionStorage中获取用户ID
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        this.$message.error('用户未登录或用户ID不存在');
        return;
      }

      // 获取帖子ID，这里假设帖子ID是通过路由参数传递的
      const postId = this.$route.params.postId;

      // 获取评论内容
      const commentContent = this.newComment.trim();

      // 检查评论内容是否为空
      if (!commentContent) {
        this.$message.warning('评论内容不能为空');
        return;
      }

      // 调用后端接口发送评论
      axios.post('/post/usercomment', {
        postId: postId,
        userId: userId,
        comment: commentContent
      })
        .then(response => {
          // 评论成功后的处理
          if (response.data === 1) { // 假设后端返回1表示评论成功
            this.$message.success('评论成功');
            this.newComment = ''; // 清空评论输入框
            this.fetchComments(); // 重新获取评论列表
          } else {
            this.$message.error('评论失败');
          }
        })
        .catch(error => {
          console.error('发送评论失败:', error);
          this.$message.error('评论失败');
        });
    },

    // 显示所有评论
    displayAllComments() {
      console.log("当前显示的评论数:", this.displayedComments.length);
      console.log("总评论数:", this.comments.length);
      this.displayedComments = this.comments.length; // 显示所有评论
    },

    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes()
      ).padStart(2, "0")}`;
    }
  }
}

</script>

<style scoped>
/* 布局样式 */
.layout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f8;
  border-radius: 8px;
}

.main-content {
  margin-top: 20px;
}

.post-detail-card {
  margin-bottom: 20px;
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px;
}

.post-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

.comment-section {
  margin-top: 20px;
}

/* 样式调整 */
.comment-actions {
  margin-bottom: 10px;
  /* 调整按钮与评论列表的间距 */
}

.el-select.el-input--mini {
  font-size: 12px;
  /* 调整按钮大小 */
}

.section-title {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
}

.add-comment {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 15px;
}

.comment-input {
  flex: 1;
}

.comment-card {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 6px;
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.comment-author {
  font-weight: bold;
  color: #555;
}

.comment-time {
  font-size: 12px;
}

/* 显示更多评论 */
.more-comments {
  margin-top: 10px;
  text-align: center;
}
</style>