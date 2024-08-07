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
    },
    // 根据评论主体id获取对应评论主体信息
    getTheCommentSubjectInfo(comtSubjectId) {
        return request.get(`${moduleUrl}/theCommentSubjectInfo`, { comtSubjectId });
    },
    // 获取餐饮类版块字典信息
    getDictPlateInfo() {
        return request.get(`${moduleUrl}/dictPlateInfo`);
    },
    // 根据关键词模糊搜索对应评论主体
    searchSubject(comtSubjectTitle) {
        return request.get(`${moduleUrl}/searchSubject`, { comtSubjectTitle });
    }
};

export default home;
