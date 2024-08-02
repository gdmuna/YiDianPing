<template>
    <var-tabs v-model:active="activeChildrenTabs" class="sticky top-0" style="--tab-font-size: 1rem; --tab-active-font-size: 1.05rem; border-bottom: 1px solid rgb(242, 245, 248)" color="rgb(255, 255, 255)" active-color="#0F46A0" inactive-color="#4E77B9" indicator-color="#ffffff">
        <var-tab name="三饭" class="mt-0.5" @click="goTheThirdCanteen">三饭</var-tab>
    </var-tabs>
    <div class="children-show-area" style="overflow-y: scroll">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'UserPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {};
    },
    created() {},
    mounted() {
        // 自动重定向到 home/explore/theThirdCanteen
        this.$router.push('/home/explore/theThirdCanteen');
    },
    updated() {},
    methods: {
        goTheThirdCanteen() {
            this.$router.push('/home/explore/theThirdCanteen');
        }
    }
};
</script>

<style scoped>
.children-show-area {
    width: 100%;
    height: calc(100% - 173px);
    position: fixed;
    top: 109px;
}
</style>
