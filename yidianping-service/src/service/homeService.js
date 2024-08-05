const homeDao = require('../dao/homeDao');

// 获取评论信息
exports.getCommentInfo = async () => {
    const commentInfo = await homeDao.getCommentInfo();
    return commentInfo;
};

// 获取评论主体信息
exports.getCommentSubjectInfo = async () => {
    const commentSubjectInfo = await homeDao.getCommentSubjectInfo();
    return commentSubjectInfo;
};

// 根据评论主体id获取对应评论主体信息
exports.getTheCommentSubjectInfo = async (comtSubjectId) => {
    const theCommentSubjectInfo = await homeDao.getTheCommentSubjectInfo(comtSubjectId);
    return theCommentSubjectInfo;
};

// 获取餐饮类版块字典信息
exports.getDictPlateInfo = async () => {
    const dictPlateInfo = await homeDao.getDictPlateInfo();
    return dictPlateInfo;
};
