const path = require("path");
const { execFile } = require("child_process");
const fs = require("fs");


// ============================================================
// DISEASE DETECTION
// ============================================================

const detectDisease = (req, res) => {

    // --------------------------------------------------------
    // CHECK IMAGE
    // --------------------------------------------------------

    if (!req.file) {

        return res.status(400).json({

            success: false,

            message: "Please upload a crop image."

        });

    }


    // --------------------------------------------------------
    // PYTHON + ML PATHS
    // --------------------------------------------------------

    const pythonPath = path.join(

        __dirname,
        "../../ml/venv/bin/python"

    );


    const predictScript = path.join(

        __dirname,
        "../../ml/disease_model/scripts/predict.py"

    );


    // Uploaded image path
    const imagePath = path.resolve(

        req.file.path

    );


    console.log("Image:", imagePath);

    console.log("Python:", pythonPath);

    console.log("Predict script:", predictScript);


    // --------------------------------------------------------
    // RUN PYTHON ML MODEL
    // --------------------------------------------------------

    execFile(

        pythonPath,

        [
            predictScript,
            imagePath
        ],

        {
            timeout: 120000
        },

        (error, stdout, stderr) => {


            // ------------------------------------------------
            // PYTHON ERROR
            // ------------------------------------------------

            if (error) {

                console.error(
                    "Python error:",
                    error
                );

                console.error(
                    "Python stderr:",
                    stderr
                );


                return res.status(500).json({

                    success: false,

                    message:
                        "Disease detection failed.",

                    error:
                        error.message

                });

            }


            // ------------------------------------------------
            // READ PYTHON JSON
            // ------------------------------------------------

            try {

                const result =
                    JSON.parse(
                        stdout.trim()
                    );


                // --------------------------------------------
                // ML RETURNED ERROR
                // --------------------------------------------

                if (!result.success) {

                    return res.status(500).json({

                        success: false,

                        message:
                            result.error ||
                            "Prediction failed."

                    });

                }


                // --------------------------------------------
                // SUCCESS RESPONSE
                // --------------------------------------------

                return res.json({

                    success: true,

                    message:
                        "Crop image analysed successfully 🌱",

                    image: {

                        filename:
                            req.file.filename,

                        size:
                            req.file.size,

                        type:
                            req.file.mimetype

                    },

                    detection: {

                        disease:
                            result.disease,

                        confidence:
                            result.confidence

                    }

                });


            } catch (parseError) {

                console.error(
                    "JSON parsing error:",
                    parseError
                );

                console.error(
                    "Python output:",
                    stdout
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Invalid prediction response."

                });

            }

        }

    );

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

    detectDisease

};
