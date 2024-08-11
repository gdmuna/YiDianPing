<template>
    <div class="mb-1">
        <div v-for="(item, index) in filteredComments" :key="index.toString()" class="p-1 shadow-none" @click="navigateToDetail(item.question_id)">
            <var-card class="mb-3 p-2 shadow-none border border-gray-300" style="border-radius: 16px">
                <template #title>
                    <div class="flex items-center justify-between relative" style="padding: 8px; padding-left: 16px">
                        <var-image :src="item.question_is_deleted == 1 ? 'https://imgservice.suning.cn/uimg1/b2c/image/NaE9ApnWdUOoRIkFrmSjTg.jpg_800w_800h_4e' : item.question_avatar" width="35px" height="35px" fit="cover" radius="100%" />
                        <h1 class="text-gray-800 text-base ml-2 flex-grow">
                            {{ item.question_is_deleted == 1 ? '账号已注销' : item.question_nickname }}
                            {{ formatTime(item.question_created_at) }}
                            <span style="background-color: #dbebff; color: #0f46a0" class="px-1 py-1 rounded">问</span>
                        </h1>
                    </div>
                    <div class="text-gray-800 mt-2 mb-2 break-words text-content" style="font-size: 18px; margin-left: 16px">
                        {{ item.question_text }}
                    </div>
                </template>
                <div class="h-px bg-gray-200 my-4"></div>
                <div v-if="item.comments.length > 0">
                    <div class="flex items-center justify-end relative">
                        <h1 class="text-gray-800 text-base mr-2 flex-grow text-right">
                            <span style="background-color: #356fcf; color: #fff" class="px-1 py-1 rounded">答</span>
                            {{ formatTime(item.comments[0].comment_created_at) }}
                            {{ item.comments[0].comment_is_deleted == 1 ? '账号已注销' : item.comments[0].comment_nickname }}
                        </h1>
                        <var-image :src="item.comments[0].comment_is_deleted == 1 ? 'https://imgservice.suning.cn/uimg1/b2c/image/NaE9ApnWdUOoRIkFrmSjTg.jpg_800w_800h_4e' : item.comments[0].comment_avatar" width="35px" height="35px" fit="cover" radius="50%" />
                    </div>
                    <div ref="commentText" class="mt-2 mb-2 break-words text-gray-800 text-content line-clamp" :style="{ textAlign: textAlignStyle }" style="font-size: 18px; margin-bottom: 10px">
                        {{ item.comments[0].comment_text }}
                    </div>
                    <p class="flex justify-center text-xs" style="color: #356fcf; cursor: pointer">全部 {{ item.comments.length }} 个回答>></p>
                </div>
                <div v-else>
                    <p class="flex justify-center text-xs" style="color: #999999">暂无回答</p>
                </div>
            </var-card>
        </div>
        <p class="flex justify-center mt-4 text-xs" style="color: #999999">没有更多内容咯</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import commentSubject from '@/api/commentSubject';

export default {
    name: 'SubjectComment',
    data() {
        return {
            comments: [],
            selectedComtSubjectId: this.$route.query.comtSubjectId || null,
            userId: '0190c9e4-684a-7070-a326-d0b6db264196',
            textAlignStyle: 'left' // 默认左对齐
        };
    },

    computed: {
        filteredComments() {
            return this.comments;
        }
    },
    created() {
        this.fetchComments();
    },
    mounted() {
        this.$nextTick(() => {
            this.adjustTextAlignment();
        });
    },
    methods: {
        async fetchComments() {
            const response = await commentSubject.getSubjectQuestion({
                comtSubjectId: this.selectedComtSubjectId,
                userId: this.userId
            });
            // 过滤掉评论数组中的无效评论
            this.comments = response.map((item) => {
                return {
                    ...item,
                    comments: item.comments.filter((comment) => comment.comment_id !== null)
                };
            });
            this.$nextTick(() => {
                this.adjustTextAlignment();
            });
        },
        formatTime(time) {
            return dayjs(time).format('YYYY/MM/DD');
        },
        // 调整回答文本对齐方式
        adjustTextAlignment() {
            const commentElement = this.$refs.commentText;
            if (commentElement) {
                const lineHeight = parseInt(window.getComputedStyle(commentElement).lineHeight);
                const totalHeight = commentElement.scrollHeight;
                const numberOfLines = totalHeight / lineHeight;

                if (numberOfLines <= 1) {
                    this.textAlignStyle = 'right';
                } else {
                    this.textAlignStyle = 'left';
                }
            }
        },
        // 跳转到详细页
        navigateToDetail(questionId) {
            this.$router.push({
                name: 'DetailPage', // 跳转页面
                query: {
                    comtSubjectId: this.selectedComtSubjectId,
                    userId: this.userId,
                    questionsId: questionId
                }
            });
        }
    }
};
</script>

<style scoped>
.text-content {
    overflow: hidden;
    display: -webkit-box; /* 使用 -webkit-box */
    -webkit-box-orient: vertical; /* 设置为竖直排列 */
    -webkit-line-clamp: 3; /* 3行文本显示 */
    text-overflow: ellipsis; /* 超出部分显示... */
    line-clamp: 3; /* 标准规范中的写法，但不是所有浏览器都支持 */
}
</style>
