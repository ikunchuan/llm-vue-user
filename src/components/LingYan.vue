<template>
  <div class="leetcode-container">
      <h1>数学</h1>
      <p>LeetCode·609题·公开</p>
      <button @click="startPractice">开始练习</button>
      <p>数字是利用符号语言研究数量、结构、变化以及空间等概念的一门学科，从某种角度看属于形式科学的。</p>
      <p>2024/11/15 15:32 使用本数据集分析和揭示不同的社交媒体使用习惯对个体情绪状态的影响。</p>
  
      <table>
          <thead>
          <tr>
              <th></th>
              <th>概述文件</th>
              <th>相关项目</th>
              <th>评论</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in problems" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.relatedProject }}</td>
              <td>{{ item.difficulty }}</td>
          </tr>
          </tbody>
      </table>
  
      <div class="question">
          <p>12. (单选题) 在kmeans算法中, 以下哪个策略可以用于避免陷入局部最优解?</p>
          <ul>
          <li>A. 多次随机初始化质心</li>
          <li>B. 增加聚类个数</li>
          <li>C. 减少聚类个数</li>
          <li>D. 增加数据点的数量</li>
          </ul>
      </div>
      </div>
  </template>
  
  <script>
  export default {
      data() {
      return {
          problems: [
          { id: '2.15', description: '数相加', relatedProject: '', difficulty: '中等' },
          { id: '7.1', description: '数反转', relatedProject: '', difficulty: '中等' },
          { id: '9.', description: '回文数', relatedProject: '', difficulty: '简单' },
          { id: '12.', description: '整数刻罗马数字', relatedProject: '', difficulty: '中等' },
          { id: '13.', description: '罗马数字转整数', relatedProject: '', difficulty: '简单' },
          { id: '29.', description: '两数相除', relatedProject: '', difficulty: '中等' },
          { id: '43.', description: '字符相乘', relatedProject: '', difficulty: '中等' },
          { id: '48.', description: '旋转图像', relatedProject: '', difficulty: '中等' },
          { id: '50.', description: 'Pow(x, n)', relatedProject: '', difficulty: '中等' },
          { id: '60.', description: '排列列', relatedProject: '', difficulty: '困难' }
          ]
      };
      },
      methods: {
      startPractice() {
          alert('开始练习');
      }
      }
  };
  </script>
  
  <style scoped>
  .leetcode-container {
      width: 80%;
      margin: 0 auto;
  }
  
  table {
      width: 100%;
      border-collapse: collapse;
  }
  
  th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
  }
  
  th {
      background-color: #f2f2f2;
  }
  
  .question {
      margin-top: 20px;
  }
  
  button {
      margin-bottom: 10px;
  }
  </style>