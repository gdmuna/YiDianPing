import request from '@/utils/request';

const moduleUrl = '/home';

const home = {
    // 查询评论详细信息
    getCommentInfo() {
        return request.get(`${moduleUrl}/commentInfo`);
    },
    // 查询评论对象详细信息
    getCommentSubjectInfo() {
        return request.get(`${moduleUrl}/commentSubjectInfo`);
    }
};

export default home;
