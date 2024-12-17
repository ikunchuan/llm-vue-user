<template>
    <div class="my-favorite">
      <el-card>
        <div slot="header" class="clearfix" @click="toggleDetail(0)">
          <span>收藏的竞赛</span>
          <i v-if="!showDetails[0]" class="el-icon-arrow-right"></i>
          <i v-if="showDetails[0]" class="el-icon-arrow-up"></i>
        </div>
        <div v-if="showDetails[0]" class="favorite-item-details">
          <div v-for="(comp, index) in competitions" :key="index">
            <div class="item-title">{{ comp.name }}</div>
            <el-button type="danger" icon="el-icon-delete" @click="removeFavorite(comp.id, 'competition')">删除</el-button>
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
          <div v-for="(course, index) in courses" :key="index">
            <div class="item-title">{{ course.name }}</div>
            <el-button type="danger" icon="el-icon-delete" @click="removeFavorite(course.id, 'course')">删除</el-button>
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
          <div v-for="(post, index) in posts" :key="index">
            <div class="item-title">{{ post.title }}</div>
            <el-button type="danger" icon="el-icon-delete" @click="removeFavorite(post.id, 'post')">删除</el-button>
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
        this.$http.get(`/comp/v1/compe/favorites?userId=${this.userId}`)
          .then(response => {
            this.competitions = response.data;
          });
        
        this.$http.get(`/crs/v1/course/favorites?userId=${this.userId}`)
          .then(response => {
            this.courses = response.data;
          });
        
        this.$http.get(`/v1/posts/favorites?userId=${this.userId}`)
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
    display: none;
  }
  
  .favorite-item-details[open] {
    display: block;
  }
  
  .favorite-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ebeef5;
  }
  
  .item-title {
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  
  .el-button {
    margin-left: 10px;
  }
  </style>