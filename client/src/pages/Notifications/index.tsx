import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeaderComponent, FooterComponent } from '../../../src/components/common';
import { useCoordinates, Complaint } from '../../MaoContext';
import MapModal from '../../MapModal'; 
const baseURL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in your environment variables
const Complaintss: React.FC = () => {
  const { coordinates, setCoordinates } = useCoordinates();
  const [loadedComplaints, setLoadedComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAllOnMap, setShowAllOnMap] = useState(false); // New state to handle showing all complaints
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 

  
  useEffect(() => {
    fetchComplaints(selectedCategory);
  }, [selectedCategory]);

  const fetchComplaints = async (category: string) => {
    try {
      const response = await axios.get(`${baseURL}/map/getid`, {
        params: { category }
      });
      setLoadedComplaints(response.data);
      console.log('Fetched Complaints:', response.data); 
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${baseURL}/map/delete/${id}`);
      if (response.status === 200) {
        const updatedComplaints = loadedComplaints.filter(complaint => complaint._id !== id);
        setLoadedComplaints(updatedComplaints);
        console.log('Complaints after deletion:', updatedComplaints);

        const updatedCoordinates = coordinates.filter(coord => coord._id !== id);
        setCoordinates(updatedCoordinates);
      } else {
        console.error('Failed to delete complaint', response);
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  const openMapModal = (complaint: Complaint | null) => {
    setSelectedComplaint(complaint);
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
    setShowAllOnMap(false); 
  };

  const handleViewAll = () => {
    setShowAllOnMap(true);
    openMapModal(null);
  };

  // Group complaints by category
  const groupedComplaints = loadedComplaints.reduce((acc: { [key: string]: Complaint[] }, complaint) => {
    (acc[complaint.category] = acc[complaint.category] || []).push(complaint);
    return acc;
  }, {});
  return (
    <>
      <HeaderComponent />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-8xl mx-auto">
        <main className="flex">
          <section className="w-full pl-6">
            <h1 className='text-3xl font-semibold'>ALL COMPLAINTS</h1>
            <br />
            <br />
            <div>
              <label htmlFor="category" className="text-lg font-semibold">Filter by Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="ml-4 p-2 border border-gray-300 rounded"
              >
                <option value="">All Categories</option>
                <option value="HEALTHCARE">HEALTHCARE</option>
                <option value="TRANSPORTATION">TRANSPORTATION</option>
                <option value="DRINKING WATER">DRINKING WATER</option>
                <option value="ROAD">ROAD</option>
                <option value="EDUCATION">EDUCATION</option>
                <option value="CRIMES">CRIMES</option>
                <option value="DOMESTIC VIOLENCE">DOMESTIC VIOLENCE</option>
              </select>
            </div>
            <div className="mb-4">
              <button
                onClick={handleViewAll}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                View All on Map
              </button>
            </div>

            {/* Render grouped complaints in a grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(groupedComplaints).map(([category, complaints]) => (
                <div key={category} className="mb-8 border border-gray-300 p-4 rounded">
                  <h2 className="text-2xl font-semibold mb-2">{category}</h2>
                  {complaints.map(complaint => (
                    <div key={complaint._id} className="border-b border-gray-200 py-2">
                      <p className="font-bold">Message:</p>
                      <p>{complaint.message}</p>
                      <p className="font-bold">Location:</p>
                      <p>Latitude: {complaint.lat}, Longitude: {complaint.lng}</p>
                      <p className="font-bold">Place Name:</p>
                      <p className="font-bold">User ID:</p>
                      <p>{complaint.userId}</p>
                      <p>{complaint.placeName}</p>
                      <div className="mt-2">
                        <button
                          onClick={() => handleDelete(complaint._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openMapModal(complaint)}
                          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                          View Map
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <FooterComponent />
      {showMapModal && (
        <MapModal
          onClose={closeMapModal}
          initialCenter={
            showAllOnMap && loadedComplaints.length > 0
              ? [loadedComplaints[0].lat, loadedComplaints[0].lng]
              : [selectedComplaint?.lat || 0, selectedComplaint?.lng || 0]
          }
          complaints={showAllOnMap ? loadedComplaints : [selectedComplaint].filter(Boolean) as Complaint[]}
        />
      )}
    </>
  );
};

export default Complaintss;
