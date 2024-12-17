<template>
  <div class="main-container">
    <!-- 上方容器，包含富文本编辑器和表单 -->
    <div class="top-container">
      <!-- 左侧富文本编辑器 -->
      <div class="editor-container">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          style="height: 500px; overflow-y: hidden;"
        />
      </div>
  
      <!-- 中间间隔 -->
      <div class="space-container"></div>
  
      <!-- 右侧表单 -->
      <div class="form-container">
        <el-form label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
          <el-form-item label="用户id">
            <el-input v-model="formLabelAlign.name"  placeholder="请输入用户ID"/>
          </el-form-item>
          <el-form-item label="社区id">
            <el-input v-model="formLabelAlign.region"  placeholder="请输入社区ID"/>
          </el-form-item>
          <el-form-item label="帖子标题">
            <el-input v-model="formLabelAlign.type" placeholder="请输入帖子标题"/>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 下方容器，包含底部按钮 -->
    <div class="footer-container">
      <div class="button-container">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="publish" style="margin-left: 10px;">发布</el-button>
      </div>
    </div>
  </div>
</template>
  <script>
  
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  
  import { onBeforeUnmount, ref, onMounted, reactive } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import axios from 'axios'; // 导入axios用于发送HTTP请求
  import { ElMessage } from 'element-plus'; // 导入 ElMessage
  

  export default {
  components: {
    Editor,
    Toolbar
  },
  setup() {
    const editorRef = ref(null);
    const valueHtml = ref('');
    const toolbarConfig = {}; // 你的工具栏配置
    const editorConfig = {}; // 你的编辑器配置
    const mode = 'default'; // 编辑器模式

    const labelPosition = ref('right');
    const itemLabelPosition = ref('');
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: '',
    });

    const handleCreated = (editor) => {
      editorRef.value = editor;
    };

    const cancel = () => {
      clearEditor();
    };

    const publish = () => {
      const postData = {
        userId: formLabelAlign.name,
        communityId: formLabelAlign.region,
        postTitle: formLabelAlign.type,
        postContent: valueHtml.value
      };

      axios.post('http://localhost:10086/v1/posts/post', postData)
        .then(response => {
          console.log('帖子发布成功', response.data);
          ElMessage.success('帖子发布成功'); // 显示成功消息
          clearEditor();
        })
        .catch(error => {
          console.error('发布帖子失败', error);
          ElMessage.error('帖子发布失败'); // 显示失败消息
        });
      };
    const clearEditor = () => {
      valueHtml.value = '';
      formLabelAlign.name = '';
      formLabelAlign.region = '';
      formLabelAlign.type = '';
      if (editorRef.value) {
        editorRef.value.clear(); // 清空编辑器内容
      }
    };



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
    };
  }
}
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
  flex: 3.5; /* 调整这个值来改变富文本编辑器的宽度比例 */
  border: 1px solid #ccc;
  padding: 20px;
}

.space-container {
  width: 20px; /* 调整间隔宽度 */
}

.form-container {
  flex: 2; /* 调整这个值来改变表单的宽度比例 */
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