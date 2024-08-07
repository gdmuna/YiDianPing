import request from '../utils/request';
const moduleUrl = '/commentSubject';

const CommentSubject = {
    // 查询所有评论体的详细信息
    getCommentSubject() {
        return request.get(`${moduleUrl}/getAllCommentSubject`);
    },
    // 修改评论体信息
    modifyCommentSubject(data) {
        return request.put(`${moduleUrl}/modifyCommentSubject`, data);
    },
    // 删除评论体
    deleteCommentSubject(data) {
        return request.post(`${moduleUrl}/deleteCommentSubject`, data); // 注意这里应该是 post 方法
    },
    // 恢复评论体
    recoverCommentSubject(data) {
        return request.post(`${moduleUrl}/recoverCommentSubject`, data); // 注意这里应该是 post 方法
    },
    //用户收藏的评论体
    getCollectCommentSubject(data) {
        return request.get(`${moduleUrl}/getCollectCommentSubject`, data);
    },
    //用户收藏评论体
    collectCommentSubject(data) {
        return request.put(`${moduleUrl}/collectCommentSubject`, data);
    },
    //用户取消收藏评论体
    cancelCollectCommentSubject(data) {
        return request.put(`${moduleUrl}/cancelCollectCommentSubject`, data);
    },
    //用户获取评论体评论
    getSubjectComment(data) {
        return request.get(`${moduleUrl}/getSubjectComment`, data);
    }
};

export default CommentSubject;
