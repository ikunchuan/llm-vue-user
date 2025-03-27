<!-- <template>
    <div>
        <div v-for="post in postData" :key="post.postId" class="post-item">
            <h3>{{ post.postTitle }}</h3>
            <div class="post-content" v-html="truncateContent(post.postContent)"></div>
            <p>发布时间: {{ post.createdTime }}</p>

            <div class="post-actions">
                <el-button type="primary" size="small" @click="editPost(post.postId)">编辑</el-button>
                <el-button type="info" size="small" @click="viewDetail(post.postId)">详细</el-button>
                <el-button type="danger" size="small" @click="deletePost(post.postId)">删除</el-button>
            </div>
            <hr>
        </div>
    </div>
</template> -->
<template>
  <div class="content">
    <div v-for="post in postData" :key="post.postId" class="post-card">
      <h3 class="post-title">{{ post.postTitle }}</h3>
      <div class="post-content" v-html="truncateContent(post.postContent)"></div>
      <div class="post-footer">
        <span class="post-time">{{ formatDate(post.updatedTime) }}</span>
        <div class="post-actions">
          <el-button type="primary" size="small" @click="editPost(post.postId)">编辑</el-button>
          <el-button type="info" size="small" @click="viewDetail(post.postId)">详细</el-button>
          <el-button type="danger" size="small" @click="deletePost(post.postId)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
      params: {},
      postData: {
        postTitle: "",
        postContent: "",
      },
      postCommunityId: "",
      postCommunityName: "",
    };
  },

  methods: {
    getUserPostsInfo() {
      console.log("userId", this.userId);
      axios.get(`/v1/posts/user/${this.userId}`).then((response) => {
        if (response) {
          console.log("查询出用户所有的帖子");
          console.log(response);
          this.postData = response.data;
          this.postCommunityId = this.postData.communityId;
          this.postCommunityName = this.postData.communityName;
          console.log("完整的postData数据:", this.postData);
        }
      });
    },

    truncateContent(content) {
      if (!content) {
        return "";
      }
      // 移除HTML标签,只保留文本
      const plainText = content.replace(/<[^>]+>/g, "");
      // 截取前三行,每行最多50个字符
      const lines = plainText.split("\n").slice(0, 3);
      return lines.map((line) => line.slice(0, 50)).join("\n") + "...";
    },

    editPost(postId) {
      // 跳转到编辑页面
      this.$router.push({
        path: `/home/postupdate/${postId}`,
        query: { mode: "edit" },
      });
    },

    viewDetail(postId) {
      // 跳转到详情页面
      this.$router.push(`/home/postdetail/${postId}`);
    },

    deletePost(postId) {
      // 删除帖子
      this.$confirm("确定要删除这篇帖子吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios
          .delete(`/v1/posts/post/${postId}`)
          .then(() => {
            this.$message.success("删除成功");
            this.getUserPostsInfo(); // 重新加载数据
          })
          .catch((err) => {
            this.$message.error("删除失败");
            console.error(err);
          });
      });
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("zh-CN", options);
    },
  },

  created() {
    this.getUserPostsInfo();
  },
};
</script>

<style scoped>
.content {
  padding: 30px 20px;
  /* 增加内容区域的内边距 */
}

.post-card {
  position: relative;
  /* 新增，为伪元素定位 */
  border: 1px solid #eaeaea;
  border-radius: 12px;
  /* 增加圆角 */
  padding: 16px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  /* 轻微的背景色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 增加阴影 */
  transition: transform 0.3s, box-shadow 0.3s;
  /* 添加悬停效果的过渡 */
}

.post-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  /* 三角形的宽度 */
  height: 100%;
  background-color: #7c73e6;
  /* 三角形的颜色 */
  border-radius: 12px 0 0 12px;
  /* 圆角仅在左侧 */
}

.post-card:hover {
  transform: translateY(-5px);
  /* 悬停时上移 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  /* 悬停时增加阴影 */
}

.post-title {
  font-size: 15px;
  margin-top: 0;
  color: #333;
  /* 标题颜色 */
}

.post-content {
  margin-top: 8px;
  font-size: 13px;
  max-height: 150px;
  overflow-y: auto;
  color: #666;
  /* 内容颜色 */
}

.post-footer {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  /* 缩小字体大小 */
}

.post-time {
  font-size: 14px;
  color: #888;
}

.post-actions {
  display: flex;
  gap: 8px;
  /* 使用gap替代margin-left */
}

.post-actions .el-button {
  margin: 0;
  /* 重置外边距 */
}
</style>
