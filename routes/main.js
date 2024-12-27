const express = require("express");
const router = express.Router();

const pharmaciesRouter = require("./pharmacies");
const medicinesRouter = require("./medicines");
const stockRouter = require("./stock");
const districtRouter = require("./district");
const regionRouter = require("./region");
const medicine_typeRouter = require("./medicine_type");

router.use("/medicines", medicinesRouter);
router.use("/pharmacies", pharmaciesRouter);
router.use("/stock", stockRouter);
router.use("/district", districtRouter);
router.use("/region", regionRouter);
router.use("/medicine_type", medicine_typeRouter);

module.exports = router;
