import { ClothModel } from "../models/store/Cloth";
import { ShoeModel } from "../models/store/Shoe";
import { FurnitureModel } from "../models/store/Furniture";
import { CosmeticModel } from "../models/store/Cosmetic";
import { ApplianceModel } from "../models/store/Appliance";
import { DecorationModel } from "../models/store/Decoration";
import "express-async-errors";
import mongoose from "mongoose";
export const getAllProducts = (req: any, res: any) => {
  console.log(req.query);
  res.send("get all products");
};
export const getProduct = (req: any, res: any) => {
  res.send("get a product");
};
export const updateProduct = (req: any, res: any) => {
  res.send("update product");
};
export const deleteProduct = (req: any, res: any) => {
  res.send("delete product");
};

export const addClothes = async (req: any, res: any) => {
  const task = await ClothModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
export const addShoes = async (req: any, res: any) => {
  const task = await ShoeModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
export const addFurniture = async (req: any, res: any) => {
  const task = await FurnitureModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
export const addDecoration = async (req: any, res: any) => {
  const task = await DecorationModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
export const addAppliance = async (req: any, res: any) => {
  const task = await ApplianceModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
export const addCosmetic = async (req: any, res: any) => {
  const task = await CosmeticModel.create(req.body);
  res.status(200).json({ success: true, msg: "product added" });
};
