import { createApp } from 'vue'


import App from './App.vue'

//ElementPlus UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//bootstrap
import './assets/js/bootstrap.min.js':
import './assets/css/bootstrap.min.js':

//路由
import router from './router/index.js'

//引入axios
import axios from 'axios'


import './assets/tailwind.css';



const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
axios.defaults.baseURL="http://localhost:10086"
app.config.globalProperties.$http=axios