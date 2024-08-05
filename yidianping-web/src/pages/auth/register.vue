<template>
    <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10 flex flex-col pt-[20vh] items-center" style="background-color: #f6f8fb">
        <!-- <img class="w-1/2 max-w-48 mx-auto my-10 rounded-lg" style="background-color: #f6f8fb" src="/logo.svg" /> -->
        <!-- 页面标题 -->
        <h1 class="text-4xl text-center my-3" style="color: rgb(14, 69, 160)">注册</h1>
        <!-- 注册信息输入框 -->
        <var-form class="my-[1vh] flex flex-col justify-center items-center" style="width: 22rem">
            <!-- 输入email/用户名 -->
            <var-input v-model="user.account" class="my-[1.5vh] w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="email/用户名" blur-color="#476fcf" focus-color="#476fcf">
                <template #prepend-icon>
                    <font-awesome-icon :icon="['far', 'address-book']" size="lg" style="color: #2041a9" class="mr-2.5" />
                </template>
            </var-input>
            <!-- 验证码 -->
            <var-input v-model="user.captcha" class="my-[1.5vh] w-5/6 bg-white relative inline-flex" text-color="#476fcf" variant="outlined" placeholder="请输入验证码" blur-color="#476fcf" focus-color="#476fcf">
                <template #prepend-icon>
                    <font-awesome-icon :icon="['fas', 'lock']" size="lg" style="color: #2041a9" class="mr-2.5 ml-0.5" />
                </template>
                <template #append-icon>
                    <var-button text outline text-color="#476fcf" class="absolute right-0 top-0 h-full w-30 text-sm">发送验证码</var-button>
                </template>
            </var-input>
            <!-- 输入密码 -->
            <var-input v-model="user.password" class="my-[1.5vh] w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="请输入密码" blur-color="#476fcf" focus-color="#476fcf">
                <template #prepend-icon>
                    <font-awesome-icon :icon="['fas', 'key']" size="lg" style="color: #2041a9" class="mr-2.5" />
                </template>
            </var-input>
            <!-- 再次输入密码 -->
            <var-input v-model="user.rePassword" class="my-[1.5vh] w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="请再次输入密码" blur-color="#476fcf" focus-color="#476fcf">
                <template #prepend-icon>
                    <font-awesome-icon :icon="['fas', 'key']" size="lg" style="color: #2041a9" class="mr-2.5" />
                </template>
            </var-input>
            <!-- 登录按钮 -->
            <var-button class="my-[2.5vh] h-14 flex rounded-2xl w-11/12" size="large" style="letter-spacing: 0.5em" color="rgb(53,111,207)" type="primary" auto-loading block @click="login()">注册</var-button>
        </var-form>
        <!-- 注册提示 -->
        <div class="flex justify-center absolute inset-x-0 bottom-8" style="color: rgb(32, 65, 169)">
            <p style="color: #425596">已有账号？</p>
            <p class="font-semibold" @click="goLogin">返回登录</p>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'RegisterPage',
    components: {
        FontAwesomeIcon
    },
    setup() {
        return {};
    },
    data() {
        return {
            user: {
                account: null,
                password: null,
                rePassword: null
            }
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        async login() {
            // 函数节流
            if (this.$loading) {
                return;
            }
            const result = await this.$api.auth.login({
                account: this.user.account,
                password: this.user.password,
                rePassword: this.user.rePassword
            });
            if (result) {
                this.$router.push('/demo');
            }
        },
        goLogin() {
            this.$router.push('login');
        }
    }
};
</script>

<style scoped></style>
