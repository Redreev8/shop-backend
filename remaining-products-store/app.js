import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pool from './config/db.js'
import otherProductsRouter from './routes/other-products-router.js'
import productRouter from './routes/product-router.js'
import shopRouter from './routes/shop-router.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api', otherProductsRouter)
app.use('/api', productRouter)
app.use('/api', shopRouter)

pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.error('Error connecting to the database', err.stack)
    } else {
        console.log('Connected to the database:', res.rows)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})