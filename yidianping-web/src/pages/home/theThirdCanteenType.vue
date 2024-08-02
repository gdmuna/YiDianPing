<template>
    <div style="margin-bottom: 12%; padding: 4%">
        <div v-for="(card, index) in filteredComments" :key="index" class="mb-2">
            <div class="flex w-full h-[82px] mb-3 p-[9px] bg-white" style="border-radius: 4px">
                <var-image :src="card.cb_img ? card.cb_img : 'https://krseoul.imgtbl.com/i/2024/08/02/66accb57ab412.png'" :radius="5" height="4rem" width="5.5rem" fit="cover" class="mr-3" />
                <p class="mt-0.5">{{ card.cb_title }}</p>
                <div class="flex items-center absolute right-[7.5vw]">
                    <p class="text-sm" style="color: #0f46a0; margin-top: 2.5px">{{ card.avg_score && card.avg_score > 0 ? card.avg_score + ' 分' : '暂无评分' }}</p>
                </div>
                <div class="flex items-center absolute right-[7.5vw] mt-[2.7rem]">
                    <p class="text-sm" style="color: #999999; margin-top: 2.5px">{{ card.comment_count }} 人已评论</p>
                </div>
            </div>
        </div>
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'TheThirdCanteenTypePage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            cards: [],
            commentSubjectInfo: {
                avg_score: '',
                cb_img: '',
                cb_title: ''
            }
        };
    },
    computed: {
        filteredComments() {
            return this.cards.filter((card) => card.is_enabled == 0);
        }
    },
    created() {
        this.getCommentSubjectInfo();
    },
    mounted() {},
    updated() {},
    methods: {
        async getCommentSubjectInfo() {
            const commentSubjectInfo = await home.getCommentSubjectInfo();
            this.cards = commentSubjectInfo;
            console.log(this.commentSubjectInfo);
        }
    }
};
</script>

<style scoped></style>
