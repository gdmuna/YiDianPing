<template>
    <div class="bg-white h-full">
        <!-- 顶部导航栏 -->
        <var-app-bar fixed safe-area-top class="relative top-0" style="background-color: #ffffff; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem; --app-bar-height: 54px">
            <!-- 返回上一页面按钮 -->
            <template #left>
                <var-button round text color="transparent" text-color="#0F46A0" class="self-end" @click="goBack">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
                </var-button>
            </template>
            <!-- 弹窗提示按钮 -->
            <template #right>
                <var-button round text class="self-end" style="" @click="showTips">
                    <font-awesome-icon :icon="['fas', 'question']" size="xl" style="color: #2041a9" />
                </var-button>
            </template>
        </var-app-bar>
        <!-- 上传图片（图片选择器） -->
        <div class="ml-[5vw] mt-4" style="">
            <var-uploader v-model="imgFiles" :url="uploadUrl" multiple accept="image/*" maxlength="1" class="max-h-52 h-40" style="--uploader-file-border-radius: 4px; --uploader-action-background: #f6f8fb; --uploader-file-size: 9rem; --uploader-file-indicator-height: 0px" />
        </div>
        <!-- 板块选择 -->
        <div class="ml-[5vw] w-[90%] h-[3.5rem] text-[1.35rem] pt-4" @click="goSelectType">
            <div class="flex mb-3 items-center justify-between">
                {{ selectedTypeName || '请选择板块' }}
                <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" style="color: #000000" />
            </div>
            <var-divider class="w-full" />
        </div>
        <!-- 评论主体选择 -->
        <div class="ml-[5vw] w-[90%] h-[3.5rem] text-[1.2rem] pt-4 mt-1.5" @click="goSelectSubject">
            <div class="flex mb-3 items-center justify-between">
                {{ selectedSubjectName || '请选择点评对象' }}
                <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" style="color: #000000" />
            </div>
            <var-divider class="w-full items-end" />
        </div>
        <!-- 评论内容 -->
        <div class="ml-[5vw] w-[90%] h-[7rem] text-[1.2rem] pt-4 mt-1.5">
            <div class="flex mb-3 items-center justify-between">
                <textarea v-model="commentContent" class="w-full h-[10rem] placeholder-[#777] focus:outline-none" placeholder="请输入评论内容"></textarea>
            </div>
            <var-divider class="w-full items-end" />
        </div>
        <!-- 发布评论按钮 -->
        <div class="flex justify-center">
            <var-button class="absolute bottom-10 h-[14] w-[50%] rounded-[19px] shadow-none" size="large" style="letter-spacing: 0.5em; border: 1px solid #ebf0f6" color="#EEF5FF" text-color="#0F46A0" type="primary" auto-loading block @click="push()">发布</var-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateCommentPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            imgFiles: [], // 用于存储上传的文件
            uploadUrl: '/createComment', // 你的后端接口地址
            selectedTypeName: '', // 存储选中的板块的名字
            selectedSubjectName: '', // 存储选中的评论主体的名字
            selectedSubjectId: null, // 存储选中的评论主体的 ID
            commentContent: '' // 评论内容
        };
    },
    created() {
        this.selectedTypeName = this.$store.comment.selectedTypeName;
        this.selectedSubjectName = this.$store.comment.selectedSubjectName;
        this.selectedSubjectId = this.$store.comment.selectedSubjectId;
    },
    mounted() {},
    unmounted() {},
    updated() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goSelectType() {
            this.$router.push('/selectType'); // 跳转到板块选择页面
        },
        goSelectSubject() {
            this.$router.push('/selectSubject'); // 跳转到评论主体选择页面
        },
        submitComment() {
            // 在这里处理发布评论的逻辑，比如发送请求到服务器
        },
        showTips() {
            Dialog({
                title: '提示',
                message: '兰亭临帖 行书如行云流水',
                cancelButton: false
            });
        }
    }
};
</script>

<style scoped></style>
