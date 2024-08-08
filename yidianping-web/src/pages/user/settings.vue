<template>
    <div class="center-container">
        <var-space direction="column" class="button-container">
            <var-button class="custom-button" block @click="goaccout">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'circle-user']" size="xl" style="color: #0f46a0" />
                    <span>账号安全</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onnotice = true">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'envelope']" size="xl" style="color: #0f46a0" />
                    <span>通知设置</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="gomanager">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'user-tie']" size="xl" style="color: #0f46a0" />
                    <span>管理员页</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onmyself">
                <div class="button-content">
                    <font-awesome-icon :icon="['far', 'face-smile']" size="xl" style="color: #0f46a0" />
                    <span>关于我们</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="exitDialog = true">
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
    <!-- 通知设置 -->
    <var-dialog v-model:show="onnotice" :title="onnoticeTitle" :message="onnoticeMessage" style="border-radius: 10px" @confirm="toggleNotification" @cancel="closeNoticeDialog" @closed="closeNoticeDialog" />
    <!-- 管理员弹窗 -->
    <var-dialog v-model:show="showDialog" title="抱歉" :message="dialogMessage" style="border-radius: 10px" @confirm="onDialogConfirm" @cancel="onDialogCancel" @closed="onDialogClosed" />
    <!-- 退出登录 -->
    <var-dialog v-model:show="exitDialog" title="退出" message="确定要退出登录吗？" style="border-radius: 10px" @confirm="exitConfirm" @cancel="exitCancel" @closed="exitClosed" />
</template>

<script>
import user from '../../api/user';
export default {
    name: 'UserPage',
    data() {
        return {
            users: {
                avatar: '',
                nickname: '',
                account: '',
                is_admin: ''
            },
            showDialog: false,
            exitDialog: false,
            onnotice: false,
            notificationsEnabled: true, // 默认开启通知
            onnoticeTitle: '消息推送',
            onnoticeMessage: '是否关闭消息推送？',
            dialogMessage: ''
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            const response = await user.getUser({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            this.users = response;
        },
        onmyself() {
            window.location.href = 'https://mp.weixin.qq.com/s/55oNmN9ufBYXlGxsqhw3fA';
        },
        gomanager() {
            if (this.users.is_admin === 0) {
                this.dialogMessage = '你没有该权限';
                this.showDialog = true;
            } else {
                this.$router.push('/manager');
            }
        },
        toggleNotificationDialog() {
            if (this.notificationsEnabled) {
                this.onnoticeMessage = '是否关闭消息推送？';
            } else {
                this.onnoticeMessage = '是否开启消息推送？';
            }
            this.onnotice = true;
        },
        toggleNotification() {
            this.notificationsEnabled = !this.notificationsEnabled;
            this.onnotice = false;
        },
        closeNoticeDialog() {
            this.onnotice = false;
        },
        exitConfirm() {
            this.$router.push('/login');
        },
        goaccout() {
            this.$router.push('/accountSecurity');
        },
        exitCancel() {
            this.exitDialog = false;
        },
        exitClosed() {
            this.exitDialog = false;
        },
        onDialogConfirm() {
            this.showDialog = false;
        },
        onDialogCancel() {
            this.showDialog = false;
        },
        onDialogClosed() {
            this.showDialog = false;
        }
    }
};
</script>

<style scoped>
/* 定义一个容器类，用于居中显示子元素 */
.center-container {
    display: flex; /* 使用弹性盒子布局 */
    justify-content: center; /* 水平居中子元素 */
    align-items: center; /* 垂直居中子元素 */
    height: 56vh; /* 容器的高度设置为视口高度的55% */
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
