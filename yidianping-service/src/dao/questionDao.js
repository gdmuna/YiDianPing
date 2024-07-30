const db = require('../utils/dbConnPool/mariadb');

//查询提问信息
exports.getQuestion = async () => {
    const sql = `
    SELECT
        c.*,
        u.nickname,
        s.cb_title
    FROM
        yi_questions c
    LEFT JOIN
        yi_user u ON c.user_id = u.user_id
    LEFT JOIN
        yi_comment_subject s ON c.comt_subject_id = s.comt_subject_id
`;
    return await db.query(sql);
};
//删除提问信息
exports.deleteQuestion = async (comtSubjectId, questionId) => {
    const sql = `
        UPDATE yi_questions
        SET 
            is_enabled =1
        WHERE
            comt_subject_id = ?
            AND question_id = ?
`;
    return await db.query(sql, [comtSubjectId, questionId]);
};
//恢复提问信息
exports.recoverQuestion = async (comtSubjectId, questionId) => {
    const sql = `
        UPDATE yi_questions
        SET 
            is_enabled =0
        WHERE
            comt_subject_id = ?
            AND question_id = ?
`;
    return await db.query(sql, [comtSubjectId, questionId]);
};
