import mongoose from "mongoose";
const CosmeticSchema = new mongoose.Schema(
  {
    cosmetic_type: {
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
        "Foundation",
        "Blush",
        "Highlighter",
        "Concealer",
        "Mascara",
        "Eyeliner",
        "Eyeshadow",
        "Lipstick",
        "Lip gloss",
        "Cleanser",
        "Moisturizer",
        "Serum",
        "Toner",
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

export const CosmeticModel = mongoose.model("Cosmetic", CosmeticSchema);
