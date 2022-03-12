import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.js";

import products from "./data/product.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

importData();
