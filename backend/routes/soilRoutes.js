const express = require("express");

const { analyzeSoil } = require("../controllers/soilController");

const router = express.Router();


// ==========================================
// SOIL ANALYSIS
// ==========================================

router.post(
    "/analyze",
    analyzeSoil
);


module.exports = router;
