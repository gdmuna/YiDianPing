const homeDao = require('../dao/homeDao');

// 获取评论信息
exports.getCommentInfo = async () => {
    const commentInfo = await homeDao.getCommentInfo();
    return commentInfo;
};

// 获取评论对象信息
exports.getCommentSubjectInfo = async () => {
    const commentSubjectInfo = await homeDao.getCommentSubjectInfo();
    return commentSubjectInfo;
};
