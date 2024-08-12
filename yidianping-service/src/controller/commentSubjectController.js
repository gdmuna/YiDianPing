const router = require('express').Router();
module.exports = router;

const commentSubjectService = require('../service/commentSubjectService');
/**
 * 管理员页获取评论体信息
 * @name getAllCommentSubject 获取评论体信息
 * @description GET /commentSubject/getAllCommentSubject
 * @response {Array<Object>} getAllCommentSubject 查询结果
 * @response {string} getAllCommentSubject[].comt_subject_id 评论体ID
 * @response {string} getAllCommentSubject[].cb_title 评论体标题
 * @response {string} getAllCommentSubject[].cb_text 评论体内容
 * @response {string} getAllCommentSubject[].cb_img 评论体图片
 * @response {string} getAllCommentSubject[].category 分类
 * @response {string} getAllCommentSubject[].avgScore 平均分
 * @response {string} getAllCommentSubject[].created_at 评论体创建时间
 * @response {string} getAllCommentSubject[].is_enabled 是否有效
 */
router.get('/getAllCommentSubject', async (req, res, next) => {
    const getAllCommentSubject = await commentSubjectService.getAllCommentSubject();
    res.ResultVO(0, '成功', getAllCommentSubject);
});

/**
 * 创建新评论体
 * @name createCommentSubject 创建新评论体
 * @description POST /commentSubject/createCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @body {string} cbImg 评论体图片
 * @body {string} cbText 评论文本
 * @body {string} cbTitle 评论标题
 * @body {string} userId 用户ID
 * @response {Object} createCommentSubject 创建结果
 */
router.post('/createCommentSubject', async (req, res, next) => {
    const { cbImg, cbText, cbTitle, userId } = req.body;
    const createCommentSubject = await commentSubjectService.createCommentSubject(cbImg, cbText, cbTitle, userId);
    res.ResultVO(0, '成功', createCommentSubject);
});

/**
 * 管理员页修改评论体信息
 * @name modifyCommentSubject 修改评论体信息
 * @description PUT /commentSubject/modifyCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @body {string} cbImg 评论体图片
 * @body {string} cbText 评论文本
 * @body {string} cbTitle 评论标题
 * @body {string} userId 用户ID
 * @response {Object} modifyCommentSubject 修改结果
 */
router.put('/modifyCommentSubject', async (req, res, next) => {
    const { comtSubjectId, cbImg, cbText, cbTitle, userId } = req.body;
    const modifyCommentSubject = await commentSubjectService.modifyCommentSubject(comtSubjectId, cbImg, cbText, cbTitle, userId);
    res.ResultVO(0, '成功', modifyCommentSubject);
});

/**
 * 管理员页删除评论体信息
 * @name deleteCommentSubject 删除评论体信息
 * @description DELETE /commentSubject/deleteCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} deleteCommentSubject 删除结果
 */
router.post('/deleteCommentSubject', async (req, res, next) => {
    const { comtSubjectId } = req.body;
    const deleteCommentSubject = await commentSubjectService.deleteCommentSubject(comtSubjectId);
    res.ResultVO(0, '成功', deleteCommentSubject);
});

/**
 * 管理员页恢复评论体信息
 * @name recoverCommentSubject 恢复评论体信息
 * @description POST /commentSubject/recoverCommentSubject
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} result 恢复结果
 */
router.post('/recoverCommentSubject', async (req, res, next) => {
    const { comtSubjectId } = req.body;
    const recoverCommentSubject = await commentSubjectService.recoverCommentSubject(comtSubjectId);
    res.ResultVO(0, '成功', recoverCommentSubject);
});

/**
 * 用户个人获取收藏评论体信息
 * @name getCollectCommentSubject 恢复评论体信息
 * @description GET /commentSubject/getCollectCommentSubject
 * @query {string}  userId 用户ID
 * @response {Array<Object>} getCollectCommentSubject 获取结果
 * @response {string} getCollectCommentSubject[].comt_subject_id 评论主体ID
 * @response {string} getCollectCommentSubject[].cb_title 评论主体标题
 * @response {string} getCollectCommentSubject[].cb_img 评论主体配图
 * @response {string} getCollectCommentSubject[].cb_text 评论主体内容
 * @response {string} getCollectCommentSubject[].created_at 评论主体创建时间
 * @response {string} getCollectCommentSubject[].category 分类
 * @response {string} getCollectCommentSubject[].is_enabled 是否有效
 * @response {string} getCollectCommentSubject[].avg_score 平均分
 * @response {string} getCollectCommentSubject[].collect 收藏数
 */
router.get('/getCollectCommentSubject', async (req, res, next) => {
    const { userId } = req.query;
    const getCollectCommentSubject = await commentSubjectService.getCollectCommentSubject(userId);
    res.ResultVO(0, '成功', getCollectCommentSubject);
});

/**
 * 用户收藏评论体接口
 * @name collectCommentSubject 恢复评论体信息
 * @description PUT /commentSubject/collectCommentSubject
 * @body {string}  userId 用户ID
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} collectCommentSubject 收藏结果
 */
router.put('/collectCommentSubject', async (req, res, next) => {
    const { userId, comtSubjectId } = req.body;
    const collectCommentSubject = await commentSubjectService.collectCommentSubject(userId, comtSubjectId);
    res.ResultVO(0, '成功', collectCommentSubject);
});

/**
 * 用户取消收藏评论体接口
 * @name cancelCollectCommentSubject 恢复评论体信息
 * @description PUT /commentSubject/cancelCollectCommentSubject
 * @body {string}  userId 用户ID
 * @body {string} comtSubjectId 评论体ID
 * @response {Object} cancelCollectCommentSubject 恢复结果
 */
router.put('/cancelCollectCommentSubject', async (req, res, next) => {
    const { userId, comtSubjectId } = req.body;
    const cancelCollectCommentSubject = await commentSubjectService.cancelCollectCommentSubject(userId, comtSubjectId);
    res.ResultVO(0, '成功', cancelCollectCommentSubject);
});

/**
 * 用户获取评论体评论接口
 * @name getSubjectComment 恢复评论体信息
 * @description GET /commentSubject/getSubjectComment
 * @query {string} comtSubjectId 评论体ID
 * @query {string}  userId 用户ID
 * @response {Array<Object>} getSubjectComment 获取结果
 * @response {string} getSubjectComment[].comment_id 评论ID
 * @response {string} getSubjectComment[].comt_subject_id 评论主体ID
 * @response {string} getSubjectComment[].user_id 用户ID
 * @response {string} getSubjectComment[].text 评论内容
 * @response {string} getSubjectComment[].thumbs_up 点赞数
 * @response {string} getSubjectComment[].is_thumbs 是否点赞
 * @response {string} getSubjectComment[].nickname 用户昵称
 * @response {string} getSubjectComment[].avatar 用户头像
 * @response {string} getSubjectComment[].created_at 创建时间
 * @response {string} getSubjectComment[].img_path 评论图片
 * @response {string} getSubjectComment[].history_id 版本号
 * @response {string} getSubjectComment[].is_forbidden 用户是否封禁
 * @response {string} getSubjectComment[].is_deleted 用户是否注销
 * @response {string} getSubjectComment[].question_id 是否为评论
 */
router.get('/getSubjectComment', async (req, res, next) => {
    const { comtSubjectId, userId } = req.query;
    const getSubjectComment = await commentSubjectService.getSubjectComment(comtSubjectId, userId);
    res.ResultVO(0, '成功', getSubjectComment);
});

/**
 * 用户获取评论体提问接口
 * @name getSubjectQuestion
 * @description GET /commentSubject/getSubjectQuestion
 * @query {string} comtSubjectId 评论体ID
 * @query {string} userId 用户ID
 * @response {Object} getSubjectQuestion 返回的结果对象
 * @response {Array} getSubjectQuestion.data 提问和评论的数据数组
 * @response {string} getSubjectQuestion.data[].question_text 问题内容
 * @response {string} getSubjectQuestion.data[].question_created_at 提问创建时间
 * @response {number} getSubjectQuestion.data[].question_id 提问ID
 * @response {string} getSubjectQuestion.data[].question_nickname 提问用户昵称
 * @response {string} getSubjectQuestion.data[].question_avatar 提问用户头像
 * @response {number} getSubjectQuestion.data[].question_is_forbidden 用户是否被禁用
 * @response {number} getSubjectQuestion.data[].question_is_deleted 用户是否注销
 * @response {Array} getSubjectQuestion.data[].comments 评论列表 - 与提问相关联的评论列表
 * @response {number|null} getSubjectQuestion.data[].comments[].comment_id 评论ID
 * @response {string|null} getSubjectQuestion.data[].comments[].comment_text 评论内容
 * @response {string|null} getSubjectQuestion.data[].comments[].comment_created_at 评论创建时间
 * @response {string|null} getSubjectQuestion.data[].comments[].comment_user_id 评论用户ID
 * @response {string|null} getSubjectQuestiont.data[].comments[].comment_nickname 评论用户昵称
 * @response {string|null} getSubjectQuestion.data[].comments[].comment_avatar 评论用户头像
 * @response {number|null} getSubjectQuestion.data[].comments[].comment_is_forbidden 评论用户是否被禁用
 * @response {number|null} getSubjectQuestion.data[].comments[].comment_is_deleted 评论用户是否被注销
 * @response {string|null} getSubjectQuestion.data[].comments[].comment_img_path 评论图片路径
 */
router.get('/getSubjectQuestion', async (req, res, next) => {
    const { comtSubjectId, userId } = req.query;
    const getSubjectQuestion = await commentSubjectService.getSubjectQuestion(comtSubjectId, userId);
    res.ResultVO(0, '成功', getSubjectQuestion);
});
