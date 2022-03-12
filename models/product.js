import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      trim: true,
      required: true,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// Copy _id to id
schema.virtual("id").get(function () {
  return this._id.toHexString();
});
schema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", schema);

export default Product;
