<template>
    <div class="comment">
        <var-card v-for="item in commentSubjects" :key="item.comt_subject_id" class="comment-card">
            <template #title>
                <div class="card-header">
                    <h1 class="comment-title">{{ item.cb_title }}</h1>
                    <div class="thumbs-up">
                        <p v-if="item.sum_score !== 0" style="color: #4e77b9; font-size: 14px; margin: 2px 15px 0 5px">{{ item.sum_score.toFixed(1) }} 分</p>
                        <p v-if="item.sum_score === 0" style="color: #4e77b9; font-size: 14px; margin: 2px 15px 0 5px">暂无评分</p>
                        <var-menu>
                            <!-- 菜单按钮 -->
                            <var-button round text>
                                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="fixed-icon" />
                            </var-button>
                            <!-- 菜单选项 -->
                            <template #menu>
                                <var-cell ripple @click="cancelCollectCommentSubject(item.user_id, item.comt_subject_id)">取消收藏</var-cell>
                            </template>
                        </var-menu>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content">{{ item.cb_text }}</div>
                <var-image v-if="item.cb_img" width="150px" height="150px" fit="cover" :radius="10" :src="item.cb_img" @click="showImagePreview(item.cb_img)" />
                <div class="created-time">{{ formatTime(item.created_at) }}</div>
            </template>
        </var-card>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import commentSubject from '../../api/commentSubject';

export default {
    name: 'UserCollectComment',
    data() {
        return {
            commentSubjects: [],
            showImagePreviewVisible: false,
            imagePreviewUrls: []
            //userId: '' // 存储 userId
        };
    },

    created() {
        //this.userId = this.$route.params.userId; // 从查询参数获取 userId
        this.fetchCommentSubject();
    },

    methods: {
        async fetchCommentSubject() {
            console.log('userId:', this.userId);
            //const response = await commentSubject.getCollectCommentSubject({ userId: this.userId });
            const response = await commentSubject.getCollectCommentSubject({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            this.commentSubjects = response;
        },

        async cancelCollectCommentSubject(userId, comtSubjectId) {
            await commentSubject.cancelCollectCommentSubject({ userId, comtSubjectId });
            this.commentSubjects = this.commentSubjects.filter((item) => item.user_id !== userId || item.comt_subject_id !== comtSubjectId);
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
.fixed-icon {
    margin-right: 0px;
    color: #324fb1;
}
.created-time {
    position: absolute;
    bottom: 5px;
    right: 10px;
    color: #2041a9;
    font-size: 12px;
    margin-right: 10px;
}
</style>
