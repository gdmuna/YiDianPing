<template>
    <div class="comment">
        <var-card v-for="(item, index) in filteredComments" :key="index" class="comment-card">
            <template #title>
                <div class="card-header">
                    <h1 class="comment-title">{{ item.cb_title }}</h1>
                    <div class="thumbs-up">
                        <font-awesome-icon v-if="item.is_thumbs == 1" :icon="['fas', 'heart']" size="lg" style="color: #4e77b9" @click="cancelThumbsUp(item.user_id, item.comt_subject_id, item.comment_id, index)" />
                        <font-awesome-icon v-else :icon="['far', 'heart']" size="lg" style="color: #4e77b9" @click="thumbsUp(item.user_id, item.comt_subject_id, item.comment_id, index)" />
                        <p :style="{ color: '#4e77b9', fontSize: '10px', margin: '0 0 0 5px' }">{{ item.thumbs_up }}</p>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content">{{ item.text }}</div>
                <var-image v-if="item.img_path" width="150px" height="150px" fit="cover" :radius="10" :src="item.img_path" @click="showImagePreview(item.img_path)" />
                <font-awesome-icon :icon="['fas', 'ellipsis']" size="xl" class="fixed-icon" @click="openPopup(item.comt_subject_id, item.comment_id)" />
            </template>
        </var-card>
        <var-popup v-model:show="popupVisible" position="bottom">
            <div class="popup-content">
                <var-button-group mode="text" size="large" style="width: 100vw" vertical>
                    <var-button block type="primary" @click="editComment(selectedComtSubjectId, selectedCommentId)">修改</var-button>
                    <var-button block type="danger" @click="deleteComment(selectedComtSubjectId, selectedCommentId)">删除</var-button>
                </var-button-group>
            </div>
        </var-popup>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
    </div>
</template>

<script>
import comment from '../../api/comment';

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
            comment.thumbs_up = isThumbsUp ? comment.thumbs_up + 1 : comment.thumbs_up - 1;
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
        }
    }
};
</script>

<style scoped>
.comment {
    border: 1px solid #e1e4e8;
    margin-bottom: 8%;
    padding: 4%;
}
.comment-card {
    position: relative;
    margin-bottom: 10px;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
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
}
.text-content {
    margin-top: 10px;
    word-break: break-word;
}
.thumbs-up {
    display: flex;
    align-items: center;
}
.fixed-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #2041a9;
}
.popup-content {
    padding: 10px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
