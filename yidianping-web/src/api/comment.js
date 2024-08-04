import request from '../utils/request';
const moduleUrl = '/comment';

const Comment = {
    //查询所有评论的详细信息
    getComment() {
        return request.get(`${moduleUrl}/getComment`);
    },
    // 创建新评论
    createComment(data) {
        return request.post(`${moduleUrl}/createComment`, data);
    },
    //删除评论
    deleteComment(data) {
        return request.post(`${moduleUrl}/deleteComment`, data);
    },
    //恢复评论
    recoverComment(data) {
        return request.post(`${moduleUrl}/recoverComment`, data);
    },
    //查询历史评论
    getHistoryComment(data) {
        return request.get(`${moduleUrl}/getHistoryComment`, data);
    },
    //点赞评论
    ThumbsUp(data) {
        return request.put(`${moduleUrl}/ThumbsUp`, data);
    },
    //取消点赞
    cancelThumbsUp(data) {
        return request.put(`${moduleUrl}/cancelThumbsUp`, data);
    },
    //查询点赞的评论
    getLoveComment(data) {
        return request.get(`${moduleUrl}/getLoveComment`, data);
    }
};
export default Comment;
