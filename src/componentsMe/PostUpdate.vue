<template>
  <div class="main-container">
    <!-- 上方容器，包含富文本编辑器和表单 -->
    <div class="top-container">
      <!-- 左侧富文本编辑器 -->
      <div class="editor-container">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated"
          style="height: 500px; overflow-y: hidden" />
      </div>

      <!-- 中间间隔 -->
      <div class="space-container"></div>

      <!-- 右侧表单 -->
      <div class="form-container">
        <el-form label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
          <!-- <el-form-item label="用户id">
            <el-input
              v-model="formLabelAlign.name"
              placeholder="请输入用户ID"
            />
          </el-form-item>
          <el-form-item label="社区名称">
            <el-input
              :label="formLabelAlign.communityName"
              placeholder="请输入社区名称"
            />
          </el-form-item> -->
          <el-form-item label="帖子标题">
            <el-input v-model="formLabelAlign.type" placeholder="请输入帖子标题" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 下方容器，包含底部按钮 -->
    <div class="footer-container">
      <div class="button-container">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="publish" style="margin-left: 10px">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, onMounted, reactive } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import axios from "axios"; // 导入axios用于发送HTTP请求
import { ElMessage } from "element-plus"; // 导入 ElMessage
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    const editorRef = ref(null);
    const valueHtml = ref("");
    const toolbarConfig = {}; // 你的工具栏配置
    const editorConfig = {}; // 你的编辑器配置
    const mode = "default"; // 编辑器模式

    const labelPosition = ref("right");
    const itemLabelPosition = ref("");
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });

    const handleCreated = (editor) => {
      editorRef.value = editor;
    };

    const cancel = () => {
      clearEditor();
      router.push("/home/me");
    };

    // 添加新的响应式数据
    const route = useRoute(); // 需要在文件顶部引入: import { useRoute } from 'vue-router'
    const postId = ref(null);

    const router = useRouter(); // 添加这一行

    // 获取帖子详情的方法
    const getPostDetail = async (id) => {
      try {
        const response = await axios.get(`/v1/posts/post/${id}`);
        if (response.data) {
          // 填充表单数据
          formLabelAlign.name = response.data.userId;
          formLabelAlign.postId = response.data.postId;
          formLabelAlign.region = response.data.communityId;
          formLabelAlign.communityName = response.data.communityName;
          formLabelAlign.type = response.data.postTitle;
          valueHtml.value = response.data.postContent;
        }
      } catch (error) {
        console.error("获取帖子详情失败", error);
        ElMessage.error("获取帖子详情失败");
      }
    };

    // 修改 publish 方法
    const publish = () => {
      const postData = {
        postId: formLabelAlign.postId,
        userId: formLabelAlign.name,
        communityId: formLabelAlign.region,
        postTitle: formLabelAlign.type,
        postContent: valueHtml.value,
      };

      // 直接使用 PUT 请求更新帖子
      axios
        .put(`/v1/posts/post`, postData)
        .then((response) => {
          console.log("帖子更新成功", response.data);
          ElMessage.success("帖子更新成功");
          // 更新成功后返回上一页
          router.back(); // 需要在文件顶部添加: import { useRouter } from 'vue-router'
        })
        .catch((error) => {
          console.error("更新帖子失败", error);
          ElMessage.error("更新帖子失败");
        });
    };
    const clearEditor = () => {
      valueHtml.value = "";
      formLabelAlign.name = "";
      formLabelAlign.region = "";
      formLabelAlign.type = "";
      if (editorRef.value) {
        editorRef.value.clear(); // 清空编辑器内容
      }
    };

    onMounted(() => {
      // 获取路由参数中的 postId
      const id = route.params.postId;
      if (id && route.query.mode === "edit") {
        postId.value = id;
        getPostDetail(id);
      }
    });

    onBeforeUnmount(() => {
      if (editorRef.value) {
        editorRef.value.destroy();
      }
    });

    return {
      editorRef,
      valueHtml,
      toolbarConfig,
      editorConfig,
      mode,
      handleCreated,
      cancel,
      publish,
      labelPosition,
      itemLabelPosition,
      formLabelAlign,
      postId,
    };
  },
};
</script>

<style scoped>
.main-container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.top-container {
  display: flex;
  justify-content: space-between;
}

.editor-container {
  flex: 3.5;
  /* 调整这个值来改变富文本编辑器的宽度比例 */
  border: 1px solid #ccc;
  padding: 20px;
}

.space-container {
  width: 20px;
  /* 调整间隔宽度 */
}

.form-container {
  flex: 2;
  /* 调整这个值来改变表单的宽度比例 */
  border: 0px solid #ccc;
  padding: 20px;
}

.footer-container {
  margin-top: 20px;
  padding: 20px;
  border-top: 0px solid #ccc;
  display: flex;
  justify-content: flex-end;
}
</style>
