import { createShops } from './model.js'

export const create = async (req, res) => {
    try {
        const { name } = req.body
        const result = await createShops(name)
        return res.json(result)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Магазин не создан', erors: e})
    }
}