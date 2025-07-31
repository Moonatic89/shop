import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: () => import('.//Views/Site/Home.vue'),
        component: () => import('./Views/Site/Home.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('./Views/Blog/Blog.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./Views/About/About.vue'),
    },
    {
        path: '/pamina',
        name: 'Login',
        component: () => import('./Views/Site/Login.vue'),
    },
    // Aggiungi altre route qui
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
