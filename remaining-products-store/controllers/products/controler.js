import { createProduct, findProduct } from './model.js'
import filterSql from '../../helper/filter-sql.js'
import { validationResult } from 'express-validator'

export const find = async (req, res) => {
    try {
        const { name, plu } = req.query
        const result = await findProduct(filterSql({ name, plu }))
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что пошло не так', erors: e})
    }
}
export const create = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(400).json({message: 'Продукт не создан', errors: errors})
        const { name } = req.body
        const result = await createProduct(name)
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Продукт не создан', erors: e})
    }
}