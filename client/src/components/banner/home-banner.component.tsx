

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
import banner5 from "../../assets/banner5.jpeg";
import OtherPage from "../../pages/auth/Another";

declare global {
  interface Window {
    driftt: Drift;
    drift: Drift;
  }
}

interface Drift {
  init?: boolean;
  invoked?: boolean;
  methods?: string[];
  factory?: (method: string) => (...args: any[]) => Drift;
  load?: (id: string) => void;
  [key: string]: any;
}

const HomeBannerComponent = () => {
  return (
    <>

      <div className="bg-white">
        <div>
          <div className="relative w-screen h-screen flex justify-center overflow-hidden items-center">
            <img src={banner5} className="w-full h-full object-cover animate-fadeIn" alt="Banner" />
            <div className="absolute inset-0 flex flex-col justify-center items-center animate-slideIn bg-gradient-to-t from-black via-transparent to-transparent">
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 text-center">SpotSolve: Mapping Complaints, Driving Local Change</h1>
              <p className="text-white text-lg mb-8 text-center">Join us in making your community a better place. Share and solve local issues effectively with our platform.</p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <NavLink to="/register">
                  <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition duration-300">Sign Up</button>
                </NavLink>
                <NavLink to="/login">
                  <button className="bg-pink-600 text-white font-bold px-6 py-3 rounded-lg text-xl hover:bg-pink-700 transition duration-300">Log In</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Nivaran?</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
                <p className="text-gray-600">Receive instant notifications and updates on local complaints and resolutions.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                <p className="text-gray-600">Our intuitive design makes it easy to report issues and track progress.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Community Engagement</h3>
                <p className="text-gray-600">Engage with your local community and drive impactful change.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="text-4xl px-10 py-12 font-semibold">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Are Saying</h2>
        <div className="text-xl">
          <OtherPage />

        </div>

      </div>



    </>
  );
};

export default HomeBannerComponent;
