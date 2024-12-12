

<template>
    <div class="layout-container">
      <!-- 上框 -->
      <div class="top-info">
        <div class="info-content">
          
      
          
          <div class="info-details">
            <div class="info-text">
              <img src="https://img95.699pic.com/element/40119/6081.png_860.png" alt="数学" class="math-icon" >
          <h1>数学</h1>
              <p>LeetCode·609题·公开</p>
              <p>数字是利用符号语言研究数量、结构、变化以及空间等概念的一门学科，从某种角度看属于形式科学的...</p>
            </div>
            <div class="info-footer">
              <span>2024/11/15 15:32</span>
              <span>使用本数据集分析和揭示不同的社交媒体使用习惯对个体情绪状态的影响。</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 下框 -->
      <div class="row-container">
        
          <el-tabs :tab-position="tabPosition"  class="demo-tabs">
            <el-tab-pane label="User">User</el-tab-pane>
            <el-tab-pane label="Config">Config</el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Taskddwwdwdwdwdwdwdw">Taskddwwdwdwdwdwdwdw</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import type { TabsInstance } from 'element-plus'
  
  
  export default {
    setup() {
      const tabPosition = ref("left") // 控制标签页的排列方向
      return { tabPosition }
    },
    data() {
      return {
        problems: [
          // ... your problems array
        ],
        currentProblem: null // Add a new property to store the currently selected problem
      };
    },
    methods: {
      startPractice() {
        alert('开始练习');
      },
      selectProblem(problem) {
        this.currentProblem = problem; // Update the currentProblem when a problem is selected
      }
    }
  };
  </script>
  
  <style scoped>
  .layout-container {
    display: flex;
    flex-direction: column; /* 上下排列 */
    gap: 20px; /* 两个大框之间的间距 */
    width: 90%;
    margin: 0 auto;
  }
  /* 页面顶部信息样式 */
  .top-info {
    background-color: #f8f8f8; /* 背景颜色 */
    padding: 20px; /* 内边距 */
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    margin-left: auto;
    margin-right: auto;
    width: 1200px; /* 自定义宽度 */
    height: 200px; /* 自定义高度 */
    border: 1px solid #E0E0E0; /* 边框颜色 */
      border-radius: 5px;
  }
  
  .math-icon {
    width: 40px; /* 图标宽度 */
    height: 40px; /* 图标高度 */
    margin-right: 20px; /* 图标与文本之间的间距 */
  }
  
  .info-content {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    
  }
  
  .info-details {
    display: flex; /* 使用flex布局 */
    flex-direction: column; /* 垂直排列子元素 */
  }
  
  .info-text {
    margin-bottom: 10px; /* 与底部信息之间的间距 */
  }
  
  .info-footer {
    color: #888; /* 底部信息的颜色 */
    font-size: 14px; /* 字体大小 */
  }
  .row-container {
    display: flex;
    gap: 20px; /* 左右小框之间的间距 */
    flex: 1;
    margin-left: auto;
    margin-right: auto;
    width: 1250px; /* 自定义宽度，可以根据需要调整 */
    height: 600px; 
    /* 注释掉或者根据需要调整 */
    background-color: #F4F6F8; /* 浅灰背景 */
      border: 1px solid #E0E0E0; /* 边框颜色 */
      border-radius: 5px;
  }
  
  /* 为el-tabs设置样式 */
  .demo-tabs {
    width: 1200px; /* 设置一个固定的宽度，比如800px */
    height: 600px; /* 设置一个固定的高度 */
    margin-left: auto;
    margin-right: auto; /* 使容器水平居中 */
  }
  
  </style>