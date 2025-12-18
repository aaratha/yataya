import { NavLink, Route, Routes } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [travelers, setTravelers] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  // Function to add traveler to local list
  const addTraveler = (e) => {
    e.preventDefault();
    if (!name || !city) return;
    setTravelers([...travelers, { name, city }]);
    setName("");
    setCity("");
  };

  // Function to fetch top destinations from backend
  const fetchTopDestinations = () => {
    fetch("http://localhost:8080/api/travel/top-destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(travelers), // send name + city; backend resolves lat/lon
    })
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="app-shell">
      <h1>Yataya</h1>
      <p>Travel App</p>

      <h2>Add Travelers</h2>
      <form onSubmit={addTraveler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="City/IATA"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Add Traveler</button>
      </form>

      {travelers.length > 0 && (
        <>
          <h3>Current Travelers</h3>
          <ul>
            {travelers.map((t, idx) => (
              <li key={idx}>
                {t.name} — {t.city}
              </li>
            ))}
          </ul>
          <button onClick={fetchTopDestinations}>Get Top Destinations</button>
        </>
      )}

      {destinations.length > 0 && (
        <>
          <h2>Top Destinations</h2>
          <ul>
            {destinations.map((dest) => (
              <li key={dest.cityIATA}>
                <strong>{dest.name}</strong> ({dest.cityIATA}) — Latitude:{" "}
                {dest.latitude}, Longitude: {dest.longitude}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
