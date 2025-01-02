import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../App.css";

function EnableLocationPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { latitude, longitude } = location.state || {};
    const [selectedLocation, setSelectedLocation] = useState({
        lat: latitude || 13.0843,
        lng: longitude || 80.2705,
    });
    const [selectedAddress, setSelectedAddress] = useState("Fetching address...");

    // Load the Google Maps API
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
        libraries: ["places"],
    });

    const handlePinChange = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setSelectedLocation({
            lat,
            lng,
        });

        // Fetch the updated address
        getLocation(lat, lng);
    };

    const getLocation = (lat, lng) => {
        if (!isLoaded || !window.google) return; // Ensure Google Maps API is loaded

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                setSelectedAddress(results[0].formatted_address || "Address not available");
            } else {
                setSelectedAddress("Address not available");
            }
        });
    };

    // Fetch the initial address
    useEffect(() => {
        if (isLoaded && selectedLocation) {
            getLocation(selectedLocation.lat, selectedLocation.lng);
        }
    }, [isLoaded, selectedLocation]);

    return (
        <div className="App">
            <div className="Header enable-location-page">Location</div>

            {isLoaded && (
                <GoogleMap
                    center={selectedLocation}
                    zoom={17.5}
                    mapContainerStyle={{
                        width: "95%",
                        height: "380px",
                        marginTop: "20px",
                        borderRadius: "10px",
                        justifySelf: "center",
                        alignSelf: "center",
                    }}
                    options={{
                        disableDefaultUI: true,
                    }}
                >
                    <Marker
                        position={selectedLocation}
                        draggable={true}
                        onDragEnd={handlePinChange}
                    />
                </GoogleMap>
            )}

            {selectedLocation && (
                <div className="Confirm-addr">
                    <div className="View-location-text-wrapper">
                        <p className="View-location-text">Location: </p>
                        {selectedAddress}
                    </div>

                    <div
                        className="Confirm-location-btn"
                        onClick={() =>
                            navigate("/add-address-details", {
                                state: { selectedAddress },
                            })
                        }
                    >
                        Confirm Location
                    </div>
                </div>
            )}
        </div>
    );
}

export default EnableLocationPage;
