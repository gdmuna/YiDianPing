<template>
    <div class="flex justify-center h-full p-[4%]">
        <var-space direction="column" class="button-container">
            <!-- 修改头像 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-32 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="center = true">
                <div class="flex items-center w-[53vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['far', 'circle-user']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5 mt-0.5">修改头像</span>
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" style="color: #0f46a0" />
                </div>
                <!-- 头像显示 -->
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    <var-space direction="column" class="ml-8 self-end">
                        <var-avatar :src="users.avatar" fit="cover" size="72" />
                    </var-space>
                </div>
            </var-button>

            <!-- 修改账号 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="showAccountPopup = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'address-book']" size="xl" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.account }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    修改账号
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 修改昵称 -->
            <var-button class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onNickname = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'user-pen']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.nickname }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    修改昵称
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 绑定或修改邮箱 -->
            <var-button v-if="!users.email" class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onEmail = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'envelopes-bulk']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.email || '暂无' }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    绑定邮箱
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button v-else class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onEmail = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'envelopes-bulk']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.email }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    修改邮箱
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>

            <!-- 绑定或修改学号 -->
            <var-button v-if="!users.stu_id" class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onStudent = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'graduation-cap']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.stu_id || '暂无' }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    绑定学号
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>
            <var-button v-else class="flex items-center bg-white text-[#0f46a0] h-12 w-full my-[4px] rounded-[10px] px-[10px]" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)" block @click="onStudent = true">
                <div class="flex items-center w-[60vw] text-[1rem] ml-1">
                    <font-awesome-icon :icon="['fas', 'graduation-cap']" size="lg" style="color: #0f46a0" />
                    <span class="ml-2.5">{{ users.stu_id }}</span>
                </div>
                <div class="flex items-center justify-end text-[1rem] gap-1 mr-1">
                    修改学号
                    <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #0f46a0" />
                </div>
            </var-button>
        </var-space>

        <!-- 修改头像弹窗 -->
        <var-popup v-model:show="center" position="center" style="width: 80vw; height: 80vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
            <input ref="fileInput" type="file" accept="image/*" style="margin-bottom: 20px; display: none" @change="handleFileChange" />
            <var-avatar :src="previewAvatar" fit="cover" size="150" style="margin-bottom: 20px" />
            <var-button v-if="!selectedFile" style="width: 80%; margin-bottom: 10px; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="$refs.fileInput.click()">选择图片</var-button>
            <var-button v-if="selectedFile" style="width: 80%; margin-bottom: 10px; background-color: #0f46a0; color: white; border: 2px solid #0f46a0" @click="uploadAvatar">确定</var-button>
            <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="center = false">取消</var-button>
        </var-popup>

        <!-- 修改账号弹窗 -->
        <var-popup v-model:show="showAccountPopup" position="center" style="width: 80vw; height: 50vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
            <input v-model="newAccount" placeholder="为6-10位，包含至少两类（大小写字母、数字）" style="width: 80%; margin-bottom: 15px; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
            <p v-if="accountError" style="color: red; font-size: 10px; margin-bottom: 5px">{{ accountError }}</p>
            <p v-else-if="accountSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">{{ accountSuccess }}</p>
            <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="handleUpdateAccount">确定</var-button>
            <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="showAccountPopup = false">取消</var-button>
        </var-popup>
        <!-- 修改昵称弹窗 -->
        <var-popup v-model:show="onNickname" position="center" style="width: 80vw; height: 50vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
            <input v-model="newNickname" placeholder="请输入至多5个字符的昵称" style="width: 80%; margin-bottom: 15px; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
            <p v-if="nicknameError" style="color: red; font-size: 10px; margin-bottom: 5px">{{ nicknameError }}</p>
            <p v-else-if="nicknameSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">{{ nicknameSuccess }}</p>
            <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="handleUpdateNickname">确定</var-button>
            <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="onNickname = false">取消</var-button>
        </var-popup>
        <!-- 修改绑定邮箱弹窗 -->
        <var-popup v-model:show="onEmail" position="center" style="width: 80vw; height: 70vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
            <input v-model="newEmail" placeholder="请输入要绑定的邮箱" style="width: 80%; margin-bottom: 15px; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
            <div style="width: 80%; display: flex; margin-bottom: 15px">
                <input v-model="verificationCode" placeholder="请输入验证码" style="flex: 1; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
                <var-button style="margin-left: 10px; font-size: 10px; padding: 10px; background-color: white; color: #0f46a0; border: 2px solid #0f46a0; width: 100px; text-align: center" :disabled="isSending || countdown > 0" @click="sendVerificationCode">
                    <template v-if="countdown > 0">{{ countdown }}秒后重新发送</template>
                    <template v-else>发送验证码</template>
                </var-button>
            </div>
            <p v-if="emailError" style="color: red; font-size: 10px; margin-bottom: 5px">
                {{ emailError }}
            </p>
            <p v-else-if="emailSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">
                {{ emailSuccess }}
            </p>
            <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="updateNewEmail">确定</var-button>
            <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="onEmail = false">取消</var-button>
        </var-popup>
        <!-- 修改绑定学号弹窗 -->
        <var-popup v-model:show="onStudent" position="center" style="width: 80vw; height: 50vw; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center" round>
            <input v-model="newStudent" placeholder="请输入要绑定的学号" style="width: 80%; margin-bottom: 15px; padding: 10px; border-radius: 5px; font-size: 10px; border: 1px solid #ccc" />
            <p v-if="studentError" style="color: red; font-size: 10px; margin-bottom: 5px">{{ studentError }}</p>
            <p v-else-if="studentSuccess" style="color: green; font-size: 10px; margin-bottom: 5px">{{ studentSuccess }}</p>
            <var-button style="width: 80%; background-color: #0f46a0; margin-bottom: 10px; color: white; border: 2px solid #0f46a0" @click="handleUpdateStudent">确定</var-button>
            <var-button style="width: 80%; background-color: white; color: #0f46a0; border: 2px solid #0f46a0" @click="onStudent = false">取消</var-button>
        </var-popup>
    </div>
</template>

<script>
import user from '../../api/user';

export default {
    name: 'UserSetting',
    data() {
        return {
            center: false,
            showAccountPopup: false,
            onNickname: false,
            onEmail: false,
            onStudent: false,
            users: {
                avatar: '',
                nickname: '',
                account: '',
                email: '',
                stu_id: '',
                userId: ''
            },
            selectedFile: null,
            previewAvatar: '',
            newAccount: '',
            newStudent: '',
            studentError: '',
            studentSuccess: '',
            newEmail: '',
            emailError: '',
            emailSuccess: '',
            accountError: '',
            accountSuccess: '',
            newNickname: '',
            nicknameError: '',
            nicknameSuccess: '',
            verificationCode: '', // 验证码
            countdown: 0, // 倒计时
            isSending: false // 是否正在发送验证码
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        // 异步获取用户信息
        async fetchUser() {
            // 调用API获取用户信息
            const response = await user.getUser({ userId: '0190c9e4-684a-7070-a326-d0b5c07d65b0' });
            // 更新组件状态中的用户信息
            this.users = response;
            // 将返回的user_id更新到组件状态的userId中
            this.users.userId = response.user_id;
        },
        // 处理文件选择事件，更新选中的文件
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;

                // 创建FileReader对象读取文件并预览图片
                const reader = new FileReader();
                reader.onload = (e) => {
                    // 更新头像预览链接
                    this.previewAvatar = e.target.result;
                };
                // 读取文件数据
                reader.readAsDataURL(file);
            }
        },
        // 上传头像方法
        async uploadAvatar() {
            try {
                // 创建FormData对象，添加文件和用户ID
                const formData = new FormData();
                formData.append('avatar', this.selectedFile);
                formData.append('userId', this.users.userId);

                // 调用API上传头像
                await user.uploadAvatar(formData);
                // 上传成功后重新获取用户信息
                this.fetchUser();
            } catch (error) {
                console.error('上传头像失败:', error);
            }
        },

        // 处理账号更新
        async handleUpdateAccount() {
            // 如果新账号为空，显示错误信息并返回
            if (!this.newAccount) {
                this.accountError = '不能为空！';
                return;
            }
            // 如果账号格式不正确，显示错误信息并返回
            if (!this.validateAccount(this.newAccount)) {
                this.accountError = '格式错误，应为6-10位，包含至少两类（大小写字母、数字）';
                return;
            }
            // 清除错误信息，显示成功信息
            this.accountError = '';
            this.accountSuccess = '账号修改成功！';

            // 调用更新账号的方法
            await this.updateAccount();
        },

        // 更新账号方法
        async updateAccount() {
            // 调用API更新用户账号信息
            await user.updateUser({
                userId: this.users.userId,
                account: this.newAccount
            });
            // 更新组件状态中的账号信息
            this.users.account = this.newAccount;
            // 关闭账号修改弹窗
            this.showAccountPopup = false;
        },
        // 验证账号格式
        validateAccount(account) {
            // 正则表达式验证账号格式
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
            return regex.test(account);
        },
        // 处理昵称更新
        async handleUpdateNickname() {
            // 如果新昵称为空，显示错误信息并返回
            if (!this.newNickname) {
                this.nicknameError = '不能为空！';
                return;
            }
            // 如果昵称格式不正确，显示错误信息并返回
            if (!this.validateNickname(this.newNickname)) {
                this.nicknameError = '格式错误，应为1到5个字符的昵称';
                return;
            }
            // 清除错误信息，显示成功信息
            this.nicknameError = '';
            this.nicknameSuccess = '昵称修改成功！';

            // 调用更新昵称的方法
            await this.updateNickname();
        },
        // 更新昵称方法
        async updateNickname() {
            // 调用API更新用户昵称信息
            await user.updateUser({
                userId: this.users.userId,
                nickname: this.newNickname
            });
            // 更新组件状态中的昵称信息
            this.users.nickname = this.newNickname;
            // 关闭昵称修改弹窗
            this.onNickname = false;
        },
        // 验证昵称格式
        validateNickname(nickname) {
            // 正则表达式验证昵称格式
            const nicknameRegex = /^.{1,5}$/;
            return nicknameRegex.test(nickname);
        },

        // 发送验证码
        async sendVerificationCode() {
            // 如果正在发送验证码或倒计时未结束，直接返回
            if (this.isSending || this.countdown > 0) return;

            // 调用API发送验证码
            await user.updateUser({ email: this.newEmail });

            // 更新发送状态和倒计时
            this.isSending = true;
            this.countdown = 60;

            // 设置定时器，倒计时结束重置发送状态
            const interval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(interval);
                    this.isSending = false;
                }
            }, 1000);
        },
        // 更新邮箱
        async updateNewEmail() {
            // 如果验证码为空，显示错误信息并返回
            if (!this.verificationCode) {
                this.emailError = '验证码不能为空';
                return;
            }

            try {
                // 调用API绑定邮箱
                await user.updateUser({
                    userId: this.users.userId,
                    email: this.newEmail,
                    code: this.verificationCode
                });

                // 绑定成功后更新用户信息
                this.emailSuccess = '邮箱绑定成功';
                this.onEmail = false;
                this.fetchUser();
            } catch (error) {
                this.emailError = '绑定邮箱失败，请重试';
                console.error('绑定邮箱失败:', error);
            }
        },
        // 处理学号更新
        async handleUpdateStudent() {
            // 如果新账号为空，显示错误信息并返回
            if (!this.newStudent) {
                this.studentError = '不能为空！';
                return;
            }
            // 如果格式不正确，显示错误信息并返回
            if (!this.validateStudent(this.newStudent)) {
                this.studentError = '请输入正确的学号';
                return;
            }
            // 清除错误信息，显示成功信息
            this.studentError = '';
            this.studentSuccess = '学号修改成功！';

            // 调用更新账号的方法
            await this.updateStudent();
        },

        // 更新学号方法
        async updateStudent() {
            // 调用API更新用户学号信息
            await user.updateUser({
                userId: this.users.userId,
                stuId: this.newStudent
            });
            // 更新组件状态中的学号信息
            this.users.stu_id = this.newStudent;
            // 关闭学号修改弹窗
            this.onStudent = false;
        },
        // 验证学号格式
        validateStudent(stu_id) {
            // 正则表达式验证学号格式
            const regex = /^[1-2]\d{10}$/;
            return regex.test(stu_id);
        }
    }
};
</script>

<style scoped></style>
