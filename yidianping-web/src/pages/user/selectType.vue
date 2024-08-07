<template>
    <!-- 顶部导航栏 -->
    <var-app-bar fixed safe-area-top class="relative top-0" style="background-color: #f6f8fb; color: #0f46a0; box-shadow: none; --app-bar-left-gap: 1rem; --app-bar-right-gap: 1rem; --app-bar-height: 54px">
        <!-- 返回上一页面按钮 -->
        <template #left>
            <var-button round text color="transparent" text-color="#0F46A0" class="self-end" @click="goBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" style="color: #2041a9" />
            </var-button>
        </template>
    </var-app-bar>
    <!-- 选项列表 -->
    <var-list class="px-3 mt-0.5">
        <var-cell v-for="(card, index) in filteredComments" :key="index" style="padding: 7px" @click="selectType(card)">
            <div class="bg-white p-3.5 rounded-[10px] text-[1.2rem]">
                {{ card.itemLabel }}
            </div>
        </var-cell>
    </var-list>
</template>

<script>
import home from '@/api/home';

export default {
    name: 'SelectTypePage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            cards: [],
            dictPlateInfo: {
                dictId: '',
                dictName: '',
                dictCode: '',
                itemSort: '',
                itemLabel: '',
                itemCode: '',
                dictPlateIsEnabled: ''
            }
        };
    },
    computed: {
        filteredComments() {
            return this.cards.filter((card) => card.dictPlateIsEnabled == 1);
        }
    },
    created() {
        this.getDictPlateInfo();
    },
    mounted() {},
    unmounted() {},
    updated() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async getDictPlateInfo() {
            const dictPlateInfo = await home.getDictPlateInfo();
            this.cards = dictPlateInfo;
        },
        selectType(card) {
            // 触发事件并传递选中的信息
            this.$store.comment.selectedTypeName = card.itemLabel;
            // 返回上一页面
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped></style>
