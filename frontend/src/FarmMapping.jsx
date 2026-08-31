import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./FarmMapping.css";


// ==========================================
// DEFAULT LOCATION
// ==========================================

const defaultLocation = [11.1271, 78.6569];


// ==========================================
// MAP CLICK HANDLER
// ==========================================

function LocationSelector({ setLocation }) {

    useMapEvents({

        click(event) {

            const { lat, lng } = event.latlng;

            setLocation([lat, lng]);

        }

    });

    return null;
}


// ==========================================
// FARM MAPPING COMPONENT
// ==========================================

function FarmMapping() {

    const [location, setLocation] =
        useState(defaultLocation);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");


    // ==========================================
    // GET CURRENT LOCATION
    // ==========================================

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            setMessage(
                "❌ Location services are not supported."
            );

            return;
        }


        setLoading(true);
        setMessage("Getting your location... 📍");


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                setLocation([
                    latitude,
                    longitude
                ]);


                setLoading(false);

                setMessage(
                    "📍 Your current location has been selected."
                );

            },

            (error) => {

                console.error(error);

                setLoading(false);

                setMessage(
                    "❌ Unable to get your location. Please allow location access."
                );

            }

        );

    };


    return (

        <div className="farm-mapping-page">

            <div className="farm-mapping-card">


                {/* HEADER */}

                <div className="mapping-header">

                    <div className="mapping-icon">
                        📍
                    </div>

                    <div>

                        <h1>
                            Farm Mapping
                        </h1>

                        <p>
                            Select and manage your farm location 🗺️
                        </p>

                    </div>

                </div>


                {/* CONTROLS */}

                <div className="mapping-controls">

                    <button
                        onClick={getCurrentLocation}
                        disabled={loading}
                    >

                        {loading
                            ? "Getting Location..."
                            : "📍 Use My Current Location"
                        }

                    </button>


                    <p>
                        Or click anywhere on the map to select
                        your farm location.
                    </p>

                </div>


                {/* MAP */}

                <div className="map-container">

                    <MapContainer
                        center={location}
                        zoom={7}
                        scrollWheelZoom={true}
                        className="farm-map"
                    >

                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />


                        <LocationSelector
                            setLocation={setLocation}
                        />


                        <Marker position={location}>

                            <Popup>

                                🌾
                                <strong>
                                    Your Farm Location
                                </strong>

                                <br />

                                Latitude:
                                {" "}
                                {location[0].toFixed(6)}

                                <br />

                                Longitude:
                                {" "}
                                {location[1].toFixed(6)}

                            </Popup>

                        </Marker>

                    </MapContainer>

                </div>


                {/* LOCATION INFORMATION */}

                <div className="location-info">

                    <h2>
                        📍 Selected Farm Location
                    </h2>

                    <div className="coordinates">

                        <div>

                            <strong>
                                Latitude
                            </strong>

                            <span>
                                {location[0].toFixed(6)}
                            </span>

                        </div>


                        <div>

                            <strong>
                                Longitude
                            </strong>

                            <span>
                                {location[1].toFixed(6)}
                            </span>

                        </div>

                    </div>


                    {message && (

                        <p className="location-message">
                            {message}
                        </p>

                    )}

                </div>

            </div>

        </div>

    );
}

export default FarmMapping;