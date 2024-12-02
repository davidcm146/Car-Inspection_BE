const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

router.get("/cars", carController.getAllCars)
      .get("/cars/:id", carController.getCarById)
      .put("/cars/:id", carController.updateCarInspectionCriteria)

module.exports = router;