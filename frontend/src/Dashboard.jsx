import { useState } from "react";

import CropRecommendation from "./CropRecommendation";
import SoilAnalysis from "./SoilAnalysis";
import DiseaseDetection from "./DiseaseDetection";
import Weather from "./Weather";
import SmartIrrigation from "./SmartIrrigation";
import AIAssistant from "./AIAssistant";
import TamilVoiceAssistant from "./TamilVoiceAssistant";
import FarmMapping from "./FarmMapping";
import CropMonitoring from "./CropMonitoring";
import FarmerMarketPlace from "./FarmerMarketPlace";
import YieldPrediction from "./YieldPrediction";
import SmartAlerts from "./SmartAlerts";
import FarmingCalendar from "./FarmingCalendar";
import GovernmentSchemes from "./GovernmentSchemes";
import FarmAnalytics from "./FarmAnalytics";

import "./Dashboard.css";


function Dashboard({ user, onLogout }) {

    const [selectedModule, setSelectedModule] = useState(null);


    // ==========================================
    // FARMING MODULES
    // ==========================================

    const modules = [

        {
            icon: "🌾",
            name: "Crop Recommendation",
            description: "Find the best crop for your soil and climate.",
            id: "crop"
        },

        {
            icon: "🧪",
            name: "Soil Analysis",
            description: "Analyze soil nutrients and conditions.",
            id: "soil"
        },

        {
            icon: "📷",
            name: "Disease Detection",
            description: "Detect crop diseases using an image.",
            id: "disease"
        },

        {
            icon: "🌦️",
            name: "Weather",
            description: "View current and upcoming weather.",
            id: "weather"
        },

        {
            icon: "💧",
            name: "Smart Irrigation",
            description: "Get intelligent irrigation suggestions.",
            id: "irrigation"
        },

        {
            icon: "🤖",
            name: "AI Farming Assistant",
            description: "Ask AI about your farming problems.",
            id: "ai"
        },

        {
            icon: "🎙️",
            name: "Tamil Voice Assistant",
            description: "Interact with the assistant using Tamil voice.",
            id: "voice"
        },

        {
            icon: "📍",
            name: "Farm Mapping",
            description: "Manage and view your farm location.",
            id: "mapping"
        },

        {
            icon: "🛰️",
            name: "Crop Monitoring",
            description: "Monitor crop growth and farm conditions.",
            id: "monitoring"
        },

        {
            icon: "🛒",
            name: "Farmer Marketplace",
            description: "Explore agricultural products and prices.",
            id: "marketplace"
        },

        {
            icon: "📈",
            name: "Yield Prediction",
            description: "Predict expected crop production.",
            id: "yield"
        },

        {
            icon: "🚨",
            name: "Smart Alerts",
            description: "Receive important farming alerts.",
            id: "alerts"
        },

        {
            icon: "📅",
            name: "Farming Calendar",
            description: "Plan your farming activities.",
            id: "calendar"
        },

        {
            icon: "🏛️",
            name: "Government Schemes",
            description: "Find useful agricultural schemes.",
            id: "schemes"
        },

        {
            icon: "📊",
            name: "Farm Analytics",
            description: "View your farm performance and statistics.",
            id: "analytics"
        }

    ];


    // ==========================================
    // AVAILABLE MODULES
    // ==========================================

    const availableModules = [
        "crop",
        "soil",
        "disease",
        "weather",
        "irrigation",
        "ai",
        "voice",
        "mapping",
        "monitoring",
        "marketplace",
        "yield",
        "alerts",
        "calendar",
        "schemes",
        "analytics"
    ];


    // ==========================================
    // SELECT MODULE
    // ==========================================

    const handleModuleClick = (module) => {

        if (availableModules.includes(module.id)) {

            setSelectedModule(module.id);

        } else {

            alert(`${module.name} - Coming soon 🌾`);

        }

    };


    // ==========================================
    // SHOW SELECTED MODULE
    // ==========================================

    if (selectedModule !== null) {

        return (

            <div className="dashboard">

                {/* HEADER */}

                <header className="dashboard-header">

                    <div className="brand">

                        <div className="brand-icon">
                            🌱
                        </div>

                        <div>

                            <h1>
                                Smart Farming Assistant
                            </h1>

                            <p>
                                Intelligent technology for smarter farming
                            </p>

                        </div>

                    </div>


                    <div className="user-section">

                        <div className="user-info">

                            <strong>
                                👨‍🌾 {user.name}
                            </strong>

                            <span>
                                {user.email}
                            </span>

                        </div>


                        <button
                            className="logout-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>

                    </div>

                </header>


                {/* ======================================
                    SELECTED MODULE CONTENT
                ====================================== */}

                {selectedModule === "crop" && (
                    <CropRecommendation />
                )}

                {selectedModule === "soil" && (
                    <SoilAnalysis />
                )}

                {selectedModule === "disease" && (
                    <DiseaseDetection />
                )}

                {selectedModule === "weather" && (
                    <Weather />
                )}

                {selectedModule === "irrigation" && (
                    <SmartIrrigation />
                )}

                {selectedModule === "ai" && (
                    <AIAssistant />
                )}

                {selectedModule === "voice" && (
                    <TamilVoiceAssistant />
                )}

                {selectedModule === "mapping" && (
                    <FarmMapping />
                )}

                {selectedModule === "monitoring" && (
                    <CropMonitoring />
                )}

                {selectedModule === "marketplace" && (
                    <FarmerMarketPlace />
                )}
                {selectedModule === "yield" && (
                    <YieldPrediction />
                )}
                {selectedModule === "alerts" &&(
                    <SmartAlerts />
                )}
                {selectedModule === "calendar" &&(
                    <FarmingCalendar />
                )}
                {selectedModule === "schemes" &&(
                    <GovernmentSchemes />
                )}
                {selectedModule === "analytics" &&(
                    <FarmAnalytics />
                )}


                {/* ======================================
                    BACK TO DASHBOARD
                ====================================== */}

                <div className="back-dashboard">

                    <button
                        onClick={() => setSelectedModule(null)}
                    >
                        ← Back to Dashboard
                    </button>

                </div>


                {/* FOOTER */}

                <footer className="dashboard-footer">

                    <p>
                        🌾 Smart Farming Assistant
                    </p>

                    <span>
                        AI • Technology • Sustainable Agriculture
                    </span>

                </footer>

            </div>

        );

    }


    // ==========================================
    // MAIN DASHBOARD
    // ==========================================

    return (

        <div className="dashboard">

            {/* ======================================
                HEADER
            ====================================== */}

            <header className="dashboard-header">

                <div className="brand">

                    <div className="brand-icon">
                        🌱
                    </div>

                    <div>

                        <h1>
                            Smart Farming Assistant
                        </h1>

                        <p>
                            Intelligent technology for smarter farming
                        </p>

                    </div>

                </div>


                {/* USER */}

                <div className="user-section">

                    <div className="user-info">

                        <strong>
                            👨‍🌾 {user.name}
                        </strong>

                        <span>
                            {user.email}
                        </span>

                    </div>


                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ======================================
                WELCOME SECTION
            ====================================== */}

            <section className="welcome-section">

                <div>

                    <h2>
                        Welcome, {user.name}! 👋
                    </h2>

                    <p>
                        Your smart farming dashboard is ready.
                    </p>

                </div>


                <div className="welcome-icon">
                    🌾
                </div>

            </section>


            {/* ======================================
                FARMING MODULES
            ====================================== */}

            <section className="modules-section">

                <div className="section-heading">

                    <h2>
                        🌱 Farming Modules
                    </h2>

                    <p>
                        Select a module to get started
                    </p>

                </div>


                <div className="modules-grid">

                    {modules.map((module) => (

                        <button
                            className="module-card"
                            key={module.id}
                            onClick={() => handleModuleClick(module)}
                        >

                            {/* ICON */}

                            <div className="module-icon">
                                {module.icon}
                            </div>


                            {/* CONTENT */}

                            <div className="module-content">

                                <h3>
                                    {module.name}
                                </h3>

                                <p>
                                    {module.description}
                                </p>

                            </div>


                            {/* ARROW */}

                            <span className="arrow">
                                →
                            </span>

                        </button>

                    ))}

                </div>

            </section>


            {/* ======================================
                FOOTER
            ====================================== */}

            <footer className="dashboard-footer">

                <p>
                    🌾 Smart Farming Assistant
                </p>

                <span>
                    AI • Technology • Sustainable Agriculture
                </span>

            </footer>

        </div>

    );

}


export default Dashboard;