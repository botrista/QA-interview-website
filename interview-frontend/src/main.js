import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import Axios from 'axios'

const app = createApp(App)

// app.config.globalProperties.$http = Axios

app.use(ElementPlus).mount('#app')