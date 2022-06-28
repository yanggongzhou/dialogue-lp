import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import { emotion } from "@/plugins/emotion";

const app = createApp(App)
app.directive('emotion', emotion)
app.mount('#app')
