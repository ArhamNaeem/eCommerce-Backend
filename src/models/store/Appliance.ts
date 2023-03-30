import mongoose from "mongoose";

const ApplianceSchema = new mongoose.Schema({
  appliance_type: {
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
      "Refrigerators",
      "Freezers",
      "Ovens",
      "Microwaves",
      "Dishwashers",
      "Washing machines",
      "Combination washer/dryers",
      "Vacuum cleaners",
      "Steam cleaners",
      "Carpet cleaners",
    ],
    quantity: {
      type: Number,
      validate: {
        validator: (value: number) => value > 0,
        message:'Valid quantity shall be provided'
      },
      required:[true,'Must provide quantity']
    }
  },
}, { timestamps: true });


export const ApplianceModel = mongoose.model('Appliance',ApplianceSchema)
