import { createApp } from 'vue'
import { createPinia } from 'pinia';
// import Button from './components/Generic/Buttons/Button.vue';
import router from './router'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import VueDOMPurifyHTML from 'vue-dompurify-html';

const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(router)
    .use(MotionPlugin)
    .use(VueDOMPurifyHTML, {
        default: {
            ALLOWED_TAGS: ['p', 'b', 'i', 'strong', 'em', 'span', 'br', 'ul', 'ol', 'li'],
            ALLOWED_ATTR: ['class', 'style'],
        }
    })
    // .component('Button', Button)
    .mount('#app');