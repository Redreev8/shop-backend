import pool from '../../config/db.js'

export const nameTableActionsProducts = 'actions_products'
export const findActionsProducts = async (page = 1, filter = '') => {
    const numberReturnAction = 10
    page = page <= 0 ? 1 : page
    const result = await pool.query(`
        SELECT * FROM ${nameTableActionsProducts} 
        ${filter}
        ORDER BY date DESC
        OFFSET ${(page - 1) * numberReturnAction} LIMIT ${numberReturnAction}
    `)
    const count = await pool.query(`SELECT COUNT(*) as count FROM ${nameTableActionsProducts} ${filter}`)
    const numberPages = Math.ceil(count.rows[0].count / numberReturnAction)
    return {
        data: result.rows,
        numberPages: count.rows[0].count === 0 ? 0 : numberPages,
        page: count.rows[0].count === 0 ? 0 : page
    }
}

export const createActionProduct = async ({ action, plu, shopId }) => {
    const result = await pool.query(`
        INSERT INTO ${nameTableActionsProducts}(action, plu, shop_id) 
                VALUES ($1, $2, $3) RETURNING *`, 
        [action, plu, shopId]
    )
    return result.rows[0]
}