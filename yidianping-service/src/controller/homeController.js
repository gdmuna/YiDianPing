const router = require('express').Router();
module.exports = router;

const homeService = require('../service/homeService');

/**
 * 获取评论信息
 * @name commentInfo 获取评论信息
 * @description GET /home/commentInfo
 * @header {string} authorization 用户凭证
 * @response {Object} commentInfo 评论信息
 * @response {string} commentInfo.comt_subject_id 评论主体ID
 * @response {string} commentInfo.comment_id 评论ID
 * @response {string} commentInfo.history_id 历史评论ID
 * @response {string} commentInfo.userId 用户ID
 * @response {string} commentInfo.text 评论内容
 * @response {string} commentInfo.img_path 评论配图路径
 * @response {string} commentInfo.created_at 评论创建时间
 * @response {string} commentInfo.is_enabled 该评论是否有效
 * @response {string} commentInfo.cb_title 评论主体名称
 * @response {string} commentInfo.score 用户对评论主体的评分
 * @response {string} commentInfo.nickName 用户昵称
 * @response {string} commentInfo.avatar 用户头像
 * @response {string} commentInfo.thumbs_up 评论获赞量
 */
router.get('/commentInfo', async (req, res, next) => {
    const commentInfo = await homeService.getCommentInfo();
    res.ResultVO(0, '成功', commentInfo);
});

/**
 * 获取评论主体信息
 * @name commentSubjectInfo 获取对象主体信息
 * @description GET /home/commentSubjectInfo
 * @header {string} authorization 用户凭证
 * @response {Object} commentSubjectInfo 评论主体信息
 * @response {string} commentSubjectInfo.comt_subject_id 评论主体ID
 * @response {string} commentSubjectInfo.user_id 发表该评论的用户ID
 * @response {string} commentSubjectInfo.cb_title 评论主体名称
 * @response {string} commentSubjectInfo.cb_text 评论主体信息
 * @response {string} commentSubjectInfo.cb_img 评论主体配图路径
 * @response {string} commentSubjectInfo.created_at 评论主体创建时间
 * @response {string} commentSubjectInfo.is_enabled 该评论主体是否有效
 * @response {string} commentSubjectInfo.comment_count 评论主体的评论总数
 * @response {string} commentSubjectInfo.avg_score 评论主体的评分（平均分）
 */
router.get('/commentSubjectInfo', async (req, res, next) => {
    const commentSubjectInfo = await homeService.getCommentSubjectInfo();
    res.ResultVO(0, '成功', commentSubjectInfo);
});
