import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(savedAddresses);
  }, []);

  // Handle address click
  const handleAddressClick = (address) => {
    navigate("/", { state: { addedAddress: address } }); // Pass address details
  };

  return (
    <div className="App">
      <div className="Header SavedAddrPage">Your Saved Addresses</div>

      {addresses.length > 0 ? (
        <ul className="Address-List">
          {addresses.map((address, index) => (
            <li
              key={index}
              className="Address-Item"
              onClick={() => handleAddressClick(address)} // Handle address click
              style={{ cursor: "pointer" }} // Add pointer cursor
            >
              <div className="Address-Header">
                <span className="Address-Type">{address.addressType}</span>
              </div>
              <div className="Address-Details">
                {address.houseNo}, {address.area}, {address.address}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="No-Addresses">No saved addresses found!</p>
      )}

      <button
        className="New-Address-btn"
        onClick={() => navigate("/search-location-page")}
      >
        Add New Address
      </button>
      <button className="Back-Button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default SavedAddresses;
