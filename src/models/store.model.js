const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: [2, `Store Item Title '{VALUE}' Too Short`],
      maxLength: [64, `Store Item Title '{VALUE}' Too Long`],
      trim: 1,
      required: 1,
      lowercase: 1,
    },
    description: {
      type: String,
      minLength: [20, `Store Item Description '{VALUE}' Too Short`],
      maxLength: [128, `Store Item Description '{VALUE}' Too Long`],
      trim: 1,
      lowercase: 1,
      required: 1,
    },
    image: {
      type: String,
      default: null,
      trim: 1,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
      get: (v) => (v === 0 ? "free" : v),
      set: (v) => (+v).toFixed(2),
    },
    __v: { type: Number, select: 0 },
  },
  { timestamps: true }
);

const StoreModel = mongoose.model("Store", storeSchema);

module.exports = { storeSchema, StoreModel };
