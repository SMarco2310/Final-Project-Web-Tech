// CampusMap.jsx
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const CampusMap = () => {
  const [directions, setDirections] = useState(null);

  // Center the map on your campus coordinates
  const campusCenter = { lat: 6.6883, lng: -1.6255 }; // Example: adjust to your campus

  const mapContainerStyle = {
    width: "150%",
    height: "1000px",
  };

  // Example markers (buildings)
  const buildings = [
    { id: 1, name: "Library", position: { lat: 6.689, lng: -1.626 } },
    { id: 2, name: "Hostel", position: { lat: 6.6875, lng: -1.624 } },
  ];

  // Optional: get directions between two points
  const getDirections = () => {
    if (!window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: buildings[0].position,
        destination: buildings[1].position,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDYHVWWbt2fEEXr10aSJ6x5zhRrRwq91Kg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={campusCenter}
        zoom={17} // zoom in to campus
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {buildings.map((b) => (
          <Marker key={b.id} position={b.position} title={b.name} />
        ))}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <button onClick={getDirections} style={{ marginTop: "10px" }}>
        Show Directions
      </button>
    </LoadScript>
  );
};

export default CampusMap;
