import { useState, useRef } from "react";
import axios from "axios";
import "./TamilVoiceAssistant.css";

function TamilVoiceAssistant() {

    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const recognitionRef = useRef(null);


    // ==========================================
    // START VOICE RECOGNITION
    // ==========================================

    const startListening = () => {

        setError("");

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            setError(
                "Voice recognition is not supported in this browser."
            );

            return;
        }


        const recognition = new SpeechRecognition();

        recognition.lang = "ta-IN";

        recognition.continuous = false;

        recognition.interimResults = false;


        recognition.onstart = () => {

            setIsListening(true);
            setResponse("");

        };


        recognition.onresult = async (event) => {

            const spokenText =
                event.results[0][0].transcript;

            setText(spokenText);

            setIsListening(false);

            await askAssistant(spokenText);

        };


        recognition.onerror = (event) => {

            console.error("Speech recognition error:", event.error);

            setIsListening(false);

            setError(
                "Could not understand your voice. Please try again."
            );

        };


        recognition.onend = () => {

            setIsListening(false);

        };


        recognitionRef.current = recognition;

        recognition.start();

    };


    // ==========================================
    // SEND TEXT TO AI ASSISTANT
    // ==========================================

    const askAssistant = async (question) => {

        try {

            setError("");

            const result = await axios.post(
                "http://localhost:5000/api/ai/chat",
                {
                    message: question
                }
            );


            const answer = result.data.answer;

            setResponse(answer);

            speakAnswer(answer);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to the farming assistant."
            );

        }

    };


    // ==========================================
    // TEXT TO SPEECH
    // ==========================================

    const speakAnswer = (answer) => {

        if (!("speechSynthesis" in window)) {

            return;

        }


        window.speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(answer);

        speech.lang = "ta-IN";

        speech.rate = 0.9;

        speech.pitch = 1;


        window.speechSynthesis.speak(speech);

    };


    // ==========================================
    // STOP SPEAKING
    // ==========================================

    const stopSpeaking = () => {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    };


    return (

        <div className="voice-page">

            <div className="voice-card">


                {/* HEADER */}

                <div className="voice-header">

                    <div className="voice-header-icon">
                        🎙️
                    </div>

                    <div>

                        <h1>
                            Tamil Voice Assistant
                        </h1>

                        <p>
                            பேசுங்கள், உங்கள் விவசாய உதவியாளரிடம் கேளுங்கள் 🌾
                        </p>

                    </div>

                </div>


                {/* VOICE BUTTON */}

                <div className="voice-section">

                    <button
                        className={
                            isListening
                                ? "voice-button listening"
                                : "voice-button"
                        }
                        onClick={startListening}
                        disabled={isListening}
                    >

                        {isListening
                            ? "🎙️ Listening..."
                            : "🎙️ Tap to Speak"
                        }

                    </button>


                    {isListening && (

                        <p className="listening-text">
                            கேட்கிறது... பேசுங்கள் 🎙️
                        </p>

                    )}

                </div>


                {/* RECOGNIZED TEXT */}

                {text && (

                    <div className="voice-result">

                        <h3>
                            📝 நீங்கள் கூறியது
                        </h3>

                        <p>
                            {text}
                        </p>

                    </div>

                )}


                {/* AI RESPONSE */}

                {response && (

                    <div className="assistant-result">

                        <div className="assistant-title">

                            <span>
                                🤖
                            </span>

                            <h3>
                                விவசாய உதவியாளர்
                            </h3>

                        </div>


                        <p>
                            {response}
                        </p>


                        <button
                            className="speak-button"
                            onClick={() =>
                                speakAnswer(response)
                            }
                        >
                            🔊 பதிலை கேட்க
                        </button>


                        <button
                            className="stop-button"
                            onClick={stopSpeaking}
                        >
                            🔇 நிறுத்து
                        </button>

                    </div>

                )}


                {/* ERROR */}

                {error && (

                    <div className="voice-error">
                        ❌ {error}
                    </div>

                )}


                {/* EXAMPLES */}

                <div className="voice-examples">

                    <h3>
                        💡 உதாரண கேள்விகள்
                    </h3>

                    <p>
                        🌾 என் நெல் பயிருக்கு என்ன செய்ய வேண்டும்?
                    </p>

                    <p>
                        💧 பயிருக்கு எப்போது தண்ணீர் விட வேண்டும்?
                    </p>

                    <p>
                        🧪 மண்ணின் தரத்தை எப்படி மேம்படுத்துவது?
                    </p>

                    <p>
                        🌦️ விவசாயத்திற்கு வானிலை ஏன் முக்கியம்?
                    </p>

                </div>

            </div>

        </div>

    );
}

export default TamilVoiceAssistant;