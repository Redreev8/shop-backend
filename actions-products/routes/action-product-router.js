import { Router } from 'express'
import { create, find } from '../controllers/actions-products/controler.js'
import { body } from 'express-validator'

const router = Router()

const createCheck = 

router.get('/actions-products', find)
router.post(
    '/action-product', 
    [
        body('action', 'action должен быть строкой от 1 до 20 символов').isString().isLength({min:1, max:20}),
        body('plu', 'plu должен быть целым числом').isInt(),
        body('shopId', 'date должен быть целым числом').custom(v => v === undefined || typeof +v === 'number')
    ], 
    create
)

export default router