<template>
    <div class="flex h-screen bg-gray-100">
      <!-- 左侧导航栏 -->
      <aside class="w-64 bg-white shadow-md flex flex-col">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-gray-800">灵验知道</h2>
          <p class="text-sm text-gray-500">智能助手</p>
        </div>
        <div class="flex-1 overflow-auto p-4">
          <h3 class="text-gray-600 font-medium mb-2">今天</h3>
          <ul>
            <li v-for="item in todayItems" :key="item" class="mb-2">
              <a href="#" class="text-gray-700 hover:text-blue-500">{{ item }}</a>
            </li>
          </ul>
          <h3 class="text-gray-600 font-medium mt-6 mb-2">昨天</h3>
          <ul>
            <li v-for="item in yesterdayItems" :key="item" class="mb-2">
              <a href="#" class="text-gray-700 hover:text-blue-500">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="p-4 border-t">
          <p class="text-sm text-gray-500">无权限数据权限团队功能</p>
        </div>
      </aside>
  
      <!-- 主内容区域 -->
      <main class="flex-1 flex flex-col">
        <!-- 顶部导航栏 -->
        <header class="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 class="text-lg font-bold">ChatGPT 4.0</h1>
          <div class="flex items-center space-x-4">
            <button class="text-gray-600 hover:text-blue-500">
              <i class="fas fa-search"></i>
            </button>
            <img
              src="https://via.placeholder.com/32"
              alt="user-avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
        </header>
  
        <!-- 中间聊天内容 -->
        <div class="flex-1 flex flex-col items-center justify-center p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            有什么可以帮忙的？
          </h2>
          <div
            class="w-full max-w-3xl bg-gray-100 rounded-lg p-4 shadow-sm flex items-center space-x-4"
          >
            <input
              type="text"
              placeholder="给灵验知道发送消息"
              class="flex-1 bg-transparent border-none focus:outline-none text-gray-700"
            />
            <button class="text-gray-600 hover:text-blue-500">
              <i class="fas fa-paperclip"></i>
            </button>
            <button class="text-gray-600 hover:text-blue-500">
              <i class="fas fa-globe"></i>
            </button>
            <button class="text-gray-600 hover:text-blue-500">
              <i class="fas fa-microphone"></i>
            </button>
          </div>
          <div class="mt-4 flex space-x-2">
            <button
              v-for="action in actions"
              :key="action"
              class="px-4 py-2 bg-white shadow-sm rounded-full text-gray-700 hover:bg-gray-100"
            >
              {{ action }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todayItems: [
          "Vue 页面布局实现",
          "前后端评论功能实现",
          "点击卡片跳转详情",
          "框架布局代码",
        ],
        yesterdayItems: [
          "Vue 路由与框架设计",
          "报表内容总结",
          "酒店预订术语表",
        ],
        actions: ["创建图片", "构思", "总结文本", "帮我写", "提供建议", "更多"],
      };
    },
  };
  </script>
  
  <style scoped>
  /* 美化滚动条 */
  aside::-webkit-scrollbar {
    width: 6px;
  }
  aside::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  aside::-webkit-scrollbar-track {
    background-color: transparent;
  }
  </style>
  