const commentDao = require('../dao/commentDao.js');

//查询评论信息
exports.getComment = async () => {
    const comment = await commentDao.getComment();
    return comment;
};

//创建新评论
exports.createComment = async (comtSubjectId, commentId, text, userId, imgPath = null) => {
    const comment = await commentDao.createComment(comtSubjectId, commentId, text, userId, imgPath);
    return comment;
};

//删除评论
exports.deleteComment = async (comtSubjectId, commentId) => {
    const comment = await commentDao.deleteComment(comtSubjectId, commentId);
    return comment;
};

//恢复评论
exports.recoverComment = async (comtSubjectId, commentId) => {
    const comment = await commentDao.recoverComment(comtSubjectId, commentId);
    return comment;
};

// 更新评论获赞数
exports.updateThumbsUp = async (userId, commentId, comtSubjectId) => {
    const thumbsUp = await commentDao.updateThumbsUp(userId, commentId, comtSubjectId);
    return thumbsUp;
};

// 更新评论点赞数（减少）
exports.cancelThumbUp = async (userId, commentId, comtSubjectId) => {
    const thumbUp = await commentDao.cancelThumbsUp(userId, commentId, comtSubjectId);
    return thumbUp;
};

//查询历史评论
exports.getHistoryComment = async (userId) => {
    const historyComment = await commentDao.getHistoryComment(userId);
    return historyComment;
};

//查询点赞评论
exports.getLoveComment = async (userId) => {
    const loveComment = await commentDao.getLoveComment(userId);
    return loveComment;
};
