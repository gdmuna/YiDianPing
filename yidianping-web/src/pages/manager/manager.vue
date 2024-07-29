<template>
    <a-layout class="layout-demo">
        <a-layout-sider hide-trigger="true" collapsible :collapsed="collapsed">
            <div class="logo-container">
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" width="40px" height="40px" alt="logo" />
                <div class="managername">
                    欢迎回来！
                    <br />
                    管理员 吴总
                </div>
            </div>
            <a-menu :default-open-keys="['1']" :default-selected-keys="['0_3']" :style="{ width: '100%' }" @menu-item-click="onClickMenuItem">
                <a-menu-item key="用户信息" @click="gousergl">
                    <IconCalendar />
                    用户信息
                </a-menu-item>
                <a-sub-menu key="评论体">
                    <template #title>
                        <span>
                            <IconCalendar />
                            评论体
                        </span>
                    </template>
                    <a-menu-item key="评论体信息" @click="gocomtbody">评论体信息</a-menu-item>
                    <a-menu-item key="评论信息" @click="gocomt">评论信息</a-menu-item>
                    <a-menu-item key="提问信息" @click="goquestion">提问信息</a-menu-item>
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
                    <a-breadcrumb-item>返回登录</a-breadcrumb-item>
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { IconCaretRight, IconCaretLeft, IconCalendar } from '@arco-design/web-vue/es/icon';

export default defineComponent({
    name: 'ManagerHtml',
    components: {
        IconCaretRight,
        IconCaretLeft,
        IconCalendar
    },
    setup() {
        const router = useRouter();
        const collapsed = ref(false);

        const onCollapse = () => {
            collapsed.value = !collapsed.value;
        };

        const onClickMenuItem = (key) => {
            Message.info({ content: `You select ${key}`, showIcon: true });
        };
        const gousergl = () => {
            router.push('/manager/usergl');
        };
        const gocomtbody = () => {
            router.push('/manager/commentSubjectgl');
        };
        const gocomt = () => {
            router.push('/manager/commentgl');
        };
        const goquestion = () => {
            router.push('/manager/questiongl');
        };

        return {
            collapsed,
            onCollapse,
            onClickMenuItem,
            gousergl,
            gocomtbody,
            gocomt,
            goquestion
        };
    }
});
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
