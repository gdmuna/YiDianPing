<template>
    <a-layout class="layout-demo">
        <a-layout-sider hide-trigger="true" collapsible :collapsed="collapsed">
            <div class="logo-container">
                <!-- 头像要换成动态的，头像为空时显示默认头像 -->
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" width="40px" height="40px" alt="logo" />
                <div class="managername">
                    <!-- 吴总要换成动态的 -->
                    <p>欢迎回来！</p>
                    <p>管理员 吴总</p>
                </div>
            </div>
            <a-menu :style="{ width: '100%' }" @menu-item-click="onClickMenuItem">
                <a-menu-item @click="gousergl">
                    <IconCalendar />
                    用户信息
                </a-menu-item>
                <a-sub-menu>
                    <template #title>
                        <span>
                            <IconCalendar />
                            评论体
                        </span>
                    </template>
                    <a-menu-item @click="gocommentSubject">评论体信息</a-menu-item>
                    <a-menu-item @click="gocomment">评论信息</a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <template #title>
                        <span>
                            <IconCalendar />
                            评论体问答
                        </span>
                    </template>
                    <a-menu-item @click="goquestion">提问信息</a-menu-item>
                    <!-- 页面跳转 -->
                    <a-menu-item @click="goreply">回答信息</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="padding-left: 20px">
                <a-button shape="round" @click="onCollapse">
                    <IconCaretRight v-if="collapsed" />
                    <IconCaretLeft v-else />
                </a-button>
            </a-layout-header>
            <a-layout style="padding: 0 24px">
                <a-breadcrumb :style="{ margin: '16px 0' }">
                    <!-- 两个按钮点击跳转到对应页面，首页为管理员欢迎页 -->
                    <a-breadcrumb-item @click="goLogin">返回登录</a-breadcrumb-item>
                    <a-breadcrumb-item>首页直达</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content>
                    <router-view></router-view>
                </a-layout-content>
                <a-layout-footer></a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
import { IconCaretRight, IconCaretLeft, IconCalendar } from '@arco-design/web-vue/es/icon';
export default {
    name: 'ManagerHtml',
    components: {
        IconCaretRight,
        IconCaretLeft,
        IconCalendar
    },
    data() {
        return {
            collapsed: false,
            subMenuOpen: false
        };
    },
    methods: {
        onCollapse() {
            this.collapsed = !this.collapsed;
        },
        toggleSubMenu() {
            this.subMenuOpen = !this.subMenuOpen;
        },
        gousergl() {
            this.$router.push('/manager/usergl');
        },
        gocommentSubject() {
            this.$router.push('/manager/commentSubjectgl');
        },
        gocomment() {
            this.$router.push('/manager/commentgl');
        },
        goquestion() {
            this.$router.push('/manager/questiongl');
        },
        goLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.logo-container {
    display: flex;
    align-items: center;
}

.logo-container img {
    margin-right: 40px;
}

.managername {
    color: rgb(28, 63, 204);
    font-size: 16px;
}

.layout-demo {
    height: 100vh;
    width: 100vw;
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-sider) .logo-container {
    height: 50px;
}

.layout-demo :deep(.arco-layout-sider-light) .logo-container {
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
    height: 8vh;
    line-height: 64px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
    height: 30px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
</style>
