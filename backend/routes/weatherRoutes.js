const express = require("express");

const router = express.Router();

router.get("/current", (req, res) => {

    const { location } = req.query;

    if (!location) {
        return res.status(400).json({
            message: "Location is required"
        });
    }

    // Temporary weather data.
    // We will connect a real weather API later.

    res.json({
        success: true,

        location: location,

        weather: {
            temperature: 29,
            humidity: 72,
            rainfall: 12,
            windSpeed: 14,
            condition: "Partly Cloudy 🌤️"
        }
    });

});

module.exports = router;