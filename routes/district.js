const express = require("express");
const {
  getDistrict,
  addNewDistrict,
  updateDistrictById,
  deleteDistrictById,
  findDistrictByAnyParams,
} = require("../controller/district");

const router = express.Router();

router.get("/", getDistrict);
router.post("/params", findDistrictByAnyParams);
router.delete("/:id", deleteDistrictById);
router.put("/:id", updateDistrictById);
router.post("/", addNewDistrict);

module.exports = router;
