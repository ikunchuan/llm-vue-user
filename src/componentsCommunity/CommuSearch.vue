<template>
  <!-- 页面顶部介绍区域 -->
  <div class="page-header">
    <h1>欢迎来到全部社区</h1>
    <p class="page-description">
      在这里，您可以找到学习交流的社区，与大家共同进步和成长。
    </p>
    <div class="stats-row">
      <div class="stat-card">
        社区总数：<span>{{ communities.length }}</span>
      </div>
      <div class="stat-card">今日新增：<span>5</span></div>
      <div class="stat-card">活跃用户：<span>2345</span></div>
    </div>
  </div>
  <div class="commu-search-page">
    <!-- 外框包裹 -->
    <div class="container-box">
      <!-- 搜索框 -->
      <div class="search-bar">
        <el-row :gutter="10">
          <!-- 搜索输入框 -->
          <el-col :span="20">
            <el-input v-model="searchQuery" placeholder="搜索社区" prefix-icon="el-icon-search" clearable />
          </el-col>
        </el-row>
      </div>

      <!-- 社区列表 -->
      <el-row :gutter="20">
        <el-col v-for="community in filteredCommunities" :key="community.communityId" :span="6"
          @mouseenter="() => (joinButtonVisible[community.communityId] = true)"
          @mouseleave="() => (joinButtonVisible[community.communityId] = false)"
          @click="navigateToCommuDetail(community)">
          <el-card class="community-card" shadow="hover">
            <div class="card-content">
              <div class="icon-container">
                <img :src="communityIcons[community.communityName]" alt="Community Icon" class="community-icon"
                  :style="{ width: iconSize + 'px', height: iconSize + 'px' }" />
              </div>
              <div class="text-container">
                <h3>{{ community.communityName }}</h3>
                <el-button v-if="
                  joinButtonVisible[community.communityId] &&
                  !community.joined
                " type="primary" @click="joinCommunity(community.communityId, community)"
                  :disabled="community.joined">
                  {{ community.joined ? "已加入" : "加入" }}
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash"; // 确保引入lodash

export default {
  name: "CommuSearch",
  created() {
    this.fetchCommunities();
  },
  watch: {
    searchQuery(newQuery) {
      this.debounceSearch();
    },
  },
  data() {
    return {
      searchQuery: "",
      communities: [], // 存储社区数据
      filteredCommunities: [], // 过滤后的社区列表
      debounceTimer: null,
      joinButtonVisible: {}, // 存储每个社区的按钮显示状态
      resourceBoxes: [], // 确保这里定义了 resourceBoxes
      communityIcons: {
        创新设计官方社区: "/src//assets/img/17.png",
        创业实践官方社区: "/src/assets/img/18.png",
        科技研发官方社区: "/src/assets/img/19.png",
        程序设计官方社区: "/src/assets/img/20.png",
        网络安全官方社区: "/src/assets/img/21.png",
        人工智能与大数据官方社区: "/src/assets/img/22.png",
        数据挖掘与分析: "/src/assets/img/23.png",
        数学知识: "/src/assets/img/24.png",
        数学建模: "/src/assets/img/25.png",
        财务会计: "/src/assets/img/26.png",
        企业运营与管理: "/src/assets/img/27.png",
        供应链与物流: "/src/assets/img/28.png",
        商业案例分析: "/src/assets/img/29.png",
        市场分析调查: "/src/assets/img/30.png",
        社会调研分析: "/src/assets/img/31.png",
        语言表达: "/src/assets/img/32.png",
        英语应用: "/src/assets/img/33.png",
        跨文化交流: "/src/assets/img/34.png",
        市场分析调查1: "/src/assets/img/30.png",

        imagetest: "/src/assets/img/35.png",
        // 添加其他社区的图标路径
      },
      iconSize: 30, // 图标大小，可以根据需要调整
    };
  },
  methods: {
    // 获取社区列表
    fetchCommunities() {
      axios
        .get("/v1/cmns/cmn")
        .then((response) => {
          console.log("获取到的社区数据：", response.data); // 查看返回的数据结构
          this.communities = response.data.map((community) => ({
            ...community,
            joined: false, // 假设初始状态为未加入
          }));
          this.filteredCommunities = [...this.communities]; // 初始时，过滤列表与完整列表相同
        })
        .catch((error) => {
          console.error("获取社区列表失败:", error);
        });
    },
    // 实现搜索
    search() {
      console.log("搜索条件：", this.searchQuery); // 查看搜索条件
      this.filteredCommunities = this.communities.filter(
        (community) =>
          community.communityName &&
          community.communityName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
      console.log("过滤后的社区：", this.filteredCommunities); // 查看过滤后的结果
    },
    debounceSearch: _.debounce(function () {
      this.search();
    }, 300),

    // 实现加入社区(这里还有bug，传了两个东西？)
    joinCommunity(communityId, community) {
      const userId = this.getCurrentUser().userId; // 获取当前用户ID
      axios
        .post("/ucmns/v1/ucmn", {
          userId: userId,
          communityId: communityId,
        })
        .then((response) => {
          // 加入成功后，更新社区状态
          community.joined = true;
          this.joinButtonVisible[communityId] = false; // 隐藏按钮
        })
        .catch((error) => {
          console.error("加入社区失败:", error);
        });
    },
    navigateToCommuDetail(community) {
      if (!community || !community.communityId) {
        console.error("社区 ID 为空，无法跳转");
        return;
      }
      console.log("跳转的社区 ID:", community.communityId);
      this.$router.push({
        name: "CommuDetail",
        params: {
          communityId: community.communityId,
          communityName: community.communityName,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 页面顶部介绍区域 */
.page-header {
  text-align: center;
  margin: 20px 0;
}

.page-header h1 {
  font-size: 28px;
  color: #333;
}

.page-description {
  color: #666;
  font-size: 14px;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
}

.stat-card span {
  color: #5a67d8;
  font-size: 18px;
}

/* 卡片交互按钮 */
.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.el-button {
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: scale(1.1);
}

/* 整体外框 */
.container-box {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

/* 搜索框 */
.search-bar {
  margin: 20px 0;
}

/* 卡片样式 */

.community-card {
  padding: 20px;
  display: flex;
  align-items: flex-start;
  /* 确保内容从顶部开始 */
  flex-direction: row;
  /* 水平布局 */
  transition: transform 0.3s ease;
}

.icon-container {
  margin-right: 20px;
  /* 图片和文本之间的间距 */
}

.community-icon {
  width: 40px;
  /* 图标大小 */
  height: 40px;
}

.text-container {
  display: flex;
  flex-direction: column;
  /* 文本和按钮垂直排列 */
  justify-content: center;
  /* 垂直居中对齐 */
}

.text-container h3 {
  font-size: 16px;
  margin: 0;
}

.community-card:hover {
  transform: scale(1.05);
  /* 鼠标悬停时放大效果 */
}

/* 卡片内文字样式 */
.card-content h3 {
  font-size: 16px;
  margin-bottom: 20px;
}

/* 按钮动态显示 */
.el-button {
  margin-top: 10px;
  transition: opacity 0.3s ease;
  /* 添加按钮显隐的过渡效果 */
}

.el-button[disabled] {
  background-color: #ccc;
  /* 禁用状态按钮变灰 */
}

/* 基础颜色变量 */
:root {
  --primary-color: #7c73e6;
  --secondary-color: #c4c1e0;
  --accent-color: #ffe9e3;
  --background-color: #fafafa;
}

/* 页面整体布局 */
.main-page {
  background-color: var(--background-color);
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px 15px;
  background-color: var(--secondary-color);
  /* 修改背景颜色 */
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* 卡片样式 */
.post-card {
  background-color: var(--accent-color);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 3px;
  margin-bottom: 10px;
  border-left: 5px solid var(--primary-color);
  /* 修改左侧配色条颜色 */
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

/* 标签样式 */
.post-tag {
  background-color: var(--primary-color);
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
}

/* 标题样式 */
.post-title {
  color: var(--primary-color);
  font-size: 18px;
  margin: 8px 0;
  font-weight: 600;
  transition: color 0.3s ease;
}

/* 摘要样式 */
.post-summary {
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.4;
  max-height: 3.6em;
}

/* 信息样式 */
.post-info {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 13px;
  margin-top: 10px;
}

/* 侧边栏推荐社区 */
.recommend-card,
.related-card,
.guess-card {
  padding: 5px 5px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: var(--accent-color);
  /* 修改背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* 创建社区板块 */
.create-community-card {
  padding: 5px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: var(--accent-color);
  /* 修改背景颜色 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.create-community-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--secondary-color);
  /* 修改悬停背景颜色 */
}

/* 创建社区表单整体样式 */
.create-community-dialog {
  width: 600px;
}

/* 输入框样式 */
.el-input,
.el-textarea,
.el-select {
  border-radius: 15px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.el-input:focus,
.el-textarea:focus,
.el-select:hover {
  border-color: var(--primary-color);
  /* 修改聚焦和悬停边框颜色 */
  box-shadow: 0 0 5px rgba(124, 115, 230, 0.3);
}

/* 底部按钮区域 */
.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 3px;
}

.btn-cancel {
  border-radius: 20px;
  color: #333;
  background-color: var(--accent-color);
  /* 修改背景颜色 */
  border: none;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background-color: var(--secondary-color);
  /* 修改悬停背景颜色 */
}

.btn-submit {
  border-radius: 20px;
  background-color: var(--primary-color);
  /* 修改背景颜色 */
  border-color: var(--primary-color);
  /* 修改边框颜色 */
  color: #fff;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  background-color: #6453b1;
  border-color: #6453b1;
}
</style>
