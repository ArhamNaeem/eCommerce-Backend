import { ClothModel } from "../models/Cloth";
import mongoose from "mongoose";
export const getAllProducts = (req: any, res: any) => {
    res.send('get all products')
}
export const getProduct= (req: any, res: any)=>{
    res.send("get a product");
}
export const addProduct = async(req: any, res: any) => {
    try {
        // const { cloth_type, img_url, description, color, size, price, category } = req.body
        const task = await ClothModel.create(req.body)
        res.status(200).json({'success':true,"msg":'product added'})
    } catch (e) {
        res.status(400).json({'success':false,"msg":`${e}`})

    }

}
export const updateProduct = (req: any, res: any) => {
    res.send('update product')
}
export const deleteProduct = (req: any, res: any) => {
    res.send('delete product')
}
