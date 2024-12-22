<template>
  <div class="main-container">
    <!-- 返回按钮 -->
    <div class="back-button-container">
      <el-button @click="confirmGoBack" icon="el-icon-arrow-left"
        >返回{{ communityName }}</el-button
      >
    </div>

    <!-- 顶部标题输入 -->
    <div class="title-container">
      <el-form-item label="帖子标题">
        <el-input
          v-model="formLabelAlign.type"
          placeholder="请输入你的帖子标题"
        />
      </el-form-item>
    </div>

    <!-- 底部富文本编辑器 -->
    <div class="editor-container">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        style="height: 500px; overflow-y: hidden"
      />
    </div>

    <!-- 下方容器，包含底部按钮 -->
    <div class="footer-container">
      <div class="button-container">
        <el-button @click="confirmClear" :disabled="isEditorEmpty"
          >清空</el-button
        >
        <el-button
          type="primary"
          @click="confirmPublish"
          :disabled="isEditorEmpty"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, onMounted, reactive } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import axios from "axios"; // 导入axios用于发送HTTP请求
import { ElMessageBox } from "element-plus"; // 导入 ElMessageBox
import { useRoute, useRouter } from "vue-router"; // 引入 useRoute,为了获得id和name

export default {
  name: "PostCreat",

  components: {
    Editor,
    Toolbar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const communityId = ref(route.params.communityId);
    const communityName = ref(route.params.communityName);
    console.log("Community ID:", communityId.value);

    const editorRef = ref(null);
    const valueHtml = ref("");
    const toolbarConfig = {}; // 你的工具栏配置
    const editorConfig = {}; // 你的编辑器配置
    const mode = "default"; // 编辑器模式

    const formLabelAlign = reactive({
      type: "", // 帖子标题
    });

    // 检查编辑器是否为空
    const isEditorEmpty = () => {
      return !formLabelAlign.type.trim() && !valueHtml.value.trim();
    };

    const handleCreated = (editor) => {
      editorRef.value = editor;
    };

    const confirmClear = () => {
      if (!isEditorEmpty()) {
        ElMessageBox.confirm("确定要清空内容吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            clearEditor();
          })
          .catch(() => {
            console.log("清空操作已取消");
          });
      } else {
        ElMessageBox.alert("没有内容可以清空", "提示", {
          confirmButtonText: "确定",
          type: "info",
        });
      }
    };

    const confirmPublish = () => {
      // 检查标题和内容是否都已填写
      if (formLabelAlign.type.trim() && valueHtml.value.trim()) {
        // 检查帖子内容是否达到最小字数要求
        if (valueHtml.value.trim().length < 100) {
          ElMessageBox.alert("帖子内容至少需要100个字", "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
          return;
        }
        ElMessageBox.confirm("确定要发布帖子吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            publish();
          })
          .catch(() => {
            console.log("发布操作已取消");
          });
      } else {
        // 如果标题或内容为空，显示提示信息
        if (!formLabelAlign.type.trim()) {
          ElMessageBox.alert("帖子标题不能为空", "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
        } else if (!valueHtml.value.trim()) {
          ElMessageBox.alert("帖子内容不能为空", "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
        }
      }
    };

    const publish = () => {
      // 构造Post对象
      const postData = {
        communityId: communityId.value, // 社区ID
        userId: sessionStorage.userId, // 用户ID
        postTitle: formLabelAlign.type, // 帖子标题
        postContent: valueHtml.value, // 帖子内容
      };

      // 发送POST请求添加帖子
      axios
        .post("http://localhost:10086/v1/posts/post", postData)
        .then((response) => {
          console.log("帖子发布成功", response.data);
          ElMessageBox.alert("帖子发布成功", "发布成功", {
            confirmButtonText: "确定",
            type: "success",
          }).then(() => {
            clearEditor();
            router.back(); // 发布成功后返回上一页
          });
        })
        .catch((error) => {
          console.error("发布帖子失败", error);
          ElMessageBox.alert("帖子发布失败", "发布失败", {
            confirmButtonText: "确定",
            type: "error",
          });
        });
    };

    const clearEditor = () => {
      valueHtml.value = "";
      formLabelAlign.type = "";
      if (editorRef.value) {
        editorRef.value.clear(); // 清空编辑器内容
      }
    };

    const confirmGoBack = () => {
      if (!isEditorEmpty()) {
        ElMessageBox.confirm("返回将会清空当前内容，确定要退出吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          clearEditor(); // 清空内容
          goBack(); // 返回上一页
        });
      } else {
        goBack(); // 如果内容为空，直接返回
      }
    };
    const goBack = () => {
      // 使用路由器实例的 go 方法返回上一页
      router.back();
    };
    onBeforeUnmount(() => {
      if (editorRef.value) {
        editorRef.value.destroy();
      }
    });

    return {
      // 使用 useRoute 获取路由参数
      communityId,
      communityName,

      editorRef,
      valueHtml,
      toolbarConfig,
      editorConfig,
      mode,
      handleCreated,
      confirmClear,
      confirmPublish,
      publish,
      clearEditor,
      confirmGoBack,
      formLabelAlign,
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

.back-button-container {
  margin-bottom: 20px;
}

.title-container {
  margin-bottom: 20px;
}

.editor-container {
  flex: 1;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}

.footer-container {
  display: flex;
  justify-content: flex-end;
}

.button-container {
  display: flex;
  gap: 20px;
  /* 增加按钮间距 */
}

/* 增大按钮大小 */
.el-button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
