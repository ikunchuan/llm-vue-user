<template>
    <div>
      <iframe
        :src="videoUrl"
        scrolling="no"
        frameborder="no"
        allowfullscreen
        style="width: 100%; height: 500px;"
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: "BilibiliPlayer",
    props: {
      bvid: {
        type: String,
        required: true, // BVID 是必需的
      },
    },
    data() {
      return {};
    },
    computed: {
      videoUrl() {
        // 动态生成 B站播放器 URL
        return `https://player.bilibili.com/player.html?bvid=${this.bvid}`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可以根据需要添加样式 */
  </style>
  