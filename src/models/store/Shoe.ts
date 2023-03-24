import mongoose from "mongoose";

const ShoeSchema = new mongoose.Schema(
  {
    shoe_type: {
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
    color: {
      type: String,
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
      type: mongoose.Types.Array<Number>,
      // 'small', 'medium', 'large', 'xl', 'xxl'
      enum: [38,39,40,41,42,43,44,45],
      required:[true,'Must provide size']
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: [true, "Must provide price"],
    },
    category: {
      type: String,
      required: [true, "Must provide category"],
      enum: [
       "Sneakers","Dress Shoes","Loafers","Scandals","Flats","Sport shoes","Heels"
      ],
    },
  },
  { timestamps: true }
);
export const ShoeModel =  mongoose.model('Shoe',ShoeSchema)