<!-- eslint-disable vue/valid-v-slot -->
<template>
    <!-- 顶部导航栏 -->
    <var-app-bar v-if="!$route.meta.hideAppBar" title-position="center" :title="$route.meta.title" fixed safe-area-top style="background-color: #f6f8fb; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem">
        <!-- 左侧 -->
        <!-- 返回上一页面按钮 -->
        <template v-if="$route.meta.isGoBack" #left>
            <var-button round text color="transparent" text-color="#0F46A0" class="self-end" @click="goBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
        <!-- 右侧 -->
        <!-- 弹窗提示按钮 -->
        <template v-if="$route.meta.isTip" #right>
            <var-button round text color="transparent" text-color="#0F46A0" class="self-end" @click="showTips">
                <font-awesome-icon :icon="['fas', 'question']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
    </var-app-bar>
    <!-- 主要内容区域 -->
    <div :class="$route.meta.hideAppBar ? 'main-area_no-app-bar' : !$route.meta.showNavigation ? 'main-area_no-nav' : 'main-area'">
        <router-view></router-view>
    </div>
    <!-- 底部导航栏 -->
    <var-bottom-navigation v-if="$route.meta.showNavigation" v-model:active="activeNavigation" fixed safe-area class="items-center" style="height: 4rem; --bottom-navigation-item-icon-size: 1.6rem" inactive-color="#424242" active-color="#0F46A0" @change="navigateTo()">
        <!-- "首页"按钮 -->
        <var-bottom-navigation-item label="首页" icon="home" />
        <!-- "创建新评论"按钮 -->
        <var-button type="primary" class="h-11 w-11" color="#0F46A0" @click="goCreateComment">
            <font-awesome-icon :icon="['fas', 'plus']" size="2xl" style="color: #ffffff" />
        </var-button>
        <!-- "我的"按钮 -->
        <var-bottom-navigation-item label="我的" icon="account-circle" />
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
            activeNavigation: '首页'
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
                    this.$router.push('/user');
                    break;
            }
        },
        goCreateComment() {
            this.$router.push('/createComment');
            this.$store.comment.selectedTypeName = null;
            this.$store.comment.selectedSubjectName = null;
            this.$store.comment.selectedSubjectId = null;
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
