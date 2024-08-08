<template>
    <div class="bg-white h-full">
        <!-- 顶部导航栏 -->
        <var-app-bar fixed safe-area-top title-position="center" class="relative top-0" style="background-color: #eef5ff; color: #0f46a0; box-shadow: none; --app-bar-height: 64px">
            <div class="flex w-[100vw] justify-between items-center px-[1%]">
                <!-- 返回上一页面按钮 -->
                <var-button round text color="transparent" text-color="#0F46A0" @click="goBack">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
                </var-button>
                <!-- 评论主体名称 -->
                <div class="w-[75%]" style="margin: 0 auto">
                    <p class="text-lg mt-0.5">{{ card.comtSubjectTitle }}</p>
                </div>
                <!-- 转发按钮 -->
                <var-button round text color="transparent" text-color="#0F46A0" @click="goBack">
                    <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" size="xl" style="color: #2041a9" />
                </var-button>
            </div>
        </var-app-bar>

        <!-- 标题栏 -->
        <var-app-bar :title="card.comtSubjectTitle" class="flex items-center h-14" style="background-color: #ffffff; box-shadow: none; border-top: 2px solid rgb(242, 245, 248); --app-bar-text-color: #0f46a0; --app-bar-title-font-size: 17.2px">
            <template #right></template>
        </var-app-bar>

        <!-- 图片展示 -->
        <var-image :src="card.comtSubjectImg || 'https://krseoul.imgtbl.com/i/2024/08/02/66accb57ab412.png'" height="15rem" fit="cover" />

        <!-- 选项卡 -->
        <var-tabs v-model:active="activeTabs" style="margin-top: 0.5rem; --tab-font-size: 1.05rem; --tab-active-font-size: 1.1rem; --tab-active-color: #d5e4fb" color="FFFFFF" active-color="#4E77B9" inactive-color="#4E77B9">
            <var-tab name="信息" @click="goSubjectInfo">
                <p style="margin-top: 1px">信息</p>
            </var-tab>
            <var-tab name="评论" @click="goSubjectComment">
                <p style="margin-top: 2px">评论</p>
            </var-tab>
            <var-tab name="提问" @click="goSubjectQuestion">
                <p style="margin-top: 1px">提问</p>
            </var-tab>
        </var-tabs>

        <!-- 显示区域 -->
        <div class="show-area" style="overflow-y: scroll">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'CommentSubjectPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            card: {
                avg_score: '',
                comment_count: '',
                comtSubjectCreatedAt: '',
                comtSubjectId: '',
                comtSubjectImg: '',
                comtSubjectIsEnabled: '',
                comtSubjectText: '',
                comtSubjectTitle: '',
                userId: ''
            },
            activeTabs: '信息'
        };
    },
    created() {
        this.getCardId();
    },
    mounted() {},
    unmounted() {},
    updated() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        getCardId() {
            const comtSubjectId = this.$route.query.CardId;
            if (comtSubjectId) {
                this.getTheCommentSubjectInfo(comtSubjectId);
            } else {
                console.error('comtSubjectId 未定义');
            }
        },
        async getTheCommentSubjectInfo(comtSubjectId) {
            const theCommentSubjectInfo = await home.getTheCommentSubjectInfo(comtSubjectId);
            this.card = theCommentSubjectInfo[0];
        },
        goSubjectComment() {
            // 传递comtSubjectId作为查询参数
            this.$router.push({
                path: '/commentSubject/subjectComment',
                query: {
                    comtSubjectId: this.card.comtSubjectId
                }
            });
        },
        goSubjectInfo() {
            // 你可以在这里处理信息选项卡点击事件
        },
        goSubjectQuestion() {
            // 你可以在这里处理提问选项卡点击事件
        }
    }
};
</script>

<style scoped>
.show-area {
    width: 100%;
    height: calc(100% - 412px);
    position: fixed;
    top: 412px;
    padding-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
}
</style>
