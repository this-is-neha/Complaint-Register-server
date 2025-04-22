

import React, { useContext, useEffect, useState } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import axiosInstance from 'axios';
import { useNavigate } from 'react-router-dom';
import { HeaderComponent, FooterComponent } from '../../../components/common';
import { useCoordinates, Complaint } from '../../../../src/MaoContext';
import AuthContext from '../../../context';

const SearchBox: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Complaint | null>(null);
  const [message, setMessage] = useState<string>('');
  const [placeName, setPlaceName] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // User selected category
  const { addCoordinates } = useCoordinates();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
  // Add a new state to store userId
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user info on component mount
    const fetchUserId = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const userInfoResponse = await axiosInstance.get('https://complaint-register-server-3.onrender.com/auth/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        auth.loggedInUser = userInfoResponse.data.result; // Storing user data in AuthContext
        console.log("I M", userInfoResponse);
        console.log("User id:", userInfoResponse.data.result._id);
        setUserId(userInfoResponse.data.result._id); // Set userId state here

      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };

    fetchUserId();
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const map = L.map('map').setView([28.3949, 84.1240], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', async function (e: LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      const placeName = await fetchPlaceName(lat, lng);

      const updatedCoordinates = {
        _id: '',
        lat,
        lng,
        message: '',
        placeName,
        category: selectedCategory,
        userId: userId || '', // Ensure userId is set
      };

      console.log('Coordinates updated:', updatedCoordinates); // Debug log

      setCoordinates(updatedCoordinates);
    });

    // Set default category based on the URL
    if (window.location.href.includes('/transportation')) {
      setSelectedCategory('TRANSPORTATION');
    }
    if (window.location.href.includes('/road')) {
      setSelectedCategory('ROAD');
    }
    if (window.location.href.includes('/healthcare')) {
      setSelectedCategory('HEALTHCARE');
    }
    if (window.location.href.includes('/security')) {
      setSelectedCategory('DOMESTIC VIOLENCE AND CHILD ABUSE');
    }
    if (window.location.href.includes('/education')) {
      setSelectedCategory('EDUCATION');
    }
    if (window.location.href.includes('/drinking-water')) {
      setSelectedCategory('DRINKING WATER');
    }
    if (window.location.href.includes('/crimes')) {
      setSelectedCategory('CRIMES');
    }
    if (window.location.href.includes('/domestic')) {
      setSelectedCategory('DOMESTIC VIOLENCE AND CHILD ABUSE');
    }

    return () => {
      map.remove();
    };
  }, [selectedCategory, userId]); // Include userId in dependencies

  const fetchPlaceName = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat,
          lon: lng,
        },
      });
      const placeName = response.data.display_name;
      setPlaceName(placeName);
      return placeName;
    } catch (error) {
      console.error('Error fetching place name:', error);
      return '';
    }
  };

  const handleSubmit = () => {
    if (coordinates) {
      const newCoordinates: Complaint = {
        ...coordinates,
        message,
        placeName,
        category: selectedCategory, // Ensure category is included
        userId: userId || '', // Add userId here
      };

      console.log('Submitting:', newCoordinates); // Check if category is included

      axios.post('http://localhost:9006/map/coordinates', newCoordinates)
        .then(response => {
          console.log('Data saved:', response.data);
          addCoordinates(newCoordinates); // Update context with new coordinates
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error saving data:', error);
        });

      setCoordinates(null);
      setMessage('');
      setPlaceName('');
      setSelectedCategory(''); // Reset selected category
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <>
      <HeaderComponent />
      <div>
        <div id="map" style={{ height: '1000px', width: '100%', zIndex: 1 }}></div>
        {coordinates && (
          <div style={{ marginTop: '10px', zIndex: 2 }}>
            <strong>Latitude:</strong> {coordinates.lat}, <strong>Longitude:</strong> {coordinates.lng}
            <br />
            <strong>Place Name:</strong> {coordinates.placeName}
            <br />
            <br />
            <div>
              <h1 className="text-2xl font-bold text-blue-500">Category</h1>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="ml-4 p-2 border border-gray-300 rounded"
              >
                <option value="">Select a category</option>
                <option value="HEALTHCARE">HEALTHCARE</option>
                <option value="TRANSPORTATION">TRANSPORTATION</option>
                <option value="DRINKING WATER">DRINKING WATER</option>
                <option value="ROAD">ROAD</option>
                <option value="EDUCATION">EDUCATION</option>
                <option value="CRIMES">CRIMES</option>
                <option value="DOMESTIC VIOLENCE">DOMESTIC VIOLENCE AND CHILD ABUSE</option>
              </select>

              <br />
              <br />
              <h1 className="text-3xl font-bold text-blue-800">Message Box</h1>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
                className="w-full h-60 p-4 bg-white text-black text-xl rounded-lg hover:bg-gray-100 text-left"
              />
              <br />
              <br />

              {/* Input Box for User ID */}
              <h1 className="text-3xl font-bold text-blue-800">User ID</h1>
              <input
                type="text"
                value={userId || ''} // Set the value to userId
                readOnly // Make it read-only
                className="w-full p-2 border border-gray-300 rounded"
              />
              <br />
              <br />

              <button
                onClick={handleSubmit}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-medium mb-4">Complaint Registered Successfully!</p>
            <p className="text-gray-700">Your complaint has been successfully registered.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default SearchBox;
