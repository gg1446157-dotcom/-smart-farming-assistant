require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const soilRoutes = require("./routes/soilRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const irrigationRoutes = require("./routes/irrigationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const mappingRoutes = require("./routes/mappingRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/crops", cropRoutes);

app.use("/api/soil", soilRoutes);

app.use("/api/disease", diseaseRoutes);

app.use("/api/weather", weatherRoutes);

app.use("/api/irrigation", irrigationRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/mapping", mappingRoutes);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Smart Farming Assistant Backend is running 🌾"
    });

});


// ==========================================
// 404 ROUTE
// ==========================================

app.use((req, res) => {

    res.status(404).json({
        message: "API route not found"
    });

});


// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
