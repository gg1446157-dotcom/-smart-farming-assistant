import { useState } from "react";
import axios from "axios";
import "./SoilAnalysis.css";

function SoilAnalysis() {

    const [form, setForm] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: ""
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


    const analyzeSoil = async (e) => {

        e.preventDefault();

        setResult(null);
        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "https://smart-farming-assistant-production.up.railway.app/api/soil/analyze",
                {
                    nitrogen: Number(form.nitrogen),
                    phosphorus: Number(form.phosphorus),
                    potassium: Number(form.potassium),
                    ph: Number(form.ph)
                }
            );

            setResult(response.data.soilAnalysis);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to analyze soil"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="soil-page">

            <div className="soil-card">

                <div className="soil-title">

                    <span>🧪</span>

                    <div>

                        <h1>Soil Analysis</h1>

                        <p>
                            Check your soil nutrient levels and pH
                        </p>

                    </div>

                </div>


                <form onSubmit={analyzeSoil}>

                    <div className="soil-grid">

                        <div className="soil-input">

                            <label>Nitrogen (N)</label>

                            <input
                                type="number"
                                name="nitrogen"
                                value={form.nitrogen}
                                onChange={handleChange}
                                placeholder="Example: 60"
                                required
                            />

                        </div>


                        <div className="soil-input">

                            <label>Phosphorus (P)</label>

                            <input
                                type="number"
                                name="phosphorus"
                                value={form.phosphorus}
                                onChange={handleChange}
                                placeholder="Example: 30"
                                required
                            />

                        </div>


                        <div className="soil-input">

                            <label>Potassium (K)</label>

                            <input
                                type="number"
                                name="potassium"
                                value={form.potassium}
                                onChange={handleChange}
                                placeholder="Example: 40"
                                required
                            />

                        </div>


                        <div className="soil-input">

                            <label>Soil pH</label>

                            <input
                                type="number"
                                step="0.1"
                                name="ph"
                                value={form.ph}
                                onChange={handleChange}
                                placeholder="Example: 6.5"
                                required
                            />

                        </div>

                    </div>


                    <button
                        className="soil-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "🔄 Analysing..."
                            : "🧪 Analyze Soil"
                        }

                    </button>

                </form>


                {error && (

                    <div className="soil-error">
                        ❌ {error}
                    </div>

                )}


                {result && (

                    <div className="soil-result">

                        <h2>
                            🌱 Soil Health Report
                        </h2>


                        <div className="soil-results-grid">

                            <div>
                                <strong>Nitrogen</strong>
                                <span>
                                    {result.nitrogen}
                                </span>
                            </div>

                            <div>
                                <strong>Phosphorus</strong>
                                <span>
                                    {result.phosphorus}
                                </span>
                            </div>

                            <div>
                                <strong>Potassium</strong>
                                <span>
                                    {result.potassium}
                                </span>
                            </div>

                            <div>
                                <strong>Soil pH</strong>
                                <span>
                                    {result.ph}
                                </span>
                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default SoilAnalysis;