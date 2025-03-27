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
        <div><!-- 用户和助手消息展示 -->
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
            <img :src="message.role.avatar" alt="user" class="avatar" />
            <div class="bubble">{{ message.content }}</div>
          </div>
        </div>

        <!-- AI 正在输入的加载动画 -->
        <div v-if="isTyping" class="message_ai">
          <el-icon class="typing-icon" icon="el-icon-loading"></el-icon>
          <img src="https://via.placeholder.com/32" alt="AI" class="avatar" />
          <div class="bubble typing-indicator">
            <span></span><span></span><span></span>
          </div>
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
import { Loading } from '@element-plus/icons-vue';
import axios from 'axios';
export default {
  data() {
    return {
      isSidebarVisible: true, // 控制侧边栏显示
      inputMessage: "", // 用户输入
      messages: [], //存储整个用户的对话文本//AI的对话文本
      eventSource: null, //保存ES对象
      isTyping: false,// 是否显示“AI 正在输入”
    };
  },

  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    sendMessage() {
      console.log(this.messages); // 打印 this，确保 messages 存在
      if (!this.inputMessage.trim()) return;

      // 将用户消息添加到 messages 中
      this.messages.push({
        role: "user",
        content: this.inputMessage,
        avatar: "https://via.placeholder.com/32", // 设置头像链接
      });


      // 向服务器发送消息
      if (this.eventSource) {
        this.eventSource.close();
      }

      const url = `/chat/stream?message=${encodeURIComponent(this.inputMessage)}`
      this.eventSource = new EventSource(url);

      // 设置“AI 正在输入”状态
      this.isTyping = true;

      // 接收服务器消息流
      let aiMessage = { role: "ai", content: "", avatar: "https://via.placeholder.com/32" };
      this.messages.push(aiMessage); // 预留一条消息，动态更新内容

      this.eventSource.onmessage = (event) => {
        aiMessage.content += event.data.replace(/\n/g, "<br />") // 更新 AI 消息内容
      };

      this.eventSource.onerror = () => {
        console.error('连接出错');
        this.eventSource.close();
        this.isTyping = false; // 移除“AI 正在输入”
      };

      this.eventSource.onopen = () => {
        console.log("连接已打开");
      };

      // 监听连接关闭（服务器端主动结束 SSE 流时）
      this.eventSource.addEventListener("end", () => {
        this.isTyping = false; // 移除“AI 正在输入”
        this.eventSource.close();
      });

      // 清空输入框
      this.inputMessage = "";

    },

    // // 格式化响应数据
    // formatMessage(message) {
    //   const formattedMessage = message.replace(/([a-zA-Z]+)/g, "$1 ").replace(/([。！？])/g, "$1\n");
    //   return formattedMessage;
    // },
  },

  beforeUnmount() { // 组件销毁时关闭 SSE 连接
    if (this.eventSource) {
      this.eventSource.close();
    }
  },

  scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$el.querySelector(".messages");
      container.scrollTop = container.scrollHeight;
    });
  },
  components: { Loading },
};
</script>

<style scoped>
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

.sidebar {
  width: 250px;
  background: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.chat-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #fff;
}

.message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.message.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message .bubble {
  padding: 10px;
  border-radius: 10px;
  background: #f0f0f0;
  max-width: 70%;
  word-wrap: break-word;
}

.message.user .bubble {
  background-color: #409eff;
  color: white;
}

.input-area {
  display: flex;
  gap: 10px;
}

.input-box {
  width: 100%;
}

.typing-indicator {
  display: flex;
  gap: 5px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #ccc;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
