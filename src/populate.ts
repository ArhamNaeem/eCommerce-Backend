import dotenv from 'dotenv'
import clothesJson from './product_data/clothes.json'
import applianceJson from './product_data/appliance.json'
import furnitureJson from './product_data/furniture.json'
import shoeJson from './product_data/shoes.json'
import decorationJson from './product_data/decoration.json'
import cosmeticJson from './product_data/cosmetics.json'
import { ClothModel } from './models/store/Cloth'
import { FurnitureModel } from './models/store/Furniture'
import { DecorationModel } from './models/store/Decoration'
import { ShoeModel } from './models/store/Shoe'
import { ApplianceModel } from './models/store/Appliance'
import { CosmeticModel } from './models/store/Cosmetic'
import connectDB from './db/connect'
dotenv.config()
export const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await ClothModel.deleteMany()
        await ClothModel.create(clothesJson)
        await ApplianceModel.deleteMany()
        await ApplianceModel.create(applianceJson)
        await FurnitureModel.deleteMany()
        await FurnitureModel.create(furnitureJson)
        await ShoeModel.deleteMany()
        await ShoeModel.create(shoeJson)
        await CosmeticModel.deleteMany()
        await CosmeticModel.create(cosmeticJson)
        await DecorationModel.deleteMany()
        await DecorationModel.create(decorationJson)
        console.log('Products successfully created!')
        process.exit(0)
    } catch (e) {
        console.log(`${e} has occurred`)
        process.exit(1)
    }
}
// start()

