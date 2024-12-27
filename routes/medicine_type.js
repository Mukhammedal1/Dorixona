const express = require("express");
const {
  getMedicine_Type,
  addNewMedicine_Type,
  updateMedicine_TypeById,
  deleteMedicine_TypeById,
  findMedicineTypeByAnyParams,
} = require("../controller/medicine_type");

const router = express.Router();

router.post("/params", findMedicineTypeByAnyParams);
router.delete("/:id", deleteMedicine_TypeById);
router.put("/:id", updateMedicine_TypeById);
router.post("/", addNewMedicine_Type);
router.get("/", getMedicine_Type);

module.exports = router;
