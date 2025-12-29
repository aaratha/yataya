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

    return (
        <div className="app-shell">
            <div className="heading">
                <h1>Yataya</h1>
                <div className="heading-buttons">
                    <a href="/">Home</a>
                    <a className>About</a>
                    <a className="heading-end">Contact</a>
                </div>
            </div>
            <div className="options">
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
                <button className="submit">
                    <img className="arrow" src='/arrow.svg' width={30} height={30} />
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
