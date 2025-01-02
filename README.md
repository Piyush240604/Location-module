# Location Module

## Description

The `location-module` is a React project for managing and interacting with user addresses and geolocations. It provides functionality to add, edit, save, and manage user locations while seamlessly integrating with Google Maps for enhanced user experience.

---

## Features

- **Add Address Page**: Enables users to manually add a new address with relevant details like house number, area, and address type.
- **Enable Location Page**: Uses the device's geolocation services to fetch the current location, allowing users to confirm and save their coordinates.
- **Home Page**: Displays the selected or default address and allows navigation to other pages.
- **Saved Address Page**: Lists all saved addresses and allows users to select an address or navigate to add a new one.
- **Search Location Page**: Provides a manual location search functionality.

---

## Setup Instructions

### Prerequisites

- Node.js installed on your system.
- Google Maps API key with necessary permissions.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Piyush240604/location-module.git
   ```

2. Navigate to the project directory:
   ```bash
   cd location-module
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variable for Google Maps API:
   - Create a `.env` file in the root directory.
   - Add your Google Maps API key:
     ```
     REACT_APP_GOOGLEMAPS_API_KEY=your_google_maps_api_key_here
     ```

5. Start the application:
   ```bash
   npm start
   ```

---

## Usage

- Open the application in a browser at `http://localhost:3000`.
- Navigate between pages to add, view, and manage addresses.
- Use the "Enable Location" feature to fetch and confirm your geolocation.
- Save and retrieve addresses for quick navigation.

---

## Technologies Used

- **React** for UI development.
- **React Router** for page navigation.
- **Google Maps API** for map integration.
- **Local Storage** for persisting user data.

---

## Contribution

Feel free to fork the repository and submit pull requests for improvements or fixes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
