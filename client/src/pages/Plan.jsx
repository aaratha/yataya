import { useState } from "react";
import Travelers from "../components/PlanTravelers.jsx";
import Destinations from "../components/PlanDestinations.jsx";
import Dates from "../components/PlanDates.jsx";
import HeadingBar from "../components/HeadingBar.jsx";

function Plan() {
    const [travelers, setTravelers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [topDestinations, setTopDestinations] = useState([]);
    const [activeTab, setActiveTab] = useState("travelers");

    return (
        <div className="app-shell">
            <HeadingBar />
            <div className="options bar">
                <div className="options-main bar-main segmented">
                    <button
                        className={activeTab === "destinations" ? "selected" : undefined}
                        onClick={() => setActiveTab("destinations")}
                    >
                        Destinations
                    </button>

                    <button
                        className={activeTab === "travelers" ? "selected" : undefined}
                        onClick={() => setActiveTab("travelers")}
                    >
                        Travelers
                    </button>

                    <button
                        className={activeTab === "dates" ? "selected" : undefined}
                        onClick={() => setActiveTab("dates")}
                    >
                        Dates
                    </button>
                </div>
                <button className="icon-button submit">
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
            <div className="card surface">
                {activeTab === "destinations" &&
                    <Destinations
                        destinations={destinations}
                        setDestinations={setDestinations}
                    />}
                {activeTab === "travelers" && (
                    <Travelers
                        travelers={travelers}
                        setTravelers={setTravelers}
                        topDestinations={topDestinations}
                        setTopDestinations={setTopDestinations}
                    />
                )}
                {activeTab === "dates" && <Dates />}
            </div>
        </div>
    );
}

export default Plan;
