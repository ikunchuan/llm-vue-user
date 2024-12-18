<template>
    <div class="browsing-history">
      <el-card class="history-card">
        <div slot="header" class="clearfix">
          <span>浏览历史</span>
        </div>
        <div v-if="history.length === 0">
          <p class="empty-message">暂无浏览记录</p>
        </div>
        <div v-for="(item, index) in history" :key="index" class="history-item">
          <div class="item-title" @click="goToDetail(item.id)">{{ item.title }}</div>
          <el-button type="text" icon="el-icon-delete" @click="removeHistory(item.id)">删除</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        history: [],
        userId: sessionStorage.userId,
      };
    },
    created() {
      this.fetchHistory();
    },
    methods: {
      fetchHistory() {
        this.$http.get(`/v1/browsing/history?userId=${this.userId}`)
          .then(response => {
            this.history = response.data;
          })
          .catch(error => {
            console.error('获取浏览历史失败:', error);
            this.$message.error('获取浏览历史失败');
          });
      },
      removeHistory(historyId) {
        this.$http.delete(`/v1/browsing/history/${historyId}`)
          .then(() => {
            this.fetchHistory();
            this.$message.success('删除成功');
          })
          .catch(error => {
            console.error('删除浏览历史失败:', error);
            this.$message.error('删除失败');
          });
      },
      goToDetail(historyId) {
        this.$router.push({ name: 'HistoryDetail', params: { historyId } });
      },
    },
  };
  </script>
  
  <style scoped>
  .browsing-history {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .history-card {
    background-image: linear-gradient(to right, #c4c1e0, #ffe9e3);
    color: #fff;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .history-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .el-card__header {
    padding: 15px;
    font-weight: 500;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.1);
    border-bottom: none;
  }
  
  .empty-message {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin: 20px;
  }
  
  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .history-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .item-title {
    font-size: 16px;
    color: #fff;
    margin-right: 10px;
  }
  
  .el-button {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
  }
  
  .el-button:hover {
    color: #ff8c00;
  }
  </style>