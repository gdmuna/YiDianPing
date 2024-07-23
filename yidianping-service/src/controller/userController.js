const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

/**
 * 管理员端获取用户信息
 * @name getUserInfo 获取用户信息列表
 * @description GET /users
 * @response {Array} users 用户信息列表
 */
router.get('/users', async (req, res, next) => {
    const result = await userService.getAllUsers();
    res.ResultVO(0, '成功', result);
});

/**
 * 管理员修改用户信息
 * @name updateUser 修改用户信息
 * @description PUT /updateUser
 * @path {string} userId 用户ID
 * @body {string} nickname 用户昵称
 * @body {string} avatar 用户头像
 * @body {string} [password] 用户密码（可选）
 * @response {Object} result 修改结果
 */
router.put('/updateUser', async (req, res, next) => {
    const { userId, nickname, avatar, password } = req.body;
    const result = await userService.updateUser(userId, nickname, avatar, password);
    res.ResultVO(0, '成功', result);
});

/**
 * 管理员封禁用户
 * @name banUser 封禁用户
 * @description POST /banUser
 * @path {string} userId 用户ID
 * @response {Object} result 封禁结果
 */
router.post('/banUser', async (req, res, next) => {
    const { userId } = req.body;
    const result = await userService.banUser(userId);
    res.ResultVO(0, '成功', result);
});

/**
 * 管理员解禁用户
 * @name unbanUser 解禁用户
 * @description POST /unbanUser
 * @path {string} userId 用户ID
 * @response {Object} result 解禁结果
 */
router.post('/unbanUser', async (req, res, next) => {
    const { userId } = req.body;
    const result = await userService.banUser(userId);
    res.ResultVO(0, '成功', result);
});
