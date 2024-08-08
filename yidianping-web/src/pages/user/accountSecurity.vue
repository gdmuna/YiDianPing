<template>
    <div class="center-container">
        <var-space direction="column" class="button-container">
            <var-button class="custom-button" block @click="onPassword = true">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'key']" size="xl" style="color: #0f46a0" />
                    <span>更换密码</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="onPhone = true">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'phone']" size="xl" style="color: #0f46a0" />
                    <span>更换绑定手机</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button class="custom-button" block @click="deleteDialog = true">
                <div class="button-content">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" size="xl" style="color: #0f46a0" />
                    <span>注销账号</span>
                </div>
                <div class="arrow-icon">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
        </var-space>
    </div>

    <!-- 更换密码弹窗 -->
    <var-popup v-model:show="onPassword" position="center" style="width: 80vw; height: 70vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
        <p style="color: #0f46a0">请输入新密码</p>

        <!-- 新密码输入框 -->
        <div style="width: 80%; position: relative; margin-bottom: 15px">
            <input v-model="newPassword" placeholder="为6-20位，包含至少两类（大小写字母、数字）" style="width: 100%; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
        </div>

        <!-- 确认密码输入框 -->
        <div style="width: 80%; position: relative; margin-bottom: 15px">
            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="确认密码" style="width: 100%; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
        </div>
        <p v-if="passwordError" style="color: red; font-size: 10px; margin-bottom: 5px">
            {{ passwordError }}
        </p>
        <p v-else-if="passwordSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">
            {{ passwordSuccess }}
        </p>

        <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="updateNewPassword">确定</var-button>
        <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="onPassword = false">取消</var-button>
    </var-popup>

    <!-- 注销账号弹窗 -->
    <var-dialog v-model:show="deleteDialog" title="确定要注销该账号吗" message="注销账号后无法再登录该账号" style="border-radius: 10px" @confirm="deleteConfirm" @cancel="deleteCancel" @closed="deleteClosed" />

    <!-- 更换绑定手机弹窗 -->
    <var-popup v-model:show="onPhone" position="center" style="width: 80vw; height: 70vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
        <input v-model="newPhone" placeholder="请输入要绑定的手机号码" style="width: 80%; margin-bottom: 15px; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
        <div style="width: 80%; display: flex; margin-bottom: 15px">
            <input v-model="verificationCode" placeholder="请输入验证码" style="flex: 1; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
            <var-button style="margin-left: 10px; font-size: 10px; padding: 10px; background-color: white; color: #0f46a0; border: 2px solid #0f46a0; width: 100px; text-align: center" :disabled="isSending || countdown > 0" @click="sendVerificationCode">
                <template v-if="countdown > 0">{{ countdown }}秒后重新发送</template>
                <template v-else>发送验证码</template>
            </var-button>
        </div>
        <p v-if="phoneError" style="color: red; font-size: 10px; margin-bottom: 5px">
            {{ phoneError }}
        </p>
        <p v-else-if="phoneSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">
            {{ phoneSuccess }}
        </p>
        <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="updateNewPhone">确定</var-button>
        <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="onPhone = false">取消</var-button>
    </var-popup>
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
                is_admin: '',
                user_id: ''
            },
            deleteDialog: false,
            onPhone: false,
            onPassword: false,
            newPassword: '',
            confirmPassword: '',
            showNewPassword: false,
            showConfirmPassword: false,
            newPhone: '',
            verificationCode: '',
            countdown: 0,
            isSending: false,
            phoneError: '',
            phoneSuccess: '',
            passwordError: '',
            passwordSuccess: ''
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
        async deleteConfirm() {
            await user.deleteUser({ userId: this.users.user_id });
            this.deleteDialog = false;
            this.$router.push('/login');
        },
        async sendVerificationCode() {
            this.isSending = true;
            const response = await user.sendVerificationCode({ phone: this.newPhone });
            if (response.success) {
                this.phoneSuccess = '验证码发送成功';
                this.countdown = 60;
                const interval = setInterval(() => {
                    this.countdown--;
                    if (this.countdown <= 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            } else {
                this.phoneError = '验证码发送失败，请重试';
            }
            this.isSending = false;
        },
        validatePhone(phone) {
            const regex = /^1[3-9]\d{9}$/;
            return regex.test(phone);
        },
        validatePassword(password) {
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
            return regex.test(password);
        },
        async updateNewPassword() {
            if (!this.validatePassword(this.newPassword)) {
                this.passwordError = '密码格式错误';
                return;
            }
            if (this.newPassword === this.confirmPassword) {
                await user.updateUser({ userId: this.users.user_id, password: this.newPassword });
                this.passwordSuccess = '密码更新成功';
                this.onPassword = false;
            } else {
                this.passwordError = '两次输入的密码不一致';
            }
        },
        async updateNewPhone() {
            if (!this.validatePhone(this.newPhone)) {
                this.phoneError = '手机号码格式错误，请输入有效的手机号码';
                return;
            }
            if (this.verificationCode) {
                await user.updateUser({ userId: this.users.user_id, phone: this.newPhone });
                this.phoneSuccess = '手机号码更新成功';
                this.onPhone = false;
            } else {
                this.phoneError = '请输入验证码';
            }
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
    height: 35.6vh; /* 容器的高度设置为视口高度的55% */
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
