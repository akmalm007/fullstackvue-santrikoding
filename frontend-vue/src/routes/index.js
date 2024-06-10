import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunk name: "home" */ '../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunk name: "index" */ '../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunk name: "index" */ '../views/auth/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
