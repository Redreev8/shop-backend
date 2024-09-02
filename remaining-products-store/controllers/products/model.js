import pool from '../../config/db.js'

export const nameTableProducts = 'products'
export const findProduct = async (filter = '') => {
    const result = await pool.query(`SELECT * FROM ${nameTableProducts}` + filter)
    return result.rows
}

export const createProduct = async (name) => {
    const result = await pool.query(`INSERT INTO ${nameTableProducts}(name) VALUES ($1) RETURNING *`, [name])
    return result.rows[0]
}