<template>
    <div class="comment">
        <var-card v-for="(item, index) in comments" :key="index" class="comment-card">
            <template #title>
                <div class="card-header">
                    <h1 class="comment-title">{{ item.cb_title }}</h1>
                    <div class="thumbs-up" @click="cancelThumbsUp(index)">
                        <font-awesome-icon v-if="item.is_thumbs == 1" :icon="['fas', 'heart']" style="color: #4e77b9"></font-awesome-icon>
                        <p :style="{ color: '#4e77b9', fontSize: '14px', margin: '2px 15px 0 5px' }">{{ item.thumbs_up }}</p>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content">{{ item.text }}</div>
                <var-image v-if="item.img_path" width="150px" height="150px" fit="cover" :radius="10" :src="item.img_path" @click="showImagePreview(item.img_path)" />
                <div class="created-time">{{ formatTime(item.created_at) }}</div>
            </template>
        </var-card>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import comment from '../../api/comment';

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
                // 成功取消点赞后，从数组中移除该评论
                this.comments.splice(index, 1);
            } catch (error) {
                console.error('取消点赞失败:', error);
                // 这里可以添加错误处理逻辑，例如显示一个错误提示
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

<style scoped>
.comment {
    margin-bottom: 8%;
    padding: 4%;
}
.comment-card {
    position: relative;
    margin-bottom: 10px;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    box-shadow: none;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.comment-title {
    color: #4e77b9;
    font-size: 20px;
    margin: 0;
    padding: 0;
    margin-top: 3px;
}
.text-content {
    margin-top: 10px;
    margin-bottom: 10px;
    word-break: break-word;
}
.thumbs-up {
    display: flex;
    align-items: center;
}
.created-time {
    position: absolute;
    bottom: 5px;
    right: 10px;
    color: #2041a9;
    font-size: 12px;
    margin-right: 10px;
}
.popup-content {
    padding: 10px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
