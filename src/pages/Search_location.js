// Import functions
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaLocationCrosshairs } from "react-icons/fa6";

// Import CSS
import '../App.css';

function SearchLocationPage() {
    // To navigate to next page
    const navigate = useNavigate();

    const inputref = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState("")
    const [selectedAddress, setSelectedAddress] = useState("")

    // Load the google-maps api
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
        libraries:['places']
    });

    const handleOnPlacesChanged = () => {
        // Store the address object from inputref
        let address = inputref.current.getPlaces();
        console.log("address: ", address);

        // Get place from the address clicked
        const place = address[0];

        console.log("Place: ", place);

        // Get the place coordinates
        const location = place.geometry.location;

        // Set coordinates for lats and longs
        setSelectedLocation({
            lat: location.lat(),
            lng: location.lng(),
        });

        // Set address
        setSelectedAddress(place.formatted_address || "Address Not Available!");
        
    };

    const handlePinChange = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
    
        setSelectedLocation({
            lat,
            lng,
        });
    
        // Reverse geocoding to get the address from lat, lng (use Google Geocoding API)
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
            setSelectedAddress(results[0].formatted_address || "Address not available");
            } else {
            setSelectedAddress("Address not available");
            }
        });
    };

    const handleEnableLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    navigate('/enable-location-page', {
                        state: { latitude, longitude }
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                    alert("Failed to get location. Please enable location permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Set center
    const center = selectedLocation || { lat: 13.0843, lng: 80.2705 }

    return(
        <div className='App'>
            <div className='Header searchpage'> Your Location </div>

            {isLoaded && (
            <div>
                <StandaloneSearchBox
                    onLoad={(ref) => inputref.current = ref}
                    onPlacesChanged={handleOnPlacesChanged}   
                >
                    <input name="Search-addr-input" className="Search-addr-input" placeholder='Search a New Address' />
                </StandaloneSearchBox>

                <GoogleMap 
                    center={center} 
                    zoom={17.5} 
                    mapContainerStyle={{
                        width: "95%",
                        height: "200px",
                        display: "flex",
                        justifySelf: "center",
                        marginTop: "20px",
                        borderRadius: "10px"
                    }}
                    options={{
                        disableDefaultUI: true,
                    }}
                >
                    {selectedLocation && (
                        <Marker 
                            position={selectedLocation}
                            draggable={true}
                            onDragEnd={handlePinChange}
                        />
                    )}
                </GoogleMap>
            </div>
            )}

            <div className="Enable-Location-Wrapper">
                <div className="Enable-current-location">
                    <FaLocationCrosshairs 
                        style={{ height: "30px", width: "30px", marginLeft: "10px", color: "#E30B5D", marginRight: "10px" }}
                    />
                    Current Location
                </div>

                <div className="Enable-current-location-btn" onClick={() => handleEnableLocation()}>Enable</div>

            </div>

            <div className="Enable-Current-Location-txt" >Enable your Current location for better services</div>
            
            {selectedLocation && (
            <div className='Confirm-addr'>
                <div className='View-location-text-wrapper'>
                    <p className='View-location-text'>Location: </p>
                    {selectedAddress}
                </div>

                <div className='Confirm-location-btn' onClick={()=>{navigate('/add-address-details', {state: {selectedAddress}})}}>Confirm Location</div>
            </div>
            )}

        </div>
    )
}

export default SearchLocationPage;