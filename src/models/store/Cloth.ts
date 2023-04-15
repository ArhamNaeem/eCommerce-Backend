import mongoose from "mongoose";

const ClothSchema = new mongoose.Schema(
  {
    cloth_type: {
      type: String,
      required: [true, "Must provide cloth type"],
      maxLength: 50,
      minLength: 5,
    },
    img_url: {
      type: String,
      required: [true, "Must provide image url"],
      unique: true,
    },
    color: {
      type: [String],
      required: [true, "Must provide color"],
      enum: ["white", "red", "black", "blue", "purple", "green"],
    },
    description: {
      type: String,
      required: [true, "Must provide description"],
      maxLength: 75,
      minLength: 10,
    },
    size: {
      type: [Number],
      // 'small', 'medium', 'large', 'xl', 'xxl'
      enum: [1, 2, 3, 4, 5],
      required: [true, "Must provide size"],
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: [true, "Must provide price"],
    },
    category: {
      type: String,
      required: [true, "Must provide category"],
      enum: [
        "Men shirts",
        "Men t-shirts",
        "Men trousers",
        "Men jeans",
        "Women t-shirts",
        "Women trousers",
        "Women jeans",
        "Women dresses",
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
export const ClothModel = mongoose.model("Cloth", ClothSchema);

