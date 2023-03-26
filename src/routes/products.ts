import express from 'express'
const productRouter = express.Router()
import {
    getAllProducts,
    getProduct,
    addClothes,
    updateProduct,
    deleteProduct
} from '../controllers/products';

productRouter.route('/').get(getAllProducts)
productRouter.route('/cloth').post(addClothes)
productRouter.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
export default productRouter