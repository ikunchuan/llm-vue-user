<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <h2>询问记录</h2>
      <ul>
        <li v-for="record in records" :key="record.id" @click="selectRecord(record)">
          {{ record.text }}
        </li>
      </ul>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部描述区 -->
      <div class="top-description">
        <h1>灵验领航</h1>
        <p>有什么可以帮忙的？</p>
      </div>

      <!-- 聊天内容显示区 -->
      <div class="chat-content">
        <div v-for="(message, index) in messages" :key="index" class="message-item">
          <div :class="['message', message.isUser ? 'user-message' : 'ai-message']">
            <span>{{ message.text }}</span>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="input-container">
        <input
          v-model="inputText"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="给'灵验领航'发送消息"
          class="input-text"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { text: "欢迎使用灵验知道！请问您有什么问题？", isUser: false },
      ],
      inputText: "",
      records: [
        { id: 1, text: "个人主页布局修改" },
        { id: 2, text: "表单验证问题排查" },
        // 更多记录...
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.inputText.trim() !== "") {
        this.messages.push({ text: this.inputText, isUser: true });
        this.inputText = "";

        // 模拟 AI 回复
        setTimeout(() => {
          this.messages.push({
            text: "这是一个模拟回复。灵验知道正在努力改进！",
            isUser: false,
          });
        }, 1000);
      }
    },
    selectRecord(record) {
      // 选中记录时的处理逻辑
      console.log("Selected record:", record);
    },
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px; /* 侧边栏宽度 */
  background-color: #f4f4f4;
  padding: 20px;
  overflow-y: auto; /* 垂直滚动条 */
}

.sidebar h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px 0;
  cursor: pointer;
}

.sidebar li:hover {
  background-color: #ddd;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0px 20px 15px 25px;
}

.top-description {
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
}

.message-item {
  margin-bottom: 10px;
}

.message {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
}

.user-message {
  background-color: #e0e0e0;
  text-align: right;
}

.ai-message {
  background-color: #f0f0f0;
  text-align: left;
}

.input-container {
  padding: 10px;
  background-color: #e0e0e0;
}

.input-text {
  width: 100%; /* 默认宽度为100% */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 当屏幕宽度大于768px时，输入框宽度为80% */
@media (min-width: 768px) {
  .input-text {
    width: 90%;
  }
}
</style>