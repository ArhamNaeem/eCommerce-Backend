import express from 'express'
const productRouter = express.Router()
import {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products';

productRouter.route('/').get(getAllProducts).post(addProduct)
productRouter.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
export default productRouter