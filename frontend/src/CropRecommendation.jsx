import { useState } from "react";
import axios from "axios";
import "./CropRecommendation.css";

function CropRecommendation() {

    const [form, setForm] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: "",
        temperature: "",
        humidity: "",
        rainfall: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const recommendCrop = async (e) => {

        e.preventDefault();

        setResult(null);
        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:5000/api/crops/recommend",
                {
                    nitrogen: Number(form.nitrogen),
                    phosphorus: Number(form.phosphorus),
                    potassium: Number(form.potassium),
                    ph: Number(form.ph),
                    temperature: Number(form.temperature),
                    humidity: Number(form.humidity),
                    rainfall: Number(form.rainfall)
                }
            );

            setResult(response.data.recommendation);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to get crop recommendation"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="crop-page">

            <div className="crop-card">

                <div className="crop-title">

                    <span>🌾</span>

                    <div>

                        <h1>Crop Recommendation</h1>

                        <p>
                            Enter your soil and climate information
                        </p>

                    </div>

                </div>


                <form onSubmit={recommendCrop}>

                    <div className="crop-grid">


                        <div className="input-group">

                            <label>Nitrogen (N)</label>

                            <input
                                type="number"
                                name="nitrogen"
                                value={form.nitrogen}
                                onChange={handleChange}
                                placeholder="Example: 80"
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label>Phosphorus (P)</label>

                            <input
                                type="number"
                                name="phosphorus"
                                value={form.phosphorus}
                                onChange={handleChange}
                                placeholder="Example: 40"
                                required
                            />

                        </div>


                        <div className="input-group">

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


                        <div className="input-group">

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


                        <div className="input-group">

                            <label>Temperature (°C)</label>

                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                value={form.temperature}
                                onChange={handleChange}
                                placeholder="Example: 28"
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label>Humidity (%)</label>

                            <input
                                type="number"
                                step="0.1"
                                name="humidity"
                                value={form.humidity}
                                onChange={handleChange}
                                placeholder="Example: 80"
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label>Rainfall (mm)</label>

                            <input
                                type="number"
                                step="0.1"
                                name="rainfall"
                                value={form.rainfall}
                                onChange={handleChange}
                                placeholder="Example: 180"
                                required
                            />

                        </div>

                    </div>


                    <button
                        className="recommend-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "🔄 Analysing..."
                            : "🔍 Recommend Crop"}

                    </button>

                </form>


                {error && (

                    <div className="crop-error">

                        ❌ {error}

                    </div>

                )}


                {result && (

                    <div className="crop-result">

                        <div className="result-icon">
                            🌱
                        </div>

                        <h2>
                            Recommended Crop
                        </h2>

                        <h1>
                            {result.crop}
                        </h1>

                        <p>
                            {result.reason}
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default CropRecommendation;