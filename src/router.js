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
        path: '/post/new',
        name: 'New Post',
        component: () => import('./Views/Blog/NewPost.vue'),
    },
    {
        path: '/art-og',
        name: 'ArtOg',
        component: () => import('./Views/ArtOg/Art.vue'),
    },
    {
        path: '/art-og/new',
        name: 'NewArtOg',
        component: () => import('./Views/ArtOg/NewArt.vue'),
    },
    {
        path: '/art-fa',
        name: 'ArtFa',
        component: () => import('./Views/ArtFa/Art.vue'),
    },
    {
        path: '/art-fa/new',
        name: 'NewArtFa',
        component: () => import('./Views/ArtFa/NewArt.vue'),
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
