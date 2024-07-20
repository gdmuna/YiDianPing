<template>
    <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10 flex-1">
        <img class="w-1/2 max-w-48 mx-auto my-10 bg-white rounded-lg" src="/logo.svg" />
        <h1 class="text-3xl text-center my-10">用户登录</h1>
        <var-form class="w-full max-w-sm mx-auto my-10">
            <var-input v-model="user.account" class="my-6" variant="outlined" size="small" placeholder="用户名" />
            <var-input v-model="user.password" class="my-6" variant="outlined" size="small" placeholder="密码" :type="showPassword ? 'text' : 'password'">
                <template #append-icon>
                    <font-awesome-icon :icon="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="showPassword = !showPassword" />
                </template>
            </var-input>
            <var-button class="my-6" type="primary" auto-loading block @click="login()">登录</var-button>
        </var-form>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            user: {
                account: null,
                password: null
            },
            showPassword: false
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
        }
    }
};
</script>

<style scoped></style>
