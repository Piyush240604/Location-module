// Import Functions
import { useNavigate, useLocation } from 'react-router';
import { FaArrowLeft, FaHome, FaBriefcase, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

function AddAddrPage() {
  // Navigation Variables
  const location = useLocation();
  const navigate = useNavigate();

  const address = location.state?.selectedAddress || "No Address Provided!";

  // State for additional address details
  const [houseNo, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addressType, setAddressType] = useState(""); // For selecting address type

  // Handle input changes
  const handleHouseNoChange = (e) => setHouseNo(e.target.value);
  const handleAreaChange = (e) => setArea(e.target.value);

  // Handle address type change and ensure only one is selected
  const handleAddressTypeChange = (type) => {
    setAddressType(type); // Update the selected type
  };

  // Handle submit
  const handleSubmit = () => {
    if (houseNo && area && addressType) {
      const fullAddress = {
        address,
        houseNo,
        area,
        addressType,
      };

      // Save to localStorage
      try {
        const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
        savedAddresses.push(fullAddress);
        localStorage.setItem("addresses", JSON.stringify(savedAddresses));
        console.log("Address saved successfully!");
      } catch (error) {
        console.error("Error saving address:", error);
      }


      // Displaying or processing the full address
      console.log("Full Address Submitted: ", fullAddress);

      // Navigate to Home page or another page with the address
      navigate('/', { state: { addedAddress: fullAddress } });
    } else {
      alert("Please fill in all the details and select an address type.");
    }
  };

  // CSS class generator for selected icon
  const getIconClass = (type) => (addressType === type ? "Icon-Wrapper selected" : "Icon-Wrapper");

  return (
    <div className="App AddAddrPage">
      {/* Header with Back Button */}
      <div className="Header AddAddrPage">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
        Add Address Details
      </div>

      {/* Display Selected Address */}
      <div className="Address-Section">
        <p className="Location-Label">Location:</p>
        <address className="Location-Address">{address}</address>
      </div>

      {/* Form for Additional Address Details */}
      <div className="Address-Details-Form">
        <label className="Form-Label">
          House No/Building/Block No:
          <input
            type="text"
            className="Input-Field"
            placeholder="Enter details"
            value={houseNo}
            onChange={handleHouseNoChange}
          />
        </label>

        <label className="Form-Label">
          Apartment/Road/Area:
          <input
            type="text"
            className="Input-Field"
            placeholder="Enter details"
            value={area}
            onChange={handleAreaChange}
          />
        </label>
      </div>

      {/* Address Type Icons */}
      <div className="Address-Type-Icons">
        <div
          className={getIconClass("Home")}
          onClick={() => handleAddressTypeChange("Home")}
        >
          <FaHome size={30} title="Home" />
          <p>Home</p>
        </div>

        <div
          className={getIconClass("Office")}
          onClick={() => handleAddressTypeChange("Office")}
        >
          <FaBriefcase size={30} title="Office" />
          <p>Office</p>
        </div>

        <div
          className={getIconClass("Friends")}
          onClick={() => handleAddressTypeChange("Friends")}
        >
          <FaUserFriends size={30} title="Friends" />
          <p>Friends</p>
        </div>

        <div
          className={getIconClass("Other")}
          onClick={() => handleAddressTypeChange("Other")}
        >
          <FaMapMarkerAlt size={30} title="Other" />
          <p>Other</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="Submit-Button" onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
}

export default AddAddrPage;
