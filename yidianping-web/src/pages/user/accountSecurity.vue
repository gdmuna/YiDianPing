<template>
    <div class="flex justify-center h-full p-[4%]">
        <var-space direction="column" class="button-container">
            <!-- 更换密码 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onPassword = true">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'key']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">更换密码</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <!-- 更换绑定手机 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onPhone = true">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'phone']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">更换绑定手机</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" style="color: #0f46a0" />
                </div>
            </var-button>
            <!-- 注销账号 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="deleteDialog = true">
                <div class="flex items-center w-[80vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">注销账号</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
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

<style scoped></style>
