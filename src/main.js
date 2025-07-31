import { createApp } from 'vue'
import { createPinia } from 'pinia';
// import Button from './components/Generic/Buttons/Button.vue';
import router from './router'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(router)
    .use(MotionPlugin)
    // .component('Button', Button)
    .mount('#app');