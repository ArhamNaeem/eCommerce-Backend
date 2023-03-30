import mongoose from "mongoose";
const DecorationSchema = new mongoose.Schema(
  {
    decoration_type: {
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
      maxLength: 75,
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
        "Clocks",
        "Mirrors",
        "Paintings",
        "Table Vases",
        "Table Lamps",
        "Candles",
        "Area Rugs",
        "Floor Vases",
        "Floor Lamps",
        "Wreaths",
        "Christmas Lights",
        "Ornaments",
        "Spring Flowers",
        "Fall Leaves",
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


export const DecorationModel = mongoose.model('Decoration',DecorationSchema)