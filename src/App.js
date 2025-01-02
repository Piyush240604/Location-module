// Import Functions
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Import CSS
import './App.css';

// Import Pages
import Home from './pages/HomePage.js';
import SearchLocationPage from './pages/Search_location.js';
import AddAddrPage from './pages/Add_Address_Page.js';
import SavedAddresses from './pages/Saved_Addresses.js';
import EnableLocationPage from './pages/Enable_Location_Page.js'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-location-page" element={<SearchLocationPage />} />
        <Route path="/add-address-details" element={<AddAddrPage />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
        <Route path="/enable-location-page" element={<EnableLocationPage />} />
      </Routes>
    </Router>
  );
}


export default App;
