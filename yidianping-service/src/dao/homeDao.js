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
            AND c.comt_subject_id = s.comt_subject_id AND s.is_enabled = 0
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
            CAST(COUNT(c.comment_id) AS CHAR) AS comment_count,
            IFNULL(ROUND(AVG(s.score), 1), 0) AS avg_score
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
        LEFT JOIN
            yi_comment c
            ON cs.comt_subject_id = c.comt_subject_id
        WHERE
            cs.is_enabled = 0
            AND (c.is_enabled = 0 OR c.is_enabled IS NULL)
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
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
            CAST(COUNT(c.comment_id) AS CHAR) AS comment_count,
            IFNULL(ROUND(AVG(s.score), 1), 0) AS avg_score
        FROM
            yi_comment_subject cs
        LEFT JOIN
            yi_score s
            ON cs.comt_subject_id = s.comt_subject_id
        LEFT JOIN
            yi_comment c
            ON cs.comt_subject_id = c.comt_subject_id
        WHERE
            cs.is_enabled = 0
            AND (c.is_enabled = 0 OR c.is_enabled IS NULL)
            AND (s.is_enabled = 0 OR s.is_enabled IS NULL)
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
            i.item_code AS itemCode
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
