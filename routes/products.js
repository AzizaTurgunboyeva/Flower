const express = require("express");
const { getProducts, addNewProduct, getProductById, updateProductById, deleteProductById } = require("../controllers/products");

const router = express.Router();

router.get("/", getProducts);
router.post("/", addNewProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id",deleteProductById );
module.exports = router;
