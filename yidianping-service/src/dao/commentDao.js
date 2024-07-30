const db = require('../utils/dbConnPool/mariadb');

// 查询评论信息
exports.getComment = async () => {
    const sql = `
        SELECT 
            c.*, 
            u.nickname, 
            s.cb_title
        FROM 
            yi_comment c
        LEFT JOIN 
            yi_user u ON c.user_id = u.user_id
        LEFT JOIN 
            yi_comment_subject s ON c.comt_subject_id = s.comt_subject_id
    `;
    return await db.query(sql);
};

// 创建新评论
exports.createComment = async (comtSubjectId, commentId, text, userId) => {
    const sql = `
        INSERT INTO 
            yi_comment
        (
            comt_subject_id,
            comment_id,
            text,
            user_id
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?
        )
    `;
    const sqlParams = [comtSubjectId, commentId, text, userId];
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
            is_enabled =0
        WHERE
            comt_subject_id = ?
            AND comment_id = ?
    `;
    const sqlParams = [comtSubjectId, commentId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('恢复评论失败:', error);
    }
};

// 更新评论获赞数
exports.updateThumbsUp = async (commentId, comtSubjectId) => {
    const sqlUpdate = `
    UPDATE yi_comment
    SET thumbs_up = thumbs_up + 1
    WHERE comment_id = ? AND comt_subject_id = ?
`;

    const sqlSelect = `
    SELECT thumbs_up
    FROM yi_comment
    WHERE comment_id = ? AND comt_subject_id = ?
`;
    const sqlParams = [commentId, comtSubjectId];
    try {
        await db.query(sqlUpdate, sqlParams);
        const result = await db.query(sqlSelect, sqlParams);
        return result[0].thumbs_up;
    } catch (error) {
        console.error('点赞失败:', error);
        throw error;
    }
};

// 更新评论点赞数（减少）
exports.cancelThumbsUp = async (commentId, comtSubjectId) => {
    const sqlUpdate = `
        UPDATE yi_comment
        SET thumbs_up = thumbs_up - 1
        WHERE comment_id = ? AND comt_subject_id = ?
    `;
    const sqlSelect = `
        SELECT thumbs_up
        FROM yi_comment
        WHERE comment_id = ? AND comt_subject_id = ?
    `;
    const sqlParams = [commentId, comtSubjectId];
    try {
        await db.query(sqlUpdate, sqlParams);
        const result = await db.query(sqlSelect, sqlParams);
        return result[0].thumbs_up;
    } catch (error) {
        console.error('取消点赞失败:', error);
        throw error;
    }
};

// 查询历史评论
exports.getHistoryComment = async (comtSubjectId, userId) => {
    const sql = `
        SELECT 
            c.text,
            c.thumbs_up,
            b.cb_title
        FROM 
            yi_comment c
        JOIN
            yi_comment_body b ON c.comt_subject_id = b.comt_subject_id
        WHERE
            c.comt_subject_id = ?
            AND c.user_id = ?
    `;
    const sqlParams = [comtSubjectId, userId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('查询历史评论失败:', error);
        throw error;
    }
};
