import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Travelers from "./pages/Travelers.jsx";
import Destinations from "./pages/Destinations.jsx";
import Dates from "./pages/Dates.jsx";

import "./App.css";

function App() {
    const [travelers, setTravelers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [activeTab, setActiveTab] = useState("travelers");
    const handleDarkModeToggle = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <div className="app-shell">
            <div className="heading">
                <div className="heading-main">
                    <h1>Yataya</h1>
                    <div className="heading-buttons">
                        <a href="/" className="selected">Home</a>
                        <a>About</a>
                        <a className="heading-end">Contact</a>
                    </div>
                </div>
                <button className="dark-mode-toggle" onClick={handleDarkModeToggle}>
                    <svg
                        className="moon-icon"
                        width={20}
                        height={20}
                        viewBox="0 0 640 640"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"
                        />
                    </svg>
                </button>
            </div>
            <div className="options">
                <div className="options-main">
                    <button
                        className={activeTab === "destinations" ? "selected left" : "left"}
                        onClick={() => setActiveTab("destinations")}
                    >
                        Destinations
                    </button>

                    <button
                        className={activeTab === "travelers" ? "selected middle" : "middle"}
                        onClick={() => setActiveTab("travelers")}
                    >
                        Travelers
                    </button>

                    <button
                        className={activeTab === "dates" ? "selected right" : "right"}
                        onClick={() => setActiveTab("dates")}
                    >
                        Dates
                    </button>
                </div>
                <button className="submit">
                    <svg
                        className="arrow-icon"
                        width={30}
                        height={30}
                        viewBox="0 0 640 640"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"
                        />
                    </svg>
                </button>
            </div>
            <div className="panel">
                {/* <Routes>
                            <Route path="/destinations" element={<Destinations />} />
                            <Route path="/travelers" element={<Travelers
                            travelers={travelers}
                            setTravelers={setTravelers}
                            destinations={destinations}
                            setDestinations={setDestinations} />} />
                            <Route path="/dates" element={<Dates />} />
                            <Route path="*" element={<Navigate to="/travelers" />} />
                            </Routes> */}
                {activeTab === "destinations" && <Destinations />}
                {activeTab === "travelers" && <Travelers
                    travelers={travelers}
                    setTravelers={setTravelers}
                    destinations={destinations}
                    setDestinations={setDestinations}
                />}
                {activeTab === "dates" && <Dates />}
            </div>
        </div>
    );
}

export default App;
