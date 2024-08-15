const router = require('express').Router();
module.exports = router;

const questionService = require('../service/questionService.js');

/**
 * 管理员获取提问消息
 * @name getQuestion 获取提问信息
 * @description GET /question/getQuestion
 * @response {Array<Object>} getQuestion 查询结果
 * @response {string} getQuestion[].question_id 提问ID
 * @response {string} getQuestion[].comt_subject_id 评论主体ID
 * @response {string} getQuestion[].user_id 用户ID
 * @response {string} getQuestion[].text 提问内容
 * @response {string} getQuestion[].created_at 提问创建时间
 * @response {string} getQuestion[].nickname 用户昵称
 * @response {string} getQuestion[].cb_title 评论主体标题
 * @response {string} getQuestion[].is_enabled 是否有效
 */
router.get('/getQuestion', async (req, res, next) => {
    const getQuestion = await questionService.getQuestion();
    res.ResultVO(0, '成功', getQuestion);
});

/**
 * 删除提问
 * @name deleteQuestion 删除提问
 * @description POST /question/deleteQuestion
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @response {Object} deleteQuestion 删除结果
 */
router.post('/deleteQuestion', async (req, res, next) => {
    const { comtSubjectId, questionId } = req.body;
    const deleteQuestion = await questionService.deleteQuestion(comtSubjectId, questionId);
    res.ResultVO(0, '成功', deleteQuestion);
});

/**
 * 恢复提问内容
 * @name updateQuestion 恢复提问
 * @description POST /question/recoverQuestion
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @response {Object} recoverQuestion 恢复结果
 */
router.post('/recoverQuestion', async (req, res, next) => {
    const { comtSubjectId, questionId } = req.body;
    const recoverQuestion = await questionService.recoverQuestion(comtSubjectId, questionId);
    res.ResultVO(0, '成功', recoverQuestion);
});

/**
 * 发布提问回复
 * @name putQuestionReply 发布提问回复
 * @description POST /question/putQuestionReply
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @body {string} text 回复内容
 * @body {string} userId 用户ID
 * @body {string} imgPath 回复图片
 * @response {Object} putQuestionReply 恢复结果
 */
router.post('/putQuestionReply', async (req, res, next) => {
    const { comtSubjectId, questionId, text, userId, imgPath } = req.body;
    const putQuestionReply = await questionService.putQuestionReply(comtSubjectId, questionId, text, userId, imgPath);
    res.ResultVO(0, '成功', putQuestionReply);
});

/**
 * 修改发布提问回复
 * @name updateQuestionReply 发布提问回复
 * @description PUT /question/updateQuestionReply
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @body {string} text 回复内容
 * @body {string} commentId 回复ID
 * @body {string} userId 用户ID
 * @body {string} imgPath 回复图片
 * @response {Object} result 恢复结果
 */
router.put('/updateQuestionReply', async (req, res, next) => {
    const { questionId, text, commentId, userId, imgPath } = req.body;
    const updateQuestionReply = await questionService.updateQuestionReply(questionId, text, commentId, userId, imgPath);
    res.ResultVO(0, '成功', updateQuestionReply);
});
