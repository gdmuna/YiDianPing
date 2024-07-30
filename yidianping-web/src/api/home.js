import request from '@/utils/request';

const moduleUrl = '/home';

const home = {
    // 查询评论详细信息
    getCommentInfo() {
        return request.get(`${moduleUrl}/commentInfo`);
    }
};

export default home;
