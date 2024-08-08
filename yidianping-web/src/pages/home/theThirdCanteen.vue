<template>
    <div style="margin-bottom: 12%">
        <div v-for="(card, index) in filteredComments" :key="index" class="mb-2" @click="goCommentInfo(card.commentId)">
            <!-- 标题栏 -->
            <var-app-bar class="pt-1.5 h-11" style="background-color: #ffffff; box-shadow: none; border-top: 2px solid rgb(242, 245, 248); --app-bar-text-color: #0f46a0; --app-bar-title-font-size: 17.2px">
                <template #default>
                    <div @click="goCommentSubject(card.comtSubjectId)">
                        {{ card.comtSubjectTitle }}
                    </div>
                </template>
                <template #right>
                    <!-- 菜单 -->
                    <var-menu>
                        <!-- 菜单按钮 -->
                        <var-button color="transparent" text-color="#fff" round text>
                            <font-awesome-icon :icon="['fas', 'ellipsis']" size="lg" class="mr-1.5" style="color: #2041a9" />
                        </var-button>
                        <!-- 菜单选项 -->
                        <template #menu>
                            <var-cell ripple>举报</var-cell>
                        </template>
                    </var-menu>
                </template>
            </var-app-bar>
            <!-- 图片+评论内容 -->
            <var-card style="box-shadow: none; border-bottom: #9ab1d7; --card-padding: 0px 0 8px 0">
                <var-image v-if="card.commentImg" :src="card.commentImg" :radius="5" height="15rem" fit="cover" class="max-w-[30rem]" />
                <template #subtitle>
                    <div
                        class="cardText text-sm m-3 my-2 py-1 px-1.5"
                        style="
                            line-height: 22px;
                            word-break: break-word;
                            transition:
                                padding 0.25s,
                                margin 0.25s,
                                font-size 0.25s;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: normal;
                        ">
                        {{ card.commentText }}
                    </div>
                    <!--  -->
                    <div class="flex justify-between ml-4 mb-0.5">
                        <var-avatar :src="card.avatar" size="23" />
                        <p class="absolute left-12 text-sm" style="margin-top: 3px">{{ card.nickname }}</p>
                        <div class="flex justify-end mr-4 items-center">
                            <font-awesome-icon v-if="card.is_thumbs == 1" :icon="['fas', 'heart']" size="sm" class="mr-1" style="color: #0f46a0; margin-top: 1px" @click="cancelThumbsUp(card.userId, card.comtSubjectId, card.commentId, index)" />
                            <font-awesome-icon v-else :icon="['far', 'heart']" size="sm" class="mr-1" style="color: #0f46a0; margin-top: 1px" @click="thumbsUp(card.userId, card.comtSubjectId, card.commentId, index)" />
                            <p class="text-sm" style="color: #0f46a0; margin-top: 2.5px">{{ card.thumbs_up }}</p>
                        </div>
                    </div>
                </template>
            </var-card>
        </div>
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'TheThirdCanteenPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            cards: [],
            commentInfo: {
                comtSubjectText: '',
                commentImg: '',
                comtSubjectTitle: '',
                thumbs_up: '',
                commentCreatedAt: '',
                avatar: '',
                nickname: ''
            }
        };
    },
    computed: {
        filteredComments() {
            return this.cards.filter((card) => card.commentIsEnabled == 0);
        }
    },
    created() {
        this.getCommentInfo();
    },
    mounted() {},
    updated() {},
    methods: {
        async getCommentInfo() {
            const commentInfo = await home.getCommentInfo();
            this.cards = commentInfo;
            console.log(this.commentInfo);
        },
        async getCommentSubjectInfo() {
            const commentSubjectInfo = await home.getCommentSubjectInfo();
            this.cards = commentSubjectInfo;
            console.log(this.commentSubjectInfo);
        },
        goCommentSubject(comtSubjectId) {
            this.$router.push({ path: '/commentSubject', query: { CardId: comtSubjectId } });
        },
        async thumbsUp(userId, comtSubjectId, commentId, index) {
            await card.thumbsUp({ userId, comtSubjectId, commentId });
            this.updateCommentThumbsStatus(index, true);
        },
        async cancelThumbsUp(userId, comtSubjectId, commentId, index) {
            await card.cancelThumbsUp({ userId, comtSubjectId, commentId });
            this.updateCommentThumbsStatus(index, false);
        },
        updateCommentThumbsStatus(index, isThumbsUp) {
            const card = this.cards[index];
            card.is_thumbs = isThumbsUp ? '1' : '0';
            card.thumbs_up = isThumbsUp ? card.thumbs_up + 1 : card.thumbs_up - 1;
            this.$set(this.cards, index, comment);
        }
    }
};
</script>

<style scoped></style>
