const homeDao = require('../dao/homeDao');

// 获取评论信息
exports.getCommentInfo = async () => {
    const commentInfo = await homeDao.getCommentInfo();
    return commentInfo;
};
