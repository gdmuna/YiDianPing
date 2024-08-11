<template>
    <div class="mb-8 p-4">
        <var-card v-for="(item, index) in filteredComments" :key="index" class="relative mb-2.5 p-4 bg-white rounded-lg shadow-none">
            <template #title>
                <div class="flex justify-between items-center">
                    <h1 class="text-xl mt-1" style="color: #4e77b9">{{ item.cb_title }}</h1>
                    <div class="flex items-center">
                        <font-awesome-icon v-if="item.is_thumbs == 1" :icon="['fas', 'heart']" size="lg" style="color: #4e77b9" @click="cancelThumbsUp(item.user_id, item.comt_subject_id, item.comment_id, index)" />
                        <font-awesome-icon v-else :icon="['far', 'heart']" size="lg" style="color: #4e77b9" @click="thumbsUp(item.user_id, item.comt_subject_id, item.comment_id, index)" />
                        <p class="text-lg mx-2 my-0" style="color: #4e77b9">{{ item.thumbs_up }}</p>
                        <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="mr-2" style="color: #4e77b9" @click="openPopup(item.comt_subject_id, item.comment_id)" />
                    </div>
                </div>
            </template>
            <template #description>
                <div class="my-2.5 break-words text-content">{{ item.text }}</div>
                <var-image v-if="item.img_path" width="150px" height="150px" fit="cover" :radius="10" :src="item.img_path" @click="showImagePreview(item.img_path)" />
                <div class="absolute bottom-1 right-2 text-xs" style="color: #4e77b9">{{ formatTime(item.created_at) }}</div>
            </template>
        </var-card>
        <var-popup v-model:show="popupVisible" position="bottom">
            <div class="p-2 flex flex-col items-center w-full">
                <var-button-group mode="text" size="large" class="w-full" vertical>
                    <var-button block type="primary" class="text-blue-800" @click="editComment(selectedComtSubjectId, selectedCommentId)">修改</var-button>
                    <var-button block type="danger" class="text-red-600" @click="deleteComment(selectedComtSubjectId, selectedCommentId)">删除</var-button>
                </var-button-group>
            </div>
        </var-popup>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs text-gray-400">没有更多内容咯</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import comment from '@/api/comment';

export default {
    name: 'USER',
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
            const response = await comment.getHistoryComment({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            this.comments = response;
        },
        async thumbsUp(userId, comtSubjectId, commentId, index) {
            await comment.ThumbsUp({ userId, comtSubjectId, commentId });
            this.updateCommentThumbsStatus(index, true);
        },
        async cancelThumbsUp(userId, comtSubjectId, commentId, index) {
            await comment.cancelThumbsUp({ userId, comtSubjectId, commentId });
            this.updateCommentThumbsStatus(index, false);
        },
        updateCommentThumbsStatus(index, isThumbsUp) {
            const comment = this.comments[index];
            comment.is_thumbs = isThumbsUp ? '1' : '0';
            comment.thumbs_up = isThumbsUp ? Number(comment.thumbs_up) + 1 : Math.max(Number(comment.thumbs_up) - 1, 0);
            this.$set(this.comments, index, comment);
        },

        openPopup(comtSubjectId, commentId) {
            this.selectedComtSubjectId = comtSubjectId;
            this.selectedCommentId = commentId;
            this.popupVisible = true;
        },
        async editComment(comtSubjectId, commentId) {
            console.log('Editing comment with ID:', commentId);
            this.popupVisible = false;
        },
        async deleteComment(comtSubjectId, commentId) {
            await comment.deleteComment({ comtSubjectId, commentId });
            this.comments = this.comments.filter((comment) => comment.comment_id !== commentId);
            this.popupVisible = false;
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
<style scoped>
/* 空 */
</style>
