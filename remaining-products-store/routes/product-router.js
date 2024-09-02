import { Router } from 'express'
import { create, find } from '../controllers/products/controler.js'
import actionProducts from '../middleware/action-products.js'
import { body } from 'express-validator'

const router = Router()

router.get('/products', find)
router.post(
    '/product', 
    [
        actionProducts,
        body('name', 'action должен быть строкой от 10 до  255 символов').isString().isLength({min: 10, max: 255}),
    ], 
    create
)

export default router