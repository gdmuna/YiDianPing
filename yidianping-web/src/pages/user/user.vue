<template>
    <var-app-bar fixed safe-area-top style="background-color: #ffffff; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem">
        <!-- 设置按钮 -->
        <template #right>
            <var-button type="primary" class="h-10 w-10 mr-1 mt-12" color="#ffffff" style="border-radius: 1.1rem; box-shadow: inset 0 0 4px rgb(159, 178, 234)" @click="goSettings">
                <font-awesome-icon :icon="['far', 'sun']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
        <!-- 基本信息+选项卡 -->
        <template #content>
            <div class="flex gap-1 items-center mt-5">
                <!-- 头像+昵称+修改个人 -->
                <var-space direction="column" class="ml-8 self-end">
                    <var-avatar :src="users.avatar" fit="cover" size="68" />
                </var-space>
                <var-cell :title="users.nickname" class="ml-0.5" :description="'账号：' + users.account" style="color: #0f46a0; --cell-font-size: 1.5rem; --cell-description-font-size: 0.9rem; --cell-description-color: #0f46a0" />
                <!-- 封禁信息紧跟在账号信息下方显示 -->
                <var-button type="primary" class="h-10 rounded-2xl mr-5 pt-1" color="#ffffff" style="font-size: 0.95rem; letter-spacing: 0.02rem; box-shadow: inset 0 0 4px rgb(159, 178, 234); color: #4e77b9" @click="goSetMyself">编辑资料</var-button>
            </div>
            <!-- "我的页面"选项卡 -->
            <var-tabs v-model:active="activeTabs" style="margin-top: 0.9rem; --tab-font-size: 0.9rem; --tab-active-font-size: 0.9rem; --tab-active-color: #d5e4fb" color="FFFFFF" active-color="#4E77B9" inactive-color="#4E77B9">
                <var-tab name="我评论的" @click="goMyComment">
                    <font-awesome-icon :icon="['far', 'comment-dots']" size="lg" class="mr-1" style="color: #4e77b9" />
                    我评论的
                </var-tab>
                <var-tab name="收藏" @click="goCollect">
                    <font-awesome-icon :icon="['far', 'star']" size="lg" class="mr-1" style="color: #4e77b9" />
                    收藏
                </var-tab>
                <var-tab name="点赞" @click="goLike">
                    <font-awesome-icon :icon="['far', 'heart']" size="lg" class="mr-1" style="color: #4e77b9" />
                    点赞
                </var-tab>
            </var-tabs>
        </template>
    </var-app-bar>
    <div class="show-area" style="overflow-y: scroll">
        <router-view></router-view>
    </div>
</template>
<script>
import user from '../../api/user';

export default {
    name: 'UserPage',
    data() {
        return {
            activeTabs: '我评论的',
            users: {
                avatar: '',
                nickname: '',
                account: ''
            }
            //userId: ''
        };
    },
    created() {
        //// this.userId = this.$route.params.userId; // 确保路由参数名称与这里的一致
        this.fetchUser();
    },
    mounted() {
        // 自动重定向到 /user/myComment
        this.$router.push('/user/myComment');
    },
    methods: {
        async fetchUser() {
            const response = await user.getUser({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            this.users = response;
            //this.userId = response.user_id;
        },
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
        // goCollect() {
        //     this.$router.push({ path: `/user/${this.userId}/collect` });
        // },
    }
};
</script>
<style scoped>
.show-area {
    width: 100%;
    height: calc(100% - 280px);
    position: fixed;
    top: 214px;
}
</style>
