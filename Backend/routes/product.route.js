import express from "express";
//import mongoose from "mongoose";
import { getProducts,deleteProduct,updateProduct,createProduct } from "../controllers/product.controller.js"; 
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
