// Import Functions
import { useState } from 'react';
import { FaSearch } from "react-icons/fa"
import { useNavigate } from 'react-router';

// Import CSS
import '../App.css';

// Import Assets
import profile_pic_icon from '../assets/profile_icon.png';
import location_perm_icon from '../assets/location_perm_icon.png'

function Home() {
    const [modelOpen, setModelOpen] = useState(true);

    const toggleModal = () => {
      setModelOpen(!modelOpen);
    }

    const navigate = useNavigate();

    return(
        <div className="App">
            <div className="Header home">
            <img src={profile_pic_icon} alt="Profile_Pic" height={40} width={40} />

            <p className="Address-text">Home - In Chennai Somewhere</p>
            </div>

            {modelOpen && (
            <div className="Location-permission-wrapper">
                <img src={location_perm_icon} alt="Location Icon" className="Location-perm-icon" />

                <p className="Location-permission-text text1">Your device location is off</p>
                <p className="Location-permission-text text2">Please enable location permission for better delivery experience</p>

                <div className="Enable-location-btn">Enable Location</div>

                <div className="Search-location-btn" onClick={() => {navigate('/search-location-page')}}>
                <FaSearch color='#E30B5D'/>
                <div className="Search-location-text">Search Your Location Manually</div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Home;