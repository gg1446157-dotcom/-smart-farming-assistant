import { useState } from "react";
import "./CropMonitoring.css";

function CropMonitoring() {

    const [cropName, setCropName] = useState("");
    const [plantingDate, setPlantingDate] = useState("");
    const [growthStage, setGrowthStage] = useState("Seedling");
    const [soilMoisture, setSoilMoisture] = useState(50);
    const [cropHealth, setCropHealth] = useState("Healthy");
    const [notes, setNotes] = useState("");

    const [monitoringData, setMonitoringData] = useState(null);


    const saveMonitoring = (event) => {

        event.preventDefault();

        if (!cropName || !plantingDate) {
            alert("Please enter crop name and planting date.");
            return;
        }

        const data = {
            cropName,
            plantingDate,
            growthStage,
            soilMoisture,
            cropHealth,
            notes
        };

        setMonitoringData(data);
    };


    return (

        <div className="crop-monitoring-page">

            <div className="crop-monitoring-card">

                {/* HEADER */}

                <div className="monitoring-header">

                    <div className="monitoring-icon">
                        🛰️
                    </div>

                    <div>

                        <h1>
                            Crop Monitoring
                        </h1>

                        <p>
                            Monitor your crop growth and farm conditions 🌱
                        </p>

                    </div>

                </div>


                {/* FORM */}

                <form
                    className="monitoring-form"
                    onSubmit={saveMonitoring}
                >

                    <h2>
                        🌱 Crop Information
                    </h2>


                    {/* CROP NAME */}

                    <div className="form-group">

                        <label>
                            Crop Name
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Rice"
                            value={cropName}
                            onChange={(e) =>
                                setCropName(e.target.value)
                            }
                        />

                    </div>


                    {/* PLANTING DATE */}

                    <div className="form-group">

                        <label>
                            Planting Date
                        </label>

                        <input
                            type="date"
                            value={plantingDate}
                            onChange={(e) =>
                                setPlantingDate(e.target.value)
                            }
                        />

                    </div>


                    {/* GROWTH STAGE */}

                    <div className="form-group">

                        <label>
                            Growth Stage
                        </label>

                        <select
                            value={growthStage}
                            onChange={(e) =>
                                setGrowthStage(e.target.value)
                            }
                        >

                            <option>
                                Seedling
                            </option>

                            <option>
                                Vegetative
                            </option>

                            <option>
                                Flowering
                            </option>

                            <option>
                                Fruiting
                            </option>

                            <option>
                                Harvesting
                            </option>

                        </select>

                    </div>


                    {/* SOIL MOISTURE */}

                    <div className="form-group">

                        <label>
                            Soil Moisture: {soilMoisture}%
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={soilMoisture}
                            onChange={(e) =>
                                setSoilMoisture(e.target.value)
                            }
                        />

                    </div>


                    {/* CROP HEALTH */}

                    <div className="form-group">

                        <label>
                            Crop Health
                        </label>

                        <select
                            value={cropHealth}
                            onChange={(e) =>
                                setCropHealth(e.target.value)
                            }
                        >

                            <option>
                                Healthy
                            </option>

                            <option>
                                Needs Attention
                            </option>

                            <option>
                                At Risk
                            </option>

                        </select>

                    </div>


                    {/* NOTES */}

                    <div className="form-group">

                        <label>
                            Farmer Notes
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Enter observations about your crop..."
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="save-monitoring-button"
                    >
                        💾 Save Monitoring Data
                    </button>

                </form>


                {/* MONITORING SUMMARY */}

                {monitoringData && (

                    <div className="monitoring-summary">

                        <h2>
                            📊 Monitoring Summary
                        </h2>


                        <div className="summary-grid">

                            <div className="summary-item">

                                <span>
                                    🌾 Crop
                                </span>

                                <strong>
                                    {monitoringData.cropName}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    📅 Planting Date
                                </span>

                                <strong>
                                    {monitoringData.plantingDate}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    🌿 Growth Stage
                                </span>

                                <strong>
                                    {monitoringData.growthStage}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    💧 Soil Moisture
                                </span>

                                <strong>
                                    {monitoringData.soilMoisture}%
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    ❤️ Crop Health
                                </span>

                                <strong>
                                    {monitoringData.cropHealth}
                                </strong>

                            </div>

                        </div>


                        {monitoringData.notes && (

                            <div className="monitoring-notes">

                                <strong>
                                    📝 Notes
                                </strong>

                                <p>
                                    {monitoringData.notes}
                                </p>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );
}

export default CropMonitoring;