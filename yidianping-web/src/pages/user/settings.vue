<template>
    <div class="center-container">
        <var-space direction="column" class="button-container">
            <var-button class="custom-button" block @click="onaccout()">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'circle-user']" size="xl" style="color: #3246a0" />
                    <span>账号安全</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onnotice()">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'envelope']" size="xl" style="color: #0f46a0" />
                    <span>通知设置</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onmanager()">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'user-tie']" size="xl" style="color: #0f46a0" />
                    <span>管理员页</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onmyself()">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'face-smile']" size="xl" style="color: #0f46a0" />
                    <span>关于我们</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="show = true">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="xl" style="color: #0f46a0" />
                    <span>退出登录</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
        </var-space>
    </div>
    <var-dialog title="兰亭序" message="兰亭临帖 行书如行云流水" v-model:show="show" @confirm="Snackbar.success('confirm')" @cancel="Snackbar.error('cancel')" @closed="Snackbar.info('closed')" />
</template>

<script>
export default {
    name: 'UserPage',
    setup() {
        return {
            show: false
        };
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style scoped>
/* 定义一个容器类，用于居中显示子元素 */
.center-container {
    display: flex; /* 使用弹性盒子布局 */
    justify-content: center; /* 水平居中子元素 */
    align-items: center; /* 垂直居中子元素 */
    height: 70vh; /* 容器的高度设置为视口高度的55% */
}

/* 定义一个自定义按钮类，用于设置按钮的样式 */
.custom-button {
    display: flex; /* 使用弹性盒子布局 */
    /* 子元素之间留有间隔 */
    align-items: center; /* 子元素在容器中垂直居中 */
    background-color: #ffffff; /* 设置按钮背景颜色为白色 */
    color: #0f46a0; /* 设置按钮文本颜色 */
    height: 50px; /* 设置按钮高度 */
    width: 90vw; /* 设置按钮宽度为视口宽度的90% */
    margin: 5px 0; /* 设置按钮顶部和底部的外边距 */
    border-radius: 10px; /* 设置按钮边框圆角 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 设置按钮阴影效果 */
    padding: 0 10px; /* 设置按钮内边距，左右各10px */
}

/* 定义按钮内容的类，用于设置按钮内文本和图标的布局 */
.button-content {
    display: flex; /* 使用弹性盒子布局 */
    align-items: center; /* 子元素在容器中垂直居中 */
    /* 使该元素占据剩余空间，拉伸以填满按钮宽度 */
    width: 80vw;
    font-size: 16px;
}

/* 定义按钮内容中的span标签，设置图标和文本之间的间距 */
.button-content span {
    margin-left: 8px;
}

/* 定义箭头图标的类，用于设置箭头的布局 */
.arrow-icon {
    display: flex; /* 使用弹性盒子布局 */
    align-items: center; /* 子元素在容器中垂直居中 */
    justify-content: flex-end; /* 子元素靠容器的末端排列 */
    font-size: 16px;
}
</style>
