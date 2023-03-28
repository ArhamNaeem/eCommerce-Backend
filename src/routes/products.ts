import express from 'express'
const productRouter = express.Router()
import {
    getAllProducts,
} from '../controllers/products';

productRouter.route('/').get(getAllProducts)

export default productRouter