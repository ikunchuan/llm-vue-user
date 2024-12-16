<template>
  <div class="commu-detail-page">
    <!-- 社区头部 -->
    <div class="community-header">
      <div class="header-content">
        <!-- 左侧社区信息 -->
        <div class="header-info">
          <h2 class="community-name">{{ communityName }}</h2>
          <el-text size="large" class="community-description">
            描述：{{ communityInfo.communityDescription }}
          </el-text>
          <p />
          <el-text size="large" class="community-created">
            创建人：{{ communityInfo.createdBy }} | 创建时间：{{ communityInfo.createdTime }}
          </el-text>
        </div>
        <!-- 右侧按钮 -->
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
          <el-tabs v-model="activeTab">
            <!-- 帖子 Tab -->
            <el-tab-pane label="帖子" name="all">
              <!-- 搜索框 -->
              <div class="search-bar">
                <el-input v-model="searchQuery" placeholder="搜索帖子关键字" prefix-icon="el-icon-search"
                  class="search-input" />
              </div>

              <!-- 帖子列表 -->
              <el-card v-for="(post, index) in filteredPostsList" :key="index" shadow="hover" class="post-card"
                @click="navigateToPostDetail(post.postId)">
                <div class="post-content">
                  <el-tag type="success" class="post-tag">{{ post.communityName }}</el-tag>
                  <h3 class="post-title">{{ post.postTitle }}</h3>
                  <p class="post-summary">{{ post.postContent }}</p>
                  <!-- 帖子互动信息
                  <div class="post-info">
                    <span><i class="el-icon-thumb" /> {{ post.likes || 0 }}</span>
                    <span><i class="el-icon-chat-line-round" /> {{ post.comments || 0 }}</span>
                    <span><i class="el-icon-star-off" /> {{ post.favorites || 0 }}</span>
                  </div> -->
                </div>
              </el-card>


            </el-tab-pane>

            <!-- 社区成员 Tab -->
            <el-tab-pane label="社区成员" name="members">
              <el-table :data="communityUsers" border style="width: 100%" stripe class="member-table"
                v-if="communityUsers.length">
                <el-table-column prop="userName" label="用户名" align="center" />
                <el-table-column prop="postCount" label="发帖数量" align="center" />
              </el-table>
              <div v-else class="empty-state">暂无社区成员</div>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <!-- 右侧积分排行 -->
        <el-col :span="6">
          <el-card class="ranking-card" shadow="hover">
            <h3 class="ranking-title">积分排行</h3>
            <div class="ranking-list">
              <div class="ranking-item" v-for="(user, index) in rankings" :key="index">
                <span class="ranking-number">{{ index + 1 }}</span>
                <el-avatar :src="user.avatar" size="small" />
                <span class="ranking-username">{{ user.name }}</span>
                <span class="ranking-score">{{ user.score }}</span>
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
import { ElMessage } from 'element-plus';


export default {
  name: "CommuDetail",
  created() {
    // 组件创建时获取社区信息,帖子信息,用户信息
    this.fetchCommunityInfo();
    this.fetchPosts();
    this.fetchCommunityUsers();
  },
  data() {
    return {
      // 社区ID和名称从路由参数中获取
      communityId: this.$route.params.communityId,
      communityName: this.$route.params.communityName,
      communityInfo: {}, // 存储社区信息
      communityUsers: {},  // 用于存储社区成员信息
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
    //获取社区信息
    fetchCommunityInfo() {
      // 获取从路由传递过来的社区ID
      console.log("测试获取到的社区ID：", this.communityId);
      axios.get(`/v1/cmns/cmn/${this.communityId}`)
        .then(response => {
          console.log("获取到的社区数据：", response.data);
          // 设置获取到的社区信息
          this.communityInfo = response.data;
        })
        .catch(error => {
          console.error("获取社区信息失败：", error);
        });
    },
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
    fetchCommunityUsers() {
      // this.$http.get(`/ucmns/v1/ucmn/user/${this.communityId}`)
      this.$http.get(`/v1/cmns/cmnpostuser/${this.communityId}`)

        .then((response) => {
          console.log("获取到的用户数据：", response.data);
          if (response.data && response.data.length) {
            this.communityUsers = response.data;
          } else {
            ElMessage.warning('该社区暂无用户数据');
          }
        })
        .catch((error) => {
          console.error("获取用户列表失败:", error);
          ElMessage.error('获取用户数据失败，请稍后重试');
        });
    },
    //跳转到帖子详情页
    navigateToPostDetail(postId) {
      console.log('跳转到帖子详情页面:', postId);
      // 检查帖子对象是否有id属性
      if (postId) {
        this.$router.push({
          name: 'PostDetail',
          params: { postId: postId }
        });
      } else {
        console.error('帖子ID不存在');
      }
    },

  }
};
</script>

<style scoped>
/* 整体页面布局 */
.commu-detail-page {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #fafafa;
}

/* 社区头部 */
.community-header {
  background-color: #7c73e6;
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info h2 {
  font-size: 24px;
  margin: 0 0 10px 0;
}

.community-description,
.community-created {
  margin: 5px 0;
  font-size: 14px;
  color: #c4c1e0;
}

/* 搜索框 */
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  border-radius: 20px;
  background-color: #ffe9e3;
  border: none;
}

/* 帖子列表 */
/* 帖子卡片样式 */
.post-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.post-tag {
  font-size: 12px;
  color: #ffffff;
  background-color: #5a67d8;
  padding: 3px 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
  color: #333;
}

.post-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    white-space: nowrap;
    /* 防止文本自动换行 */
    max-height: 4.8em;
    /* 设置最大高度，根据行高调整 */
}

.post-info {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 13px;
  margin-top: 10px;
}

.post-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.post-info i {
  color: #5a67d8;
}

/* 社区成员表格 */
.member-table {
  background-color: #fff;
  border-radius: 10px;
}

/* 积分排行 */
.ranking-card {
  background-color: #ffffff;
  border-radius: 10px;
}

.ranking-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.ranking-number {
  font-size: 16px;
  font-weight: bold;
  color: #7c73e6;
}

.ranking-username {
  flex: 1;
  margin-left: 10px;
}

.ranking-score {
  font-weight: bold;
  color: #333;
}

</style>
