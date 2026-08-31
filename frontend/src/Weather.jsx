import { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {

    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getWeather = async (e) => {

        e.preventDefault();

        if (!location.trim()) {
            setError("Please enter a location.");
            return;
        }

        setLoading(true);
        setError("");
        setWeather(null);

        try {

            const response = await axios.get(
                "http://localhost:5000/api/weather/current",
                {
                    params: {
                        location
                    }
                }
            );

            setWeather(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to get weather information"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="weather-page">

            <div className="weather-card">

                <div className="weather-title">

                    <span>🌦️</span>

                    <div>
                        <h1>Weather</h1>

                        <p>
                            Check weather conditions for your farm
                        </p>
                    </div>

                </div>

                <form onSubmit={getWeather}>

                    <input
                        className="weather-location"
                        type="text"
                        placeholder="Enter location, e.g. Chennai"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <button
                        className="weather-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "🔄 Loading..."
                            : "🌦️ Get Weather"
                        }
                    </button>

                </form>

                {error && (
                    <div className="weather-error">
                        ❌ {error}
                    </div>
                )}

                {weather && (

                    <div className="weather-result">

                        <h2>
                            📍 {weather.location}
                        </h2>

                        <div className="weather-condition">
                            {weather.weather.condition}
                        </div>

                        <div className="weather-grid">

                            <div>
                                <span>🌡️</span>
                                <strong>
                                    {weather.weather.temperature}°C
                                </strong>
                                <p>Temperature</p>
                            </div>

                            <div>
                                <span>💧</span>
                                <strong>
                                    {weather.weather.humidity}%
                                </strong>
                                <p>Humidity</p>
                            </div>

                            <div>
                                <span>🌧️</span>
                                <strong>
                                    {weather.weather.rainfall} mm
                                </strong>
                                <p>Rainfall</p>
                            </div>

                            <div>
                                <span>💨</span>
                                <strong>
                                    {weather.weather.windSpeed} km/h
                                </strong>
                                <p>Wind Speed</p>
                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Weather;