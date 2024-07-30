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
exports.updateThumbsUp = async (userId, commentId, comtSubjectId) => {
    const sqlCheck = `
        SELECT is_thumbs 
        FROM yi_comment_thumbs 
        WHERE user_id = ? AND comment_id = ? AND comt_subject_id = ?;
    `;

    const sqlUpdateComment = `
        UPDATE yi_comment 
        SET thumbs_up = thumbs_up + 1 
        WHERE comment_id = ? AND comt_subject_id = ?;
    `;

    const sqlUpdateThumbs = `
        UPDATE yi_comment_thumbs 
        SET is_thumbs = 1, created_at = ? 
        WHERE user_id = ? AND comment_id = ? AND comt_subject_id = ?;
    `;

    const sqlInsertThumbs = `
        INSERT INTO yi_comment_thumbs (user_id, comment_id, comt_subject_id, created_at, is_thumbs)
        VALUES (?, ?, ?, ?, 1);
    `;

    const sqlSelect = `
        SELECT thumbs_up 
        FROM yi_comment 
        WHERE comment_id = ? AND comt_subject_id = ?;
    `;

    const sqlParamsCheck = [userId, commentId, comtSubjectId];
    const sqlParamsUpdateComment = [commentId, comtSubjectId];
    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 格式化时间为 SQL DATETIME 格式

    try {
        // 检查是否已存在记录
        const checkResult = await db.query(sqlCheck, sqlParamsCheck);
        if (checkResult.length > 0) {
            if (checkResult[0].is_thumbs === 1) {
                throw new Error('Cannot thumbs up again: already thumbed up.');
            } else {
                // 更新 yi_comment 表
                await db.query(sqlUpdateComment, sqlParamsUpdateComment);
                // 更新 yi_comment_thumbs 表
                await db.query(sqlUpdateThumbs, [currentTime, userId, commentId, comtSubjectId]);
            }
        } else {
            // 更新 yi_comment 表
            await db.query(sqlUpdateComment, sqlParamsUpdateComment);
            // 插入新记录到 yi_comment_thumbs 表
            await db.query(sqlInsertThumbs, [userId, commentId, comtSubjectId, currentTime]);
        }

        // 获取最新的 thumbs_up 数
        const result = await db.query(sqlSelect, sqlParamsUpdateComment);
        if (!result || result.length === 0) {
            throw new Error('No record found or unexpected result structure.');
        }
        return result[0].thumbs_up;
    } catch (error) {
        console.error('Failed to update thumbs up:', error);
        throw error;
    }
};

exports.cancelThumbsUp = async (userId, commentId, comtSubjectId) => {
    const sqlCheck = `
        SELECT is_thumbs
        FROM yi_comment_thumbs
        WHERE user_id = ? AND comment_id = ? AND comt_subject_id = ?
    `;

    const sqlUpdateThumbsUp = `
        UPDATE yi_comment
        SET thumbs_up = thumbs_up - 1
        WHERE comment_id = ? AND comt_subject_id = ?
    `;

    const sqlUpdateThumbsStatus = `
        UPDATE yi_comment_thumbs
        SET is_thumbs = 0
        WHERE user_id = ? AND comment_id = ? AND comt_subject_id = ?
    `;

    const sqlSelectThumbsUp = `
        SELECT thumbs_up
        FROM yi_comment
        WHERE comment_id = ? AND comt_subject_id = ?
    `;

    const sqlParams = [userId, commentId, comtSubjectId];
    const sqlParamsUpdate = [commentId, comtSubjectId];

    try {
        // 检查是否已点赞
        const checkResult = await db.query(sqlCheck, sqlParams);
        console.log('Check Result:', checkResult);
        if (checkResult.length > 0 && checkResult[0].is_thumbs == 1) {
            // 更新 yi_comment 表
            await db.query(sqlUpdateThumbsUp, sqlParamsUpdate);
            // 更新 yi_comment_thumbs 表
            await db.query(sqlUpdateThumbsStatus, sqlParams);
            // 获取最新的 thumbs_up 数
            const result = await db.query(sqlSelectThumbsUp, sqlParamsUpdate);
            console.log('Updated Thumbs Up:', result);
            return result[0].thumbs_up;
        } else {
            throw new Error('不能取消点赞');
        }
    } catch (error) {
        console.error('Error in cancelThumbsUp:', error);
        throw error;
    }
};

// 查询历史评论
exports.getHistoryComment = async (userId) => {
    const sql = `
        SELECT 
            c.*, 
            b.cb_title,
            t.is_thumbs
        FROM 
            yi_comment c
        JOIN
            yi_comment_subject b ON c.comt_subject_id = b.comt_subject_id
        LEFT JOIN
            yi_comment_thumbs t ON c.comment_id = t.comment_id AND c.comt_subject_id = t.comt_subject_id AND t.user_id = ?
        WHERE
            c.user_id = ?
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
            t.is_thumbs
        FROM 
            yi_comment_thumbs t
        JOIN
            yi_comment c ON t.comment_id = c.comment_id AND t.comt_subject_id = c.comt_subject_id
        JOIN
            yi_comment_subject b ON c.comt_subject_id = b.comt_subject_id
        WHERE 
            t.is_thumbs = 1 AND t.user_id = ? AND c.is_enabled = 0
    `;
    const sqlParams = [userId];

    return await db.query(sql, sqlParams);
};
