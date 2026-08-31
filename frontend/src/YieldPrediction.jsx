import { useState } from "react";
import "./YieldPrediction.css";

function YieldPrediction() {

    const [crop, setCrop] = useState("");
    const [area, setArea] = useState("");
    const [result, setResult] = useState("");

    const predictYield = () => {

        if (!crop || !area) {
            setResult("Please enter the crop and farm area.");
            return;
        }

        // Temporary prediction logic
        const estimatedYield = Number(area) * 1000;

        setResult(
            `Estimated yield for ${crop}: ${estimatedYield} kg`
        );
    };

    return (
        <div className="yield-container">

            <h2>📈 Yield Prediction</h2>

            <p>
                Predict your expected crop production.
            </p>

            <div className="yield-form">

                <label>
                    Select Crop
                </label>

                <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                >
                    <option value="">
                        Select a crop
                    </option>

                    <option value="Rice">
                        Rice
                    </option>

                    <option value="Wheat">
                        Wheat
                    </option>

                    <option value="Maize">
                        Maize
                    </option>

                    <option value="Cotton">
                        Cotton
                    </option>

                    <option value="Groundnut">
                        Groundnut
                    </option>
                </select>


                <label>
                    Farm Area (acres)
                </label>

                <input
                    type="number"
                    placeholder="Enter farm area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />


                <button onClick={predictYield}>
                    Predict Yield 🌾
                </button>

            </div>


            {result && (
                <div className="yield-result">
                    <h3>📊 Prediction Result</h3>
                    <p>{result}</p>
                </div>
            )}

        </div>
    );
}

export default YieldPrediction;