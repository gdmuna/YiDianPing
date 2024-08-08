<template>
    <div class="comment">
        <var-card v-for="(item, index) in filteredComments" :key="index" class="comment-card">
            <template #title>
                <div class="card-header">
                    <!-- 头像图片，当 item.is_deleted == 1 时显示灰色图片 -->
                    <var-image :src="item.is_deleted == 1 ? 'https://imgservice.suning.cn/uimg1/b2c/image/NaE9ApnWdUOoRIkFrmSjTg.jpg_800w_800h_4e' : item.avatar" width="35px" height="35px" fit="cover" radius="50%" />
                    <h1 class="comment-title">
                        {{ item.is_deleted == 1 ? '账号已注销' : item.nickname }}
                        {{ formatTime(item.created_at) }}
                    </h1>
                    <div class="thumbs-up">
                        <font-awesome-icon v-if="item.is_thumbs == 1" :icon="['fas', 'heart']" style="color: #4e77b9" @click="cancelThumbsUp(item.comt_subject_id, item.comment_id, index)" />
                        <font-awesome-icon v-else :icon="['far', 'heart']" style="color: #4e77b9" @click="thumbsUp(item.comt_subject_id, item.comment_id, index)" />
                        <p :style="{ color: '#4e77b9', fontSize: '14px', margin: '2px 15px 0 5px' }">{{ item.thumbs_up }}</p>
                        <var-menu>
                            <!-- 菜单按钮 -->
                            <var-button round text>
                                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="fixed-icon" />
                            </var-button>
                            <!-- 菜单选项 -->
                            <template #menu>
                                <var-cell ripple @click="cancelcomment(item.comment_id)">举报</var-cell>
                            </template>
                        </var-menu>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content">{{ item.text }}</div>
                <var-image v-if="item.img_path" width="150px" height="150px" fit="cover" :radius="10" :src="item.img_path" @click="showImagePreview(item.img_path)" />
                <div class="created-time"></div>
            </template>
        </var-card>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import comment from '../../api/comment';
import commentSubject from '../../api/commentSubject';

export default {
    name: 'SubjectComment',
    data() {
        return {
            comments: [],
            selectedCommentId: null,
            selectedComtSubjectId: this.$route.query.comtSubjectId || null,
            showImagePreviewVisible: false,
            imagePreviewUrls: [],
            userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' // 固定的 userId
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
            if (this.selectedComtSubjectId) {
                const response = await commentSubject.getSubjectComment({
                    comtSubjectId: this.selectedComtSubjectId,
                    userId: this.userId
                });
                this.comments = response;
            } else {
                console.error('comtSubjectId 未定义');
            }
        },
        async thumbsUp(comtSubjectId, commentId, index) {
            await comment.ThumbsUp({
                userId: this.userId,
                comtSubjectId,
                commentId
            });
            this.updateCommentThumbsStatus(index, true);
        },
        async cancelThumbsUp(comtSubjectId, commentId, index) {
            await comment.cancelThumbsUp({
                userId: this.userId,
                comtSubjectId,
                commentId
            });
            this.updateCommentThumbsStatus(index, false);
        },
        updateCommentThumbsStatus(index, isThumbsUp) {
            const comment = this.comments[index];
            comment.is_thumbs = isThumbsUp ? '1' : '0';
            comment.thumbs_up = isThumbsUp ? Number(comment.thumbs_up) + 1 : Math.max(Number(comment.thumbs_up) - 1, 0);
            this.$set(this.comments, index, comment);
        },
        showImagePreview(imageUrl) {
            this.imagePreviewUrls = [imageUrl];
            this.showImagePreviewVisible = true;
        },
        formatTime(time) {
            return dayjs(time).format('YYYY/MM/DD');
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
    align-items: center;
    justify-content: space-between;
    position: relative;
}
.comment-title {
    color: rgba(66, 66, 66, 1);
    font-size: 15px;
    margin: 0 0 0 10px; /* 与左侧头像紧密对齐 */
    padding: 0;
    flex-grow: 1; /* 让标题占据剩余空间 */
}
.thumbs-up {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
}
.text-content {
    margin-top: 10px;
    margin-bottom: 10px;
    word-break: break-word;
}
.fixed-icon {
    margin-right: 7px;
    color: #324fb1;
}
.popup-content {
    padding: 10px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
