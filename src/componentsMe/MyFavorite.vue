<template>
  <div class="my-favorite">
    <!-- 竞赛收藏 -->
    <div class="favorite-section">
      <div class="favorite-header" @click="toggleDetail(0)">
        <span>>>收藏的竞赛</span>
        <i v-if="!showDetails[0]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[0]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[0]" class="favorite-item-details">
        <div class="favorite-items">
          <div v-for="(comp, index) in visibleCompetitions" :key="index" class="favorite-card">
            <el-card @click="goToCompDetail(comp.competitionId)" shadow="never" style="border: none;">
              <div class="item-title">{{ comp.competitionName }}</div>
              <div class="item-content">
                <div class="item-image">
                  <img :src="'http://localhost:10086/images/upload/' + comp.competitionImgUrl" class="comp-img" />
                </div>
                <div class="item-details">
                  <div class="update-time">{{ formatTime(comp.updatedTime) }}</div>
                </div>
              </div>
            </el-card>
            <el-button type="danger" @click="removeFavorite(comp.competitionFavoriteId, 'competition')">取消收藏</el-button>
          </div>
        </div>
        <el-button v-if="competitions.length > 4" @click="toggleShowMore(0)">
          {{ showAllCompetitions ? '收起' : '查看更多' }}
        </el-button>
      </div>
    </div>

    <!-- 课程收藏 -->
    <div class="favorite-section">
      <div class="favorite-header" @click="toggleDetail(1)">
        <span>>>收藏的课程</span>
        <i v-if="!showDetails[1]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[1]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[1]" class="favorite-item-details">
        <div class="favorite-items">
          <div v-for="(course, index) in visibleCourses" :key="index" class="favorite-card">
            <el-card @click="goToCourseDetail(course.courseId)" shadow="never" style="border: none;">
              <div class="item-title">{{ course.courseName }}</div>
              <div class="item-content">
                <div class="item-image">
                  <img :src="'http://localhost:10086/images/upload/' + course.courseImgUrl" class="course-img" />
                </div>
                <div class="item-details">
                  <!-- <div class="course-description">{{ shortenText(course.courseDescription) }}</div> -->
                  <div class="update-time">{{ formatTime(course.updatedTime) }}</div>
                </div>
              </div>
            </el-card>
            <el-button type="danger" @click="removeFavorite(course.courseFavoriteId, 'course')">取消收藏</el-button>
          </div>
        </div>
        <el-button v-if="courses.length > 4" @click="toggleShowMore(1)">
          {{ showAllCourses ? '收起' : '查看更多' }}
        </el-button>
      </div>
    </div>

    <!-- 帖子收藏 -->
    <div class="favorite-section">
      <div class="favorite-header" @click="toggleDetail(2)">
        <span>>>收藏的帖子</span>
        <i v-if="!showDetails[2]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[2]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[2]" class="favorite-item-details">
        <div class="favorite-items">
          <div v-for="(post, index) in visiblePosts" :key="post.postId" class="favorite-card">
            <el-card @click="goToPostDetail(post.postId)" shadow="never" style="border: none;">
              <div class="item-title">{{ post.postTitle }}</div>
              <div class="item-content">
                <div class="post-content">{{ shortenText(post.postContent) }}</div>
                <div class="update-time">{{ formatTime(post.updatedTime) }}</div>
              </div>
            </el-card>
            <el-button type="danger" @click="removeFavorite(post.postFavoriteId, 'post')">取消收藏</el-button>
          </div>
        </div>
        <el-button v-if="posts.length > 4" @click="toggleShowMore(2)">
          {{ showAllPosts ? '收起' : '查看更多' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      competitions: [],
      courses: [],
      posts: [],
      visibleCompetitions: [],
      visibleCourses: [],
      visiblePosts: [],
      userId: sessionStorage.userId, // 假设用户ID存储在sessionStorage中
      showDetails: [false, false, false], // 控制三个卡片的展开状态
      showAllCompetitions: false,
      showAllCourses: false,
      showAllPosts: false
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    fetchFavorites() {
      // 调用后端接口获取收藏的数据
      axios.get(`/comp/v1/favorite/${this.userId}`) // 竞赛收藏
        .then(response => {
          this.competitions = response.data;
          this.visibleCompetitions = this.competitions.slice(0, 4); // 初始化只显示前4个
        });

      axios.get(`/crs/v1/favorite/${this.userId}`) // 课程收藏
        .then(response => {
          this.courses = response.data;
          this.visibleCourses = this.courses.slice(0, 4); // 初始化只显示前4个
        });

      axios.get(`/v1/posts/favorite/${this.userId}`) // 帖子收藏
        .then(response => {
          this.posts = response.data;
          this.visiblePosts = this.posts.slice(0, 4); // 初始化只显示前4个
        });
    },
    removeFavorite(favoriteId, type) {
      this.$confirm('确定要取消收藏吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击“确定”，执行删除逻辑
        let url = '';
        if (type === 'competition') {
          url = `/comp/v1/favorite/${favoriteId}`;
        } else if (type === 'course') {
          url = `/crs/v1/favorite/${favoriteId}`;
        } else if (type === 'post') {
          url = `/v1/posts/favorite/${favoriteId}`;
        }

        axios.delete(url)
          .then(() => {
            this.fetchFavorites(); // 重新获取收藏数据
            this.$message.success('删除成功');
          })
          .catch(error => {
            this.$message.error('删除失败');
          });
      }).catch(() => {
        // 用户点击“取消”，什么也不做
        this.$message.info('取消删除');
      });
    },
    toggleDetail(index) {
      this.showDetails[index] = !this.showDetails[index];
    },
    toggleShowMore(type) {
      if (type === 0) {
        this.showAllCompetitions = !this.showAllCompetitions;
        this.visibleCompetitions = this.showAllCompetitions ? this.competitions : this.competitions.slice(0, 4);
      } else if (type === 1) {
        this.showAllCourses = !this.showAllCourses;
        this.visibleCourses = this.showAllCourses ? this.courses : this.courses.slice(0, 4);
      } else if (type === 2) {
        this.showAllPosts = !this.showAllPosts;
        this.visiblePosts = this.showAllPosts ? this.posts : this.posts.slice(0, 4);
      }
    },
    goToCourseDetail(courseId) {
      this.$router.push({ name: 'CourseDetail', params: { courseId } });
    },

    goToCompDetail(competitionId) {
      this.$router.push({ name: 'CompDetail', params: { compId: competitionId } });
    },

    goToPostDetail(postId) {
      this.$router.push({ name: 'PostDetail', params: { postId } });
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
    shortenText(text, maxLength = 50) {
      if (text.length > maxLength) {
        text = this.stripHtmlTags(text);
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
    stripHtmlTags(content) {
      return content.replace(/<\/?[^>]+(>|$)/g, ""); // 去除HTML标签
    }
  },
};
</script>

<style scoped>
.my-favorite {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
}

.favorite-section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px #faf9f9;
  /* 增加阴影 */
}

.favorite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  color: #333;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
}

.favorite-item-details {
  margin-top: 10px;
}

.favorite-items {
  padding-top: 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.favorite-card {
  display: flex;
  flex-direction: column;
  padding: 0px;
  /* 减少卡片内边距 */
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0;
  /* 去掉卡片之间的空隙 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;
}

.favorite-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.item-title {
  min-height: 44px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  /* 限制为两行 */
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 1;
  /* 限制为两行 */
  font-size: 12px;
  color: #868e96;
  overflow: hidden;
  text-overflow: ellipsis;
}


.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 调整内容的排列 */
}

.item-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  padding-top: 8px;
}

.item-details {
  margin-top: 0px;
}

.update-time {
  font-size: 12px;
  color: #868e96;
}

.el-button {
  margin-top: 0px;
  color: #dc3545;
  background-color: transparent;
  border: none;
  font-size: 14px;
}

.el-button:hover {
  color: #c82333;
}
</style>
