<template>
    <div class="p-[4%]">
        <div class="w-full h-full">
            <var-card class="mb-2.5 shadow-none">
                <div class="flex flex-col">
                    <span class="text-custom-title font-normal">介绍：</span>
                    <p class="text-custom-content font-normal">文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容......</p>
                </div>
            </var-card>

            <div class="flex justify-between space-x-4 mb-2.5">
                <var-card class="flex-1 w-11.25rem h-5.5625rem shadow-none">
                    <span class="text-custom-title font-normal">评分：</span>
                    <div class="flex justify-between font-normal">
                        <div>
                            <p class="text-[0.75rem] text-stone-600">环境:</p>
                            <p class="text-[0.75rem] text-stone-600">口味:</p>
                            <p class="text-[0.75rem] text-stone-600">价格:</p>
                        </div>
                        <div>
                            <p>★★★★☆</p>
                            <p>★★★★☆</p>
                            <p>★★★★☆</p>
                        </div>
                        <div class="flex flex-col items-end">
                            <span class="text-blue-700 text-custom-star">★</span>
                            <span class="text-2xl text-blue-700">4.5</span>
                        </div>
                    </div>
                </var-card>

                <var-card class="flex-1 w-11.25rem h-5.5625rem shadow-none">
                    <span class="text-custom-title">地址：</span>
                    <div class="mt-4">
                        <img src="" class="w-[16%] h-[6.77%]" />
                    </div>
                </var-card>
            </div>

            <var-card class="flex justify-center items-center shadow-none">
                <div class="text-custom-title text-center w-full">菜单：</div>
                <div class="menu grid grid-cols-2 gap-4 text-center">
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                    <div class="menu-item">
                        <span class="item-name text-stone-600 mr-2.5">茉莉柠檬茶</span>
                        <span class="item-price text-stone-600">10r</span>
                    </div>
                </div>
            </var-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SubjectPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            menuItems: []
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {}
};
</script>

<style scoped>
.text-custom-star {
    font-size: 2rem;
}
.text-custom-title {
    color: #424242;
    display: inline-block;
    vertical-align: middle;
    font-size: 0.94rem;
}
</style>
