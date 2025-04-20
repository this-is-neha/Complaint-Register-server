import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Complaint } from '../MaoContext';

interface MapModalProps {
  onClose: () => void;
  initialCenter: [number, number];
  complaints: Complaint[];
}

const categoryColors: Record<string, string> = {
  HEALTHCARE: 'FF66FF', 
  DRINKING_WATER: '0FFFFF',
  ROAD: '000000',
  DOMESTIC_VIOLENCE: '008080', 
  CRIMES: 'FF0000', 
  EDUCATION: '00FF00', 
  TRANSPORTATION: 'FF9900', 
};

const getCategoryIcon = (category: string) => {
  const color = categoryColors[category] || '000000'; 
  return L.icon({
    iconUrl: `https://via.placeholder.com/30/${color}/ffffff?text=%E2%80%A2`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const Legend: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg z-20">
      <h4 className="font-semibold mb-2">Categories</h4>
      <div className="flex flex-col">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center mb-1">
            <span
              className="block w-4 h-4 mr-2"
              style={{ backgroundColor: `#${color}`, borderRadius: '50%' }}
            ></span>
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapModal: React.FC<MapModalProps> = ({ onClose, initialCenter, complaints }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      
      complaints.forEach((complaint) => {
        if (complaint.lat && complaint.lng) {
          const icon = getCategoryIcon(complaint.category);
          L.marker([complaint.lat, complaint.lng], { icon })
            .bindPopup(`<b>${complaint.placeName}</b><br>${complaint.message}<br><strong>Lat:</strong> ${complaint.lat}<br><strong>Lng:</strong> ${complaint.lng}<br><strong>Category:</strong> ${complaint.category}`)
            .addTo(map);
        }
      });

  
      if (complaints.length > 0) {
        const bounds = L.latLngBounds(complaints.map(complaint => [complaint.lat, complaint.lng]));
        map.fitBounds(bounds);
      }

      return () => {
        map.remove();
      };
    }
  }, [complaints, initialCenter]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-full">
        <div
          ref={mapContainerRef}
          className="absolute inset-0"
          style={{ height: '100%', width: '100%' }}
        ></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 z-30"
        >
          Close
        </button>

        <Legend />
      </div>
    </div>
  );
};

export default MapModal;
