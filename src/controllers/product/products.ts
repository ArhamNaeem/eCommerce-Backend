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

export const getAllProducts = async (req: any, res: any) => {
  const DEFAULT_SORT_FIELD: string = "createdAt";
  const DEFAULT_SORT_VALUE: SortOrder = 1;
  const { type, sortOrder, page } = req.query;
  validate(req.query);
  const sortBy: Record<string, SortOrder> = sortOrder
    ? { price: sortOrder }
    : { [DEFAULT_SORT_FIELD]: DEFAULT_SORT_VALUE };
  const validFields: Record<string, string> = {
    color: "$eq",
    size: "$in", // size can be equal to any value inside the array
    category: "$eq",
  };
  const query: Record<string, Record<string, unknown>> = {};
  let result;

  //inserting queried parameters inside query object (makes code concise)
  for (const [field, value] of Object.entries(req.query)) {
    if (validFields[field]) {
      query[field] = { [validFields[field]]: value };
    }
  }
  if (type) {
    result = await getModelData(type, sortBy, query, page);
  } else {
    const [clothes, shoes, furniture, appliances, decorations, cosmetics] =
      await Promise.all([
        getModelData("clothes", sortBy, {}, page),
        getModelData("shoes", sortBy, {}, page),
        getModelData("furniture", sortBy, {}, page),
        getModelData("appliances", sortBy, {}, page),
        getModelData("decorations", sortBy, {}, page),
        getModelData("cosmetics", sortBy, {}, page),
      ]);
    result = [
      ...clothes,
      ...shoes,
      ...furniture,
      ...appliances,
      ...decorations,
      ...cosmetics,
    ];
  }
  res.send({
    success: true,
    nbHit: result.length,
    data: result,
  });
};

const getModelData = async (
  type: string,
  sortBy: Record<string, SortOrder>,
  query: Record<string, unknown>,
  page: number | undefined
) => {
  let result;
  let resultNext;
  const pageNumber = page || 1;
  const limit = !query.lengtH ? 2 : 12;
  const skip = (pageNumber - 1) * limit;
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

  return await result.skip(skip).limit(limit).sort(sortBy);
};
