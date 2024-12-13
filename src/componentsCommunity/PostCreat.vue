
<template>
    <el-container>
      <!-- 左侧富文本编辑器 -->
      <el-aside width="70%">
        <div class="editor-container">
          <div style="border: 1px solid #ccc;">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden;"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </div>
      </el-aside>
  
      <!-- 右侧表单 -->
      <el-aside width="30%">
        <el-form
          :label-position="labelPosition"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <el-form-item label="Form Align" label-position="right">
            <el-radio-group v-model="labelPosition" aria-label="label position">
              <el-radio-button value="left">Left</el-radio-button>
              <el-radio-button value="right">Right</el-radio-button>
              <el-radio-button value="top">Top</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Form Item Align" label-position="right">
            <el-radio-group
              v-model="itemLabelPosition"
              aria-label="item label position"
            >
              <el-radio-button value="">Empty</el-radio-button>
              <el-radio-button value="left">Left</el-radio-button>
              <el-radio-button value="right">Right</el-radio-button>
              <el-radio-button value="top">Top</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Name" :label-position="itemLabelPosition">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="Activity zone" :label-position="itemLabelPosition">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item label="Activity form" :label-position="itemLabelPosition">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
        </el-form>
      </el-aside>
  
      <!-- 底部按钮 -->
      <el-footer>
        <div class="button-container">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="publish">发布</el-button>
        </div>
      </el-footer>
    </el-container>
  </template>
  
  <script>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  
  import { onBeforeUnmount, ref, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  
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
        console.log('取消');
      };
  
      const publish = () => {
        console.log('发布', valueHtml.value);
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
  .editor-container {
    height: calc(100vh - 80px); /* 根据需要调整高度，减去底部按钮的高度 */
    padding: 20px;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }
  
  .el-button {
    margin-left: 10px;
  }
  </style>