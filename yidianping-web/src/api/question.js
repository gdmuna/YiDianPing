import request from '../utils/request';

const moduleUrl = '/question';

const question = {
    //查询所有提问
    getQuestion() {
        return request.get(`${moduleUrl}/getQuestion`);
    },
    //删除提问
    deleteQuestion(data) {
        return request.delete(`${moduleUrl}/deleteQuestion`, data);
    },
    //恢复提问
    recoverQuestion(data) {
        return request.put(`${moduleUrl}/recoverQuestion`, data);
    }
};
export default question;
