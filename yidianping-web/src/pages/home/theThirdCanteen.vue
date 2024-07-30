<template>
    <div v-for="card in cards" :key="card.commentId">
        <!-- 标题栏 -->
        <var-app-bar :title="card.cb_title" class="mt-0.5" style="background-color: #f6f8fb; box-shadow: none; --app-bar-text-color: #000">
            <template #right>
                <!-- 菜单 -->
                <var-menu>
                    <!-- 菜单按钮 -->
                    <var-button color="transparent" text-color="#fff" round text>
                        <font-awesome-icon :icon="['fas', 'ellipsis']" size="lg" class="mr-1" style="color: #2041a9" />
                    </var-button>
                    <!-- 菜单选项 -->
                    <template #menu>
                        <var-cell ripple>举报</var-cell>
                    </template>
                </var-menu>
            </template>
        </var-app-bar>
        <!-- 图片+评论内容 -->
        <var-card :src="card.img_path" style="box-shadow: none; border-bottom: #9ab1d7">
            <template #subtitle>
                <div
                    class="text-sm m-3"
                    style="
                        color: #666666;
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
                    {{ card.text }}
                </div>
                <!-- 分割线 -->
                <var-divider hairline />
                <div class="flex justify-end mr-4 items-center">
                    <font-awesome-icon v-if="card.is_thumbs == 1" :icon="['fas', 'heart']" size="sm" class="mr-1" style="color: #0f46a0" @click="changeThumbsUp(card.user_id, card.comt_subject_id, card.comment_id)" />
                    <font-awesome-icon v-else :icon="['far', 'heart']" size="sm" class="mr-1" style="color: #0f46a0" @click="changeThumbsUp(card.user_id, card.comt_subject_id, card.comment_id)" />
                    <p class="text-sm" style="color: #0f46a0">{{ card.thumbs_up }}</p>
                    <!-- {{ card.created_at }} -->
                </div>
            </template>
        </var-card>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'UserPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            cards: [],
            commentInfo: {
                text: '',
                imgPath: '',
                cb_title: '',
                thumbs_up: '',
                created_at: ''
            }
        };
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
        async changeThumbsUp(userId, comtSubjectId, commentId) {
            await card.changeThumbsUp({ userId, comtSubjectId, commentId });
            this.updateCommentThumbsStatus(false);
        },
        updateCommentThumbsStatus(isThumbsUp) {
            const card = this.cards;
            card.is_thumbs = isThumbsUp ? '1' : '0';
            card.thumbs_up = isThumbsUp ? card.thumbs_up + 1 : card.thumbs_up - 1;
            this.$set(this.cards, comment);
        }
    }
};
</script>

<style scoped></style>
