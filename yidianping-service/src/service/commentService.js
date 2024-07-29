const commentDao = require('../dao/commentDao.js');

//查询评论信息
exports.getComment = async () => {
    const Comment = await commentDao.getComment();
    return Comment;
};

//创建新评论
exports.createComment = async (comtSubjectId, commentId, text, userId) => {
    const Comment = await commentDao.createComment(comtSubjectId, commentId, text, userId);
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
exports.updateThumbsUp = async (commentId, comtSubjectId) => {
    return await commentDao.updateThumbsUp(commentId, comtSubjectId);
};

// 更新评论点赞数（减少）
exports.cancelThumbUp = async (commentId, comtSubjectId) => {
    return await commentDao.cancelThumbsUp(commentId, comtSubjectId);
};

//查询历史评论
exports.getHistoryComment = async (comtSubjectId, userId) => {
    const Comment = await commentDao.getHistoryComment(comtSubjectId, userId);
    return Comment;
};
