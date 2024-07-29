import request from '../utils/request';
const moduleUrl = '/comment';

const Comment = {
    //查询所有评论的详细信息
    getComment() {
        return request.get(`${moduleUrl}/getComment`);
    },
    //删除评论
    deleteComment(data) {
        return request.post(`${moduleUrl}/deleteComment`, data);
    },
    //恢复评论
    recoverComment(data) {
        return request.post(`${moduleUrl}/recoverComment`, data);
    }
};
export default Comment;
