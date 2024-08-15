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
    const sqlParams = [];
    return await db.query(sql, sqlParams);
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
    const sqlParams = [comtSubjectId, questionId];
    return await db.query(sql, sqlParams);
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
    const sqlParams = [comtSubjectId, questionId];
    return await db.query(sql, sqlParams);
};
//发布提问回复
exports.putQuestionReply = async (comtSubjectId, questionId, text, userId, imgPath) => {
    const sql = `
        INSERT INTO yi_comment
            (comt_subject_id, question_id, text, user_id,created_at, img_path)
        VALUES
            (?, ?, ?, ?, NOW(), ?)
    `;
    const sqlParams = [comtSubjectId, questionId, text, userId, imgPath];
    return await db.query(sql, sqlParams);
};
//修改提问回复
exports.updateQuestionReply = async (questionId, text, commentId, userId, imgPath) => {
    const sql = `
        UPDATE yi_comment
        SET
            text = ?,
            img_path = ?,
            created_at = NOW()
        WHERE
            question_id = ?
            AND comment_id = ?
            AND user_id = ?
    `;
    const sqlParams = [text, imgPath, questionId, commentId, userId];
    return await db.query(sql, sqlParams);
};
