<template>
    <var-app-bar fixed safe-area-top title-position="center" class="" style="background-color: #eef5ff; color: #0f46a0; box-shadow: none; --app-bar-height: 65px">
        <template #left>
            <!-- 刷新页面按钮 -->
            <var-button text text-color="#0F46A0" class="" @click="refresh">
                <font-awesome-icon :icon="['fas', 'arrow-rotate-right']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
        <!-- 页面选项卡 -->
        <var-tabs v-model:active="activeTabs" class="self-center" style="--tab-font-size: 1.15rem; --tab-active-font-size: 1.2rem" color="rgb(238, 245, 255)" active-color="#0F46A0" inactive-color="#4E77B9">
            <var-tab name="分类" @click="goTypes">分类</var-tab>
            <var-tab name="发现" @click="goExplore">发现</var-tab>
        </var-tabs>
        <!-- 搜索按钮 -->
        <template #right>
            <var-button text text-color="#0F46A0" class="" @click="goSearch">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
    </var-app-bar>
    <div class="show-area" style="overflow-y: scroll">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            activeTabs: '发现'
        };
    },
    created() {},
    mounted() {
        // 自动重定向到 home/explore/theThirdCanteen
        this.$router.push('/home/explore/theThirdCanteen');
    },
    updated() {},
    methods: {
        goTypes() {
            this.$router.push('/home/types');
        },
        goExplore() {
            this.$router.push('/home/explore');
        },
        goSearch() {
            this.$router.push('/search');
        }
    }
};
</script>

<style scoped>
.show-area {
    width: 100%;
    height: calc(100% - 129px);
    position: fixed;
    top: 65px;
}
</style>
