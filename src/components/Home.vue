<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <header class="navbar">
          <div class="navbar-container">
            <!-- 左侧 LOGO -->
            <div class="logo">LOGO</div>

            <nav class="nav-menu">
              <div 
                class="nav-item" 
                v-for="item in navItems" :key="item.name"
                @mouseenter="toggleDrawer(item)" 
                @mouseleave="keepDrawerOpen"
                @click="navigate(item.path)"
              >
                {{ item.name }}
              </div>
            </nav>

            <!-- 右侧用户信息 -->
            <div class="user-info">
              <img src="https://via.placeholder.com/32" alt="User" class="user-avatar" />
              <span class="username">张三</span>
            </div>
          </div>
        </header>

        <!-- 抽屉内容 -->
        <div 
          v-if="activeDrawer" 
          class="drawer" 
          @mouseenter="keepDrawerOpen" 
          @mouseleave="toggleDrawer(null)"
        >
          <div class="drawer-content">
            <div v-if="activeDrawer.name === '竞赛中心'" class="resource-center">
              <div class="left-column">
                <h3 class="drawer-title">竞赛中心</h3>
                <img src="../assets/img/16.png" alt="竞赛中心图标" style="width: 100px; height: 100px;">
              </div>
              <div class="right-column">
                <!-- 大标题 -->
                <h1>最新动态</h1>
                
                <!-- 图片区域 -->
                <div class="image-section">
                  <!-- 其他可能的 v-for 使用 -->
                  <div v-for="(comp, index) in popularCompetitions" :key="index">
                    <img
                      :src="'http://localhost:10086/images/upload/' + comp.competitionImgUrl"
                     
                      @click="goToCompetitionDetail(comp.competitionId)"
                    />
                  </div>
                </div>
                
                <!-- 底部文字区域 -->
                <div class="text-container">
                  <p>这里是图片下方的文字描述。</p>
                </div>
              </div>
            </div>
            <div v-if="activeDrawer.name === '资源中心'" class="resource-center">
              <div class="left-column">
                <h3 class="drawer-title">资源中心</h3>
                <div class="resource-link" @click="navigateToPath('course')">课程资源</div>
                <div class="resource-link" @click="navigateToPath('question')">题库资源</div>
              </div>
              <div class="right-column">
                <div class="resource-box" v-for="box in resourceBoxes" :key="box.title">
                  <h4>{{ box.title }}</h4>
                  <p>{{ box.content }}</p>
                </div>
              </div>
            </div>
            <div v-if="activeDrawer.name === '灵验知道'" class="resource-center">
              <div class="left-column">
                <h3 class="drawer-title">灵验知道</h3>
                <div class="resource-link" @click="navigateToPath('course')">课程资源</div>
                <div class="resource-link" @click="navigateToPath('question')">题库资源</div>
              </div>
              <div class="right-column">
                <div class="resource-box" v-for="box in resourceBoxes" :key="box.title">
                  <h4>{{ box.title }}</h4>
                  <p>{{ box.content }}</p>
                </div>
              </div>
            </div>
            <div v-if="activeDrawer.name === '社区'" class="resource-center">
              <div class="left-column">
                <h3 class="drawer-title">社区</h3>
                <div class="resource-link" @click="navigateToPath('course')">课程资源</div>
                <div class="resource-link" @click="navigateToPath('question')">题库资源</div>
              </div>
              <div class="right-column">
                <div class="resource-box" v-for="box in resourceBoxes" :key="box.title">
                  <h4>{{ box.title }}</h4>
                  <p>{{ box.content }}</p>
                </div>
              </div>
            </div>
            <div v-if="activeDrawer.name === '个人中心'" class="resource-center">
              <div class="left-column">
                <h3 class="drawer-title">个人中心</h3>
                <div class="resource-link" @click="navigateToPath('course')">课程资源</div>
                <div class="resource-link" @click="navigateToPath('question')">题库资源</div>
              </div>
              <div class="right-column">
                <div class="resource-box" v-for="box in resourceBoxes" :key="box.title">
                  <h4>{{ box.title }}</h4>
                  <p>{{ box.content }}</p>
                </div>
              </div>
            </div>
            <div class="button-container">
                <button class="close-btn" @click="toggleDrawer(null)">关闭</button>
            </div>          
          </div>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      navItems: [
        { name: "竞赛中心", path: "comp" },
        { name: "资源中心", path: "course" },
        { name: "灵验知道", path: "lingyan" },
        { name: "社区", path: "community" },
        { name: "个人中心", path: "me" },
      ],
      activeDrawer: null,
      popularCompetitions: [],
    };
  },
  methods: {
    toggleDrawer(item) {
      this.activeDrawer = item;
      if (!item) {
        this.popularCompetitions = [];
      }
      this.fetchPopularCompetitions();
    },
    keepDrawerOpen() {
      // 保持抽屉打开，不进行任何操作
    },
    navigate(item) {
      if (item.path) {
        this.$router.push({ path: `/home/${item.path}` });
      }
      this.activeDrawer = null; // 关闭抽屉
    },
    fetchPopularCompetitions() {
      const competitionSearch = { popular: 1 }; // 指定获取热门竞赛
      axios
        .post('comp/v1/search', competitionSearch)
        .then(response => {
          if (response.data && response.data.list) {
            // 截取前三条数据
            this.popularCompetitions = response.data.list.slice(0, 3);
          } else {
            console.error('后端返回的数据格式不正确:', response.data);
          }
        })
        .catch(error => {
          console.error('获取推荐竞赛失败:', error.response ? error.response.data : error.message);
        });
    },
    goToCompetitionDetail(competitionId) {
      this.$router.push({ name: 'CompetitionDetail', params: { competitionId } });
    },
    goToCompetitionDetail(competitionId) {
      this.$router.push({ name: 'CompetitionDetail', params: { competitionId } });
    },
  },
  mounted() {
    this.fetchPopularCompetitions(); // 获取推荐竞赛
  }
};
</script>

<style scoped>

/* 顶部导航栏整体样式 */
.navbar {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* 导航栏内部容器 */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

/* LOGO 样式 */
.logo {
  font-size: 1.8em;
  font-weight: bold;
  color: #5a67d8;
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  gap: 40px;
  position: relative;
}

.nav-item {
  font-size: 1em;
  color: #333333;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
}

/* 鼠标悬停时文字滑动效果 */
.nav-item:hover {
  color: #5a67d8;
  transform: translateY(-5px); /* 向上滑动效果 */
}

/* 抽屉样式 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh; /* 高度为页面高度的五分之二 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999; /* 确保抽屉位于顶层 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out; /* 添加平滑过渡 */
  transform: translateY(-100%); /* 默认隐藏，抽屉位于上方 */
}

.drawer-content {
  max-width: 1000px;
  width: 100%;
  text-align: center;
  margin-top: 40px; /* 调整这个值来改变与抽屉顶部的距离 */
}

/* 当抽屉打开时，设置transform为0，显示抽屉 */
.drawer {
  transform: translateY(0);
}

/* 标题样式 */
.drawer-title {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

/* 内容文本样式 */
.drawer-text {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

/* 链接列表样式 */
.drawer-links {
  margin-top: 20px;
}

.drawer-links a {
  display: block;
  font-size: 1em;
  color: #5a67d8;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.drawer-links a:hover {
  color: #4c51bf; /* 鼠标悬停时改变链接颜色 */
}

/* 关闭按钮 */
/* 其他样式保持不变 */
.drawer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 使内容在垂直方向上均匀分布 */
  align-items: flex-start; /* 使内容在水平方向上靠左对齐 */
  max-width: 1000px;
  width: 100%;
  margin-top: 40px;
}

.button-container {
  margin-top: auto; /* 将容器推到底部 */
  margin-left: auto; /* 自动左边距，使容器内容靠右 */
  width: fit-content; /* 根据内容自动调整宽度 */
}

.close-btn {
  padding: 10px 20px;
  background-color: #5a67d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #4c51bf;
}

.pull-right {
  margin-left: auto; /* 使元素靠右 */
}

.close-btn:hover {
  background-color: #4c51bf;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.username {
  font-size: 1em;
  color: #333;
}
.resource-center {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.left-column {
  width: 20%;
  text-align: center;
  padding: 10px 0px; /* 添加内边距 */
}

/* 调整.right-column的布局为垂直排列 */
.right-column {
  width: 70%; /* 占满整个容器宽度 */
  display: block; /* 改为块级元素，不再使用flex布局 */
  
  padding: 20px; /* 添加内边距 */
}

/* 大标题样式，使其靠左显示 */
.right-column h1 {
  text-align: left; /* 文字靠右对齐 */
  margin-top: 20px; /* 与上边的间隔 */
  margin-bottom: 20px; /* 与下边的间隔 */
}



/* 图片区域的容器样式 */
.image-section {
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  gap: 60px; /* 图片之间的间隔 */
  margin-top: 20px; /* 与标题的间隔 */
  margin-bottom: 20px; /* 与下方文字的间隔 */
}

/* 图片样式 */
.image-section img {
  width: 120px; /* 图片宽度 */
  height: 120px; /* 图片高度 */
  object-fit: cover; /* 确保图片覆盖整个区域，但可能会裁剪 */
}

/* 底部文字区域样式 */
.text-container {
  text-align: center; /* 文字居中 */
  margin-top: 20px; /* 与图片区域的间隔 */
}


.resource-box {
  width: 45%;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #E0E0E0; /* 边框颜色 */
  border-radius: 5px;
}

.resource-link {
  cursor: pointer;
  color: #5a67d8;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.2em; /* 使字体更大 */
  transition: color 0.3s ease;}
/* 图片区域的容器样式 */


</style>









