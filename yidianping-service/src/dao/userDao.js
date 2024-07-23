const db = require('../utils/dbConnPool/mariadb');

// 获取所有用户信息
exports.getAllUsers = async () => {
    const sql = `
        SELECT 
            *
        FROM 
            yi_user
    `;
    return await db.query(sql);
};
// 修改用户信息
exports.updateUser = async (userId, nickname, avatar, password) => {
    const sql = `
        UPDATE 
            yi_user
        SET 
            nickname = ?,
            avatar = ?,
            password = ?
        WHERE 
            user_id = ?
    `;
    const sqlParams = [nickname, avatar, password, userId];
    try {
        return await db.query(sql, sqlParams);
    } catch (error) {
        console.error('修改用户失败:', error);
        throw error;
    }
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
