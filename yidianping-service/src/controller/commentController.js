const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService.js');

/**
 * 管理员查询评论信息
 * @name getComment 查询评论信息
 * @description GET /getComment
 * @response {Object} result 查询结果
 */
router.get('/getComment', async (req, res, next) => {
    const result = await commentService.getComment();
    res.ResultVO(0, '成功', result);
});

/**
 * 创建新评论
 * @name createComment 创建新评论
 * @description POST /createComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @body {string} text 评论内容
 * @body {string} userId 用户ID
 * @response {Object} result 创建结果
 */
router.post('/createComment', async (req, res, next) => {
    const result = await commentService.createComment(req.body.comtSubjectId, req.body.commentId, req.body.text, req.body.userId);
    res.ResultVO(0, '成功', result);
});

/**
 * 删除评论
 * @name deleteComment 删除评论
 * @description POST /deleteComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @body {string} userId 用户ID
 * @response {Object} result 删除结果
 */
router.post('/deleteComment', async (req, res, next) => {
    const result = await commentService.deleteComment(req.body.comtSubjectId, req.body.commentId);
    res.ResultVO(0, '成功', result);
});
/**
 * 恢复评论内容
 * @name updateComment 恢复评论
 * @description POST /recoverComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @body {string} text 评论内容
 * @body {string} userId 用户ID
 * @response {Object} result 恢复结果
 */
router.post('/recoverComment', async (req, res, next) => {
    const result = await commentService.recoverComment(req.body.comtSubjectId, req.body.commentId);
    res.ResultVO(0, '成功', result);
});

/**
 * 更新评论获赞数
 * @name updateThumbsUp 更新评论获赞数
 * @description PUT /ThumbsUp
 * @body {string} commentId 评论ID
 * @body {string} comtSubjectId 评论主题ID
 * @response {Object} result 更新结果
 */
router.put('/ThumbsUp', async (req, res, next) => {
    const { userId, commentId, comtSubjectId } = req.body;
    const result = await commentService.updateThumbsUp(userId, commentId, comtSubjectId);
    res.ResultVO(0, '成功', result);
});

/**
 * 取消点赞评论
 * @name cancelThumbUp 取消点赞评论
 * @description PUT /cancelThumbsUp
 * @body {string} commentId 评论ID
 * @body {string} comtSubjectId 评论主题ID
 * @response {Object} result 取消点赞结果
 */
router.put('/cancelThumbsUp', async (req, res) => {
    const { userId, commentId, comtSubjectId } = req.body;
    const result = await commentService.cancelThumbUp(userId, commentId, comtSubjectId);
    res.ResultVO(0, '成功', result);
});
/**
 * 用户获取历史评论
 * @name getHistoryComment 获取评论点赞数
 * @description GET /getHistoryComment
 * @body {string} commentId 评论ID
 * @response {Object} result 获取点赞数结果
 */
router.get('/getHistoryComment', async (req, res, next) => {
    const { userId } = req.query;
    const result = await commentService.getHistoryComment(userId);
    res.ResultVO(0, '成功', result);
});
/**
 * 获取点赞评论
 * @name getLoveComment 获取评论点赞数
 * @description GET /getLoveComment
 * @body {string} commentId 评论ID
 * @response {Object} result 获取点赞数结果
 */
router.get('/getLoveComment', async (req, res, next) => {
    const { userId } = req.query;
    const result = await commentService.getLoveComment(userId);
    res.ResultVO(0, '成功', result);
});

module.exports = router;
