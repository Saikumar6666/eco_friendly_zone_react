import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EcoProductMap = ({ sellers }) => {
  const defaultPosition = [51.505, -0.09]; // Example: London

  return (
    <div className="eco-product-map">
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {sellers.map((seller) => (
          <Marker
            key={seller.id}
            position={[seller.lat, seller.lng]}
          >
            <Popup>
              <strong>{seller.name}</strong><br />
              Eco Products: {seller.productCount}<br />
              Contact: {seller.contact}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EcoProductMap;
