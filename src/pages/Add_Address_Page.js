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
  const handleAddressTypeChange = (type) => setAddressType(type);

  // Handle submit
  const handleSubmit = () => {
    // Check if all fields are filled
    if (houseNo && area && addressType) {
      const fullAddress = {
        address,
        houseNo,
        area,
        addressType,
      };

      // Displaying or processing the full address
      console.log("Full Address Submitted: ", fullAddress);

      // Navigate to Home page or another page with the address
      navigate('/', { state: { addedAddress: fullAddress } });
    } else {
      // Error message if fields are not complete
      alert("Please fill in all the details.");
    }
  };

  return (
    <div className="App AddAddrPage">
      {/* Header with Back Button */}
      <div className="Header AddAddrPage">
        <FaArrowLeft
          className="Back-Button"
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
          className="Icon-Wrapper"
          onClick={() => handleAddressTypeChange("Home")}
        >
          <FaHome size={30} title="Home" />
          <p>Home</p>
        </div>
        <div
          className="Icon-Wrapper"
          onClick={() => handleAddressTypeChange("Office")}
        >
          <FaBriefcase size={30} title="Office" />
          <p>Office</p>
        </div>
        <div
          className="Icon-Wrapper"
          onClick={() => handleAddressTypeChange("Friends")}
        >
          <FaUserFriends size={30} title="Friends" />
          <p>Friends</p>
        </div>
        <div
          className="Icon-Wrapper"
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
