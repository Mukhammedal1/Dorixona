const express = require("express");
const {
  getStock,
  addNewStock,
  updateStockById,
  deleteStockById,
  findStockByAnyParams,
} = require("../controller/stock");

const router = express.Router();

router.post("/params", findStockByAnyParams);
router.delete("/:id", deleteStockById);
router.put("/:id", updateStockById);
router.post("/", addNewStock);
router.get("/", getStock);

module.exports = router;
