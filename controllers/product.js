import asyncHandler from "express-async-handler";
import { multipleImageUpload } from "../middleware/fileUpload.js";
import Product from "../models/product.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brandName, oldPrice, currentPrice } = req.body;
    const images = await multipleImageUpload(req.files);
    const createObj = { name, brandName, oldPrice, currentPrice, images };
    await Product.create(createObj);
    res.status(201).send({ message: "Successfully create" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const productList = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).select(
      "name brandName images oldPrice currentPrice"
    );
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const productById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "name brandName images oldPrice currentPrice"
    );
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const productDelete = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.delete();
      res.status(204).send({ message: "Deleted successfully" });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export { createProduct, productList, productById, productDelete };
