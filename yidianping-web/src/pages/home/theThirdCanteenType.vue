<template>
    <div style="margin-bottom: 12%; padding: 4%">
        <div v-for="(card, index) in filteredComments" :key="index" class="mb-2">
            <div class="flex w-full h-20 mb-3 p-2 bg-white" style="border-radius: 4px">
                <var-image :src="card.cb_img ? card.cb_img : 'https://krseoul.imgtbl.com/i/2024/08/02/66abb6e452f16.png'" :radius="5" height="4rem" width="5.5rem" fit="cover" class="mr-3" />
                <p class="mt-0.5">{{ card.cb_title }}</p>
                <div>
                    <font-awesome-icon :icon="['far', 'star']" class="mr-1" style="color: #4e77b9" />
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
                score: '',
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
