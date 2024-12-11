<template>
    <div class="main-page">
    <div class="container mt-4">
        <div class="row">
        <!-- 左侧内容区域 -->
        <div class="col-md-9">
            <!-- 功能分类区域 -->
            <!-- 按钮区域 -->
            <div class="button-container">
                <div class="button-card" v-for="(button, index) in buttons" :key="index">
                    <el-button type="text" class="custom-button">
                        <div class="button-content">
                            <i :class="button.icon" class="button-icon"></i>
                            <span class="button-text">{{ button.text }}</span>
                        </div>
                    </el-button>
                </div>
            </div>


            <!-- 搜索与筛选区域 -->
            <div class="search-filter bg-white p-3 rounded shadow-sm mb-4">
                <el-tabs v-model="activeTab">
                    <el-tab-pane label="最热" name="hot"></el-tab-pane>
                    <el-tab-pane label="推荐" name="recommend"></el-tab-pane>
                    <el-tab-pane label="最新" name="latest"></el-tab-pane>
                </el-tabs>
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索内容"
                    class="mt-3"
                    prefix-icon="el-icon-search"
                />
            </div>

            <!-- 内容列表 -->
            <div class="content-list">
                <!-- 列表内容会在后面实现 -->
                </div>

                <!-- 分页 -->
                <div class="pagination mt-3">
                <!-- 分页功能会在后面实现 -->
                </div>
            </div>

            <!-- 右侧推荐栏 -->
            <div class="col-md-3">
                <div class="sidebar">
                <!-- 推荐内容会在后面实现 -->
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElButton } from 'element-plus';    

export default {
data(){
return{
    // 按钮数据
    buttons: [
        { text: "职场与内推", icon: "el-icon-suitcase" },
        { text: "技术交流", icon: "el-icon-suitcase" },
        { text: "创社区", icon: "el-icon-suitcase" },
        { text: "意见反馈", icon: "el-icon-suitcase" },
    ],
    //搜索筛选功能
    activeTab: "hot",
    searchQuery: "",
};
},

methods() {},

// mounted: {},

// computed() {},

// components: {},
}
</script>

<style scoped>
.main-page {
    max-width: 900px; /* 主容器宽度 */
    margin: 0 auto; /* 水平居中 */
    padding: 20px; /* 内边距 */
    background-color: #f4f6f8; /* 浅灰背景 */
    border-radius: 12px; /* 圆角效果 */
    display: flex;
    justify-content: center;
    align-items: center;
}
/* -----------------按钮区域--------------- */
/* 按钮容器 */
.button-container {
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 按钮之间等距 */
    gap: 20px; /* 按钮之间的间距 */
    width: 100%; /* 容器宽度 */
}

/* 按钮卡片样式 */
.button-card {
    background-color: #ffffff; /* 白色背景 */
    border-radius: 12px; /* 圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    width: 100px; /* 固定宽度 */
    height: 60px; /* 固定高度 */
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, box-shadow 0.3s; /* 鼠标悬停动画 */
}

/* 鼠标悬停效果 */
.button-card:hover {
    transform: translateY(-4px); /* 上移效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影增强 */
}

/* 按钮内容样式 */
.custom-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; /* 图标在上，文字在下 */
    background: none; /* 按钮背景透明 */
    border: none; /* 移除默认边框 */
    width: 100%;
    height: 100%;
    cursor: pointer;
}

/* 图标样式 */
.button-icon {
  font-size: 32px; /* 图标大小 */
  color: #5a67d8; /* 图标颜色 */
}

/* 文字样式 */
.button-text {
  font-size: 14px; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  color: #333; /* 字体颜色 */
  margin-top: 8px; /* 图标和文字之间的间距 */
}
/* ————————————搜索区域—————— */
.search-filter {
    margin-bottom: 20px;
}
</style>
