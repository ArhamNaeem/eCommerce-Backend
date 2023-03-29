import { ClothModel } from "../models/store/Cloth";
import { ShoeModel } from "../models/store/Shoe";
import { FurnitureModel } from "../models/store/Furniture";
import { CosmeticModel } from "../models/store/Cosmetic";
import { ApplianceModel } from "../models/store/Appliance";
import { DecorationModel } from "../models/store/Decoration";
import "express-async-errors";
import { SortOrder } from "mongoose";
import { BadRequest } from "../errors";
import { validate } from "./productValidation";

export const getAllProducts = async (req: any, res: any) => {
  const DEFAULT_SORT_FIELD: string = "createdAt";
  const DEFAULT_SORT_VALUE: SortOrder = 1;
  const { type, sortOrder } = req.query;
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
    result = await getModelData(type, sortBy, query);
  } else {
    const [clothes, shoes, furniture, appliances, decorations, cosmetics] =
      await Promise.all([
        getModelData("clothes", sortBy, {}),
        getModelData("shoes", sortBy, {}),
        getModelData("furniture", sortBy, {}),
        getModelData("appliances", sortBy, {}),
        getModelData("decorations", sortBy, {}),
        getModelData("cosmetics", sortBy, {}),
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
    data: result,
  });
};

const getModelData = async (
  type: string,
  sortBy: Record<string, SortOrder>,
  query: Record<string, unknown>
) => {
  switch (type) {
    case "clothes":
      return await ClothModel.find(query).sort(sortBy);
    case "shoes":
      return await ShoeModel.find(query).sort(sortBy);
    case "appliances":
      return await ApplianceModel.find(query).sort(sortBy);

    case "decorations":
      return await DecorationModel.find(query).sort(sortBy);

    case "cosmetics":
      return await CosmeticModel.find(query).sort(sortBy);

    case "furniture":
      return await FurnitureModel.find(query).sort(sortBy);

    default:
      throw new BadRequest(`Type, ${type} doesn't exist`);
  }
};
