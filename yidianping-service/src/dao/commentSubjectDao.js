const db = require('../utils/dbConnPool/mariadb');
const { v7: uuidv7 } = require('uuid');
// 获取评论体信息
exports.getAllCommentSubject = async () => {
    const sql = `
        SELECT 
            *
        FROM 
            yi_comment_subject
    `;
    return await db.query(sql);
};

// 创建评论体
exports.createCommentSubject = async (cbImg, cbText, cbTitle, userId) => {
    const sql = `
        INSERT
        yi_comment_subject
        (
        comt_subject_id,
        cb_img,
        cb_text,
        cb_title,
        user_id,
        created_at
        )
        VALUES 
        (
        ?,
        ?, 
        ?, 
        ?, 
        ?,
        NOW()
        )
    `;
    const sqlParams = [uuidv7(), cbImg, cbText, cbTitle, userId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('Error in createCommentSubject:', error);
        throw error;
    }
};

// 修改评论体信息
exports.modifyCommentSubject = async (comtSubjectId, cbImg, cbText, cbTitle, userId) => {
    const sql = `
        UPDATE 
            yi_comment_subject
        SET 
            cb_img = ?,
            cb_text = ?,
            cb_title = ?,
            user_id = ?
        WHERE
            comt_subject_id = ?
    `;
    const sqlParams = [cbImg, cbText, cbTitle, userId, comtSubjectId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('Error in modifyCommentSubject:', error);
        throw error;
    }
};
// 删除评论体信息
exports.deleteCommentSubject = async (comtSubjectId) => {
    const sql = `
        UPDATE yi_comment_subject
        SET 
            is_enabled =1
        WHERE
            comt_subject_id = ?
    `;
    const sqlParams = [comtSubjectId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('Error in deleteCommentSubject:', error);
    }
};
// 恢复评论体信息
exports.recoverCommentSubject = async (comtSubjectId) => {
    const sql = `
        UPDATE yi_comment_subject
        SET 
            is_enabled =0
        WHERE
            comt_subject_id = ?
    `;
    const sqlParams = [comtSubjectId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('Error in recoverCommentSubject:', error);
    }
};
// 获取收藏的评论体信息
exports.getCollectCommentSubject = async (userId) => {
    const sql = `
        SELECT 
    ycs.cb_title,
    ycs.cb_img,
    ycs.cb_text,
    ycs.is_enabled,
    ct.*,
    CONVERT(
        (SELECT COUNT(*) 
        FROM yi_comment_subject_collect 
        WHERE comt_subject_id = ycs.comt_subject_id AND is_collect = 1), 
        CHAR
    ) AS collect,
    (SELECT 
        IFNULL(AVG(score), 0) 
    FROM 
        yi_score 
    WHERE 
        comt_subject_id = ycs.comt_subject_id) AS sum_score
FROM 
    yi_comment_subject_collect ct
JOIN 
    yi_comment_subject ycs
ON 
    ct.comt_subject_id = ycs.comt_subject_id
WHERE
    ct.user_id = ?
AND 
    ycs.is_enabled = 0
GROUP BY 
    ycs.cb_title, ycs.cb_img, ycs.cb_text, ycs.is_enabled, ycs.comt_subject_id
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
//用户收藏评论体
exports.collectCommentSubject = async (userId, comtSubjectId) => {
    const sql = `
        REPLACE INTO yi_comment_subject_collect (user_id, comt_subject_id, created_at, is_collect)
        VALUES (?, ?, NOW(), 1);
    `;
    const sqlParams = [userId, comtSubjectId];

    return await db.query(sql, sqlParams);
};
//用户取消收藏评论体接口
exports.cancelCollectCommentSubject = async (userId, comtSubjectId) => {
    const sql = `
    UPDATE yi_comment_subject_collect
    SET is_collect = 0
    WHERE user_id = ? AND comt_subject_id = ?;
`;
    const sqlParams = [userId, comtSubjectId];

    return await db.query(sql, sqlParams);
};
