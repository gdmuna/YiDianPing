<template>
    <div class="comment mb-8 p-4">
        <var-card v-for="(item, index) in comments" :key="index" class="comment-card relative mb-2 p-4 bg-white rounded-lg shadow-none">
            <template #title>
                <div class="card-header flex justify-between items-center">
                    <h1 class="comment-title text-lg m-0 p-0 mt-1" style="color: #4e77b9">{{ item.cb_title }}</h1>
                    <div class="thumbs-up flex items-center" @click="cancelThumbsUp(index)">
                        <font-awesome-icon v-if="item.is_thumbs == 1" :icon="['fas', 'heart']" size="lg" style="color: #4e77b9"></font-awesome-icon>
                        <p class="text-lg ml-2 mt-0.5" style="color: #4e77b9">{{ item.thumbs_up }}</p>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content mt-2 mb-2 break-words">{{ item.text }}</div>
                <var-image v-if="item.img_path" width="150px" height="150px" fit="cover" :radius="10" :src="item.img_path" @click="showImagePreview(item.img_path)" />
                <div class="created-time absolute bottom-1 right-2 text-xs mr-2" style="color: #4e77b9">{{ formatTime(item.created_at) }}</div>
            </template>
        </var-card>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs text-gray-400">没有更多内容咯</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import comment from '@/api/comment';

export default {
    name: 'UserLoveComment',
    data() {
        return {
            comments: [],
            popupVisible: false,
            selectedCommentId: null,
            selectedComtSubjectId: null,
            showImagePreviewVisible: false,
            imagePreviewUrls: []
        };
    },

    computed: {
        filteredComments() {
            return this.comments.filter((comment) => comment.is_enabled == 0);
        }
    },
    created() {
        this.fetchComments();
    },
    methods: {
        async fetchComments() {
            const response = await comment.getLoveComment({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            this.comments = response;
        },
        async cancelThumbsUp(index) {
            const commentItem = this.comments[index];
            try {
                await comment.cancelThumbsUp({ userId: commentItem.user_id, comtSubjectId: commentItem.comt_subject_id, commentId: commentItem.comment_id });
                this.comments.splice(index, 1);
            } catch (error) {
                console.error('取消点赞失败:', error);
            }
        },
        updateCommentThumbsStatus(index, isThumbsUp) {
            const comment = this.comments[index];
            comment.is_thumbs = isThumbsUp ? '1' : '0';
            comment.thumbs_up = isThumbsUp ? comment.thumbs_up + 1 : comment.thumbs_up - 1;
            this.$set(this.comments, index, comment);
        },
        showImagePreview(imageUrl) {
            this.imagePreviewUrls = [imageUrl];
            this.showImagePreviewVisible = true;
        },
        formatTime(time) {
            return dayjs(time).format('YYYY-MM-DD HH:mm');
        }
    }
};
</script>
