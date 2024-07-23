const commentSubjectDao = require('../dao/commentSubjectDao.js');

//查询评论体信息
exports.getAllCommentSubject = async () => {
    const commentSubject = await commentSubjectDao.getAllCommentSubject();
    return commentSubject;
};

//创建新评论体
exports.createCommentSubject = async (comtSubjectId, cbImg, cbText, cbTitle, userId) => {
    const commentSubject = await commentSubjectDao.createCommentSubject(comtSubjectId, cbImg, cbText, cbTitle, userId);
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
