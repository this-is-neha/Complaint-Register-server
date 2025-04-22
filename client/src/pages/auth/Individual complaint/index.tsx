



// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "axios";
// import { toast } from "react-toastify";

// import AuthContext from "../../../../src/context";
// import { FooterComponent, HeaderComponent } from "../../../components/common";

// interface Complaint {
//   _id: string;
//   placeName: string;
//   message: string;
//   category: string;
//   lat: number;
//   lng: number;
//   userId:string
// }

// const Individual = () => {
//   const { userId } = useParams<{ userId: string }>(); // Extract userId from URL
//   const auth = useContext(AuthContext);
//   const [complaints, setComplaints] = useState<Complaint[]>([]);

//   const isHexadecimal = (str: string) => /^[0-9a-fA-F]{24}$/.test(str);

//   useEffect(() => {
//     console.log("User ID from URL:", userId); // Debug log to check userId from URL

//     if (userId) {
//       if (isHexadecimal(userId)) {
//         fetchUserComplaints(userId);
//       } else {
//         console.error("Invalid User ID format:", userId);
//         toast.error("Invalid User ID format.");
//       }
//     } else {
//       toast.error("User ID is not available.");
//     }
//   }, [userId]);

//   const fetchUserComplaints = async (userId: string) => {
//     try {
//       const token = auth.loggedInUser?.token;
//       const response = await axiosInstance.get(`http://localhost:9006/map/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setComplaints(response.data); // Make sure setComplaints is defined in your state
//     } catch (error:any) {
//       console.error("Error fetching user complaints:", error.response.data);
//     }
//   };
  
  

//   return (
//     <>
//       <HeaderComponent />
//       <div className="complaints-section">
//       <h2 className="font-semibold text-2xl lg:text-4xl">Complaints</h2>
// <br/>
// <br/>
// <br/>
// <br/>
//         {complaints.length === 0 ? (
//           <p>No complaints found for this user.</p>
//         ) : (
//           <ul>
//             {complaints.map((complaint) => (
//               <li key={complaint._id}>
//                 <p className="text-xl"><strong>Place Name:</strong> {complaint.placeName}</p>
//                 <p className="text-xl"><strong>Message:</strong> {complaint.message}</p>
//                 <p className="text-xl"><strong>Category:</strong> {complaint.category}</p>
//                 <p className="text-xl"><strong>Latitude:</strong> {complaint.lat}</p>
//                 <p className="text-xl"><strong>Longitude:</strong> {complaint.lng}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <br/>
{/* <br/>
<br/>
<br/>
<br/>
<br/> */}
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
// <br/>
//       <FooterComponent />
//     </>
//   );
// };

// export default Individual;


import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../../../src/context";
import { FooterComponent, HeaderComponent } from "../../../components/common";
import MapModal from "../../../MapModal"; // Import the MapModal component

interface Complaint {
  _id: string;
  placeName: string;
  message: string;
  category: string;
  lat: number;
  lng: number;
  userId: string;
}

const Individual = () => {
  const { userId } = useParams<{ userId: string }>();
  const auth = useContext(AuthContext);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const isHexadecimal = (str: string) => /^[0-9a-fA-F]{24}$/.test(str);

  useEffect(() => {
    console.log("User ID from URL:", userId);

    if (userId) {
      if (isHexadecimal(userId)) {
        fetchUserComplaints(userId);
      } else {
        console.error("Invalid User ID format:", userId);
        toast.error("Invalid User ID format.");
      }
    } else {
      toast.error("User ID is not available.");
    }
  }, [userId]);

  const fetchUserComplaints = async (userId: string) => {
    try {
      const token = auth.loggedInUser?.token;
      const response = await axiosInstance.get(`https://complaint-register-server-3.onrender.com/map/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data);
    } catch (error: any) {
      console.error("Error fetching user complaints:", error.response.data);
    }
  };

  const openMapModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  return (
    <>
      <HeaderComponent />
      <div className="complaints-section">
        <h2 className="font-semibold text-2xl lg:text-4xl">Complaints</h2>
        <br />
        <br/>
<br/>

        {complaints.length === 0 ? (
          <p>No complaints found for this user.</p>
        ) : (
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id}>
                <p className="text-xl"><strong>Place Name:</strong> {complaint.placeName}</p>
                <p className="text-xl"><strong>Message:</strong> {complaint.message}</p>
                <p className="text-xl"><strong>Category:</strong> {complaint.category}</p>
                <p className="text-xl"><strong>Latitude:</strong> {complaint.lat}</p>
                <p className="text-xl"><strong>Longitude:</strong> {complaint.lng}</p>
                <button
                  onClick={() => openMapModal(complaint)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                >
                  View Map
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showMapModal && selectedComplaint && (
        <MapModal
          onClose={closeMapModal}
          initialCenter={[selectedComplaint.lat, selectedComplaint.lng]}
          complaints={[selectedComplaint]} // Show only the selected complaint on the map
        />
      )}
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
      <FooterComponent />
    </>
  );
};

export default Individual;
