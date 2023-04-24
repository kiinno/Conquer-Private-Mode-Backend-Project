const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: [2, `Feature Title '{VALUE}' Too Short`],
      maxLength: [64, `Feature Title '{VALUE}' Too Long`],
      trim: 1,
      required: 1,
      lowercase: 1,
    },
    description: {
      type: String,
      minLength: [20, `Feature Description '{VALUE}' Too Short`],
      maxLength: [128, `Feature Description '{VALUE}' Too Long`],
      trim: 1,
      lowercase: 1,
      required: 1,
    },
    image: {
      type: String,
      default: "/uploads/feature/default.png",
      trim: 1,
    },
    __v: { type: Number, select: 0 },
  },
  { timestamps: true }
);

const FeatureModel = mongoose.model("Feature", featureSchema);

module.exports = { featureSchema, FeatureModel };
