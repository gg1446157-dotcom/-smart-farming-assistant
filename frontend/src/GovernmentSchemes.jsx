import "./GovernmentSchemes.css";

function GovernmentSchemes() {

    const schemes = [
        {
            icon: "🌾",
            name: "PM-KISAN",
            description:
                "Financial support for eligible farmer families to help with agricultural and household needs.",
            category: "Financial Support",
            status: "Available"
        },
        {
            icon: "🌱",
            name: "Soil Health Card",
            description:
                "Provides information about soil nutrients and recommendations for improving soil health.",
            category: "Soil & Crop",
            status: "Available"
        },
        {
            icon: "💧",
            name: "Pradhan Mantri Krishi Sinchayee Yojana",
            description:
                "Supports efficient water use and improved irrigation facilities for agriculture.",
            category: "Irrigation",
            status: "Available"
        },
        {
            icon: "🚜",
            name: "Agricultural Mechanization Support",
            description:
                "Provides support for farmers to access modern agricultural machinery and equipment.",
            category: "Equipment",
            status: "Available"
        },
        {
            icon: "🛡️",
            name: "Pradhan Mantri Fasal Bima Yojana",
            description:
                "Crop insurance support intended to protect farmers against eligible crop losses.",
            category: "Crop Insurance",
            status: "Available"
        },
        {
            icon: "💰",
            name: "Kisan Credit Card",
            description:
                "Provides eligible farmers access to agricultural credit for farming-related expenses.",
            category: "Agricultural Credit",
            status: "Available"
        }
    ];


    return (

        <div className="government-schemes">

            {/* HEADER */}

            <div className="schemes-header">

                <div>

                    <h2>
                        🏛️ Government Schemes
                    </h2>

                    <p>
                        Discover government support available for farmers
                    </p>

                </div>

                <div className="schemes-header-icon">
                    🏛️
                </div>

            </div>


            {/* INFORMATION */}

            <div className="scheme-info">

                <h3>
                    👨‍🌾 Farmer Support
                </h3>

                <p>
                    Explore financial assistance, crop insurance,
                    irrigation support, agricultural equipment and
                    other farming-related schemes.
                </p>

            </div>


            {/* SCHEMES */}

            <div className="schemes-grid">

                {schemes.map((scheme) => (

                    <div
                        className="scheme-card"
                        key={scheme.name}
                    >

                        <div className="scheme-icon">
                            {scheme.icon}
                        </div>


                        <div className="scheme-content">

                            <h3>
                                {scheme.name}
                            </h3>

                            <p>
                                {scheme.description}
                            </p>


                            <div className="scheme-details">

                                <span>
                                    📂 {scheme.category}
                                </span>

                                <span className="scheme-status">
                                    ✓ {scheme.status}
                                </span>

                            </div>


                            <button
                                className="scheme-button"
                                onClick={() =>
                                    alert(
                                        `${scheme.name}\n\nDetailed eligibility and application information will be connected later. 🌾`
                                    )
                                }
                            >
                                View Details →
                            </button>

                        </div>

                    </div>

                ))}

            </div>


            {/* FOOTER INFORMATION */}

            <div className="official-info">

                <h3>
                    📄 Important
                </h3>

                <p>
                    Scheme eligibility, benefits, application procedures
                    and required documents may change. In the final
                    version, this module can be connected to official
                    government sources and regularly updated.
                </p>

            </div>

        </div>
    );
}

export default GovernmentSchemes;