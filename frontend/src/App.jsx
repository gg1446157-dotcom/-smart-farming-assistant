import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./Auth.css";

function App() {

    const [user, setUser] = useState(null);

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    // ==========================================
    // REGISTER
    // ==========================================

    const register = async () => {

        try {

            const response = await axios.post(
                "https://smart-farming-assistant-production.up.railway.app/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            setMessage(response.data.message);

            setIsLogin(true);

            setName("");
            setPassword("");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    // ==========================================
    // LOGIN
    // ==========================================

    const login = async () => {

        try {

            const response = await axios.post(
                "https://smart-farming-assistant-production.up.railway.app/api/auth/login",
                {
                    email,
                    password
                }
            );

            setUser(response.data.user);

            setMessage("");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };


    // ==========================================
    // DASHBOARD
    // ==========================================

    if (user) {

        return (
            <Dashboard
                user={user}
                onLogout={() => setUser(null)}
            />
        );

    }


    // ==========================================
    // LOGIN / REGISTER PAGE
    // ==========================================

    return (

        <div className="auth-page">

            {/* LEFT SIDE */}

            <div className="auth-left">

                <div className="farm-illustration">
                    🌱
                </div>

                <h1>
                    Smart Farming
                    <br />
                    Assistant
                </h1>

                <p>
                    Smart technology for
                    <br />
                    smarter and sustainable farming.
                </p>


                <div className="features">

                    <div>
                        🌾
                        <span>Smart Crop Decisions</span>
                    </div>

                    <div>
                        🤖
                        <span>AI-Powered Farming</span>
                    </div>

                    <div>
                        🌦️
                        <span>Real-Time Farm Information</span>
                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-right">

                <div className="auth-card">

                    <div className="auth-logo">
                        🌾
                    </div>

                    <h2>
                        {isLogin
                            ? "Welcome Back!"
                            : "Create Farmer Account"
                        }
                    </h2>

                    <p className="auth-subtitle">

                        {isLogin
                            ? "Login to manage your smart farm"
                            : "Join the Smart Farming Assistant"
                        }

                    </p>


                    {/* NAME */}

                    {!isLogin && (

                        <div className="input-group">

                            <label>
                                Farmer Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                        </div>

                    )}


                    {/* EMAIL */}

                    <div className="input-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    {/* MAIN BUTTON */}

                    {isLogin ? (

                        <button
                            className="auth-button"
                            onClick={login}
                        >
                            Login 🌾
                        </button>

                    ) : (

                        <button
                            className="auth-button"
                            onClick={register}
                        >
                            Create Account 🌱
                        </button>

                    )}


                    {/* SWITCH */}

                    <div className="switch-auth">

                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"
                        }

                        <button
                            onClick={() => {

                                setIsLogin(!isLogin);
                                setMessage("");

                            }}
                        >

                            {isLogin
                                ? "Register"
                                : "Login"
                            }

                        </button>

                    </div>


                    {/* MESSAGE */}

                    {message && (

                        <div className="auth-message">
                            {message}
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default App;