const express = require("express");
const {
  getMedicines,
  addNewMedicine,
  updateMedicinesById,
  deletedMedicinesById,
  getExpiry_dateMedicines,
  getCountMedicines,
  getMedicinesByName,
  findMedicineByAnyParams,
} = require("../controller/medicines");

const router = express.Router();

router.post("/", findMedicineByAnyParams);
router.post("/name", getMedicinesByName);
router.post("/count", getCountMedicines);
router.post("/yaroqsiz", getExpiry_dateMedicines);
router.delete("/:id", deletedMedicinesById);
router.put("/:id", updateMedicinesById);
router.post("/", addNewMedicine);
router.get("/", getMedicines);

module.exports = router;
