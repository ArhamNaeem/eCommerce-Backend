import mongoose from "mongoose";
const FurnitureSchema = new mongoose.Schema(
  {
    furniture_type: {
      type: String,
      required: [true, "Must provide shoe type"],
      maxLength: 50,
      minLength: 5,
    },
    img_url: {
      type: String,
      required: [true, "Must provide image url"],
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Must provide description"],
      maxLength: 100,
      minLength: 10,
    },

    price: {
      type: mongoose.Types.Decimal128,
      required: [true, "Must provide price"],
    },
    category: {
      type: String,
      required: [true, "Must provide category"],
      enum: [
        "Sofas",
        "Chairs",
        "Sidetables",
        "TV stands",
        "Dining tables",
        "Dining chairs",
        "Buffets",
        "Bar stools",
        "Beds",
        "Headboards",
        "Vanities",
        "Dressers",
        "Desks",
        "Filing cabinets",
        "Bookcases",
      ],
    },
    quantity: {
      type: Number,
      validate: {
        validator: (value: number) => value > 0,
        message: "Valid quantity shall be provided",
      },
      required: [true, "Must provide quantity"],
    },
  },
  { timestamps: true }
);

export const FurnitureModel = mongoose.model('Furniture',FurnitureSchema)

