const db = require('../utils/dbConnPool/mariadb');

// 获取评论信息
exports.getCommentInfo = async () => {
    const sql = `
        SELECT
            c.comt_subject_id AS comtSubjectId,
            c.comment_id AS commentId,
            c.history_id AS historyId,
            c.user_id AS userId,
            c.text AS commentText,
            c.img_path AS commentImg,
            c.created_at AS commentCreatedAt,
            c.is_enabled AS commentIsEnabled,
            cs.cb_title AS comtSubjectTitle,
            sdi0.item_label AS category,
            ROUND((s.score_01 + s.score_02 + s.score_03) / 3, 1) AS avgScore,
            s.score_01,
            sdi1.item_label AS dimension01,
            s.score_02,
            sdi2.item_label AS dimension02,
            s.score_03,
            sdi3.item_label AS dimension03,
            u.nickname,
            u.avatar,
            COALESCE(CAST(COUNT(CASE WHEN ct.is_thumbs = 1 THEN 1 END) AS CHAR), '0') AS thumbsUp
        FROM
            yi_comment c
        JOIN
            yi_comment_subject cs
            ON c.comt_subject_id = cs.comt_subject_id
        LEFT JOIN
            yi_score s
            ON c.user_id = s.user_id
            AND c.comt_subject_id = s.comt_subject_id
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
        LEFT JOIN 
            sys_dict_item sdi0 ON s.category = sdi0.dict_code = 'PLATE' AND sdi0.item_code = 'XCJ' AND sdi0.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi1 ON s.category = sdi1.dict_code = 'PLATE' AND sdi1.item_code = 'JG' AND sdi1.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi2 ON s.category = sdi2.dict_code = 'PLATE' AND sdi2.item_code = 'WD' AND sdi2.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi3 ON s.category = sdi3.dict_code = 'PLATE' AND sdi3.item_code = 'WS' AND sdi3.is_enabled = 1
        JOIN
            yi_user u
            ON c.user_id = u.user_id
        LEFT JOIN
            yi_comment_thumbs ct
            ON c.comt_subject_id = ct.comt_subject_id
        WHERE
            c.is_enabled = 0 
            AND cs.is_enabled = 0
        GROUP BY
            c.comment_id, cs.cb_title, u.nickname, u.avatar;
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};

// 获取评论主体信息
exports.getCommentSubjectInfo = async () => {
    const sql = `
        SELECT
            cs.comt_subject_id AS comtSubjectId,
            cs.user_id AS userId,
            cs.cb_title AS comtSubjectTitle,
            cs.cb_text AS comtSubjectText,
            cs.cb_img AS comtSubjectImg,
            cs.created_at AS comtSubjectCreatedAt,
            cs.is_enabled AS comtSubjectIsEnabled,
            CAST(COUNT(c.comment_id) AS CHAR) AS commentCount,
            sdi0.item_label AS category,
            ROUND((s.score_01 + s.score_02 + s.score_03) / 3, 1) AS avgScore,
            s.score_01,
            sdi1.item_label AS dimension01,
            s.score_02,
            sdi2.item_label AS dimension02,
            s.score_03,
            sdi3.item_label AS dimension03
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
        LEFT JOIN 
            sys_dict_item sdi0 ON s.category = sdi0.dict_code = 'PLATE' AND sdi0.item_code = 'XCJ' AND sdi0.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi1 ON s.category = sdi1.dict_code = 'PLATE' AND sdi1.item_code = 'JG' AND sdi1.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi2 ON s.category = sdi2.dict_code = 'PLATE' AND sdi2.item_code = 'WD' AND sdi2.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi3 ON s.category = sdi3.dict_code = 'PLATE' AND sdi3.item_code = 'WS' AND sdi3.is_enabled = 1
        LEFT JOIN
            yi_comment c
            ON cs.comt_subject_id = c.comt_subject_id
            AND (c.is_enabled = 0 OR c.is_enabled IS NULL)
        WHERE
            cs.is_enabled = 0
        GROUP BY
            cs.comt_subject_id
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};

// 根据评论主体id获取对应评论主体信息
exports.getTheCommentSubjectInfo = async (comtSubjectId) => {
    const sql = `
        SELECT
            cs.comt_subject_id AS comtSubjectId,
            cs.user_id AS userId,
            cs.cb_title AS comtSubjectTitle,
            cs.cb_text AS comtSubjectText,
            cs.cb_img AS comtSubjectImg,
            cs.created_at AS comtSubjectCreatedAt,
            cs.is_enabled AS comtSubjectIsEnabled,
            CAST(COUNT(c.comment_id) AS CHAR) AS commentCount,
            sdi0.item_label AS category,
            ROUND((s.score_01 + s.score_02 + s.score_03) / 3, 1) AS avgScore,
            s.score_01,
            sdi1.item_label AS dimension01,
            s.score_02,
            sdi2.item_label AS dimension02,
            s.score_03,
            sdi3.item_label AS dimension03
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
        LEFT JOIN
            yi_comment c
            ON cs.comt_subject_id = c.comt_subject_id
            AND (c.is_enabled = 0 OR c.is_enabled IS NULL)
        LEFT JOIN 
            sys_dict_item sdi0 ON s.category = sdi0.dict_code = 'PLATE' AND sdi0.item_code = 'XCJ' AND sdi0.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi1 ON s.category = sdi1.dict_code = 'PLATE' AND sdi1.item_code = 'JG' AND sdi1.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi2 ON s.category = sdi2.dict_code = 'PLATE' AND sdi2.item_code = 'WD' AND sdi2.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi3 ON s.category = sdi3.dict_code = 'PLATE' AND sdi3.item_code = 'WS' AND sdi3.is_enabled = 1
        WHERE
            cs.is_enabled = 0
            AND cs.comt_subject_id = ?
        GROUP BY
            cs.comt_subject_id;
    `;
    const sqlParams = [comtSubjectId];
    return await db.query(sql, sqlParams);
};

// 获取餐饮类版块字典信息
exports.getDictPlateInfo = async () => {
    const sql = `
        SELECT
            d.dict_id AS dictId,
            d.dict_name AS dictName,
            d.dict_code AS dictCode,
            i.item_sort AS itemSort,
            i.item_label AS itemLabel,
            i.item_code AS itemCode,
            i.is_enabled AS dictPlateIsEnabled
        FROM
            sys_dict_item i
        INNER JOIN
            sys_dict d ON d.dict_code = i.dict_code
        WHERE
            i.dict_code = 'PLATE'
        ORDER BY
            i.item_sort ASC;
    `;
    const sqlParams = [];
    return await db.query(sql, sqlParams);
};

// 根据关键词模糊搜索对应评论主体
exports.getSearchSubject = async (comtSubjectTitle) => {
    const sql = `
        SELECT
            cs.comt_subject_id AS comtSubjectId,
            cs.cb_title AS comtSubjectTitle,
            cs.cb_img AS comtSubjectImg,
            cs.created_at AS comtSubjectCreatedAt,
            cs.is_enabled AS comtSubjectIsEnabled,
            CAST(COUNT(c.comment_id) AS CHAR) AS commentCount,
            sdi0.item_label AS category,
            ROUND((s.score_01 + s.score_02 + s.score_03) / 3, 1) AS avgScore,
            s.score_01,
            sdi1.item_label AS dimension01,
            s.score_02,
            sdi2.item_label AS dimension02,
            s.score_03,
            sdi3.item_label AS dimension03
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
        LEFT JOIN 
            sys_dict_item sdi0 ON s.category = sdi0.dict_code = 'PLATE' AND sdi0.item_code = 'XCJ' AND sdi0.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi1 ON s.category = sdi1.dict_code = 'PLATE' AND sdi1.item_code = 'JG' AND sdi1.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi2 ON s.category = sdi2.dict_code = 'PLATE' AND sdi2.item_code = 'WD' AND sdi2.is_enabled = 1
        LEFT JOIN 
            sys_dict_item sdi3 ON s.category = sdi3.dict_code = 'PLATE' AND sdi3.item_code = 'WS' AND sdi3.is_enabled = 1
        LEFT JOIN
            yi_comment c
            ON cs.comt_subject_id = c.comt_subject_id
            AND (c.is_enabled = 0 OR c.is_enabled IS NULL)
        WHERE
            cs.is_enabled = 0
            AND cs.cb_title LIKE ?
        GROUP BY
            cs.comt_subject_id;
    `;
    const sqlParams = [`%${comtSubjectTitle}%`];
    return await db.query(sql, sqlParams);
};
