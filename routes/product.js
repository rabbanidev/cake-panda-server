import express from "express";
import {
  createProduct,
  productById,
  productDelete,
  productList,
} from "../controllers/product.js";
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/product/create", upload.array("images"), createProduct);
router.get("/product/list", productList);
router.get("/product/details/:id", productById);
router.delete("/product/delete/:id", productDelete);

export default router;
