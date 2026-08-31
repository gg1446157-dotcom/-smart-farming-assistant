import { useState } from "react";
import "./SmartAlerts.css";

function SmartAlerts() {

    const [alerts, setAlerts] = useState([
        {
            id: 1,
            icon: "🌦️",
            title: "Weather Alert",
            message: "Rain is expected soon. Consider postponing irrigation.",
            type: "Weather"
        },
        {
            id: 2,
            icon: "💧",
            title: "Irrigation Reminder",
            message: "Your crop may require irrigation today.",
            type: "Irrigation"
        },
        {
            id: 3,
            icon: "🌱",
            title: "Crop Monitoring",
            message: "Check your crops for possible growth or disease changes.",
            type: "Crop"
        }
    ]);

    const removeAlert = (id) => {
        setAlerts(
            alerts.filter((alert) => alert.id !== id)
        );
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    return (
        <div className="alerts-container">

            <div className="alerts-header">

                <div>
                    <h2>🚨 Smart Alerts</h2>

                    <p>
                        Important notifications and reminders for your farm.
                    </p>
                </div>

                {alerts.length > 0 && (
                    <button
                        className="clear-alerts"
                        onClick={clearAlerts}
                    >
                        Clear All
                    </button>
                )}

            </div>


            <div className="alerts-list">

                {alerts.length === 0 ? (

                    <div className="no-alerts">

                        <div className="no-alert-icon">
                            ✅
                        </div>

                        <h3>
                            No Active Alerts
                        </h3>

                        <p>
                            Your farm currently has no important alerts.
                        </p>

                    </div>

                ) : (

                    alerts.map((alert) => (

                        <div
                            className="alert-card"
                            key={alert.id}
                        >

                            <div className="alert-icon">
                                {alert.icon}
                            </div>

                            <div className="alert-content">

                                <span className="alert-type">
                                    {alert.type}
                                </span>

                                <h3>
                                    {alert.title}
                                </h3>

                                <p>
                                    {alert.message}
                                </p>

                            </div>

                            <button
                                className="dismiss-alert"
                                onClick={() => removeAlert(alert.id)}
                            >
                                ×
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default SmartAlerts;