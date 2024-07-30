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
            freeAuth: true,
            hideAppBar: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/auth/register.vue'),
        meta: {
            title: '用户注册',
            freeAuth: true,
            hideAppBar: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/home.vue'),
        meta: {
            // title: '主页',
            freeAuth: true,
            showNavigation: true,
            hideAppBar: true,
            isTabs: true
        },
        children: [
            {
                path: 'types',
                name: 'types',
                component: () => import('@/pages/home/types.vue'),
                meta: {
                    // title: '分类',
                    freeAuth: true
                },
                children: [
                    {
                        path: 'theThirdCanteen',
                        name: 'theThirdCanteen',
                        component: () => import('@/pages/home/theThirdCanteen.vue'),
                        meta: {
                            // title: '三饭',
                            freeAuth: true
                        }
                    }
                ]
            },
            {
                path: 'explore',
                name: 'explore',
                component: () => import('@/pages/home/explore.vue'),
                meta: {
                    // title: '发现',
                    freeAuth: true
                },
                children: [
                    {
                        path: 'theThirdCanteen',
                        name: 'theThirdCanteen',
                        component: () => import('@/pages/home/theThirdCanteen.vue'),
                        meta: {
                            // title: '三饭',
                            freeAuth: true
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/user/user.vue'),
        meta: {
            // title: '个人中心',
            freeAuth: true,
            showNavigation: true,
            hideAppBar: true
        },
        children: [
            {
                path: 'myComment',
                name: 'myComment',
                component: () => import('@/pages/user/myComment.vue'),
                meta: {
                    // title: '我评论的',
                    freeAuth: true
                }
            },
            {
                path: 'star',
                name: 'star',
                component: () => import('@/pages/user/star.vue'),
                meta: {
                    // title: '收藏',
                    freeAuth: true
                }
            },
            {
                path: 'like',
                name: 'like',
                component: () => import('@/pages/user/like.vue'),
                meta: {
                    // title: '点赞',
                    freeAuth: true
                }
            }
        ]
    },
    {
        path: '/createComment',
        name: 'createComment',
        component: () => import('@/pages/user/createComment.vue'),
        meta: {
            // title: '创建新评论',
            freeAuth: true,
            showNavigation: false,
            isGoBack: true,
            isTip: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/user/settings.vue'),
        meta: {
            title: '设置',
            freeAuth: true,
            showNavigation: false,
            isGoBack: true
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
