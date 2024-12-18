<template>
  <div class="my-favorite">
    <el-card>
      <div slot="header" class="clearfix" @click="toggleDetail(0)">
        <span>收藏的竞赛</span>
        <i v-if="!showDetails[0]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[0]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[0]" class="favorite-item-details">
        <div v-for="(comp, index) in competitions" :key="index" class="competition-item">
          <div class="item-title">{{ comp.competitionName }}</div>
          <div class="item-content">
            <div class="item-image">
              <img style="width: 50px; height: auto"
                :src="'http://localhost:10086/images/upload/' + comp.competitionImgUrl" class="comp-img" />
            </div>
            <div class="item-details">
              <div class="update-time">收藏时间: {{ new Date(comp.updatedTime).toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
              }).replace(/\//g,
                '-') }}</div>
              <el-button type="danger" icon="el-icon-delete"
                @click="removeFavorite(comp.competitionId, 'competition')">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix" @click="toggleDetail(1)">
        <span>收藏的课程</span>
        <i v-if="!showDetails[1]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[1]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[1]" class="favorite-item-details">
        <div v-for="(course, index) in courses" :key="index" class="course-item">
          <div class="item-title">{{ course.courseName }}</div>
          <div class="item-content">
            <div class="item-image">
              <img style="width: 50px; height: auto"
                :src="'http://localhost:10086/images/upload/' + course.courseImgUrl" class="course-img" />
            </div>
            <div class="item-details">
              <div class="course-description">{{ course.courseDescription }}</div>
              <div class="update-time">收藏时间: {{ new Date(course.updatedTime).toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
              }).replace(/\//g,
                '-') }}</div>
              <el-button type="danger" icon="el-icon-delete"
                @click="removeFavorite(course.courseId, 'course')">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix" @click="toggleDetail(2)">
        <span>收藏的帖子</span>
        <i v-if="!showDetails[2]" class="el-icon-arrow-right"></i>
        <i v-if="showDetails[2]" class="el-icon-arrow-up"></i>
      </div>
      <div v-if="showDetails[2]" class="favorite-item-details">
        <div v-for="(post, index) in posts" :key="post.postId">
          <div class="item-title">{{ post.postTitle }}</div>
          <div class="item-content">
            <div class="post-content">{{ post.postContent }}</div>
            <div class="update-time">
              收藏时间: {{ new Date(post.updatedTime).toLocaleString('zh-CN', {
                year: 'numeric', month: '2-digit', day:
                  '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
              }).replace(/\//g, '-') }}
            </div>
            <el-button type="danger" icon="el-icon-delete" @click="removeFavorite(post.postId, 'post')">删除</el-button>
          </div>
        </div>
      </div>
    </el-card>


  </div>
</template>

<script>
export default {
  data() {
    return {
      competitions: [],
      courses: [],
      posts: [],
      userId: sessionStorage.userId, // 假设用户ID存储在sessionStorage中
      showDetails: [false, false, false], // 控制三个卡片的展开状态
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    fetchFavorites() {
      // 调用后端接口获取收藏的数据
      this.$http.get(`/comp/v1/favorite/${this.userId}`) //竞赛收藏
        .then(response => {
          this.competitions = response.data;
        });

      this.$http.get(`/crs/v1/favorite/${this.userId}`) //课程收藏
        .then(response => {
          this.courses = response.data;
        });

      this.$http.get(`/v1/posts/userpost/${this.userId}`)     //帖子收藏
        .then(response => {
          this.posts = response.data;
        });
    },
    removeFavorite(favoriteId, type) {
      // 调用后端接口删除收藏项
      let url = '';
      if (type === 'competition') {
        url = `/comp/v1/compe/favorite/${favoriteId}`;
      } else if (type === 'course') {
        url = `/crs/v1/course/favorites/${favoriteId}`;
      } else if (type === 'post') {
        url = `/v1/posts/favorites/${favoriteId}`;
      }

      this.$http.delete(url)
        .then(() => {
          this.fetchFavorites(); // 重新获取收藏数据
          this.$message.success('删除成功');
        })
        .catch(error => {
          this.$message.error('删除失败');
        });
    },
    toggleDetail(index) {
      this.showDetails[index] = !this.showDetails[index];
    },
  },
};
</script>

<style scoped>
.my-favorite {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.favorite-item-details {
  margin-top: 10px;
}

.favorite-item-details>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.item-title {
  font-size: 16px;
  color: #333;
  flex: 1;
  margin-right: 10px;
}

.el-button {
  margin-left: 10px;
}
</style>