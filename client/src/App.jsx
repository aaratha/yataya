import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Travelers from "./pages/Travelers.jsx";
import Destinations from "./pages/Destinations.jsx";
import Dates from "./pages/Dates.jsx";

import "./App.css";

function App() {
    const [travelers, setTravelers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [activeTab, setActiveTab] = useState("travelers");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    const handleDarkModeToggle = () => {
        const nextIsDark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", nextIsDark);
        setIsDarkMode(nextIsDark);
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
                    {isDarkMode ? (
                        <svg
                            className="sun-icon"
                            width={20}
                            height={20}
                            viewBox="0 0 640 640"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M210.2 53.9C217.6 50.8 226 51.7 232.7 56.1L320.5 114.3L408.3 56.1C415 51.7 423.4 50.9 430.8 53.9C438.2 56.9 443.4 63.5 445 71.3L465.9 174.5L569.1 195.4C576.9 197 583.5 202.4 586.5 209.7C589.5 217 588.7 225.5 584.3 232.2L526.1 320L584.3 407.8C588.7 414.5 589.5 422.9 586.5 430.3C583.5 437.7 576.9 443.1 569.1 444.6L465.8 465.4L445 568.7C443.4 576.5 438 583.1 430.7 586.1C423.4 589.1 414.9 588.3 408.2 583.9L320.4 525.7L232.6 583.9C225.9 588.3 217.5 589.1 210.1 586.1C202.7 583.1 197.3 576.5 195.8 568.7L175 465.4L71.7 444.5C63.9 442.9 57.3 437.5 54.3 430.2C51.3 422.9 52.1 414.4 56.5 407.7L114.7 320L56.5 232.2C52.1 225.5 51.3 217.1 54.3 209.7C57.3 202.3 63.9 196.9 71.7 195.4L175 174.6L195.9 71.3C197.5 63.5 202.9 56.9 210.2 53.9zM239.6 320C239.6 275.6 275.6 239.6 320 239.6C364.4 239.6 400.4 275.6 400.4 320C400.4 364.4 364.4 400.4 320 400.4C275.6 400.4 239.6 364.4 239.6 320zM448.4 320C448.4 249.1 390.9 191.6 320 191.6C249.1 191.6 191.6 249.1 191.6 320C191.6 390.9 249.1 448.4 320 448.4C390.9 448.4 448.4 390.9 448.4 320z"
                            />
                        </svg>
                    ) : (
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
                    )}
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
