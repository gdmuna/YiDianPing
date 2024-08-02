const db = require('../utils/dbConnPool/mariadb');

// 获取评论信息
exports.getCommentInfo = async () => {
    const sql = `
        SELECT
            c.*,
            cs.cb_title,
            s.score,
            u.nickname,
            u.avatar,
            COALESCE(CAST(COUNT(CASE WHEN ct.is_thumbs = 1 THEN 1 END) AS CHAR), '0') AS thumbs_up
        FROM
            yi_comment c
        JOIN
            yi_comment_subject cs
            ON c.comt_subject_id = cs.comt_subject_id
        LEFT JOIN
            yi_score s
            ON c.user_id = s.user_id
            AND c.comt_subject_id = s.comt_subject_id
        JOIN
            yi_user u
            ON c.user_id = u.user_id
        LEFT JOIN
            yi_comment_thumbs ct
            ON c.comt_subject_id = ct.comt_subject_id
        WHERE
            c.is_enabled = 0 AND cs.is_enabled = 0
        GROUP BY
            c.comment_id, cs.cb_title, s.score, u.nickname, u.avatar;
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};

// 获取评论对象信息
exports.getCommentSubjectInfo = async () => {
    const sql = `
        SELECT
            cs.*,
            IFNULL(AVG(s.score), 0) AS avg_score
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
        GROUP BY
            cs.comt_subject_id
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};
