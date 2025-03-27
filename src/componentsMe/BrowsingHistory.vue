<template>
  <div class="browsing-history">
    <!-- 课程浏览历史 -->
    <div v-if="courseHistory.length" class="history-section">
      <div class="history-header">课程浏览历史</div>
      <div v-for="(item, index) in sortedCourseHistory" :key="index" class="history-item"
        @mouseenter="hoveredCourse = item.courseViewId" @mouseleave="hoveredCourse = null"
        @click="goToCourse(item.courseId)">
        <div class="item-image">
          <img :src="getImgUrl(item.courseImgUrl)" alt="Course Image" />
        </div>
        <div class="item-details">
          <div class="item-title">{{ item.courseName }}</div>
          <div class="update-time">最后浏览时间: {{ formatTime(item.updatedTime) }}</div>
        </div>
        <el-button style="font-size: larger;" v-show="hoveredCourse === item.courseViewId"
          @click.stop="removeCourseViewHistory(item.courseViewId); console.log('删除课程', item.courseViewId)">×</el-button>
      </div>
    </div>

    <!-- 帖子浏览历史 -->
    <div v-if="postHistory.length" class="history-section">
      <div class="history-header">帖子浏览历史</div>
      <div v-for="(item, index) in sortedPostHistory" :key="index" class="history-item"
        @mouseenter="hoveredPost = item.postViewId" @mouseleave="hoveredPost = null"
        @click="goToPost(item.communityId)">
        <div class="item-details">
          <div class="item-title">{{ item.postTitle }}</div>
          <div class="post-content">{{ stripHtmlTags(item.postContent) }}</div>
          <div class="update-time">最后浏览时间: {{ formatTime(item.updatedTime) }}</div>
        </div>
        <el-button style="font-size: larger;" v-show="hoveredPost === item.postViewId"
          @click.stop="removePostViewHistory(item.postViewId); console.log('删除课程', item.postViewId)">×</el-button>
      </div>
    </div>

    <!-- 没有历史记录时的提示 -->
    <div v-if="courseHistory.length === 0 && postHistory.length === 0" class="empty-message">
      暂无浏览记录
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      courseHistory: [],
      postHistory: [],
      userId: sessionStorage.userId,
      hoveredCourse: null, // 跟踪课程悬停状态
      hoveredPost: null,   // 跟踪帖子悬停状态
    };
  },
  mounted() {
    this.fetchCourseViewHistory();
    this.fetchPostViewHistory();
  },
  methods: {
    getImgUrl(url) {
      if (!url) return ''; // 返回默认图片路径或空字符串
      return `http://localhost:10086/images/upload/${url}`;
    },

    fetchCourseViewHistory() {
      axios.get(`/uis/v1/courseView/${this.userId}`)
        .then(response => {
          this.courseHistory = response.data;
          console.log('获取课程浏览历史:', this.courseHistory);
        })
        .catch(error => {
          this.$message.error('获取浏览历史失败');
        });
    },

    fetchPostViewHistory() {
      axios.get(`/uis/v1/postsView/${this.userId}`)
        .then(response => {
          this.postHistory = response.data;
          console.log('获取帖子浏览历史:', this.postHistory);
        })
        .catch(error => {
          console.error('获取帖子浏览历史失败:', error);
          this.$message.error('获取浏览历史失败');
        });
    },

    removeCourseViewHistory(courseViewId) {
      axios.delete(`/uis/v1/courseView/del/${courseViewId}`)
        .then(() => {
          this.fetchCourseViewHistory();
          this.$message.success('删除成功');
        })
        .catch(error => {
          console.error('删除浏览历史失败:', error);
          this.$message.error('删除失败');
        });
    },

    removePostViewHistory(postViewId) {
      axios.delete(`/uis/v1/postView/del/${postViewId}`)
        .then(() => {
          this.fetchPostViewHistory();
          this.$message.success('删除成功');
        })
        .catch(error => {
          console.error('删除浏览历史失败:', error);
          this.$message.error('删除失败');
        });
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-');
    },

    stripHtmlTags(content) {
      return content.replace(/<\/?[^>]+(>|$)/g, ""); // 使用正则表达式去除HTML标签
    },

    goToCourse(courseId) {
      this.$router.push(`/home/coursedetail/${courseId}`);
    },

    goToPost(postId) {
      this.$router.push(`/home/postdetail/${postId}`);
    },

  },

  computed: {

    sortedCourseHistory() {
      if (!this.courseHistory) return [];

      return this.courseHistory.sort((a, b) => new Date(b.updatedTime) - new Date(a.updatedTime));
    },

    sortedPostHistory() {
      return this.postHistory.sort((a, b) => new Date(b.updatedTime) - new Date(a.updatedTime));
    }
  }
};
</script>

<style scoped>
.browsing-history {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.history-section {
  margin-bottom: 20px;
}

.history-header {
  font-size: 18px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  /* Reduced shadow for lightness */
  transition: background-color 0.3s;
}

.history-item:hover {
  background-color: #f1f1f1;
}

.item-image img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
  margin-left: 12px;
  overflow: hidden;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-content {
  font-size: 14px;
  color: #6c757d;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.update-time {
  font-size: 12px;
  color: #868e96;
  margin-top: 5px;
}

.el-button {
  color: #dc3545;
  background-color: transparent;
  border: none;
}

.el-button:hover {
  color: #c82333;
}

.empty-message {
  text-align: center;
  font-size: 16px;
  color: #6c757d;
  padding: 20px;
}
</style>
