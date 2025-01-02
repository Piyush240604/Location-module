// Import Functions
import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router';

// Import CSS
import '../App.css';

// Import Assets
import profile_pic_icon from '../assets/profile_icon.png';
import location_perm_icon from '../assets/location_perm_icon.png';

function Home() {
    const [modelOpen, setModelOpen] = useState(true);

    const toggleModal = () => {
        setModelOpen(!modelOpen);
    }

    const navigate = useNavigate();
    const location = useLocation();
    const addedAddress = location.state?.addedAddress || null;

    useEffect(() => {
        if (addedAddress && modelOpen) {
            toggleModal();
        }
    }, [addedAddress, modelOpen]); // Dependency array ensures it runs when these change

    const handleEnableLocation = () => {
        localStorage.clear(); // Clears all localStorage data
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

    return (
        <div className="App">
            <div className="Header home">
                <img src={profile_pic_icon} alt="Profile_Pic" height={40} width={40} />

                {addedAddress ? (
                    <div className="Address-Display" onClick={() => navigate('/saved-addresses')}>
                        <span className="Address-Type">{addedAddress.addressType}</span> - 
                        <span className="Address-Text">{" "}{addedAddress.houseNo},{addedAddress.area},{" "}{addedAddress.address}</span>
                    </div>
                ) : (
                    <p>No Address Found!</p>
                )}
            </div>

            {modelOpen && (
                <div className="Location-permission-wrapper">
                    <img src={location_perm_icon} alt="Location Icon" className="Location-perm-icon" />

                    <p className="Location-permission-text text1">Your device location is off</p>
                    <p className="Location-permission-text text2">Please enable location permission for better delivery experience</p>

                    <div className="Enable-location-btn" onClick={handleEnableLocation}>
                        Enable Location
                    </div>

                    <div className="Search-location-btn" onClick={() => navigate('/search-location-page')}>
                        <FaSearch color='#E30B5D'/>
                        <div className="Search-location-text">Search Your Location Manually</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
