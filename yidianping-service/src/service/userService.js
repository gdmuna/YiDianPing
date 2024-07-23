const userDao = require('../dao/userDao');

// 获取用户信息
exports.getAllUsers = async () => {
    const users = await userDao.getAllUsers();
    return users;
};
//修改用户信息
exports.updateUser = async (userId, nickname, avatar, password) => {
    const updateuser = await userDao.updateUser(userId, nickname, avatar, password);
    return updateuser;
};
//封禁用户
exports.banUser = async (userId) => {
    const banuser = await userDao.banUser(userId);
    return banuser;
};
//解禁用户
exports.unbanUser = async (userId) => {
    const unbanuser = await userDao.unbanUser(userId);
    return unbanuser;
};
