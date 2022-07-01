import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import { emotion } from "@/plugins/emotion";
import { waves } from "@/plugins/waves";

const app = createApp(App)
app.directive('emotion', emotion)
app.directive('waves', waves)
app.mount('#app')
