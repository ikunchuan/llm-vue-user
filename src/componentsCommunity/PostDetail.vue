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
              <el-button type="text" size="mini" @click="sortComments('asc')">正序</el-button>
              <span>/</span>
              <el-button type="text" size="mini" @click="sortComments('desc')">倒序</el-button>
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
              <div class="action-buttons">
                <el-button type="success" size="small" @click="followAuthor" :disabled="isFollowing">
                  {{ isFollowing ? '已关注' : '关注作者' }}
                </el-button>
              </div>
              <h3 class="user-name">{{ author.userName }}</h3>

              <p class="user-bio">{{ author.userBio || "暂无简介" }}</p>

              <el-row justify="space-evenly" class="follow-fans">
                <el-col :span="50" class="pointer">
                  <el-space direction="horizonal" size="2">
                    <div class="stat-text">粉丝</div>&nbsp;
                    <div class="stat-number">{{ this.fansInfo.length || 0 }}</div>
                  </el-space>
                </el-col>&nbsp;
                <el-col :span="50" class="pointer">
                  <el-space direction="horizonal" size="2">
                    <div class="stat-text">发帖数</div>&nbsp;
                    <div class="stat-number">{{ author.postCount || 0 }}</div>
                  </el-space>
                </el-col>
              </el-row>

            </div>
          </el-card>

          <!-- 社区信息模块 -->
          <el-card class="community-info-card" shadow="hover" @click="navigateToCommuDetail(community)">
            <div class="community-info">
              <h4 class="community-name">{{ community.communityName }}</h4>
              <div class="action-buttons">
                <el-button type="primary" size="small" @click="joinCommunity">
                  {{ isMember ? "已加入社区" : "加入社区" }}
                </el-button>
              </div>
              <p class="community-desc">{{ community.communityDescription || "暂无描述" }}</p>
            </div>
          </el-card>

          <!-- 点赞按钮 -->
          <el-button type="text" size="small" @click="likePost" :disabled="liked"
            :icon="liked ? 'el-icon-thumb' : 'el-icon-thumb-solid'">
            {{ liked ? '已点赞' : '点赞' }}
          </el-button>

          <!-- 收藏按钮 -->
          <el-button type="text" size="small" @click="favoritePost" :disabled="favorited"
            :icon="favorited ? 'el-icon-star-on' : 'el-icon-star-off'">
            {{ favorited ? '已收藏' : '收藏' }}
          </el-button>

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
      isFollowing: false,    // 初始状态假设为未关注
      authorId: 0,       //该帖子作者的Id
      currentUserId: 0,    //当前登录用户的Id
      fansInfo: {},        //该作者的粉丝
      liked: false,         // 是否点赞
      favorited: false,     // 是否收藏
      userFavoritePosts: {},     //当前用户收藏的所有帖子
      userLikePosts: {},         //  当前用户喜欢的所有帖子

    };
  },
  created() {
    this.fetchPostDetails();
    this.fetchComments();
  },

  computed: {
    // 根据搜索关键词过滤帖子列表
    filteredContentItems() {
      if (!this.searchQuery) return this.contentItems;
      return this.contentItems.filter((item) =>
        item.postTitle ? item.postTitle.includes(this.searchQuery) : false
      );
    },
    // 添加一个计算属性，用于根据排序方式排序帖子
    sortedComments() {
      if (!this.comments.length) return []; // 确保 comments 已定义
      return this.comments.slice().sort((a, b) => {
        const timeA = new Date(a.createdTime).getTime();
        const timeB = new Date(b.createdTime).getTime();
        return this.sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
    },
    visibleComments() {
      const sorted = this.sortedComments; // 使用 sortedComments 计算属性
      console.log("当前显示的评论:", sorted);
      return sorted.slice(0, this.displayedComments);
    },
  },
  methods: {

    //用户点赞帖子
    likePost() {
      this.liked = true
      const postId = this.$route.params.postId;
      const userId = this.currentUserId;
      // 调用点赞接口
      axios.get('/v1/posts/post/like', {
        params: {
          userId: userId,
          postId: postId
        }
      })
        .then(response => {
          if (response.data === 1) {
            this.$message.success('点赞成功');

      } else {
            this.$message.error('点赞失败');
          }
        })
        .catch(error => {
          console.error('点赞失败:', error);
          this.$message.error('点赞失败');
        });
    },


    //用户收藏帖子
    favoritePost() {
      this.favorited = true;
      const postId = this.$route.params.postId;
      const userId = this.currentUserId;
      // 调用收藏接口
      axios.get('/v1/posts/post/favorite', {
        params: {
          userId: userId,
          postId: postId
        }
      })
        .then(response => {
          if (response.data === 1) {
            this.$message.success('收藏成功');
            this.isFavorited = true; // 更新收藏状态
            // this.post.favoriteCount += 1; // 更新收藏数量
          } else {
            this.$message.error('收藏失败');
          }
        })
        .catch(error => {
          console.error('收藏失败:', error);
          this.$message.error('收藏失败');
        });
    },


    // 获取当前用户的收藏帖子列表和喜欢帖子列表
    fetchUserFavoriteLikePosts() {
      this.currentUserId = sessionStorage.getItem("userId")
      const userId = this.currentUserId; // 获取当前用户的ID

      axios.get(`/v1/posts/userpost/${userId}`)
        .then(response => {
          this.userFavoritePosts = response.data; // 存储返回的收藏帖子
          console.log('用户收藏的帖子:', this.userFavoritePosts);
        })
        .catch(error => {
          console.error('获取用户收藏帖子失败:', error);
        });

      axios.get(`/v1/posts/userlike/${userId}`)
        .then(response => {
          this.userLikePosts = response.data; // 存储返回的喜欢帖子
          console.log('用户点赞的帖子:', this.userLikePosts);
        })
        .catch(error => {
          console.error('获取用户收藏帖子失败:', error);
        });


    },


    //获取该帖子作者的信息
    fetchAuthorDetails(userId) {
      this.authorId = userId
      console.log("该作者的userId" + this.authorId)
      // 获取作者的详细信息
      axios.get(`/uis/v1/ui/${this.authorId}`)
        .then((response) => {
          console.log(response.data)
          this.author = response.data;
          //查找这个作者的粉丝数量
          this.$http.get(`/uis/v1/user/fans/${userId}`)
            .then(response => {
              console.log('fans data:', response.data);
              this.fansInfo = response.data;
              console.log(this.fansInfo.length);
              this.loading = false;
            }).catch(error => {
              console.error('Error fetching user data:', error);
            }).finally(() => {
              this.loading = false;
            })


          //查找这个作者的发帖数量

          // console.log("作者的信息" + author)
          // 获取当前用户关注的所有用户
          this.currentUserId = sessionStorage.getItem("userId")
          axios.get(`uis/v1/user/follower/${this.currentUserId}`)
            .then((followerResponse) => {
              // 检查是否已关注
              const followers = followerResponse.data;
              console.log("当前用户关注的人" + followers)
              this.isFollowing = Array.isArray(followers) && followers.some(follower => follower.userId === this.author.userId);
              console.log('当前用户关注的用户列表:', followers);
              console.log('是否已关注当前作者:', this.isFollowing);
            })
            .catch((error) => {
              console.error("获取关注的用户失败:", error);
            });
        })

    },


    //关注该作者的方法
    followAuthor() {
      // 获取当前用户ID
      const currentUserId = sessionStorage.getItem('userId');
      console.log(currentUserId)
      if (!currentUserId) {
        this.$message.error('用户未登录');
        return;
      }
      // 获取作者的ID
      // const authorId = this.author.userId;
      // 检查是否已关注，假设服务器接口返回 isFollowing 来表示当前用户是否已经关注了该作者
      if (this.isFollowing) {
        this.$message.warning('你已经关注了该作者');
        return;
      }
      // 调用后端接口进行关注操作
      axios.get('/uis/v1/user/follow', {
        params: {
          userId: currentUserId,
          followeeUserId: this.authorId
        }
      })
        .then(response => {
          if (response.data === 1) {  // 假设后端返回1表示成功
            this.$message.success('关注成功');
            this.isFollowing = true; // 更新关注状态
          } else {
            this.$message.error('关注失败');
          }
        })
        .catch(error => {
          console.error('关注操作失败:', error);
          this.$message.error('关注操作失败');
        });
    },


    //查看帖子的详情
    fetchPostDetails() {
      const postId = this.$route.params.postId;
      console.log("帖子ID:", postId);
      axios.get(`/v1/posts/post/${postId}`)
        .then((response) => {
          console.log("帖子详情:", response.data);
          this.post = response.data;

          this.fetchUserFavoriteLikePosts();

          // 判断是否点赞过
          this.liked = Array.isArray(this.userLikePosts) && this.userLikePosts.some(post => post.postId === postId);
          // 判断是否收藏过
          this.favorited = Array.isArray(this.userFavoritePosts) && this.userFavoritePosts.some(post => post.postId === postId);
          console.log(this.liked, this.favorited)


          this.fetchAuthorDetails(this.post.userId);
          this.fetchCommunityDetails(this.post.communityId);
          this.getPostCounts(postId); // 获取帖子统计信息


        })
      // .catch((error) => {
      //   console.error("获取帖子详情失败:", error);
      // });
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


    // fetchAuthorDetails(userId) {
    //   axios.get(`/uis/v1/ui/${userId}`)
    //     .then((response) => {
    //       this.author = response.data;
    //     })
    //     .catch((error) => {
    //       console.error("获取作者信息失败:", error);
    //     });
    // },
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
      axios.get('v1/posts/post/usercomment', {
        params: {
          postId: postId,
          userId: userId,
          comment: commentContent
        }

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
    },
    // 点击进入社区详情页面
    navigateToCommuDetail(community) {

      console.log('点击的社区ID:', community.communityId);  // 确保社区ID能够正确获取
      this.$router.push({
        name: 'CommuDetail',
        params: {
          communityId: community.communityId,
          communityName: community.communityName
        }
      });
    },
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

/* 排序选项 */
.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.comment-actions .el-button {
  margin-left: 10px;
  /* 为按钮之间添加间隔 */
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

/* 美化按钮 */
.action-buttons .el-button--success {
  background-color: #4CAF50;
  /* 绿色背景 */
  border-color: #4CAF50;
  /* 绿色边框 */
  color: white;
  /* 白色文字 */
  border-radius: 20px;
  /* 圆形按钮 */
  text-transform: uppercase;
  /* 首字母大写 */
  font-weight: bold;
  /* 加粗字体 */
  letter-spacing: 1px;
  /* 字母间距 */
  transition: background-color 0.3s ease;
  /* 过渡效果 */
}

.action-buttons .el-button--success:hover {
  background-color: #45a049;
  /* 深绿色背景，用于hover效果 */
}

.action-buttons .el-button--success:disabled {
  background-color: #c0c4cc;
  /* 灰色背景，用于禁用状态 */
  border-color: #c0c4cc;
  /* 灰色边框，用于禁用状态 */
}

/* 作者信息布局 */
.user-info {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-info .action-buttons {
  margin-top: auto;
  /* 将按钮推到底部 */
  display: flex;
  justify-content: flex-end;
  /* 使按钮靠右对齐 */
  width: 100%;
  /* 使容器占满整个宽度 */
}

/* 社区信息布局 */
.community-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.community-info .action-buttons {
  margin-top: auto;
  /* 将按钮推到底部 */
  display: flex;
  justify-content: flex-end;
  /* 使按钮靠右对齐 */
  width: 100%;
  /* 使容器占满整个宽度 */
}

/* 美化按钮 */
.community-info .el-button--primary {
  background-color: #409EFF;
  /* 主题色背景 */
  border-color: #409EFF;
  /* 主题色边框 */
  color: white;
  /* 白色文字 */
  border-radius: 20px;
  /* 圆形按钮 */
  text-transform: uppercase;
  /* 首字母大写 */
  font-weight: bold;
  /* 加粗字体 */
  letter-spacing: 1px;
  /* 字母间距 */
  transition: background-color 0.3s ease;
  /* 过渡效果 */
}

.community-info .el-button--primary:hover {
  background-color: #337ecc;
  /* 深主题色背景，用于hover效果 */
}

.community-info .el-button--primary:disabled {
  background-color: #c0c4cc;
  /* 灰色背景，用于禁用状态 */
  border-color: #c0c4cc;
  /* 灰色边框，用于禁用状态 */
}
</style>