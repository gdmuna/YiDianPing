<template>
    <!-- 顶部导航栏 -->
    <var-app-bar fixed safe-area-top title-position="center" class="relative top-0" style="background-color: #f6f8fb; color: #0f46a0; box-shadow: none; --app-bar-height: 75px">
        <div class="flex w-[100vw] justify-between items-center px-[1.1%]">
            <!-- 返回上一页面按钮 -->
            <var-button round text color="transparent" text-color="#0F46A0" class="" @click="goBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
            </var-button>
            <!-- 搜索框 -->
            <div class="w-[75%]" style="margin: 0 auto">
                <input type="text" class="w-full h-[2rem] rounded-[20px] p-2.5 ml-[0.1rem] focus:outline-none" style="border: 1px solid #9ab1d7" />
            </div>
            <!-- 搜索按钮 -->
            <var-button round text color="transparent" text-color="#0F46A0" class="mt-1" @click="goBack">
                <p class="text-base">搜索</p>
            </var-button>
        </div>
    </var-app-bar>
    <div style="margin-bottom: 12%" class="px-[4%] pb-[4%]">
        <div v-for="(card, index) in filteredComments" :key="index" class="mb-2" @click="selectSubject(card)">
            <div class="flex w-full h-[82px] mb-3 p-[9px] bg-white" style="border-radius: 4px">
                <div class="w-full flex justify-between">
                    <div class="flex">
                        <var-image :src="card.comtSubjectImg ? card.comtSubjectImg : 'https://krseoul.imgtbl.com/i/2024/08/02/66accb57ab412.png'" :radius="5" height="4rem" width="5.5rem" fit="cover" class="mr-3" />
                        <p class="mt-0.5">{{ card.comtSubjectTitle }}</p>
                    </div>
                    <div class="flex flex-col items-end justify-between mr-1.5">
                        <p class="text-sm" style="color: #0f46a0; margin-top: 2.5px">{{ card.avg_score && card.avg_score > 0 ? card.avg_score + ' 分' : '暂无评分' }}</p>
                        <p class="text-sm" style="color: #999999; margin-top: 2.5px">{{ card.comment_count }} 人已评论</p>
                    </div>
                </div>
            </div>
        </div>
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'SelectSubjectPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            cards: [],
            commentSubjectInfo: {
                avg_score: '',
                comtSubjectImg: '',
                comtSubjectTitle: ''
            }
        };
    },
    computed: {
        filteredComments() {
            return this.cards.filter((card) => card.comtSubjectIsEnabled == 0);
        }
    },
    created() {
        this.getCommentSubjectInfo();
    },
    mounted() {},
    unmounted() {},
    updated() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async getCommentSubjectInfo() {
            const commentSubjectInfo = await home.getCommentSubjectInfo();
            this.cards = commentSubjectInfo;
        },
        selectSubject(card) {
            // 触发事件并传递选中的信息
            this.$store.comment.selectedSubjectName = card.comtSubjectTitle;
            this.$store.comment.selectedSubjectId = card.comtSubjectId;
            // 返回上一页面
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped></style>
