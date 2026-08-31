const analyzeSoil = (req, res) => {

    const {
        nitrogen,
        phosphorus,
        potassium,
        ph
    } = req.body;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        nitrogen === undefined ||
        phosphorus === undefined ||
        potassium === undefined ||
        ph === undefined
    ) {

        return res.status(400).json({
            success: false,
            message: "All soil values are required"
        });

    }


    // Convert to numbers

    const n = Number(nitrogen);
    const p = Number(phosphorus);
    const k = Number(potassium);
    const soilPh = Number(ph);


    if (
        Number.isNaN(n) ||
        Number.isNaN(p) ||
        Number.isNaN(k) ||
        Number.isNaN(soilPh)
    ) {

        return res.status(400).json({
            success: false,
            message: "Soil values must be valid numbers"
        });

    }


    // ==========================================
    // SOIL ANALYSIS
    // ==========================================

    let nitrogenStatus;
    let phosphorusStatus;
    let potassiumStatus;
    let phStatus;


    if (n < 40) {
        nitrogenStatus = "Low";
    } else if (n <= 80) {
        nitrogenStatus = "Medium";
    } else {
        nitrogenStatus = "High";
    }


    if (p < 30) {
        phosphorusStatus = "Low";
    } else if (p <= 60) {
        phosphorusStatus = "Medium";
    } else {
        phosphorusStatus = "High";
    }


    if (k < 30) {
        potassiumStatus = "Low";
    } else if (k <= 60) {
        potassiumStatus = "Medium";
    } else {
        potassiumStatus = "High";
    }


    if (soilPh < 5.5) {
        phStatus = "Acidic";
    } else if (soilPh <= 7.5) {
        phStatus = "Neutral";
    } else {
        phStatus = "Alkaline";
    }


    // ==========================================
    // OVERALL RESULT
    // ==========================================

    let overall = "Moderate";

    if (
        nitrogenStatus === "High" &&
        phosphorusStatus === "High" &&
        potassiumStatus === "High" &&
        phStatus === "Neutral"
    ) {

        overall = "Excellent";

    } else if (
        nitrogenStatus === "Low" ||
        phosphorusStatus === "Low" ||
        potassiumStatus === "Low"
    ) {

        overall = "Needs Improvement";

    }


    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({

        success: true,

        analysis: {

            overall,

            nitrogen: {
                value: n,
                status: nitrogenStatus
            },

            phosphorus: {
                value: p,
                status: phosphorusStatus
            },

            potassium: {
                value: k,
                status: potassiumStatus
            },

            ph: {
                value: soilPh,
                status: phStatus
            }

        }

    });

};


module.exports = {
    analyzeSoil
};