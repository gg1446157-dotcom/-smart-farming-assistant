import { useState } from "react";
import axios from "axios";
import "./DiseaseDetection.css";

function DiseaseDetection() {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleImageChange = (e) => {

        const selectedImage = e.target.files[0];

        if (!selectedImage) {
            return;
        }

        setImage(selectedImage);
        setResult(null);
        setError("");

        // Show image preview
        setPreview(URL.createObjectURL(selectedImage));
    };


    const detectDisease = async () => {

        if (!image) {

            setError("Please select a crop image first.");

            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {

            const formData = new FormData();

            formData.append("cropImage", image);


            const response = await axios.post(
                "http://localhost:5000/api/disease/detect",
                formData
            );


            setResult(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Disease detection failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="disease-page">

            <div className="disease-card">

                {/* TITLE */}

                <div className="disease-title">

                    <span>📷</span>

                    <div>

                        <h1>Disease Detection</h1>

                        <p>
                            Upload a crop image to check for diseases
                        </p>

                    </div>

                </div>


                {/* UPLOAD */}

                <div className="upload-area">

                    <input
                        id="cropImage"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleImageChange}
                    />

                    <label htmlFor="cropImage">
                        📷 Choose Crop Image
                    </label>

                    <p>
                        JPG, PNG or WEBP • Maximum 5 MB
                    </p>

                </div>


                {/* PREVIEW */}

                {preview && (

                    <div className="image-preview">

                        <h3>
                            Selected Image
                        </h3>

                        <img
                            src={preview}
                            alt="Selected crop"
                        />

                    </div>

                )}


                {/* DETECT BUTTON */}

                <button
                    className="detect-button"
                    onClick={detectDisease}
                    disabled={loading}
                >

                    {loading
                        ? "🔄 Analysing..."
                        : "🔍 Detect Disease"
                    }

                </button>


                {/* ERROR */}

                {error && (

                    <div className="disease-error">
                        ❌ {error}
                    </div>

                )}


                {/* RESULT */}

                {result && (

                    <div className="disease-result">

                        <div className="result-icon">
                            🌱
                        </div>

                        <h2>
                            Analysis Result
                        </h2>

                        <div className="result-box">

                            <p>
                                <strong>
                                    Disease:
                                </strong>

                                <span>
                                    {result.detection.disease}
                                </span>
                            </p>


                            <p>
                                <strong>
                                    Confidence:
                                </strong>

                                <span>
                                    {result.detection.confidence}%
                                </span>
                            </p>

                        </div>


                        <p className="result-message">
                            {result.message}
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default DiseaseDetection;