import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Travelers from "./pages/Travelers.jsx";
import Destinations from "./pages/Destinations.jsx";
import Dates from "./pages/Dates.jsx";

import "./App.css";

function App() {
    return (
        <div>
            <h1>Yataya</h1>
            <div className="main">
                <div className="options">
                    <NavLink to="/travelers" >
                        {({ isActive }) => (
                            <button className={isActive ? "selected left" : "left"}>
                                Travelers
                            </button>
                        )}
                    </NavLink>

                    <NavLink to="/destinations" >
                        {({ isActive }) => (
                            <button className={isActive ? "selected middle" : "middle"}>
                                Destinations
                            </button>
                        )}
                    </NavLink>

                    <NavLink to="/dates" >
                        {({ isActive }) => (
                            <button className={isActive ? "selected right" : "right"}>
                                Date Range
                            </button>
                        )}
                    </NavLink>
                    <button className="submit">Submit</button>
                </div>
                <div className="panel">
                    <Routes>
                        <Route path="/travelers" element={<Travelers />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/dates" element={<Dates />} />
                        <Route path="*" element={<Navigate to="/travelers" />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
