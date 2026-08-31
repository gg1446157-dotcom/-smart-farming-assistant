const express = require("express");

const router = express.Router();


// ==========================================
// SAVE FARM LOCATION
// ==========================================

router.post("/save", (req, res) => {

    try {

        const { latitude, longitude } = req.body;


        // Validation
        if (
            latitude === undefined ||
            longitude === undefined
        ) {

            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required"
            });

        }


        const lat = Number(latitude);
        const lng = Number(longitude);


        if (
            Number.isNaN(lat) ||
            Number.isNaN(lng)
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid coordinates"
            });

        }


        // Coordinate range validation

        if (
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
        ) {

            return res.status(400).json({
                success: false,
                message: "Coordinates are out of range"
            });

        }


        res.json({

            success: true,

            message: "Farm location saved successfully 📍",

            location: {
                latitude: lat,
                longitude: lng
            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to save farm location"
        });

    }

});


module.exports = router;
