<template>
    <router-view></router-view>
</template>

<script>
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
