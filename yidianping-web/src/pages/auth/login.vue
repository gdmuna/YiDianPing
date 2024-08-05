<template>
    <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10 flex flex-col pt-[24vh] items-center" style="background-color: #f6f8fb">
        <!-- <img class="w-1/2 max-w-48 mx-auto my-10 rounded-lg" style="background-color: #f6f8fb" src="/logo.svg" /> -->
        <!-- 页面标题 -->
        <h1 class="text-4xl text-center mt-1 mb-[1.8vh]" style="color: rgb(14, 69, 160)">登录</h1>
        <!-- 选择导航栏 -->
        <var-tabs v-model:active="activeTab" class="mt-[1.8vh]" active-color="rgb(20, 70, 180)" inactive-color="rgb(180, 188, 215)" color="rgba(231, 235, 249, 56)" style="border-radius: 20px; box-shadow: inset 0 0 4px rgb(159, 178, 234)" indicator-size="3xl">
            <var-tab name="验证码登录">验证码登录</var-tab>
            <var-tab name="密码登录">密码登录</var-tab>
        </var-tabs>
        <!-- 导航栏选项一：验证码登录 -->
        <div v-if="activeTab === '验证码登录'">
            <var-form class="max-w-sm mx-auto my-[1.8vh] flex flex-col justify-center items-center" style="width: 22rem">
                <!-- 输入email/用户名 -->
                <var-input v-model="user.account" class="my-[1.8vh] w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="email/用户名" blur-color="#476fcf" focus-color="#476fcf">
                    <template #prepend-icon>
                        <font-awesome-icon :icon="['far', 'address-book']" size="lg" style="color: #2041a9" class="mr-2.5" />
                    </template>
                </var-input>
                <!-- 输入验证码 -->
                <var-input v-model="user.password" class="my-[1.8vh] w-5/6 bg-white relative inline-flex" text-color="#476fcf" variant="outlined" placeholder="请输入验证码" blur-color="#476fcf" focus-color="#476fcf">
                    <template #prepend-icon>
                        <font-awesome-icon :icon="['fas', 'lock']" size="lg" style="color: #2041a9" class="mr-2.5 ml-0.5" />
                    </template>
                    <template #append-icon>
                        <var-button text outline type="primary" text-color="#476fcf" class="absolute right-0 top-0 h-full w-30 text-sm">发送验证码</var-button>
                    </template>
                </var-input>
                <!-- 登录按钮 -->
                <var-button class="my-5 h-14 flex rounded-2xl w-11/12" size="large" style="letter-spacing: 0.5em" color="rgb(53,111,207)" type="primary" auto-loading block @click="login()">登录</var-button>
            </var-form>
        </div>
        <!-- 导航栏选项二：密码登录 -->
        <div v-if="activeTab === '密码登录'">
            <var-form class="w-full max-w-sm mx-auto my-4 flex flex-col justify-center items-center" style="width: 22rem">
                <!-- 输入email/用户名 -->
                <var-input v-model="user.account" class="my-4 w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="email/用户名" blur-color="#476fcf" focus-color="#476fcf">
                    <template #prepend-icon>
                        <font-awesome-icon :icon="['far', 'address-book']" size="lg" style="color: #2041a9" class="mr-2.5" />
                    </template>
                </var-input>
                <!-- 输入密码 -->
                <var-input v-model="user.password" class="my-4 w-5/6 bg-white" text-color="#476fcf" variant="outlined" placeholder="请输入密码" blur-color="#476fcf" focus-color="#476fcf" :type="showPassword ? 'text' : 'password'">
                    <template #prepend-icon>
                        <font-awesome-icon :icon="['fas', 'lock']" size="lg" style="color: #2041a9" class="mr-2.5 ml-0.5" />
                    </template>
                    <template #append-icon>
                        <font-awesome-icon :icon="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="showPassword = !showPassword" />
                    </template>
                </var-input>
                <!-- 登录按钮 -->
                <var-button class="my-5 h-14 flex rounded-2xl w-11/12" size="large" style="letter-spacing: 0.5em" color="rgb(53,111,207)" type="primary" auto-loading block @click="login()">登录</var-button>
            </var-form>
        </div>
        <!-- 注册提示 -->
        <p class="text-center absolute inset-x-0 bottom-14 mb-1 text-sm" style="color: rgb(32, 65, 169); text-decoration: underline; text-underline-offset: 4px" @click="goHome">我是游客</p>
        <div class="flex justify-center absolute inset-x-0 bottom-8" style="color: rgb(32, 65, 169)">
            <p style="color: #425596">没有账号？</p>
            <p class="font-semibold" @click="goRegister">注册一个</p>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'LoginPage',
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
                password: null
            },
            showPassword: false,
            activeTab: '验证码登录'
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
                password: this.user.password
            });
            if (result) {
                this.$router.push('/demo');
            }
        },
        // 跳转注册
        goRegister() {
            this.$router.push('register');
        },
        // 我是游客
        goHome() {
            this.$router.push('home');
        }
    }
};
</script>

<style scoped></style>
