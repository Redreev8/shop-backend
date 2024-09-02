import { Router } from 'express'
import { find, create, increase, decrease } from '../controllers/other-products/controler.js'
import actionProducts from '../middleware/action-products.js'
import { body } from 'express-validator'

const router = Router()

router.get('/other-products', find)
router.post(
    '/create-other-products', 
    [
        actionProducts,
        body('plu', 'plu должен быть целым числом').isInt(),
        body('shopId', 'shopId должен быть целым числом').isInt(),
        body('onShelf', 'onShelf должен быть целым числом').isInt(),
        body('inOrder', 'inOrder должен быть целым числом').isInt(),
    ], 
    create
)
router.post(
    '/increase-other-products', 
    [
        actionProducts,
        body('plu', 'plu должен быть целым числом').isInt(),
        body('shopId', 'shopId должен быть целым числом').isInt(),
        body('number', 'number должен быть целым числом').isInt(),
    ], 
    increase
)
router.post(
    '/decrease-other-products', 
    [
        actionProducts,
        body('plu', 'plu должен быть целым числом').isInt(),
        body('shopId', 'shopId должен быть целым числом').isInt(),
        body('number', 'number должен быть целым числом').isInt(),
    ], 
    decrease
)

export default router