const db = require('../utils/dbConnPool/mariadb');

// 获取所有用户信息
exports.getAllUsers = async () => {
    const sql = `
        SELECT 
            user_id, 
            account,
            nickname,
            avatar,
            created_at,
            is_admin,
            is_forbidden
        FROM 
            yi_user
    `;
    return await db.query(sql);
};
// 获取单个用户信息
exports.getUser = async (userId) => {
    const sql = `
        SELECT 
            user_id, 
            account,
            nickname,
            avatar,
            created_at,
            is_admin,
            is_forbidden
        FROM 
            yi_user
        WHERE 
            user_id = ?
    `;
    const results = await db.query(sql, [userId]);
    return results[0];
};

// 修改用户信息
exports.updateUser = async (userId, nickname, avatar, password, stuId, email, phone) => {
    // const setClause = [];
    // const sqlParams = [];

    // for (const [key, value] of Object.entries(updatedFields)) {
    //     setClause.push(`${key} = ?`);
    //     sqlParams.push(value);
    // }

    // sqlParams.push(userId);

    // const sql = `
    //     UPDATE yi_user
    //     SET ${setClause.join(', ')}
    //     WHERE user_id = ?
    // `;
    // return await db.query(sql, sqlParams);

    const sql = `
        UPDATE
            yi_user
        SET
            ${db.keyReplace('nickname', nickname)}
            ${db.keyReplace('avatar', avatar)}
            ${db.keyReplace('password', password)}
            ${db.keyReplace('stu_id', stuId)}
            ${db.keyReplace('email', email)}
            ${db.keyReplace('phone', phone, true)}
        WHERE
            user_id = ?
    `;

    const sqlParams = db.paramsReplace([nickname, avatar, password, stuId, email, phone, userId]);
    return await db.query(sql, sqlParams);
};
// 封禁用户
exports.banUser = async (userId) => {
    const sql = `
        UPDATE 
            yi_user
        SET 
            is_forbidden = 1
        WHERE 
            user_id = ?
    `;
    const sqlParams = [userId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('封禁用户失败:', error);
    }
};
// 解禁用户
exports.unbanUser = async (userId) => {
    const sql = `
        UPDATE 
            yi_user
        SET 
            is_forbidden = 0
        WHERE 
            user_id = ?
    `;
    const sqlParams = [userId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('解禁用户失败:', error);
    }
};
