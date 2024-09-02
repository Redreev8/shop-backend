import { Router } from 'express'
import { create } from '../controllers/shops/controler.js'

const router = Router()

router.post('/shop', create)

export default router