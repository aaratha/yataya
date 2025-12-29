import { useEffect, useState } from "react";

function Travelers({ travelers, setTravelers, destinations, setDestinations }) {
    const [name, setName] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [citySearchError, setCitySearchError] = useState("");

    useEffect(() => {
        if (selectedCity || cityQuery.trim().length < 2) {
            setCityOptions([]);
            setCitySearchError("");
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            fetch(
                `http://localhost:8080/api/travel/city-search?keyword=${encodeURIComponent(
                    cityQuery.trim()
                )}`,
                { signal: controller.signal }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to search cities.");
                    }
                    return res.json();
                })
                .then((data) => {
                    setCityOptions(Array.isArray(data) ? data : []);
                    setCitySearchError("");
                })
                .catch((err) => {
                    if (err.name === "AbortError") return;
                    setCityOptions([]);
                    setCitySearchError("Could not load city results.");
                });
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [cityQuery]);

    // Function to add traveler to local list
    const addTraveler = (e) => {
        e.preventDefault();
        if (!name || !selectedCity) return;
        setTravelers([
            ...travelers,
            {
                name,
                cityIATA: selectedCity.iataCode,
                latitude: selectedCity.latitude,
                longitude: selectedCity.longitude,
                cityName: selectedCity.name,
            },
        ]);
        setName("");
        setCityQuery("");
        setSelectedCity(null);
        setCityOptions([]);
    };

    // Function to fetch top destinations from backend
    const fetchTopDestinations = () => {
        fetch("http://localhost:8080/api/travel/top-destinations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                travelers.map(({ name, cityIATA, latitude, longitude }) => ({
                    name,
                    cityIATA,
                    latitude,
                    longitude,
                }))
            ),
        })
            .then((res) => res.json())
            .then((data) => setDestinations(data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="travelers-shell">

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
                    placeholder="Search city"
                    value={cityQuery}
                    onChange={(e) => {
                        setCityQuery(e.target.value);
                        setSelectedCity(null);
                    }}
                />
                {citySearchError && <div className="inline-error">{citySearchError}</div>}
                {cityOptions.length > 0 && (
                    <ul className="city-options">
                        {cityOptions.map((option) => (
                            <li key={`${option.iataCode}-${option.latitude}-${option.longitude}`}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedCity(option);
                                        setCityQuery(`${option.name} (${option.iataCode})`);
                                        setCityOptions([]);
                                    }}
                                >
                                    {option.name} ({option.iataCode})
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="submit">Add Traveler</button>
            </form>
            {selectedCity && (
                <p className="selection-note">
                    Selected: {selectedCity.name} ({selectedCity.iataCode})
                </p>
            )}

            {travelers.length > 0 && (
                <>
                    <h3>Current Travelers</h3>
                    <ul>
                        {travelers.map((t, idx) => (
                            <li key={idx}>
                                {t.name} — {t.cityName || t.cityIATA}
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

export default Travelers;
