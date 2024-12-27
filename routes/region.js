const express = require("express");
const {
  getRegion,
  addNewRegion,
  updateRegionById,
  deleteRegionById,
  findRegionByAnyParams,
} = require("../controller/region");

const router = express.Router();

router.post("/params", findRegionByAnyParams);
router.delete("/:id", deleteRegionById);
router.put("/:id", updateRegionById);
router.post("/", addNewRegion);
router.get("/", getRegion);

module.exports = router;
