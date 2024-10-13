import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { setupStore } from "@/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import "amfe-flexible"
// import "@/utils/adaptation"
import '../mock'; // 确保这个路径和文件名是正确的
const app = createApp(App)
setupStore(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
.use(ElementPlus)
.mount('#app')
