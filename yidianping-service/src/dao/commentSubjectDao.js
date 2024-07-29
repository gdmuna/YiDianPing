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
