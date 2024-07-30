const router = require('express').Router();
module.exports = router;

const homeService = require('../service/homeService');

/**
 * @name commentInfo 获取评论信息
 * @description GET /home/commentInfo
 * @header {string} authorization 用户凭证
 * @response {Object} commentInfo 用户信息
 * @response {string} commentInfo.userId 用户ID
 * @response {string} commentInfo.account 用户账号
 * @response {string} commentInfo.nickName 用户昵称
 */
// router.get('/commentInfo', async (req, res, next) => {
//     const { commentId } = req.query;
//     const commentInfo = await homeService.getCommentInfo(commentId);
//     res.ResultVO(0, '成功', commentInfo);
// });
router.get('/commentInfo', async (req, res, next) => {
    const commentInfo = await homeService.getCommentInfo();
    res.ResultVO(0, '成功', commentInfo);
});
