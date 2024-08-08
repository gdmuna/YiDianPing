import { userStore } from '@/stores/user';
import { commentStore } from '@/stores/comment';

// 注入所有 store 模块到 Vue 实例
export default {
    install(app) {
        app.config.globalProperties.$store = {
            user: userStore(),
            comment: commentStore()
        };
    }
};
