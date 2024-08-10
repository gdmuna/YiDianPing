const questionDao = require('../dao/questionDao.js');

//查询提问信息
exports.getQuestion = async () => {
    const Question = await questionDao.getQuestion();
    return Question;
};
//删除提问信息
exports.deleteQuestion = async (comtSubjectId, questionId) => {
    const Question = await questionDao.deleteQuestion(comtSubjectId, questionId);
    return Question;
};
//恢复提问信息
exports.recoverQuestion = async (comtSubjectId, questionId) => {
    const Question = await questionDao.recoverQuestion(comtSubjectId, questionId);
    return Question;
};
//发布提问回复
exports.putQuestionReply = async (comtSubjectId, questionId, text, userId, imgPath) => {
    const putQuestionReply = await questionDao.putQuestionReply(comtSubjectId, questionId, text, userId, imgPath);
    return putQuestionReply;
};
//修改提问回复
exports.updateQuestionReply = async (questionId, text, commentId, userId, imgPath) => {
    const updateQuestionReply = await questionDao.updateQuestionReply(questionId, text, commentId, userId, imgPath);
    return updateQuestionReply;
};
