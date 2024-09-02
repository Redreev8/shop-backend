import { findOther, createOther, increaseOther, decreaseOther } from './model.js'
import filterSql from '../../helper/filter-sql.js'
import { validationResult } from 'express-validator'

export const find = async (req, res) => {
    try {
        const { shopId, plu, onShelfOther, inOrderOther } = req.query
        const result = await findOther(filterSql({
            'shop_id': shopId,
            'plu': plu,
            'quantity_shelf': onShelfOther,
            'quantity_order': inOrderOther,
        }))
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Остаток не найден', erors: e})
    }
}
export const create = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(400).json({message: 'Остаток не создан', errors: errors})
        const { plu, shopId, onShelf, inOrder } = req.body
        const result = await createOther({ plu, shopId, onShelf, inOrder })
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Остаток не создан', erors: e})
    }
}

export const increase = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(400).json({message: 'Остаток не увиличен', errors: errors})
        const { plu, shopId, number } = req.body
        const result = await increaseOther({ plu, shopId, number })
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Остаток не увиличен', erors: e})
    }
}

export const decrease = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(400).json({message: 'Остаток не уменьшен', errors: errors})
        const { plu, shopId, number } = req.body
        const result = await decreaseOther({ plu, shopId, number })
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Остаток не уменьшен', erors: e})
    }
}