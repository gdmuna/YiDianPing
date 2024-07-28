const express = require('express');
const router = express.Router();
const questionService = require('../service/questionService.js');
/**
 * 管理员查询提问消息
 * @name getQuestion 查询提问信息
 * @description GET /getQuestion
 * @response {Object} result 查询结果
 */
router.get('/getQuestion', async (req, res, next) => {
    const result = await questionService.getQuestion();
    res.ResultVO(0, '成功', result);
});
/**
 * 删除提问
 * @name deleteQuestion 删除提问
 * @description POST /deleteQuestion
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @response {Object} result 删除结果
 */
router.post('/deleteQuestion', async (req, res, next) => {
    const { comtSubjectId, questionId } = req.body;
    const result = await questionService.deleteQuestion(comtSubjectId, questionId);
    res.ResultVO(0, '成功', result);
});
/**
 * 恢复提问内容
 * @name updateQuestion 恢复提问
 * @description POST /recoverQuestion
 * @body {string} comtSubjectId 提问主题ID
 * @body {string} questionId 提问ID
 * @response {Object} result 恢复结果
 */
router.post('/recoverQuestion', async (req, res, next) => {
    const { comtSubjectId, questionId } = req.body;
    const result = await questionService.recoverQuestion(comtSubjectId, questionId);
    res.ResultVO(0, '成功', result);
});
module.exports = router;
