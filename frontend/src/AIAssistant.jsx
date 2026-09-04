import { useState } from "react";
import axios from "axios";
import "./AIAssistant.css";

function AIAssistant() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "🌾 Hello! I'm your Smart Farming Assistant. Ask me anything about farming."
        }
    ]);

    const [loading, setLoading] = useState(false);


    const sendMessage = async (e) => {

        e.preventDefault();

        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message;

        setMessages((previous) => [
            ...previous,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {

            const response = await axios.post(
                "https://smart-farming-assistant-production.up.railway.app/api/ai/chat",
                {
                    message: userMessage
                }
            );

            setMessages((previous) => [
                ...previous,
                {
                    sender: "ai",
                    text: response.data.answer
                }
            ]);

        } catch (error) {

            setMessages((previous) => [
                ...previous,
                {
                    sender: "ai",
                    text: "❌ Sorry, I couldn't process your question."
                }
            ]);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="ai-page">

            <div className="ai-card">

                {/* HEADER */}

                <div className="ai-header">

                    <div className="ai-icon">
                        🤖
                    </div>

                    <div>

                        <h1>
                            AI Farming Assistant
                        </h1>

                        <p>
                            Your intelligent farming companion 🌾
                        </p>

                    </div>

                </div>


                {/* CHAT */}

                <div className="chat-area">

                    {messages.map((item, index) => (

                        <div
                            key={index}
                            className={
                                item.sender === "user"
                                    ? "chat-message user-message"
                                    : "chat-message ai-message"
                            }
                        >

                            <div className="message-avatar">

                                {item.sender === "user"
                                    ? "👨‍🌾"
                                    : "🤖"
                                }

                            </div>

                            <div className="message-text">
                                {item.text}
                            </div>

                        </div>

                    ))}


                    {loading && (

                        <div className="chat-message ai-message">

                            <div className="message-avatar">
                                🤖
                            </div>

                            <div className="message-text">
                                Thinking... 🤔
                            </div>

                        </div>

                    )}

                </div>


                {/* INPUT */}

                <form
                    className="chat-input-area"
                    onSubmit={sendMessage}
                >

                    <input
                        type="text"
                        placeholder="Ask your farming question..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "..." : "➤"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AIAssistant;