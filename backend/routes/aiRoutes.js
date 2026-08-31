const express = require("express");

const router = express.Router();

router.post("/chat", (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Please enter a question"
            });
        }

        const question = message.toLowerCase();

        let answer;

        if (
            question.includes("water") ||
            question.includes("irrigation") ||
            question.includes("நீர்")
        ) {

            answer =
                "💧 Check your soil moisture before irrigation. " +
                "If the soil is dry and there is no expected rainfall, " +
                "irrigation may be required.";

        } else if (
            question.includes("rice") ||
            question.includes("நெல்")
        ) {

            answer =
                "🌾 Rice generally requires sufficient water and " +
                "warm growing conditions. Monitor soil moisture and rainfall regularly.";

        } else if (
            question.includes("disease") ||
            question.includes("நோய்")
        ) {

            answer =
                "📷 You can use the Disease Detection module to " +
                "analyze a crop image and identify possible diseases.";

        } else if (
            question.includes("soil") ||
            question.includes("மண்")
        ) {

            answer =
                "🧪 Soil health is important for crop growth. " +
                "Check pH, nitrogen, phosphorus, potassium and moisture levels.";

        } else if (
            question.includes("weather") ||
            question.includes("வானிலை")
        ) {

            answer =
                "🌦️ Check the Weather module for temperature, rainfall, " +
                "humidity and other weather information.";

        } else {

            answer =
                "🌾 I'm your Smart Farming Assistant. " +
                "You can ask me about crops, soil, irrigation, diseases, " +
                "weather and other farming topics.";

        }

        res.json({
            success: true,
            answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "AI assistant error"
        });

    }

});

module.exports = router;