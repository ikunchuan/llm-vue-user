<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-button  type="primary" round @click="openIframe">开启会话</el-button>
      </el-aside>

      <el-container>
        <el-header class="lingyantitle">
          灵验领航,伴您一路成长
        </el-header>

        <el-main>

          <iframe src="http://localhost/chatbot/YsfCrau3h9HVXv8e" v-show="iframeVisible"
           style="width: 100%; height: 95%; min-height: 830px" frameborder="0" allow="microphone">
          </iframe>
        
        </el-main>
      </el-container>
    </el-container>

  </div>




</template>

<script>
import { Loading } from '@element-plus/icons-vue';

export default {
  data() {
    return {
      isSidebarVisible: true, // 控制侧边栏显示
      inputMessage: "", // 用户输入
      messages: [{ role: "", content: "", avatar: "" }], //存储整个用户的对话文本//AI的对话文本
      eventSource: null, //保存ES对象
      isTyping: false,// 是否显示“AI 正在输入”
      iframeVisible: false,
    };
  },

  methods: {

    openIframe() {
      this.iframeVisible = !this.iframeVisible;
    },

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

      const url = `http://localhost:10086/chat/stream?message=${encodeURIComponent(this.inputMessage)}`
      this.eventSource = new EventSource(url);

      // 设置“AI 正在输入”状态
      this.isTyping = true;

      // 接收服务器消息流
      let aiMessage = { role: "ai", content: "", avatar: "https://via.placeholder.com/32" };
      this.messages.push(aiMessage); // 预留一条消息，动态更新内容

      this.eventSource.onmessage = (event) => {
        aiMessage.content += event.data.replace(/\n/g, "<br/>") // 更新 AI 消息内容
        this.scrollToBottom(); // 每次消息更新后滚动到最底部
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

    // 自动滚动到最底部
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
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
  gap: 10px;
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

.lingyantitle {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  padding: 20px;
  /* 标题留出空隙 美观 */
  font-size: 30px;
}

.sideconversition {
  display: flex;
  justify-content: center;
  padding: 20px;
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
