import { useState } from "react";
import axios from "axios";
import "./SmartIrrigation.css";

function SmartIrrigation() {

    const [form, setForm] = useState({
        soilMoisture: "",
        temperature: "",
        rainfall: "",
        crop: ""
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const getRecommendation = async (e) => {

        e.preventDefault();

        setResult(null);
        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "https://smart-farming-assistant-production.up.railway.app/api/irrigation/recommend",
                form
            );

            setResult(response.data.irrigation);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to calculate irrigation recommendation"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="irrigation-page">

            <div className="irrigation-card">

                <div className="irrigation-title">

                    <span>💧</span>

                    <div>

                        <h1>Smart Irrigation</h1>

                        <p>
                            Get intelligent water irrigation suggestions
                        </p>

                    </div>

                </div>


                <form onSubmit={getRecommendation}>

                    <div className="irrigation-grid">

                        <div className="irrigation-input">

                            <label>
                                🌱 Soil Moisture (%)
                            </label>

                            <input
                                type="number"
                                name="soilMoisture"
                                min="0"
                                max="100"
                                placeholder="Example: 25"
                                value={form.soilMoisture}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="irrigation-input">

                            <label>
                                🌡️ Temperature (°C)
                            </label>

                            <input
                                type="number"
                                name="temperature"
                                placeholder="Example: 32"
                                value={form.temperature}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="irrigation-input">

                            <label>
                                🌧️ Rainfall (mm)
                            </label>

                            <input
                                type="number"
                                name="rainfall"
                                min="0"
                                placeholder="Example: 0"
                                value={form.rainfall}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="irrigation-input">

                            <label>
                                🌾 Crop
                            </label>

                            <input
                                type="text"
                                name="crop"
                                placeholder="Example: Rice"
                                value={form.crop}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <button
                        className="irrigation-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "🔄 Analysing..."
                            : "💧 Check Irrigation"
                        }

                    </button>

                </form>


                {error && (

                    <div className="irrigation-error">
                        ❌ {error}
                    </div>

                )}


                {result && (

                    <div className="irrigation-result">

                        <div className="result-water-icon">
                            💧
                        </div>

                        <h2>
                            Irrigation Recommendation
                        </h2>


                        <div className="recommendation">

                            {result.recommendation}

                        </div>


                        <div className="irrigation-results-grid">

                            <div>

                                <strong>
                                    🌾 Crop
                                </strong>

                                <span>
                                    {result.crop}
                                </span>

                            </div>


                            <div>

                                <strong>
                                    💧 Water
                                </strong>

                                <span>
                                    {result.waterAmount} L/m²
                                </span>

                            </div>


                            <div>

                                <strong>
                                    🌱 Moisture
                                </strong>

                                <span>
                                    {result.soilMoisture}%
                                </span>

                            </div>


                            <div>

                                <strong>
                                    ⏰ Best Time
                                </strong>

                                <span>
                                    {result.bestTime}
                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default SmartIrrigation;