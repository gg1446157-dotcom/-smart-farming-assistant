const recommendCrop = (req, res) => {

    let {
        nitrogen,
        phosphorus,
        potassium,
        ph,
        temperature,
        humidity,
        rainfall
    } = req.body;


    // Convert input values to numbers

    nitrogen = Number(nitrogen);
    phosphorus = Number(phosphorus);
    potassium = Number(potassium);
    ph = Number(ph);
    temperature = Number(temperature);
    humidity = Number(humidity);
    rainfall = Number(rainfall);


    // VALIDATION

    if (
        Number.isNaN(nitrogen) ||
        Number.isNaN(phosphorus) ||
        Number.isNaN(potassium) ||
        Number.isNaN(ph) ||
        Number.isNaN(temperature) ||
        Number.isNaN(humidity) ||
        Number.isNaN(rainfall)
    ) {

        return res.status(400).json({
            success: false,
            message: "All values must be valid numbers"
        });

    }


    // DEFAULT

    let crop = "Wheat";

    let reason =
        "The given soil and climate conditions are reasonably suitable for wheat.";


    // RICE

    if (
        nitrogen > 80 &&
        phosphorus > 40 &&
        potassium > 40 &&
        ph >= 5.5 &&
        ph <= 7.5 &&
        rainfall > 150
    ) {

        crop = "Rice";

        reason =
            "High nutrients, suitable pH and higher rainfall make rice a suitable choice.";

    }

    // MAIZE

    else if (
        nitrogen > 60 &&
        temperature > 25 &&
        rainfall < 100
    ) {

        crop = "Maize";

        reason =
            "The temperature and nutrient conditions are suitable for maize.";

    }

    // COTTON

    else if (
        phosphorus > 50 &&
        potassium > 40 &&
        temperature > 20
    ) {

        crop = "Cotton";

        reason =
            "The phosphorus, potassium and temperature conditions are suitable for cotton.";

    }


    res.json({

        success: true,

        recommendation: {

            crop,
            reason,

            soil: {
                nitrogen,
                phosphorus,
                potassium,
                ph
            },

            climate: {
                temperature,
                humidity,
                rainfall
            }

        }

    });

};


module.exports = {
    recommendCrop
};