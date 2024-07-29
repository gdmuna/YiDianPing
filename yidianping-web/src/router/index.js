import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: 'home'
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
    },
    {
        path: '/manager',
        name: 'manager',
        component: () => import('@/pages/manager/manager.vue'),
        meta: {
            title: '管理员',
            freeAuth: true,
            showNavigation: true
        },
        children: [
            {
                path: 'commentSubjectgl',
                name: 'commentSubjectgl',
                component: () => import('@/pages/manager/commentSubjectgl.vue'),
                meta: {
                    title: '评论体',
                    freeAuth: true,
                    showNavigation: true
                }
            },
            {
                path: 'usergl',
                name: 'usergl',
                component: () => import('@/pages/manager/usergl.vue'),
                meta: {
                    title: '用户',
                    freeAuth: true,
                    showNavigation: true
                }
            },
            {
                path: 'commentgl',
                name: 'commentgl',
                component: () => import('@/pages/manager/commentgl.vue'),
                meta: {
                    title: '评论',
                    freeAuth: true,
                    showNavigation: true
                }
            },
            {
                path: 'questiongl',
                name: 'questiongl',
                component: () => import('@/pages/manager/questiongl.vue'),
                meta: {
                    title: '提问',
                    freeAuth: true,
                    showNavigation: true
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
