import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/demo'
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/pages/demo/demo.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/login.vue'),
        meta: {
            title: '用户登录',
            freeAuth: true,
            hideAppBar: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/home.vue'),
        meta: {
            title: '主页',
            freeAuth: true,
            showNavigation: true
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/user/user.vue'),
        meta: {
            title: '个人中心',
            freeAuth: true,
            showNavigation: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 从 localStorage 中读取 token
    const token = localStorage.getItem('token');
    // 判断当前页面 meta 信息是否包含免认证标识
    const freeAuthMeta = to.matched.some((record) => record.meta.freeAuth);
    // 如果不是免认证的页面并且没有token，则跳转到登录页
    if (!freeAuthMeta && !token) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
