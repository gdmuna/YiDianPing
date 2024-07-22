const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

/**
 * @name userInfo 获取用户信息
 * @description GET /user/userInfo
 * @header {string} authorization 用户凭证
 * @response {Object} userInfo 用户信息
 * @response {string} userInfo.userId 用户ID
 * @response {string} userInfo.account 用户账号
 * @response {string} userInfo.nickName 用户昵称
 */
router.get('/userInfo', async (req, res, next) => {
    const { userId } = req.payload;
    const userInfo = await userService.getUserInfo(userId);
    res.ResultVO(0, '成功', userInfo);
});
