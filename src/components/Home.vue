<template>
  <el-container style="height: 100%;">
    <el-header ref="header" class="navbar">
      <div class="navbar-container">
        <!-- 左侧 LOGO -->
        <div class="logo" @click="goToIndex">LOGO</div>

        <nav class="nav-menu">
          <div class="nav-item" v-for="item in navItems" :key="item.name" @mouseenter="toggleDrawer(item)"
            @mouseleave="toggleDrawer(item)" @click="navigate(item.path)">
            <!-- 图片在左边 -->
            <img v-if="item.name === '竞赛中心'" src="../assets/img/49.png" alt="icon" class="nav-item-icon">
            <img v-if="item.name === '资源中心'" src="../assets/img/48.png" alt="icon" class="nav-item-icon">
            <img v-if="item.name === '灵验知道'" src="../assets/img/47.png" alt="icon" class="nav-item-icon">
            <img v-if="item.name === '社区'" src="../assets/img/50.png" alt="icon" class="nav-item-icon">
            <img v-if="item.name === '个人中心'" src="../assets/img/46.png" alt="icon" class="nav-item-icon">
            <!-- 文字在右边 -->
            <span>{{ item.name }}</span>
          </div>
        </nav>

        <!-- 右侧用户信息 -->
        <div class="user-info" @click="goToLogin">
          <el-popover :width="55" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, 
              rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
            <template #reference>
              <!-- shape：square； border: 1px solid #007bff;-->
              <img :src="getUserImg(userInfo.userProfilePicture)" alt="user" class="user-avatar" />

            </template>
            <template #default>
              <div class="rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                <img :src="getUserImg(userInfo.userProfilePicture)" alt="user" class="user-avatar" />

                <div>
                  <p style="margin: 0; text-align: center;">{{ userName }}</p>
                </div>
                <el-divider style="margin: 0;" />
                <p style="margin: 0; text-align: center; cursor: pointer;" @click="openOutDialog">
                  退出登录</p>
              </div>
            </template>
          </el-popover>

          <!-- https://via.placeholder.com/32 -->
          <span class="username">{{ getUserName() }}</span>
        </div>
      </div>

      <el-drawer v-model="isDrawerVisible" :title="activeDrawer?.name || ''" :show-close="false" size="40%"
        direction="ttb" class="drawer" @close="toggleDrawer(null)" @mouseleave="toggleDrawer(null)" append-to-body>
        <!-- append-to-body 是让组件回到body中，让z-index生效-->
        <transition name="fade">
          <div v-if="isDrawerVisible && activeDrawer">
            <div v-if="activeDrawer?.name === '竞赛中心'" class="resource-center">
              <div class="title-column">
                <h3 class="drawer-title">竞赛中心</h3>
                <img src="../assets/img/16.png" alt="竞赛中心图标" style="width: 45px; height: 45px;">
              </div>
              <div class="content-column">
                <div class="recommend-card" v-for="(comp, index) in popularCompetitions" :key="index"
                  @click="goToCompetitionDetail(comp.competitionId)">
                  <el-image :src="'http://localhost:10086/images/upload/' + comp.competitionImgUrl" fit="cover"
                    class="card-image"></el-image>
                  <div class="card-title">{{ comp.competitionName }}</div>
                </div>
              </div>
            </div>

            <div v-if="activeDrawer?.name === '资源中心'" class="resource-center">
              <div class="right-column">
                <!-- 第一列 -->
                <div class="resource-column">
                  <div class="resource-link" @click="navigateToPath('course')"><img src="../assets/img/72.png"
                      alt="课程资源" style="width: 20px; height: 20px;">课程资源</div>
                  <h3 class="drawer-title">更多课程网站</h3>
                  <a href="https://www.bing.com/" class="resource-item">
                    <img src="../assets/img/65.png" alt="哔哩哔哩图标" style="width: 20px; height: 20px;">
                    <span>哔哩哔哩 (Bilibili)</span>
                  </a>
                  <a href="https://www.icourse163.org/" class="resource-item">
                    <img src="../assets/img/66.png" alt="中国大学MOOC图标" style="width: 20px; height: 20px;">
                    <span>中国大学MOOC</span>
                  </a>
                  <a href="https://study.163.com/" class="resource-item">
                    <img src="../assets/img/67.png" alt="网易云课堂图标" style="width: 20px; height: 20px;">
                    <span>网易云课堂</span>
                  </a>
                </div>
                <!-- 竖线分隔符 -->
                <div class="divider"></div>
                <!-- 第二列 -->
                <div class="resource-column">
                  <div class="resource-link" @click="navigateToPath('question')"><img src="../assets/img/73.png"
                      alt="题库资源" style="width: 20px; height: 20px;">题库资源</div>
                  <h3 class="drawer-title">更多题库网站</h3>
                  <a href="https://leetcode-cn.com/" class="resource-item">
                    <img src="../assets/img/68.png" alt="LeetCode图标" style="width: 20px; height: 20px;">
                    <span>LeetCode (力扣)</span>
                  </a>
                  <a href="http://www.chinauniversitymooc.org/" class="resource-item">
                    <img src="../assets/img/69.png" alt="中国大学生在线图标" style="width: 20px; height: 20px;">
                    <span>中国大学生在线</span>
                  </a>
                  <a href="https://www.nowcoder.com/" class="resource-item">
                    <img src="../assets/img/70.png" alt="牛客网图标" style="width: 20px; height: 20px;">
                    <span>牛客网</span>
                  </a>
                </div>
              </div>
            </div>

            <div v-if="activeDrawer?.name === '灵验知道'" class="resource-center">
              <div class="title-section">
                <h3 class="drawer-title">灵验知道</h3>
                <p>灵验知道,以AI的力量，助您一臂之力，让学习之旅更加高效和愉快。</p>
              </div>
              <div class="content-section">
                <div class="resource-box lingyan-know">

                  <img src="../assets/img/71.png" alt="灵验知道图片" class="know-image">
                </div>
              </div>
            </div>
            <div v-if="activeDrawer?.name === '社区'" class="community-section">
              <div class="community-images-text">
                <img src="../assets/img/74.png" alt="社区图片1" class="community-image">
                <p>创新设计官方社区</p>
                <!-- <img src="../assets/img/75.png" alt="社区图片2" class="community-image">
              <p>这里是社区图片2的描述文本，也可以编辑大小。</p> -->
              </div>
              <div class="community-card">
                <h3 class="drawer-title">更多竞赛社区网站</h3>
                <a href="http://acm-icpc.org/" class="resource-item">
                  <span><img src="../assets/img/70.png" alt="中国大学生程序设计竞赛网"
                      style="width: 20px; height: 20px;">中国大学生程序设计竞赛网</span>
                </a>
                <a href="https://tianchi.aliyun.com/" class="resource-item">
                  <span><img src="../assets/img/68.png" alt="阿里云天池" style="width: 20px; height: 20px;">阿里云天池</span>
                </a>
              </div>
            </div>
            
          </div>
        </transition>
      </el-drawer>

    </el-header>

    <el-main class="main-content"
      :style="{ marginTop: headerHeight + 'px', height: `calc(100vh - ${headerHeight}px)` }">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      courseResources: [
        { name: '课程资源1', icon: '../assets/icons/course1.png' },
        { name: '课程资源2', icon: '../assets/icons/course2.png' },
        // 更多课程资源...
      ],
      questionResources: [
        { name: '题库资源1', icon: '../assets/icons/question1.png' },
        { name: '题库资源2', icon: '../assets/icons/question2.png' },
        // 更多题库资源...
      ],
      headerHeight: 0, // 保存 el-header 高度
      navItems: [  // 导航项
        { name: "竞赛中心", path: "comp", drawerContent: "这里是竞赛中心的详细介绍..." },
        { name: "资源中心", path: "course", drawerContent: "这里是资源中心的详细介绍..." },
        { name: "灵验知道", path: "lingyan", drawerContent: "这里是灵验知道的详细介绍..." },
        { name: "社区", path: "community", drawerContent: "这里是社区的详细介绍..." },
        { name: "个人中心", path: "me", drawerContent: "这里是个人中心的详细介绍..." },
      ],
      popularCompetitions: [],
      userAvatarUrl: "https://via.placeholder.com/32", //默认头像
      userName: sessionStorage.getItem('userName') || "user",  // 从 sessionStorage 获取用户名
      activeDrawer: null,
      isDrawerVisible: false,
      isContentVisible: false,
      userInfo: {},
    };
  },

  methods: {
    //图片预览
    getUserImg(url) {
      if (!url) {
        return this.userAvatarUrl;
      }
      return `http://localhost:10086/images/upload/${url}`;
    },

    //获取数据

    updateHeaderHeight() {
      // 获取 el-header 的高度
      const header = this.$refs.header;
      if (header) {
        this.headerHeight = header.offsetHeight; // 更新高度
        console.log("Updated headerHeight:", this.headerHeight);
      }
    },

    getUserName() {
      return this.userName === 'user' ? 'user' : this.userName;
    },

    openOutDialog() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击确定，执行退出登录逻辑
        this.handleLogOut();
      }).catch(() => {
        // 用户点击取消，取消退出登录操作
        this.$message({
          type: 'info',
        })
      })
    },

    handleLogOut() {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      this.$router.push('/login');
    },
    goToCompetitionDetail(competitionId) {
      this.$router.push({ name: 'CompetitionDetail', params: { competitionId } });
    },

    goToIndex() {
      this.$router.push({ path: '/homepage' });
    },

    goToLogin() {
      // 判断用户是否登录
      if (this.userName === 'user') {
        // 如果用户未登录，跳转到登录页面
        this.$router.push('/login');
      } else {
        // 如果用户已登录，跳转到个人中心页面
        this.$router.push('/home/me');
      }
    },

    toggleDrawer(item) {
    if (item) {
      // 当点击的是“个人中心”，则不显示抽屉，而是直接跳转到个人中心页面
      if (item.name === '个人中心') {
        this.goToPersonalCenter(); // 假设这是跳转到个人中心的方法
      } else {
        // 对于其他项，正常打开抽屉
        this.activeDrawer = item;
        this.isDrawerVisible = true;
        this.fetchPopularCompetitions(); // 如果需要的话，获取热门竞赛数据
      }
    } else {
      // 等待内容淡出动画完成再关闭抽屉
      setTimeout(() => {
        this.isDrawerVisible = false;
        this.activeDrawer = null;
      }, 300); // 动画时长（与 CSS 保持一致）
    }
  },


    navigateToPath(path) {
      this.$router.push({ path: `/home/${path}` });
      // `/${path}`
      this.activeDrawer = null; // 关闭抽屉
    },

    keepDrawerOpen() {
      // 不做任何操作，保持抽屉打开
    },

    navigate(item) {
      // 根据点击的导航项推送正确的路由
      console.log(item); // 查看点击时传递的 item 对象
      const path = `/home/${item}`;
      this.$router.push({ path: path });
      this.activeDrawer = null; // 关闭抽屉
    },

    fetchPopularCompetitions() {
      const competitionSearch = { popular: 1 }; // 指定获取热门竞赛
      this.$http
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
    console.log(this.navItems); // 查看 navItems 数组的内容
    const userId = sessionStorage.userId;

    if (!userId) {  //未登录重定向到注册
     
    }

    this.$http.get(`/uis/v1/ui/${userId}`)
      .then(response => {
        console.log('User data:', response.data);
        this.userInfo = response.data;
        this.loading = false;
      }).catch(error => {
        console.error('Error fetching user data:', error);
      }).finally(() => {
        this.loading = false;
      });

    this.$nextTick(() => {// 初次加载时计算高度
      this.updateHeaderHeight();
    });

    window.addEventListener('resize', this.updateHeaderHeight);// 窗口变化时重新计算
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateHeaderHeight); // 组件销毁时清除事件监听
  },


};
</script>

<style scoped>
/* 控制主内容区域的高度，使其填充整个窗口，并留出顶部导航栏的高度 */
.main-content {
  padding: 0;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 顶部导航栏整体样式 */
.navbar {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 10000;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 导航栏内部容器 */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;

}

/* LOGO 样式 */
.logo {
  /* 可选：增加视觉过渡效果 */
  transition: color 0.3s;

  /* 鼠标悬停时显示手型指针 */
  cursor: pointer;

  font-size: 1.8em;
  font-weight: bold;
  color: #5a67d8;
}

.logo:hover {
  color: #474cb3;
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  gap: 40px;
  height: 50px;
  position: relative;
}

.nav-item {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  position: relative;
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 子元素垂直居中 */
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
  gap: 5px;
  /* 调整图片和文字之间的间距 */
}

/* 导航项图标样式 */
.nav-item-icon {
  width: 15px;
  /* 调整图片宽度 */
  height: 15px;
  /* 调整图片高度 */
}

/* 鼠标悬停时文字滑动效果 */
.nav-item:hover {
  color: #5a67d8;
  transform: translateY(-5px);
  /* 向上滑动效果 */
}

/* 抽屉样式 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 77px;
  /* 高度为页面高度的五分之二 */
  height: calc(40vh - 77px);
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 保证抽屉在内容之上，但在导航栏之下 */
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.drawer-content {
  max-width: 1000px;
  width: 100%;
  text-align: center;
  /* 调整这个值来改变与抽屉顶部的距离 */
  margin-top: 40px;

}

/* 当抽屉打开时，设置transform为0，显示抽屉 */
.drawer {
  transform: translateY(0);
}

.right-column {
  display: flex;
  flex-wrap: wrap;
  /* 允许换行 */
  justify-content: center;
  /* 水平居中 */
  align-items: stretch;
  /* 使所有列高度一致 */
  margin: 0 auto;
  /* 水平居中整个容器 */
  width: 70%;
  /* 占满宽度 */
  padding: 0px;
  /* 内边距 */
}

.resource-column {
  flex: 0 1 auto;
  /* 根据内容自动调整大小，但允许缩小 */
  max-width: 45%;
  /* 设置最大宽度 */
  min-width: 400px;
  /* 设置最小宽度，防止卡片过窄 */
  margin: 0px;
  /* 外边距，确保卡片之间有间距 */
  padding: 10px;
  /* 内边距 */
  border: 1px solid #e0e0e0;
  /* 边框 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影 */
  display: flex;
  flex-direction: column;
  /* 垂直排列内容 */
  align-items: center;
  /* 水平居中内容 */
  justify-content: flex-start;
  /* 顶部对齐内容 */
}

.drawer-title {
  font-size: 20px;
  /* 大标题字体大小 */
  color: #333;
  /* 字体颜色 */
  margin-bottom: 10px;
  /* 与内容之间的间距 */
}

.resource-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none; /* 去除下划线 */
  /* 链接之间的间距 */
  width: 100%;
  /* 占满整列宽度 */
}

.resource-item a {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 水平居中 */
  padding: 10px 20px;
  /* 内边距 */
  border-radius: 5px;
  /* 圆角边框 */
  background-color: #f0f8ff;
  /* 背景颜色 */
  color: #007bff;
  /* 文字颜色 */
  text-decoration: none;
  /* 去除下划线 */
  transition: background-color 0.3s, color 0.3s;
  /* 平滑过渡效果 */
}

.resource-item a:hover {
  background-color: #e0f7ff;
  /* 鼠标悬停时的背景颜色 */
  color: #0056b3;
  /* 鼠标悬停时的文字颜色 */
}

.resource-icon {
  width: 24px;
  /* 图标大小 */
  height: 24px;
  margin-right: 10px;
  /* 图标和文字之间的间距 */
}

.resource-item span {
  font-size: 16px;
  /* 文字大小 */
  color: #333;
  /* 文字颜色 */
}

.divider {
  width: 1px;
  /* 竖线宽度 */
  background-color: #ccc;
  /* 竖线颜色 */
  margin: 0 1px;
  /* 与内容的间距 */
}

/* 其他样式保持不变 */

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
  /* 鼠标悬停时改变链接颜色 */
  color: #4c51bf;

}

/* 社区图片样式 */
.community-image {
  width: 100%;
  /* 或者你希望的宽度 */
  height: auto;
  /* 保持图片的纵横比 */
  display: block;
  /* 防止图片下方出现空隙 */
  margin-top: 20px;
  /* 与上方内容的间距 */
}

/* 关闭按钮 */
/* 其他样式保持不变 */
.drawer-content {
  display: flex;
  flex-direction: column;
  /* 使内容在垂直方向上均匀分布 */
  justify-content: space-between;
  /* 使内容在水平方向上靠左对齐 */
  align-items: flex-start;
  max-width: 1000px;
  width: 100%;
  margin-top: 40px;
}

.button-container {
  /* 将容器推到底部 */
  margin-top: auto;
  /* 自动左边距，使容器内容靠右 */
  margin-left: auto;
  /* 根据内容自动调整宽度 */
  width: fit-content;

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
  margin-left: auto;
  /* 使元素靠右 */
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
  align-self: center;
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
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 100%; /* 抽屉的总宽度 */

}

.title-column {
  margin-right: px; /* 与内容列的间距 */
  padding: 10px;
  width: 200px;
}

.content-column {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 66.67%; /* 根据需要调整宽度以容纳三个卡片 */
  padding: 0px;
}

.left-column {
  width: 20%;
  text-align: center;
  padding: 10px 0px;
  /* 添加内边距 */
}

.drawer-title {
  font-size: 20px;
  /* 大标题字体大小 */
  color: #333;
  /* 字体颜色 */
  margin-bottom: 10px;
  /* 与内容之间的间距 */
}

/* 调整.right-column的布局为垂直排列 */
.right-column {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* 确保图片均匀分布 */
}

/* 大标题样式，使其靠左显示 */
.right-column h1 {
  text-align: left;
  /* 文字靠右对齐 */
  margin-top: 20px;
  /* 与上边的间隔 */
  margin-bottom: 20px;
  /* 与下边的间隔 */
}

/* 图片区域的容器样式 */
.image-section {
  display: flex;
  /* 使用flex布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  gap: 60px;
  /* 图片之间的间隔 */
  margin-top: 20px;
  /* 与标题的间隔 */
  margin-bottom: 20px;
  /* 与下方文字的间隔 */
}

/* 图片样式 */
.image-section img {
  width: 240px;
  /* 图片宽度 */
  height: 120px;
  /* 图片高度 */
  object-fit: cover;
  /* 确保图片覆盖整个区域，但可能会裁剪 */
}

/* 底部文字区域样式 */
.text-container {
  text-align: center;
  /* 文字居中 */
  margin-top: 20px;
  /* 与图片区域的间隔 */
}


.title-section {
  margin-right: 20px; /* 与内容区的间距 */
  text-align: center; /* 文本居中 */
  justify-content: center; /* 水平居中 */
  width: 300px;
}

.content-section {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 根据需要调整宽度以容纳内容 */
}

.resource-box {
  width: 100%; /* 资源框宽度 */
  max-width: 400px; /* 最大宽度，防止过大 */
  margin: 10px; /* 外边距 */
  text-align: center; /* 文本居中 */
}
.know-image {
  max-width: 100%; /* 图片最大宽度 */
  height: auto; /* 高度自动 */
  border-radius: 8px; /* 圆角边框 */
}

.resource-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* 链接之间的间距 */
}

.resource-item a {
  font-size: 16px;
  /* 链接文字大小 */
  color: #007bff;
  /* 链接文字颜色 */
  text-decoration: none;
  /* 去除下划线 */
  transition: color 0.3s, transform 0.3s;
  /* 平滑过渡效果 */
  display: flex;
  align-items: center;
}

.resource-item a:hover {
  color: #0056b3;
  /* 鼠标悬停时的颜色 */
  transform: translateY(-5px);
  /* 鼠标悬停时的移动效果 */
}

.resource-item img {
  width: 24px;
  /* 图片大小 */
  height: 24px;
  margin-right: 12px;
  /* 图片和文字之间的间距 */
}

/* 如果需要特别为灵验知道的文本框添加样式，可以添加一个新的类 */
.lingyan-know {
  text-align: left;
  /* 文本段文本左对齐 */
  margin-top: 0px;
  /* 与上方内容的间距 */
}

.lingyan-know p {
  text-indent: 40px;
  /* 首行缩进40像素，大约相当于两个字符的空格 */
  line-height: 1.6;
  /* 调整行间距 */
  font-size: 20px;
  /* 如果需要，可以调整字体大小 */
  color: #7e6bc4;
  /* 字体颜色 */
  text-align: justify;
  /* 如果需要两端对齐 */

}



.resource-link {
  cursor: pointer;
  color: #5a67d8;
  margin-left: 20px;
  /* 左侧外边距 */
  margin-bottom: 0px;
  /* 移除外边距 */
  text-align: left;
  /* 文本靠左对齐 */
  font-size: 1.2em;
  /* 使字体更大 */
  transition: color 0.3s ease;
  border: 0px solid #E0E0E0;
}

.recommend-card {
  display: flex;
  flex-direction: column;
  /* 垂直排列图片和文字 */
  align-items: center;
  /* 水平居中对齐 */
  margin: 0px;
  /* 图片之间的间距 */
  width: 25%;
  /* 图片宽度，三张图片一行 */
  cursor: pointer;
  /* 鼠标悬停时显示手型 */
  padding: 40px;

}

.card-image {
  width: 80%;
  /* 图片宽度 */
  height: auto;
  /* 高度自动 */
  border-radius: 8px;
  /* 圆角边框 */
  transition: transform 0.3s ease;
  /* 过渡效果 */
}

.card-title {
  margin-top: 10px;
  /* 图片和名称之间的间距 */
  font-size: 12px;
  /* 字体大小 */
  color: #333;
  /* 字体颜色 */
  text-align: center;
  /* 文本居中 */
  overflow: hidden;
  /* 隐藏溢出的文字 */
  text-overflow: ellipsis;
  /* 超出部分显示省略号 */
  white-space: nowrap;
  /* 防止文本换行 */
}

.community-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  padding: 0px;
  /* 内边距 */
}

.community-images-text {
  flex: 1;
  /* 占据可用空间 */
  text-align: center;
  /* 文本居中 */
}

.community-image {
  max-width: 60%;
  /* 图片最大宽度占满容器 */
  height: auto;
  /* 高度自动，保持图片比例 */
  margin-bottom: 5px;
  /* 图片下方间距 */
  border-radius: 8px;
  /* 圆角边框 */
  padding: 0px 150px;
}

.community-card {
  flex: 1;
  /* 占据可用空间 */
  padding: 5px;
  /* 内边距 */
  border: 1px solid #e0e0e0;
  /* 边框 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影 */
  margin: 0 20px;
  /* 外边距 */
  text-align: center;
  /* 文本居中 */
}

.resource-item {
  display: block;
  /* 块级元素，使链接独占一行 */
  margin-bottom: 10px;
  /* 链接之间的间距 */
}

.resource-item a {
  font-size: 16px;
  /* 链接文字大小 */
  color: #007bff;
  /* 链接文字颜色 */
  text-decoration: none;
  /* 去除下划线 */
  transition: color 0.3s, transform 0.3s;
  /* 平滑过渡效果 */
}

.resource-item a:hover {
  color: #0056b3;
  /* 鼠标悬停时的颜色 */
}
</style>
