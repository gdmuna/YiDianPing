const db = require('../utils/dbConnPool/mariadb');
const { v7: uuidv7 } = require('uuid');
// 获取评论体信息
exports.getAllCommentSubject = async () => {
    const sql = `
        SELECT 
            cs.comt_subject_id,
            cs.cb_title,
            cs.cb_text,
            cs.cb_img,
            cs.created_at,
            cs.is_enabled,
            sdi0.item_label AS category,
            ROUND(AVG((s.score_01 + s.score_02 + s.score_03) / 3), 1) AS avgScore,
            sdi1.item_label AS dimension01,
            sdi2.item_label AS dimension02,
            sdi3.item_label AS dimension03
        FROM 
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
        LEFT JOIN 
            sys_dict_item sdi0 ON s.category = sdi0.item_code AND sdi0.dict_code = 'PLATE' AND sdi0.is_enabled = 1
            AND sdi0.item_code = 'XCJ'
        LEFT JOIN 
            sys_dict_item sdi1 ON s.category = sdi1.item_code AND sdi1.dict_code = 'PLATE' AND sdi1.is_enabled = 1
            AND sdi1.item_code = 'JG'
        LEFT JOIN 
            sys_dict_item sdi2 ON s.category = sdi2.item_code AND sdi2.dict_code = 'PLATE' AND sdi2.is_enabled = 1
            AND sdi2.item_code = 'WD'
        LEFT JOIN 
            sys_dict_item sdi3 ON s.category = sdi3.item_code AND sdi3.dict_code = 'PLATE' AND sdi3.is_enabled = 1
            AND sdi3.item_code = 'WS'
        GROUP BY 
            cs.comt_subject_id
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};

// 创建评论体
exports.createCommentSubject = async (cbImg, cbText, cbTitle, userId) => {
    const sql = `
        INSERT
        yi_comment_subject
        (comt_subject_id,cb_img,cb_text,cb_title,user_id,created_at)
        VALUES 
        (?,?, ?, ?, ?,NOW())
    `;
    const sqlParams = [uuidv7(), cbImg, cbText, cbTitle, userId];
    return await db.query(sql, sqlParams);
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
    return await db.query(sql, sqlParams);
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
    return await db.query(sql, sqlParams);
};
exports.getCollectCommentSubject = async (userId) => {
    const sql = `
    SELECT 
        ycs.cb_title,
        ycs.cb_img,
        ycs.cb_text,
        ycs.is_enabled,
        ct.comt_subject_id,
        ct.created_at,
        sdi0.item_label AS category,
        ROUND(AVG((s.score_01 + s.score_02 + s.score_03) / 3), 1) AS avgScore,
        sdi1.item_label AS dimension01,
        sdi2.item_label AS dimension02,
        sdi3.item_label AS dimension03,
        CONVERT(
            (SELECT COUNT(*) 
                FROM yi_comment_subject_collect 
                WHERE comt_subject_id = ycs.comt_subject_id 
                AND is_collect = 1), 
            CHAR
        ) AS collect
    FROM 
        yi_comment_subject_collect ct
    JOIN 
        yi_comment_subject ycs ON ycs.comt_subject_id = ct.comt_subject_id
    LEFT JOIN 
        yi_score s ON ycs.comt_subject_id = s.comt_subject_id AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
    LEFT JOIN 
        sys_dict_item sdi0 ON s.category = sdi0.item_code AND sdi0.dict_code = 'PLATE' AND sdi0.is_enabled = 1 AND sdi0.item_code = 'XCJ'
    LEFT JOIN 
        sys_dict_item sdi1 ON s.category = sdi1.item_code AND sdi1.dict_code = 'PLATE' AND sdi1.is_enabled = 1 AND sdi1.item_code = 'JG'
    LEFT JOIN 
        sys_dict_item sdi2 ON s.category = sdi2.item_code AND sdi2.dict_code = 'PLATE' AND sdi2.is_enabled = 1 AND sdi2.item_code = 'WD'
    LEFT JOIN 
        sys_dict_item sdi3 ON s.category = sdi3.item_code AND sdi3.dict_code = 'PLATE' AND sdi3.is_enabled = 1 AND sdi3.item_code = 'WS'
    WHERE 
        ct.user_id = ?
        AND ct.is_collect = 1
        AND ycs.is_enabled = 0
    GROUP BY 
        ycs.cb_title, ycs.cb_img, ycs.cb_text, ycs.is_enabled, ct.comt_subject_id, ct.created_at, 
        sdi0.item_label, sdi1.item_label, sdi2.item_label, sdi3.item_label
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
//用户获取评论体评论接口
exports.getSubjectComment = async (comtSubjectId, userId) => {
    const sql = `
        SELECT
            c.*, 
            b.cb_title,
            u.nickname,
            u.avatar,
            u.is_forbidden,
            u.is_deleted,
            SUM(CASE WHEN ct.is_thumbs = 1 THEN 1 ELSE 0 END) AS thumbs_up,
            MAX(CASE WHEN ct.user_id = ? THEN ct.is_thumbs ELSE 0 END) AS is_thumbs
        FROM 
            yi_comment c
        JOIN
            yi_comment_subject b ON c.comt_subject_id = b.comt_subject_id AND b.is_enabled = 0
        JOIN
            yi_user u ON c.user_id = u.user_id
        LEFT JOIN
            yi_comment_thumbs ct ON c.comment_id = ct.comment_id
        WHERE
            c.comt_subject_id = ? 
            AND c.is_enabled = 0
            AND c.question_id IS NULL
        GROUP BY
            c.comment_id, b.cb_title, u.nickname, u.avatar, u.is_forbidden, u.is_deleted
    `;
    const sqlParams = [userId, comtSubjectId];
    return await db.query(sql, sqlParams);
};
// 用户获取评论体提问接口
exports.getSubjectQuestion = async (comtSubjectId, userId) => {
    const sql = `
        SELECT 
    q.text AS question_text, 
    q.created_at AS question_created_at,
    q.question_id,
    uq.nickname AS question_nickname,
    uq.avatar AS question_avatar,
    uq.is_forbidden AS question_is_forbidden,
    uq.is_deleted AS question_is_deleted,
    JSON_ARRAYAGG(
        JSON_OBJECT(
    'comment_id', c.comment_id,
    'comment_text', c.text,
    'comment_created_at', c.created_at,
    'comment_user_id', c.user_id,
    'comment_nickname', u.nickname,
    'comment_avatar', u.avatar,
    'comment_is_forbidden', u.is_forbidden,
    'comment_is_deleted', u.is_deleted,
    'comment_img_path', c.img_path
        )
    ) AS comments
FROM 
    yi_questions q
JOIN 
    yi_user uq ON q.user_id = uq.user_id -- 获取提问者的信息
LEFT JOIN 
    yi_comment c ON q.question_id = c.question_id
LEFT JOIN 
    yi_user u ON c.user_id = u.user_id -- 获取评论者的信息
WHERE 
    q.comt_subject_id = ?
    AND q.is_enabled = 0
    
    AND (c.is_enabled = 0 OR c.is_enabled IS NULL) -- 允许无评论的情况
GROUP BY 
    q.text, q.created_at, q.question_id, uq.nickname, uq.avatar, uq.is_forbidden, uq.is_deleted

    `;
    const sqlParams = [comtSubjectId];
    return await db.query(sql, sqlParams);
};
