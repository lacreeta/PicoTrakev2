import React from "react";
import MapComponent from "./Map";

const MapScreen: React.FC = () => {


  return (
    <div className="relative" style={{ height: "calc(100vh - 100px)" }}>
      <MapComponent />
      </div>
  );
};

export default MapScreen;
