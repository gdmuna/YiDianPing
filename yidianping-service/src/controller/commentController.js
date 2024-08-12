const router = require('express').Router();
module.exports = router;

const commentService = require('../service/commentService.js');

/**
 * 管理员查询评论信息
 * @name getComment 查询评论信息
 * @description GET /comment/getComment
 * @response {Array<Object>} getComment 查询结果数组
 * @response {string} getComment[].comment_id 评论ID
 * @response {string} getComment[].comt_subject_id 评论主体ID
 * @response {string} getComment[].text 评论内容
 * @response {string} getComment[].user_id 发表该评论的用户ID
 * @response {string} getComment[].created_at 评论创建时间
 * @response {string} getComment[].img_path 评论配图路径
 * @response {string} getComment[].nickname 用户昵称
 * @response {string} getComment[].cb_title 评论主体名称
 * @response {string} getComment[].thumbs_up 点赞数
 * @response {string} getComment[].history_id 版本号
 * @response {string} getComment[].is_enabled 是否有效
 */
router.get('/getComment', async (req, res, next) => {
    const getComment = await commentService.getComment();
    res.ResultVO(0, '成功', getComment);
});

/**
 * 创建新评论
 * @name createComment 创建新评论
 * @description POST /comment/createComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @body {string} text 评论内容
 * @body {string} userId 用户ID
 * @body {string} imgPath 评论配图路径（非必填）
 * @response {Object} createComment 创建结果
 */
router.post('/createComment', async (req, res, next) => {
    const { comtSubjectId, commentId, text, userId, imgPath } = req.body;
    const createComment = await commentService.createComment(comtSubjectId, commentId, text, userId, imgPath);
    res.ResultVO(0, '成功', createComment);
});

/**
 * 删除评论
 * @name deleteComment 删除评论
 * @description POST /comment/deleteComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @response {Object} deleteComment 删除结果
 */
router.post('/deleteComment', async (req, res, next) => {
    const { comtSubjectId, commentId } = req.body;
    const deleteComment = await commentService.deleteComment(comtSubjectId, commentId);
    res.ResultVO(0, '成功', deleteComment);
});
/**
 * 恢复评论内容
 * @name updateComment 恢复评论
 * @description POST /comment/recoverComment
 * @body {string} comtSubjectId 评论主题ID
 * @body {string} commentId 评论ID
 * @response {Object} recoverComment 恢复结果
 */
router.post('/recoverComment', async (req, res, next) => {
    const { comtSubjectId, commentId } = req.body;
    const recoverComment = await commentService.recoverComment(comtSubjectId, commentId);
    res.ResultVO(0, '成功', recoverComment);
});

/**
 * 更新评论获赞数
 * @name updateThumbsUp 更新评论获赞数
 * @description PUT /comment/ThumbsUp
 * @body {string} userId 用户ID
 * @body {string} commentId 评论ID
 * @body {string} comtSubjectId 评论主题ID
 * @response {Object} thumbsUp 更新结果
 */
router.put('/ThumbsUp', async (req, res, next) => {
    const { userId, commentId, comtSubjectId } = req.body;
    const thumbsUp = await commentService.updateThumbsUp(userId, commentId, comtSubjectId);
    res.ResultVO(0, '成功', thumbsUp);
});

/**
 * 取消点赞评论
 * @name cancelThumbUp 取消点赞评论
 * @description PUT /comment/cancelThumbsUp
 * @body {string} userId 用户ID
 * @body {string} commentId 评论ID
 * @body {string} comtSubjectId 评论主题ID
 * @response {Object} cancelThumbsUp 取消点赞结果
 */
router.put('/cancelThumbsUp', async (req, res) => {
    const { userId, commentId, comtSubjectId } = req.body;
    const cancelThumbsUp = await commentService.cancelThumbUp(userId, commentId, comtSubjectId);
    res.ResultVO(0, '成功', cancelThumbsUp);
});

/**
 * 用户获取历史评论
 * @name getHistoryComment 用户获取历史评论
 * @description GET /comment/getHistoryComment
 * @query {string} userId 用户ID
 * @response {Array<Object>} getHistoryComment 获取历史评论结果
 * @response {string} getHistoryComment[].comment_id 评论ID
 * @response {string} getHistoryComment[].comt_subject_id 评论主体ID
 * @response {string} getHistoryComment[].user_id 用户ID
 * @response {string} getHistoryComment[].text 评论内容
 * @response {string} getHistoryComment[].created_at 评论创建时间
 * @response {string} getHistoryComment[].img_path 评论配图路径
 * @response {string} getHistoryComment[].cb_title 评论主体标题
 * @response {string} getHistoryComment[].is_thumbs 用户是否点赞该评论
 * @response {string} getComment[].history_id 版本号
 * @response {string} getHistoryComment[].thumbs_up 该评论的点赞总数
 * @response {string} getComment[].is_enabled 是否有效
 */
router.get('/getHistoryComment', async (req, res, next) => {
    const { userId } = req.query;
    const getHistoryComment = await commentService.getHistoryComment(userId);
    res.ResultVO(0, '成功', getHistoryComment);
});

/**
 * 用户获取点赞评论
 * @name getLoveComment 获取评论点赞数
 * @description GET /comment/getLoveComment
 * @query {string} userId 用户ID
 * @response {Array<Object>} getLoveComment 获取点赞数结果
 * @response {string} getLoveComment[].comment_id 评论ID
 * @response {string} getLoveComment[].comt_subject_id 评论主体ID
 * @response {string} getLoveComment[].user_id 用户ID
 * @response {string} getLoveComment[].text 评论内容
 * @response {string} getLoveComment[].created_at 评论创建时间
 * @response {string} getLoveComment[].img_path 评论配图路径
 * @response {string} getLoveComment[].cb_title 评论主体标题
 * @response {string} getComment[].history_id 版本号
 * @response {string} getLoveComment[].is_thumbs 用户是否点赞该评论
 * @response {string} getLoveComment[].thumbs_up 该评论的点赞总数
 * @response {string} getComment[].is_enabled 是否有效
 */
router.get('/getLoveComment', async (req, res, next) => {
    const { userId } = req.query;
    const getLoveComment = await commentService.getLoveComment(userId);
    res.ResultVO(0, '成功', getLoveComment);
});
