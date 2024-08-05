const commentDao = require('../dao/commentDao.js');

//查询评论信息
exports.getComment = async () => {
    const Comment = await commentDao.getComment();
    return Comment;
};

//创建新评论
exports.createComment = async (comtSubjectId, commentId, text, userId, imgPath = null) => {
    const Comment = await commentDao.createComment(comtSubjectId, commentId, text, userId, imgPath);
    return Comment;
};

//删除评论
exports.deleteComment = async (comtSubjectId, commentId) => {
    const Comment = await commentDao.deleteComment(comtSubjectId, commentId);
    return Comment;
};
//恢复评论
exports.recoverComment = async (comtSubjectId, commentId) => {
    const Comment = await commentDao.recoverComment(comtSubjectId, commentId);
    return Comment;
};

// 更新评论获赞数
exports.updateThumbsUp = async (userId, commentId, comtSubjectId) => {
    const Comment = await commentDao.updateThumbsUp(userId, commentId, comtSubjectId);
    return Comment;
};

// 更新评论点赞数（减少）
exports.cancelThumbUp = async (userId, commentId, comtSubjectId) => {
    const Comment = await commentDao.cancelThumbsUp(userId, commentId, comtSubjectId);
    return Comment;
};

//查询历史评论
exports.getHistoryComment = async (userId) => {
    const Comment = await commentDao.getHistoryComment(userId);
    return Comment;
};
//查询点赞评论
exports.getLoveComment = async (userId) => {
    const Comment = await commentDao.getLoveComment(userId);
    return Comment;
};
