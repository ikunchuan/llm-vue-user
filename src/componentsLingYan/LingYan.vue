<template>
  <el-container class="openai-app">

    <el-aside v-if="isSidebarVisible" class="sidebar">
      <!-- 左侧功能菜单 -->
      <el-menu default-active="1">
        <el-menu-item index="1" @click="navigate('history')">
          <i></i>
          <span>对话历史</span>
        </el-menu-item>
        <el-menu-item index="2" @click="navigate('settings')">
          <i></i>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <div class="logo">OpenAI</div>
          <div class="menu">
            <el-button type="text" @click="toggleSidebar">功能菜单</el-button>
          </div>
        </div>
        <div class="header-right">
          <el-dropdown>
            <!-- <span class="el-dropdown-link">
              用户中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="navigate('profile')">个人资料</el-dropdown-item>
              <el-dropdown-item @click="navigate('settings')">设置</el-dropdown-item>
              <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu> -->
          </el-dropdown>
        </div>
      </el-header>

      <!-- 中间对话区域 -->
      <el-main class="chat-container">
        <div class="messages">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]"></div>
          <div class="chat_content">{{ fullMessage }}</div>
        </div>

      </el-main>
      <el-footer>
        <!-- 底部对话框 -->
        <div class="input-area">
          <el-input v-model="inputMessage" placeholder="输入消息..." @keyup.enter="sendMessage" class="input-box">
            <template #append>
              <el-button type="primary" icon="el-icon-s-promotion" :disabled="!inputMessage.trim()"
                @click="sendMessage">
                发送
              </el-button>
            </template>
          </el-input>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isSidebarVisible: true, // 控制侧边栏显示
      inputMessage: "", // 用户输入
      fullMessage: "", //存储整个文本
      eventSource: null,
      // messages: [
      //   { role: "assistant", content: "你好！我是 AI 助手。" },
      //   { role: "user", content: "请问天气如何？" },
      // ], // 对话内容
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    sendMessage() {
      if (this.eventSource) {
        this.eventSource.close();
      }
      this.eventSource = new EventSource(`http://localhost:10086/chat/stream?message=${encodeURIComponent(this.userInput)}`);

      this.eventSource.onmessage = (event) => {
        this.fullMessage += event.data;  // 不断将新的数据添加到fullMessage中
      };

      this.eventSource.onerror = () => {
        console.error('Error occurred');
        this.eventSource.close();
      };
    },
  },

  beforeUnmount() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  },

  // 模拟回复的方法
  // sendMessage() {
  //   if (!this.inputMessage.trim()) return;

  //   // 用户消息
  //   this.messages.push({ role: "user", content: this.inputMessage });

  //   // 清空输入框
  //   this.inputMessage = "";

  //   // 模拟 AI 回复
  //   setTimeout(() => {
  //     this.messages.push({
  //       role: "assistant",
  //       content: "模拟的 AI 回复：" + this.getRandomResponse(),
  //     });
  //     this.scrollToBottom();
  //   }, 1000);

  // getRandomResponse() {
  //   const responses = [
  //     "我不太确定。",
  //     "这个问题很有意思！",
  //     "需要更详细的信息。",
  //     "好的，我会帮您处理。",
  //   ];
  //   return responses[Math.floor(Math.random() * responses.length)];
  // },

  // scrollToBottom() {
  //   this.$nextTick(() => {
  //     const container = this.$el.querySelector(".messages");
  //     container.scrollTop = container.scrollHeight;
  //   });
  // },

  // navigate(route) {
  //   console.log(`导航到: ${route}`);
  // },

  // logout() {
  //   console.log("退出登录");
  // },
};

</script>

<style scoped>
/* 限制文本容器的最大宽度，文本会自动换行 */
.messages-container {
  max-width: 600px;
  /* 设置容器的最大宽度 */
  word-wrap: break-word;
  /* 确保文本在需要时换行 */
  white-space: pre-wrap;
  /* 保留文本的换行符 */
  margin-top: 20px;
}

.openai-app {
  height: calc(100vh - 77px);
  overflow: hidden;
}

.header {
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.header-left .logo {
  font-size: 1.5em;
  font-weight: bold;
}

.layout {
  flex: 1;
}

.sidebar {
  width: 250px;
  background: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 10px;
  word-break: break-word;
}

.message.user {
  align-self: flex-end;
  background-color: #409eff;
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background-color: #f0f0f0;
  color: #333;
}

.input-area {
  display: flex;
  padding: 10px;
  background: #f4f4f8;
}

.input-box {
  width: 100%;
}
</style>
