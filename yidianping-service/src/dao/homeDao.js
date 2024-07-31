const db = require('../utils/dbConnPool/mariadb');

// 获取评论信息
exports.getCommentInfo = async () => {
    const sql = `
        SELECT
            c.*,
            cs.cb_title,
            s.score,
            u.nickname,
            u.avatar
        FROM
            yi_comment c
        JOIN
            yi_comment_subject cs
            ON c.comt_subject_id = cs.comt_subject_id
        JOIN
            yi_score s
            ON c.user_id = s.user_id
        JOIN
            yi_user u
            ON c.user_id = u.user_id
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};
