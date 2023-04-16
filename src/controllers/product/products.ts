import express from "express";
import { ClothModel } from "../../models/store/Cloth";
import { ShoeModel } from "../../models/store/Shoe";
import { FurnitureModel } from "../../models/store/Furniture";
import { CosmeticModel } from "../../models/store/Cosmetic";
import { ApplianceModel } from "../../models/store/Appliance";
import { DecorationModel } from "../../models/store/Decoration";
import "express-async-errors";
import { SortOrder } from "mongoose";
import { BadRequest } from "../../errors";
import { validate } from "./productValidation";
import QueryString, { ParsedQs } from "qs";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const { size }: { size?: string } = req.query;
  const { color }: { color?: string } = req.query;
  if (size) {
    const sz = size.split(",");
    req.query.size = sz;
  }

  if (color) {
    const clr = color.split(",");
    req.query.color = clr;
  }
  const DEFAULT_SORT_FIELD: string = "createdAt";
  const DEFAULT_SORT_VALUE: SortOrder = 1;
  const { type, sortOrder, page }: ParsedQs = req.query;
  validate(req.query);
  const sortBy = sortOrder
    ? { price: sortOrder }
    : { [DEFAULT_SORT_FIELD]: DEFAULT_SORT_VALUE };
  const validFields: Record<string, string> = {
    color: "$in",
    size: "$in", // size can be equal to any value inside the array
    category: "$eq",
  };
  const query: Record<string, Record<string, unknown>> = {};
  let result;
  let DATA_DETAILS: Record<string,boolean> = {
    hasNext:false,
  }; //to check if next page exist

  //inserting queried parameters inside query object (makes code concise)
  for (const [field, value] of Object.entries(req.query)) {
    if (validFields[field]) {
      query[field] = { [validFields[field]]: value };
    }
  }
  if (type) {
    result = await getModelData(type, sortBy, query, page, false, DATA_DETAILS);
  } else {
    // const [clothes, shoes, furniture, appliances, decorations, cosmetics] =
    const [clothes, shoes] = await Promise.all([
      getModelData("clothes", sortBy, {}, page, true, DATA_DETAILS),
      getModelData("shoes", sortBy, {}, page, true, DATA_DETAILS),
      // getModelData("furniture", sortBy, {}, page,true),
      // getModelData("appliances", sortBy, {}, page,true),
      // getModelData("decorations", sortBy, {}, page,true),
      // getModelData("cosmetics", sortBy, {}, page,true),
    ]);
    //only sending back cloth and shoe data as only it contains valid images
    result = [
      ...clothes,
      ...shoes,
      // ...furniture,
      // ...appliances,
      // ...decorations,
      // ...cosmetics,
    ];
  }
  // DATA_DETAILS.hasNext =result.length < DATA_DETAILS.length
  res.send({
    success: true,
    nbHits: result.length,
    hasNext: DATA_DETAILS.hasNext,
    data: result,
  });
};

const getModelData = async (
  type: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[],
  sortBy: any,
  query: Record<string, unknown>,
  page:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined,
  sendAllDocuments: boolean,
  DATA_DETAILS: Record<string,boolean>
) => {
  let result;
  let resultNext;
  const pageNumber = Number(page) || 1;

  const limit = sendAllDocuments ? 6 : 12;
  const skip = (pageNumber - 1) * limit;
  const skipNext = pageNumber * limit;
  switch (type) {
    case "clothes":
      result = ClothModel.find(query);
      resultNext = ClothModel.find(query);
      break;
    case "shoes":
      result = ShoeModel.find(query);
      resultNext = ShoeModel.find(query);
      break;
    case "appliances":
      result = ApplianceModel.find(query);
      resultNext = ApplianceModel.find(query);

      break;
    case "decorations":
      result = DecorationModel.find(query);
      resultNext = DecorationModel.find(query);
      break;
    case "cosmetics":
      result = CosmeticModel.find(query);
      resultNext = CosmeticModel.find(query);
      break;
    case "furniture":
      result = FurnitureModel.find(query);
      resultNext = FurnitureModel.find(query);
      break;
    default:
      throw new BadRequest(`Type, ${type} doesn't exist`);
  }
  const res = await resultNext.skip(skipNext).limit(limit).sort(sortBy);
  DATA_DETAILS.hasNext = res.length > 0
  return await result.skip(skip).limit(limit).sort(sortBy);
};
