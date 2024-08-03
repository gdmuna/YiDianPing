const router = require('express').Router();
module.exports = router;

const commentSubjectService = require('../service/commentSubjectService');
/**
 * 管理员页查询评论体信息
 * @name getAllCommentSubject 查询评论体信息
 * @description GET /getAllCommentSubject
 * @response {Array} result 查询结果
 */
router.get('/getAllCommentSubject', async (req, res, next) => {
    const result = await commentSubjectService.getAllCommentSubject();
    res.ResultVO(0, '成功', result);
});

/**
 * 创建新评论体
 * @name createCommentSubject 创建新评论体
 * @description POST /createCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @body {string} cbImg 评论体图片
 * @body {string} cbText 评论文本
 * @body {string} cbTitle 评论标题
 * @body {string} userId 用户ID
 * @response {Object} result 创建结果
 */
router.post('/createCommentSubject', async (req, res, next) => {
    const { cbImg, cbText, cbTitle, userId } = req.body;
    const result = await commentSubjectService.createCommentSubject(cbImg, cbText, cbTitle, userId);
    res.ResultVO(0, '成功', result);
});

/**
 * 管理员页修改评论体信息
 * @name modifyCommentSubject 修改评论体信息
 * @description PUT /modifyCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @body {string} cbImg 评论体图片
 * @body {string} cbText 评论文本
 * @body {string} cbTitle 评论标题
 * @body {string} userId 用户ID
 * @response {Object} result 修改结果
 */
router.put('/modifyCommentSubject', async (req, res, next) => {
    const { comtSubjectId, cbImg, cbText, cbTitle, userId } = req.body;
    const result = await commentSubjectService.modifyCommentSubject(comtSubjectId, cbImg, cbText, cbTitle, userId);
    res.ResultVO(0, '成功', result);
});

/**
 * 管理员页删除评论体信息
 * @name deleteCommentSubject 删除评论体信息
 * @description DELETE /deleteCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 删除结果
 */
router.post('/deleteCommentSubject', async (req, res, next) => {
    const { comtSubjectId } = req.body;
    const result = await commentSubjectService.deleteCommentSubject(comtSubjectId);
    res.ResultVO(0, '成功', result);
});
/**
 * 管理员页恢复评论体信息
 * @name recoverCommentSubject 恢复评论体信息
 * @description POST /recoverCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 删除结果
 */
router.post('/recoverCommentSubject', async (req, res, next) => {
    const { comtSubjectId } = req.body;
    const result = await commentSubjectService.recoverCommentSubject(comtSubjectId);
    res.ResultVO(0, '成功', result);
});
/**
 * 用户个人获取收藏评论体信息
 * @name getCollectCommentSubject 恢复评论体信息
 * @description GET /getCollectCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 删除结果
 */
router.get('/getCollectCommentSubject', async (req, res, next) => {
    const { userId } = req.query;
    const result = await commentSubjectService.getCollectCommentSubject(userId);
    res.ResultVO(0, '成功', result);
});
/**
 * 用户收藏评论体接口
 * @name collectCommentSubject 恢复评论体信息
 * @description PUT /collectCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 删除结果
 */
router.put('/collectCommentSubject', async (req, res, next) => {
    const { userId, comtSubjectId } = req.body;
    const result = await commentSubjectService.collectCommentSubject(userId, comtSubjectId);
    res.ResultVO(0, '成功', result);
});
/**
 * 用户取消收藏评论体接口
 * @name cancelCollectCommentSubject 恢复评论体信息
 * @description PUT /cancelCollectCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 删除结果
 */
router.put('/cancelCollectCommentSubject', async (req, res, next) => {
    const { userId, comtSubjectId } = req.body;
    const result = await commentSubjectService.cancelCollectCommentSubject(userId, comtSubjectId);
    res.ResultVO(0, '成功', result);
});
