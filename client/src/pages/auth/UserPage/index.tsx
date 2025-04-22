import { NavLink, useParams } from "react-router-dom";
// import { useUserContext } from '../../../userContext';
import { useEffect, useState } from "react";
import { HeaderComponent, FooterComponent } from '../../../components/common';
import axiosInstance from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const ExampleComponent = () => {
  // const { registeredUserData } = useUserContext();
  // const [, setUserData] = useState(registeredUserData);
  const [details, setDetails] = useState<any | null>(null);
  const { userId } = useParams();
  const baseURLL = `${baseURL}/complaint/server/public/uploads/users/`;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`${baseURL}/auth/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        
        setDetails(response.data.result);
      } catch (error:any) {
        // Log full error response to inspect server error details
        console.error("Error fetching user details:", error.response?.data || error);
      }
    };
  
    fetchUserDetails();
  }, [userId]);
  

  return (
    <>
      <HeaderComponent />
     
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-8xl mx-auto">
        <p className="text-7xl font-bold text-orange-900 text-center mt-4">WELCOME {details?.name}!!!</p>
        
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4"></div>
          <div className="mx-30 flex space-x-4 -mt-4"> {/* Adjusted margin to lift buttons */}
            <NavLink to="/categories">
              <button className="bg-blue-500 text-white py-3 px-6 rounded">COMPLAIN</button>
            </NavLink>
            <NavLink to="/contact">
              <button className="bg-blue-500 text-white py-3 px-6 rounded">CONTACT</button>
            </NavLink>
            <NavLink to={`/name/${userId}`}>
              <button className="bg-blue-500 text-white py-3 px-6 rounded">YOUR COMPLAINT</button>
            </NavLink>

          </div>
        </header>
        
        <main className="flex">
          <aside className="w-1/3 pr-4">
            <div className="flex items-center justify-between mt-12 mb-6">
              <div>
                <h1 className="text-3xl font-semibold">{details?.name}</h1>
                <p className="text-blue-500">Nepal</p>
                <div className="flex items-center mt-1">
                  <svg className="h-4 w-4 fill-current text-gray-400 mr-1" viewBox="0 0 24 24">
                    <path d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z"></path>
                  </svg>
                  <span className="text-gray-600">{details?.address}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-6 w-[800px] rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-xl mb-2"><strong>Phone:</strong> {details?.phone}</p>
              <p className="text-xl mb-2"><strong>Address:</strong> {details?.address}</p>
              <p className="text-xl mb-2"><strong>Email:</strong> {details?.email}</p>
              <p className="text-xl mb-2"><strong>Birth Date:</strong> {details?.birthdate}</p>
              <p className="text-xl mb-4"><strong>Gender:</strong> {details?.gender}</p>
              <p className="text-xl mb-2"><strong>Country:</strong> Nepal</p>
              <p className="text-xl mb-2"><strong>House No:</strong> {details?.houseNo}</p>
              <p className="text-xl mb-2"><strong>Tole Name:</strong> {details?.toleName}</p>
              <p className="text-xl mb-2"><strong>Phone No:</strong> {details?.phone}</p>
              <p className="text-xl mb-2"><strong>Occupation:</strong> {details?.occupation}</p>
            </div>
          </aside>

          <section className="w-2/3 pl-[780px]">
            {/* Moved the image section here to ensure it appears below the buttons */}
            {details?.image && (
              <div className="mt-4 flex items-center justify-center">
              <img
  src={`${baseURLL}/${details.image}`}
  alt="User Avatar"
  className="h-full w-[400px] mt-6 border-solid border-red-500 rounded-lg  object-cover bg-black"
/>
              </div>
            )}
          </section>
        </main>
      </div>
      <FooterComponent />
    </>
  );
};

export default ExampleComponent;
