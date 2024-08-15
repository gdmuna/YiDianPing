const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

/**
 * 管理员端获取用户信息
 * @name getUserInfo 获取用户信息列表
 * @description GET /user/users
 * @response {Array} users 用户信息列表
 * @response {number} users[].user_id 用户ID
 * @response {string} users[].account 账号
 * @response {string} users[].nickname 昵称
 * @response {string} users[].avatar 头像
 * @response {string} users[].created_at 创建时间
 * @response {number} users[].is_admin 是否为管理员
 * @response {number} users[].is_forbidden 是否被封禁
 */

router.get('/users', async (req, res, next) => {
    const getUserInfo = await userService.getAllUsers();
    res.ResultVO(0, '成功', getUserInfo);
});

/**
 * 管理员修改用户信息
 * @name updateUser 修改用户信息
 * @description PUT /user/updateUser
 * @path {string} userId 用户ID
 * @body {string} [nickname] 用户昵称（可选）
 * @body {string} [avatar] 用户头像（可选）
 * @body {string} [password] 用户密码（可选）
 * @body {string} [stuId] 学号（可选）
 * @body {string} [email] 邮箱（可选）
 * @body {string} [phone] 手机号（可选）
 * @response {Object} updateUser 修改结果
 */
router.put('/updateUser', async (req, res, next) => {
    const { userId, account, nickname, avatar, password, stuId, email, phone } = req.body;
    const updateUser = await userService.updateUser(userId, account, nickname, avatar, password, stuId, email, phone);
    res.ResultVO(0, '成功', updateUser);
});

/**
 * 管理员封禁用户
 * @name banUser 封禁用户
 * @description POST /user/banUser
 * @body {string} userId 用户ID
 * @response {Object} banUser 封禁结果
 */
router.post('/banUser', async (req, res, next) => {
    const { userId } = req.body;
    const banUser = await userService.banUser(userId);
    res.ResultVO(0, '成功', banUser);
});

/**
 * 管理员解禁用户
 * @name unbanUser 解禁用户
 * @description POST /user/unbanUser
 * @body {string} userId 用户ID
 * @response {Object} unbanUser 解禁结果
 */
router.post('/unbanUser', async (req, res, next) => {
    const { userId } = req.body;
    const unbanUser = await userService.unbanUser(userId);
    res.ResultVO(0, '成功', unbanUser);
});

/**
 * 个人用户页面
 * @name getUser 获取用户信息
 * @description GET /get/getUser
 * @query {string} userId 用户ID
 * @response {Object} getUser 查询结果
 * @response {Object} getUser.data 用户数据
 * @response {string} getUser.data.user_id 用户ID
 * @response {string} getUser.data.account 账号
 * @response {string} getUser.data.nickname 昵称
 * @response {string} getUser.data.avatar 头像
 * @response {string} getUser.data.created_at 创建时间
 * @response {string} getUser.data.email 邮箱
 * @response {string} getUser.data.stu_id 学号
 * @response {number} getUser.data.is_admin 是否为管理员
 * @response {number} getUser.data.is_forbidden 是否被禁用
 */
router.get('/getUser', async (req, res, next) => {
    const { userId } = req.query;
    const getUser = await userService.getUser(userId);
    res.ResultVO(0, '成功', getUser);
});

/**
 * 用户注销账号
 * @name deleteUser 用户
 * @description POST user/deleteUser
 * @body {string} userId 用户ID
 * @response {Object} deleteUser 注销结果
 */
router.post('/deleteUser', async (req, res, next) => {
    const { userId } = req.body;
    const deleteUser = await userService.deleteUser(userId);
    res.ResultVO(0, '成功', deleteUser);
});
