<template>
    <!-- 顶部导航栏 -->
    <var-app-bar fixed safe-area-top title-position="center" class="relative top-0" style="background-color: #f6f8fb; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem; --app-bar-height: 65px">
        <div class="flex w-[100vw] justify-between items-center px-[1.1%]">
            <!-- 返回上一页面按钮 -->
            <var-button round text color="transparent" text-color="#0F46A0" class="" @click="goBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
            </var-button>
            <!-- 搜索框 -->
            <div class="w-[75%]" style="margin: 0 auto">
                <input v-model="searchComtSubject" type="text" class="w-full h-[2rem] rounded-[20px] p-2.5 ml-[0.1rem] focus:outline-none" style="border: 1px solid #9ab1d7" />
            </div>
            <!-- 搜索按钮 -->
            <var-button round text color="transparent" text-color="#0F46A0" class="mt-1" @click="handleSearch">
                <p class="text-base">搜索</p>
            </var-button>
        </div>
    </var-app-bar>
    <!-- 可选选项 -->
    <div style="margin-bottom: 12%" class="px-[4%] pb-[4%]">
        <!-- 搜索结果 -->
        <div v-if="resSubjects">
            <div v-for="(resSubject, index) in filteredComments" :key="index" class="mb-2" @click="goCommentSubject(resSubject.comtSubjectId)">
                <div class="flex w-full h-[82px] mb-3 p-[9px] bg-white" style="border-radius: 4px">
                    <div class="w-full flex justify-between">
                        <div class="flex">
                            <var-image :src="resSubject.comtSubjectImg ? resSubject.comtSubjectImg : 'https://krseoul.imgtbl.com/i/2024/08/02/66accb57ab412.png'" :radius="5" height="4rem" width="5.5rem" fit="cover" class="mr-3" />
                            <p class="mt-0.5">{{ resSubject.comtSubjectTitle }}</p>
                        </div>
                        <div class="flex flex-col items-end justify-between mr-1.5">
                            <p class="text-sm" style="color: #0f46a0; margin-top: 2.5px">{{ resSubject.avg_score && resSubject.avg_score > 0 ? resSubject.avg_score + ' 分' : '暂无评分' }}</p>
                            <p class="text-sm" style="color: #999999; margin-top: 2.5px">{{ resSubject.comment_count }} 人已评论</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 历史搜索记录 -->
        <div class="flex h-11 justify-between items-center">
            <p>历史记录：</p>
        </div>
        <div v-if="searchHistory.length">
            <div v-for="(item, index) in searchHistory" :key="index" class="flex bg-white rounded-[10px] h-12 justify-between items-center px-4 mb-2" @click="goCommentSubject(resSubject.comtSubjectId)">
                <p>{{ item }}</p>
                <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" class="mb-0.5" style="color: #000000" />
            </div>
        </div>
    </div>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'SearchPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            searchComtSubject: '',
            resSubjects: null,
            searchHistory: []
        };
    },
    computed: {
        filteredComments() {
            return this.resSubjects.filter((resSubject) => resSubject.comtSubjectIsEnabled == 0);
        }
    },
    created() {
        this.loadSearchHistory();
    },
    mounted() {},
    updated() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goCommentSubject(comtSubjectId) {
            this.$router.push({ path: '/commentSubject', query: { CardId: comtSubjectId } });
        },
        async searchSubject(comtSubjectTitle) {
            const searchSubject = await home.searchSubject(comtSubjectTitle);
            this.resSubjects = searchSubject;
            this.saveSearchHistory(comtSubjectTitle); // 保存搜索记录
            this.loadSearchHistory(); // 更新搜索历史记录
        },
        handleSearch() {
            this.searchSubject(this.searchComtSubject);
        },
        saveSearchHistory(searchTerm) {
            if (!searchTerm) return;

            // 从 localStorage 获取现有的搜索历史记录
            let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

            // 如果搜索关键词已经存在，则删除旧的记录（去重）
            searchHistory = searchHistory.filter((item) => item !== searchTerm);

            // 将新的搜索记录添加到数组的最前面
            searchHistory.unshift(searchTerm);

            // 仅保留最近的 5 条记录
            if (searchHistory.length > 5) {
                searchHistory = searchHistory.slice(0, 5);
            }

            // 将更新后的搜索历史记录保存回 localStorage
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        },
        loadSearchHistory() {
            const history = JSON.parse(localStorage.getItem('searchHistory'));
            if (history) {
                this.searchHistory = history;
            }
        }
    }
};
</script>

<style scoped></style>
