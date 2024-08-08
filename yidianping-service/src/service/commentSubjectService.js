const commentSubjectDao = require('../dao/commentSubjectDao.js');

//查询评论体信息
exports.getAllCommentSubject = async () => {
    const commentSubject = await commentSubjectDao.getAllCommentSubject();
    return commentSubject;
};

//创建新评论体
exports.createCommentSubject = async (cbImg, cbText, cbTitle, userId) => {
    const commentSubject = await commentSubjectDao.createCommentSubject(cbImg, cbText, cbTitle, userId);
    return commentSubject;
};

//修改评论体信息
exports.modifyCommentSubject = async (comtSubjectId, cbImg, cbText, cbTitle, userId) => {
    const commentSubject = await commentSubjectDao.modifyCommentSubject(comtSubjectId, cbImg, cbText, cbTitle, userId);
    return commentSubject;
};
//删除评论体信息
exports.deleteCommentSubject = async (comtSubjectId) => {
    const commentSubject = await commentSubjectDao.deleteCommentSubject(comtSubjectId);
    return commentSubject;
};
//恢复评论体信息
exports.recoverCommentSubject = async (comtSubjectId) => {
    const commentSubject = await commentSubjectDao.recoverCommentSubject(comtSubjectId);
    return commentSubject;
};
//用户个人获取收藏评论体信息
exports.getCollectCommentSubject = async (userId) => {
    const commentSubject = await commentSubjectDao.getCollectCommentSubject(userId);
    return commentSubject;
};
//用户收藏评论体接口
exports.collectCommentSubject = async (userId, comtSubjectId) => {
    const commentSubject = await commentSubjectDao.collectCommentSubject(userId, comtSubjectId);
    return commentSubject;
};
//用户取消收藏评论体接口
exports.cancelCollectCommentSubject = async (userId, comtSubjectId) => {
    const commentSubject = await commentSubjectDao.cancelCollectCommentSubject(userId, comtSubjectId);
    return commentSubject;
};
//用户获取评论体评论接口
exports.getSubjectComment = async (comtSubjectId, userId) => {
    const getSubjectComment = await commentSubjectDao.getSubjectComment(comtSubjectId, userId);
    return getSubjectComment;
};
