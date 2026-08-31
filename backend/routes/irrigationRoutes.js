const express = require("express");

const router = express.Router();

router.post("/recommend", (req, res) => {

    try {

        const {
            soilMoisture,
            temperature,
            rainfall,
            crop
        } = req.body;

        if (
            soilMoisture === undefined ||
            temperature === undefined ||
            rainfall === undefined ||
            !crop
        ) {
            return res.status(400).json({
                message: "All irrigation values are required"
            });
        }

        const moisture = Number(soilMoisture);
        const temp = Number(temperature);
        const rain = Number(rainfall);

        let recommendation;
        let waterAmount;
        let bestTime;

        // Heavy rainfall means irrigation is not required.
        if (rain >= 10) {

            recommendation = "Irrigation not required";
            waterAmount = 0;
            bestTime = "No irrigation needed";

        }

        // Very wet soil
        else if (moisture >= 70) {

            recommendation = "Irrigation not required";
            waterAmount = 0;
            bestTime = "No irrigation needed";

        }

        // Dry soil
        else if (moisture < 30) {

            recommendation = "Irrigation strongly recommended";
            waterAmount = temp >= 30 ? 30 : 25;
            bestTime = "Early morning";

        }

        // Moderate moisture
        else {

            recommendation = "Light irrigation recommended";
            waterAmount = 15;
            bestTime = "Early morning or evening";

        }

        res.json({

            success: true,

            irrigation: {
                crop,
                soilMoisture: moisture,
                temperature: temp,
                rainfall: rain,
                recommendation,
                waterAmount,
                bestTime
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Irrigation analysis failed"
        });

    }

});

module.exports = router;