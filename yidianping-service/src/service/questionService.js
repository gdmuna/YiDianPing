const questionDao = require('../dao/questionDao.js');

//查询提问信息
exports.getQuestion = async () => {
    const question = await questionDao.getQuestion();
    return question;
};

//删除提问信息
exports.deleteQuestion = async (comtSubjectId, questionId) => {
    const question = await questionDao.deleteQuestion(comtSubjectId, questionId);
    return question;
};

//恢复提问信息
exports.recoverQuestion = async (comtSubjectId, questionId) => {
    const question = await questionDao.recoverQuestion(comtSubjectId, questionId);
    return question;
};

//发布提问回复
exports.putQuestionReply = async (comtSubjectId, questionId, text, userId, imgPath) => {
    const questionReply = await questionDao.putQuestionReply(comtSubjectId, questionId, text, userId, imgPath);
    return questionReply;
};

//修改提问回复
exports.updateQuestionReply = async (questionId, text, commentId, userId, imgPath) => {
    const questionReply = await questionDao.updateQuestionReply(questionId, text, commentId, userId, imgPath);
    return questionReply;
};
