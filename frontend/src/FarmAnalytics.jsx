import "./FarmAnalytics.css";

function FarmAnalytics() {

    const analytics = [
        {
            icon: "🌾",
            title: "Total Crops",
            value: "4",
            description: "Crops currently being managed"
        },
        {
            icon: "📈",
            title: "Expected Yield",
            value: "2.8 Tons",
            description: "Estimated total production"
        },
        {
            icon: "💧",
            title: "Irrigation",
            value: "68%",
            description: "Current irrigation efficiency"
        },
        {
            icon: "🧪",
            title: "Soil Health",
            value: "Good",
            description: "Based on available soil data"
        },
        {
            icon: "🚨",
            title: "Active Alerts",
            value: "3",
            description: "Alerts requiring attention"
        },
        {
            icon: "📅",
            title: "Activities",
            value: "12",
            description: "Farming activities planned"
        }
    ];

    return (
        <div className="farm-analytics">

            {/* HEADER */}

            <div className="analytics-header">

                <div>
                    <h2>📊 Farm Analytics</h2>

                    <p>
                        Monitor your farm performance and statistics
                    </p>
                </div>

                <div className="analytics-icon">
                    📊
                </div>

            </div>


            {/* SUMMARY */}

            <div className="analytics-summary">

                <h3>🌱 Farm Overview</h3>

                <p>
                    Get a quick overview of your crops, yield,
                    irrigation, soil health and farming activities.
                </p>

            </div>


            {/* ANALYTICS CARDS */}

            <div className="analytics-grid">

                {analytics.map((item) => (

                    <div
                        className="analytics-card"
                        key={item.title}
                    >

                        <div className="analytics-card-icon">
                            {item.icon}
                        </div>

                        <div className="analytics-card-content">

                            <h3>
                                {item.title}
                            </h3>

                            <strong>
                                {item.value}
                            </strong>

                            <p>
                                {item.description}
                            </p>

                        </div>

                    </div>

                ))}

            </div>


            {/* PERFORMANCE */}

            <div className="performance-section">

                <h2>📈 Farm Performance</h2>

                <div className="performance-bar">

                    <div
                        className="performance-progress"
                        style={{ width: "75%" }}
                    >
                        75%
                    </div>

                </div>

                <p>
                    Overall farm performance
                </p>

            </div>


            {/* FUTURE DATA */}

            <div className="analytics-note">

                <h3>🤖 Smart Analytics</h3>

                <p>
                    In the next stage, these values will be
                    calculated automatically from your farm,
                    crop, soil, irrigation, weather and yield data.
                </p>

            </div>

        </div>
    );
}

export default FarmAnalytics;