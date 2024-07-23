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
    const { comtSubjectId, cbImg, cbText, cbTitle, userId } = req.body;
    const result = await commentSubjectService.createCommentSubject(comtSubjectId, cbImg, cbText, cbTitle, userId);
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
router.delete('/deleteCommentSubject', async (req, res, next) => {
    const { comtSubjectId } = req.body;
    const result = await commentSubjectService.deleteCommentSubject(comtSubjectId);
    res.ResultVO(0, '成功', result);
});
