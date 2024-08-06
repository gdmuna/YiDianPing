import request from '../utils/request';

const moduleUrl = '/user';

const user = {
    // 查询所有用户的详细信息
    getUserInfo() {
        return request.get(`${moduleUrl}/users`);
    },
    //修改用户信息
    updateUser(data) {
        return request.put(`${moduleUrl}/updateUser`, data);
    },
    //封禁用户
    banUser(data) {
        return request.post(`${moduleUrl}/banUser`, data);
    },
    //解禁用户
    unbanUser(data) {
        return request.post(`${moduleUrl}/unbanUser`, data);
    },
    //查询用户信息
    getUser(data) {
        return request.get(`${moduleUrl}/getUser`, data);
    },
    //注销用户
    deleteUser(data) {
        return request.post(`${moduleUrl}/deleteUser`, data);
    }
};

export default user;
