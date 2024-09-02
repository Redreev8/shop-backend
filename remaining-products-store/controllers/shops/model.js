import pool from '../../config/db.js'

export const nameTableShops = 'shops'
export const createShops = async () => {
    const result = await pool.query(`INSERT INTO ${nameTableShops} DEFAULT VALUES RETURNING *`, [])
    return result.rows[0]
}