const express = require("express");
const {
  getPharmacies,
  addNewPharmacies,
  updatePharmaciesById,
  deletedPharmaciesById,
  findPharmacyByAnyParams,
} = require("../controller/pharmacies");

const router = express.Router();

router.post("/params", findPharmacyByAnyParams);
router.delete("/:id", deletedPharmaciesById);
router.put("/:id", updatePharmaciesById);
router.post("/", addNewPharmacies);
router.get("/", getPharmacies);

module.exports = router;
