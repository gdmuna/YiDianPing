const db = require('../utils/dbConnPool/mariadb');

exports.getComment = async () => {
    const sql = `
SELECT 
    c.*, 
    u.nickname, 
    s.cb_title,
    CAST(COUNT(CASE WHEN ct.is_thumbs = 1 THEN 1 END) AS CHAR) AS thumbs_up
FROM 
    yi_comment c
LEFT JOIN 
    yi_user u ON c.user_id = u.user_id
LEFT JOIN 
    yi_comment_subject s ON c.comt_subject_id = s.comt_subject_id
LEFT JOIN 
    yi_comment_thumbs ct ON c.comt_subject_id = ct.comt_subject_id AND c.comment_id = ct.comment_id
GROUP BY
    c.comment_id, u.nickname, s.cb_title;
`;
    return await db.query(sql);
};

// 创建新评论
exports.createComment = async (comtSubjectId, commentId, text, userId, imgPath = null) => {
    const sql = `
        INSERT INTO 
            yi_comment
        (
            comt_subject_id,
            comment_id,
            text,
            user_id,
            img_path
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `;
    const sqlParams = [comtSubjectId, commentId, text, userId, imgPath];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('创建评论失败:', error);
        throw error;
    }
};

// 删除评论
exports.deleteComment = async (comtSubjectId, commentId) => {
    const sql = `
        UPDATE yi_comment
        SET 
            is_enabled =1
        WHERE
            comt_subject_id = ?
            AND comment_id = ?
    `;
    const sqlParams = [comtSubjectId, commentId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('删除评论失败:', error);
    }
};
//恢复评论
exports.recoverComment = async (comtSubjectId, commentId) => {
    const sql = `
        UPDATE yi_comment
        SET 
            is_enabled = 0
        WHERE
            comt_subject_id = ?
            AND comment_id = ?
    `;
    const sqlParams = [comtSubjectId, commentId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('删除评论失败:', error);
    }
};
//点赞评论逻辑
exports.updateThumbsUp = async (userId, commentId, comtSubjectId) => {
    const sql = `
        REPLACE INTO yi_comment_thumbs (user_id, comment_id, comt_subject_id, created_at, is_thumbs)
        VALUES (?, ?,?,NOW(),1);
    `;
    const sqlParams = [userId, commentId, comtSubjectId];

    return await db.query(sql, sqlParams);
};
//取消点赞
exports.cancelThumbsUp = async (userId, commentId, comtSubjectId) => {
    const sql = `
    UPDATE yi_comment_thumbs
    SET is_thumbs = 0
    WHERE user_id = ? AND comment_id = ? AND comt_subject_id = ?;
`;
    const sqlParams = [userId, commentId, comtSubjectId];

    return await db.query(sql, sqlParams);
};
//查询个人历史评论
exports.getHistoryComment = async (userId) => {
    const sql = `
        SELECT 
            c.*, 
            b.cb_title,
            t.is_thumbs,
            CONVERT(COUNT(ct.is_thumbs), CHAR) AS thumbs_up
        FROM 
            yi_comment c
        JOIN
            yi_comment_subject b ON c.comt_subject_id = b.comt_subject_id AND b.is_enabled = 0
        LEFT JOIN
            yi_comment_thumbs t ON c.comment_id = t.comment_id AND t.user_id = ?
        LEFT JOIN
            yi_comment_thumbs ct ON c.comment_id = ct.comment_id AND ct.is_thumbs = 1
        WHERE
            c.user_id = ? 
            AND c.is_enabled = 0
        GROUP BY
            c.comment_id, b.cb_title, t.is_thumbs;
    `;
    const sqlParams = [userId, userId];

    return await db.query(sql, sqlParams);
};

//查询点赞评论
exports.getLoveComment = async (userId) => {
    const sql = `
        SELECT 
            c.*, 
            b.cb_title,
            t.is_thumbs,
            CONVERT(COUNT(ct.is_thumbs), CHAR) AS thumbs_up
        FROM 
            yi_comment_thumbs t
        JOIN
            yi_comment c ON t.comment_id = c.comment_id AND t.comt_subject_id = c.comt_subject_id
        JOIN
            yi_comment_subject b ON c.comt_subject_id = b.comt_subject_id
        LEFT JOIN
            yi_comment_thumbs ct ON ct.comment_id = c.comment_id AND ct.is_thumbs = 1
        WHERE 
            t.is_thumbs = 1 
            AND t.user_id = ? 
            AND c.is_enabled = 0 
            AND b.is_enabled = 0
        GROUP BY
            c.comment_id, b.cb_title, t.is_thumbs;
    `;
    const sqlParams = [userId];

    return await db.query(sql, sqlParams);
};
