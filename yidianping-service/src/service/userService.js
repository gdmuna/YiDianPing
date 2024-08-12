const userDao = require('../dao/userDao');

// 管理员获取用户信息
exports.getAllUsers = async () => {
    const allusers = await userDao.getAllUsers();
    return allusers;
};

// 修改用户信息
// exports.updateUser = async (userId, nickname, avatar, password, stuId, email, phone) => {
//     const result = await userDao.updateUser(userId, nickname, avatar, password, stuId, email, phone);
//     return result;
// };
// 修改用户信息
exports.updateUser = async (userId, account, nickname, avatar, password, stuId, email, phone) => {
    const updatedFields = {};
    if (nickname) updatedFields.nickname = nickname;
    if (account) updatedFields.account = account;
    if (avatar) updatedFields.avatar = avatar;
    if (password) updatedFields.password = password;
    if (stuId) updatedFields.stu_id = stuId;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;
    const result = await userDao.updateUser(userId, updatedFields);
    return result;
};

//封禁用户
exports.banUser = async (userId) => {
    const user = await userDao.banUser(userId);
    return user;
};

//解禁用户
exports.unbanUser = async (userId) => {
    const user = await userDao.unbanUser(userId);
    return user;
};

//个人用户页
exports.getUser = async (userId) => {
    const user = await userDao.getUser(userId);
    return user;
};

//用户注销账号
exports.deleteUser = async (userId) => {
    const user = await userDao.deleteUser(userId);
    return user;
};
