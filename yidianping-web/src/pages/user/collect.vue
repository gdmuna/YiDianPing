<template>
    <div class="comment mb-8 p-4">
        <var-card v-for="item in commentSubjects" :key="item.comt_subject_id" class="comment-card mb-4 p-4 bg-white rounded-lg shadow-none relative">
            <template #title>
                <div class="card-header flex justify-between items-center">
                    <h1 class="comment-title text-lg mt-1" style="color: #4e77b9">{{ item.cb_title }}</h1>
                    <div class="thumbs-up flex items-center">
                        <p v-if="item.sum_score !== 0" class="text-sm mr-4" style="color: #4e77b9">{{ item.sum_score.toFixed(1) }} 分</p>
                        <p v-if="item.sum_score === 0" class="text-sm mr-4" style="color: #4e77b9">暂无评分</p>
                        <var-menu>
                            <var-button round text>
                                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" style="color: #4e77b9" />
                            </var-button>
                            <template #menu>
                                <var-cell ripple @click="cancelCollectCommentSubject(item.user_id, item.comt_subject_id)">取消收藏</var-cell>
                            </template>
                        </var-menu>
                    </div>
                </div>
            </template>
            <template #description>
                <div class="text-content mt-2 mb-2 break-words">{{ item.cb_text }}</div>
                <var-image v-if="item.cb_img" width="150" height="150" fit="cover" :radius="10" :src="item.cb_img" @click="showImagePreview(item.cb_img)" />
                <div class="created-time absolute bottom-1 right-2 text-xs" style="color: #4e77b9">{{ formatTime(item.created_at) }}</div>
            </template>
        </var-card>
        <var-image-preview v-model:show="showImagePreviewVisible" :images="imagePreviewUrls" />
        <p class="flex justify-center mt-4 text-xs text-gray-400">没有更多内容咯</p>
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
        };
    },

    created() {
        this.fetchCommentSubject();
    },

    methods: {
        async fetchCommentSubject() {
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
/*有个蛋*/
</style>
