import pool from '../../config/db.js'
import { nameTableProducts } from '../products/model.js'

const nameTableOther = 'other_products_shop'
const unification = `LEFT JOIN ${nameTableProducts} p ON p.plu=o.plu`
const columns = 'o.*, p.*'
export const findOther = async (filter) => {
    const result = await pool.query(`SELECT ${columns} FROM ${nameTableOther} o ${unification} ${filter}`)
    return result.rows
}

export const createOther = async ({ plu, shopId, onShelf, inOrder }) => {
    const result = await pool.query(
        `WITH newOther as (
            INSERT INTO 
                ${nameTableOther}(quantity_shelf, quantity_order, plu, shop_id) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *
        ) SELECT ${columns} FROM newOther o ${unification}`,
        [onShelf, inOrder, plu, shopId]
    )

    return result.rows[0]
}
export const increaseOther = async ({ plu, shopId, number  }) => {
    const result = await pool.query(
        `WITH newOther as (
            UPDATE ${nameTableOther} SET quantity_order = quantity_order + $1 
            WHERE shop_id=$2 AND plu=$3 
            RETURNING *
        ) SELECT ${columns} FROM newOther o ${unification}`,
        [number, shopId, plu]
    )
    return result.rows[0]
}

export const decreaseOther = async ({ plu, shopId, number }) => {
    let { rows } = await pool.query(
        `WITH newOther as (
            UPDATE ${nameTableOther} SET quantity_order = quantity_order - $1 
            WHERE shop_id=$2 AND plu=$3
            RETURNING *
        ) SELECT ${columns} FROM newOther o ${unification}`,
        [number, shopId, plu],
    )
    if (+rows[0]['quantity_order'] < 0) {
        rows = await increaseOther({ plu, shopId, number: rows[0]['quantity_order'] * -1})
    }

    return Array.isArray(rows) ? rows[0] : rows
}