import { findActionsProducts, createActionProduct } from './model.js'
import filterSql from '../../helper/filter-sql.js'
import { validationResult } from 'express-validator'

export const find = async (req, res) => {
    try {
        const { action, plu, date, shopId, page } = req.query
        const result = await findActionsProducts(page, filterSql({ 
            action,
            plu,
            date,
            'shop_id': shopId
        }))
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Отчет не составлен', erors: e})
    }
}
export const create = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(400).json({message: 'В отчет не добавлено', errors: errors})
        const { action, plu, shopId } = req.body
        const result = await createActionProduct({ action, plu, shopId })
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'В отчет не добавлено', erors: e})
    }
}