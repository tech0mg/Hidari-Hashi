import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const MapComponent = ({ path }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // 経路の最初の地点を地図の中心に設定
  const center = path.length > 0 ? path[0] : { lat: 35.6895, lng: 139.6917 }; // デフォルトは東京

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
