import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixed } from 'lucide-react';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationPicker = ({ onLocationSelect }) => {
    const initialPos = [35.0, 10.0];
    const [position, setPosition] = useState(initialPos);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                onLocationSelect(lat, lng);
            },
        });
        return null;
    };

    const RecenterButton = () => {
        const map = useMap();
        const handleLocate = () => {
            map.locate().on("locationfound", (e) => {
                setPosition([e.latlng.lat, e.latlng.lng]);
                map.flyTo(e.latlng, map.getZoom());
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            });
        };

        return (
            <button
                type="button"
                onClick={handleLocate}
                className="absolute bottom-5 right-5 z-[1000] bg-white p-2 rounded-full shadow-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                title="Ma position actuelle"
            >
                <LocateFixed className="w-5 h-5 text-[#1B4F72]" />
            </button>
        );
    };

    return (
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-inner border border-gray-200">
            <MapContainer 
                center={initialPos} 
                zoom={13} 
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <Marker position={position} />
                
                <MapEvents />
                <RecenterButton />
            </MapContainer>
        </div>
    );
};

export default LocationPicker;