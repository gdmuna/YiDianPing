<template>
    <var-app-bar fixed safe-area-top style="background-color: #ffffff; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem">
        <!-- 设置按钮 -->
        <template #right>
            <var-button type="primary" class="h-10 w-10 mr-1 mt-8" color="#ffffff" style="border-radius: 1.1rem; box-shadow: inset 0 0 4px rgb(159, 178, 234)" @click="goSettings">
                <font-awesome-icon :icon="['far', 'sun']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
        <!-- 基本信息+选项卡 -->
        <template #content>
            <div class="flex gap-1 items-center mt-3">
                <!-- 头像+昵称+修改个人 -->
                <var-space direction="column" class="ml-8 self-end">
                    <var-avatar src="https://krseoul.imgtbl.com/i/2024/07/29/66a7b7f6ec0b6.jpg" fit="cover" size="68" />
                </var-space>
                <var-cell title="沸羊羊" class="ml-0.5" description="账号：123456" style="color: #0f46a0; --cell-font-size: 1.5rem; --cell-description-font-size: 0.9rem; --cell-description-color: #0f46a0" />
                <var-button type="primary" class="h-10 rounded-2xl mr-5 pt-1" color="#ffffff" style="font-size: 0.95rem; letter-spacing: 0.02rem; box-shadow: inset 0 0 4px rgb(159, 178, 234); color: #4e77b9" @click="goSetMyself">编辑资料</var-button>
            </div>
            <!-- "我的页面"选项卡 -->
            <var-tabs v-model:active="activeTabs" style="margin-top: 0.5rem; --tab-font-size: 1.05rem; --tab-active-font-size: 1.1rem; --tab-active-color: #d5e4fb" color="FFFFFF" active-color="#4E77B9" inactive-color="#4E77B9">
                <var-tab name="我评论的" @click="goMyComment">
                    <font-awesome-icon :icon="['far', 'comment-dots']" size="lg" class="mr-1" style="color: #4e77b9" />
                    <p style="margin-top: 1px">我评论的</p>
                </var-tab>
                <var-tab name="收藏" @click="goCollect">
                    <font-awesome-icon :icon="['far', 'star']" size="lg" class="mr-1" style="color: #4e77b9" />
                    <p style="margin-top: 2px">收藏</p>
                </var-tab>
                <var-tab name="点赞" @click="goLike">
                    <font-awesome-icon :icon="['far', 'heart']" size="lg" class="mr-1" style="color: #4e77b9" />
                    <p style="margin-top: 1px">点赞</p>
                </var-tab>
            </var-tabs>
        </template>
    </var-app-bar>
    <div class="show-area" style="overflow-y: scroll">
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
        return {
            activeTabs: '我评论的'
        };
    },
    created() {},
    mounted() {
        // 自动重定向到 /user/myComment
        this.$router.push('/user/myComment');
    },
    updated() {},
    methods: {
        goSettings() {
            this.$router.push('/settings');
        },
        goSetMyself() {
            this.$router.push('/setMyself');
        },
        goMyComment() {
            this.$router.push('/user/myComment');
        },
        goCollect() {
            this.$router.push('/user/collect');
        },
        goLike() {
            this.$router.push('/user/like');
        }
    }
};
</script>

<style scoped>
.show-area {
    width: 100%;
    height: calc(100% - 263.6px);
    position: fixed;
    top: 199.6px;
}
</style>
