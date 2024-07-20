<template>
    <!-- 标题栏 -->
    <var-app-bar v-if="!$route.meta.hideAppBar" title-position="center" :title="$route.meta.title" fixed safe-area-top />
    <!-- 主要内容区域 -->
    <div :class="$route.meta.hideAppBar ? 'main-area_no-app-bar' : !$route.meta.showNavigation ? 'main-area_no-nav' : 'main-area'">
        <router-view></router-view>
    </div>
    <!-- 底部导航栏 -->
    <var-bottom-navigation v-if="$route.meta.showNavigation" v-model:active="activeNavigation" variant fixed safe-area @change="navigateTo()">
        <var-bottom-navigation-item icon="home" />
        <var-bottom-navigation-item icon="plus-circle" />
        <var-bottom-navigation-item icon="account-circle" />
    </var-bottom-navigation>
</template>

<script lang="js">
export default {
    name: 'App',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            activeNavigation: null
        };
    },
    created() {
        document.addEventListener('backbutton', this.goBack);
    },
    mounted() {},
    updated() {},
    unmounted() {
        document.removeEventListener('backbutton', this.goBack);
    },
    methods: {
        // 用户在移动端设备点击后退按钮时，返回上一条路由
        goBack() {
            this.$router.go(-1);
        },
        navigateTo() {
            switch (this.activeNavigation) {
                case 0:
                    this.$router.push('/home');
                    break;
                case 1:
                    break;
                case 2:
                    this.$router.push('/user');
                    break;
            }
        }
    }
};
</script>

<style scoped>
/* 页面主区域 */
.main-area {
    width: 100%;
    height: calc(100% - 54px - 66px);
    position: fixed;
    top: 54px;
}
.main-area_no-nav {
    width: 100%;
    height: calc(100% - 54px);
    position: fixed;
    top: 54px;
}
.main-area_no-app-bar {
    width: 100%;
    height: 100%;
}
</style>
