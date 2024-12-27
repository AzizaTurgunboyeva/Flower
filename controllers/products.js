const db = require("../config/db");

const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (error, results) => {
    if (error) {
      console.log("Error selecting products", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    res.json(results);
  });
};
const addNewProduct = (req, res) => {
  const { name, price, date } = req.body;
  db.query(
    `INSERT INTO products(name,price,date) VALUES ( ?, ?, ?)`,
    [name, price, date],
    (error, results) => {
      if (error) {
        console.log("Error adding new product:", error);
        return res.status(500).json({
          msg: "Error adding new product",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        msg: "New product added",
        productId: results.insertId,
      });
    }
  );
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  db.query(
    "SELECT * FROM products WHERE id=?",
    [productId],
    (error, results) => {
      if (error) {
        console.log("Error selecting product by ID:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      if (results.length == 0) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(results[0]);
    }
  );
};

const updateProductById = (req, res) => {
  const productId = req.params.id;
  const { name, price, date } = req.body;
  db.query(
    `UPDATE products SET name=?, price=?,date=? WHERE id=?`,
    [name, price, date, productId],
    (error, results) => {
      if (error) {
        console.log("Error updating new product", error);
        return res.status(500).json({
          msg: "Error updating new product",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.json({
        msg: "Product updated successfully",
        productId: productId,
      });
    }
  );
};

const deleteProductById = (req, res) => {
  const productId = req.params.id;
  db.query(`DELETE FROM products WHERE id=?`, [productId], (error, results) => {
    if (error) {
      console.log("Error deleting product by ID", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    res.json({
      msg:"Product deleted successfully"
    })
  });
};
module.exports = {
  getProducts,
  addNewProduct,
  getProductById,
  updateProductById,
  deleteProductById
};
