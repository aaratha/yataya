import { useEffect, useState } from "react";

function Destinations({ destinations, setDestinations }) {
  const [destinationName, setDestinationName] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citySearchError, setCitySearchError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (selectedCity || cityQuery.trim().length < 2) {
      setCityOptions([]);
      setCitySearchError("");
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetch(
        `/api/travel/city-search?keyword=${encodeURIComponent(
          cityQuery.trim(),
        )}`,
        { signal: controller.signal },
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

  // Function to add destination to local list
  const addDestination = (e) => {
    e.preventDefault();
    if (!selectedCity) return;
    const trimmedName = destinationName.trim();
    setDestinations([
      ...destinations,
      {
        name: trimmedName || selectedCity.name,
        cityIATA: selectedCity.iataCode,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        cityName: selectedCity.name,
      },
    ]);
    setDestinationName("");
    setCityQuery("");
    setSelectedCity(null);
    setCityOptions([]);
    setSubmitStatus(null);
  };

  // Function to get destinations from backend
  const submitDestinations = () => {
    if (destinations.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "Add at least one destination first.",
      });
      return;
    }

    setSubmitStatus({ type: "pending", message: "Saving destinations..." });
    fetch("/api/travel/set-destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        destinations.map(({ name, cityIATA, latitude, longitude }) => ({
          name,
          cityIATA,
          latitude,
          longitude,
        })),
      ),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save destinations.");
        }
        setSubmitStatus({
          type: "success",
          message: "Destinations saved successfully.",
        });
      })
      .catch(() => {
        setSubmitStatus({
          type: "error",
          message: "Could not save destinations.",
        });
      });
  };

  return (
    <div className="destinations-shell">
      <h2>Add Destinations</h2>
      <form onSubmit={addDestination}>
        <input
          type="text"
          placeholder="Label (optional)"
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
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
        {citySearchError && (
          <div className="inline-error">{citySearchError}</div>
        )}
        {cityOptions.length > 0 && (
          <ul className="city-options">
            {cityOptions.map((option) => (
              <li
                key={`${option.iataCode}-${option.latitude}-${option.longitude}`}
              >
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
        <button type="submit">Add Destination</button>
      </form>
      {selectedCity && (
        <p className="selection-note">
          Selected: {selectedCity.name} ({selectedCity.iataCode})
        </p>
      )}

      {destinations.length > 0 && (
        <>
          <h3>Current Destinations</h3>
          <ul>
            {destinations.map((dest, idx) => (
              <li key={idx}>
                {dest.name} — {dest.cityName || dest.cityIATA}
              </li>
            ))}
          </ul>
          <button type="button" onClick={submitDestinations}>
            Save Destinations
          </button>
          {submitStatus?.type === "error" && (
            <div className="inline-error">{submitStatus.message}</div>
          )}
          {submitStatus?.type === "success" && (
            <p className="selection-note">{submitStatus.message}</p>
          )}
          {submitStatus?.type === "pending" && (
            <p className="selection-note">{submitStatus.message}</p>
          )}
        </>
      )}
    </div>
  );
}

export default Destinations;
