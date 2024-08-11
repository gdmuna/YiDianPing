<template>
    <div class="flex justify-center h-full p-[4%]">
        <var-space direction="column" class="button-container">
            <!-- 账号安全 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="goaccout">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['far', 'circle-user']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">账号安全</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 通知设置 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onnotice = true">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['far', 'envelope']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">通知设置</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 管理员页 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="gomanager">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'user-tie']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">管理员页</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 关于我们 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onmyself">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['far', 'face-smile']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">关于我们</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 退出登录 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="exitDialog = true">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">退出登录</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
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

<style scoped></style>
