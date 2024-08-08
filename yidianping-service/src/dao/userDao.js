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
            email,
            stu_id,
            is_admin,
            is_forbidden
        FROM 
            yi_user
        WHERE 
            user_id = ?
    `;
    const results = await db.query(sql, [userId]);

    // 检查结果是否存在，如果存在则格式化 stu_id 和 email
    if (results.length > 0) {
        const user = results[0];

        // 格式化 stu_id（检查是否为空）
        if (user.stu_id) {
            const originalStuId = user.stu_id;
            const formattedStuId = originalStuId.replace(/(\w{3})\w{4}(\w{3})$/, '$1****$2');
            user.stu_id = formattedStuId;
        }

        // 格式化 email（检查是否为空）
        if (user.email) {
            const originalEmail = user.email;
            const emailParts = originalEmail.split('@');
            if (emailParts.length === 2) {
                const localPart = emailParts[0];
                const domainPart = emailParts[1];
                const formattedEmail = `${localPart.substring(0, 4)}****@${domainPart}`;
                user.email = formattedEmail;
            }
        }

        return user;
    } else {
        return null;
    }
};
// 修改用户信息
exports.updateUser = async (userId, updatedFields) => {
    const setClause = [];
    const sqlParams = [];

    for (const [key, value] of Object.entries(updatedFields)) {
        setClause.push(`${key} = ?`);
        sqlParams.push(value);
    }

    sqlParams.push(userId);

    const sql = `
        UPDATE yi_user
         SET ${setClause.join(', ')}
        WHERE user_id = ?
     `;
    return await db.query(sql, sqlParams);
};
// 修改用户信息
// exports.updateUser = async (userId, nickname, avatar, password, stuId, email, phone) => {
//     const sql = `
//          UPDATE
//              yi_user
//         SET
//              ${db.keyReplace('nickname', nickname)}
//             ${db.keyReplace('avatar', avatar)}
//             ${db.keyReplace('password', password)}
//              ${db.keyReplace('stu_id', stuId)}
//              ${db.keyReplace('email', email)}
//             ${db.keyReplace('phone', phone, true)}
//          WHERE
//            user_id = ?
//      `;

//     const sqlParams = db.paramsReplace([nickname, avatar, password, stuId, email, phone, userId]);
//     return await db.query(sql, sqlParams);
// };
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
    return await db.query(sql, sqlParams);
};
//用户注销
exports.deleteUser = async (userId) => {
    const sql = `
        UPDATE
            yi_user
        SET
            is_deleted = 1 
            deleted_at = NOW()       
        WHERE 
            user_id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
