import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import { waves } from "@/plugins/waves";

const app = createApp(App)
app.directive('waves', waves)
app.mount('#app')
