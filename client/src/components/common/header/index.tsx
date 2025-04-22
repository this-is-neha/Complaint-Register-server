import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context"; // import your AuthContext
import { BellIcon, UserIcon } from '@heroicons/react/24/outline';
import axiosInstance from "axios"; // Assuming you're using Axios

const HeaderComponent = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0); // state for unseen notifications count
  const { loggedInUser } = useContext(AuthContext); // use AuthContext to get loggedInUser

  // Function to toggle the mobile menu
  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  // Fetch unseen notifications count (example API call)
  useEffect(() => {
    if (loggedInUser) {
      fetchUnseenNotificationsCount();
    }
  }, [loggedInUser]); // Re-run when the logged-in user changes

  const fetchUnseenNotificationsCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.get("http://localhost:9006/map/unseencount", {
        headers: {
          Authorization: `Bearer ${token}`, // Proper handling of token
        }
      });
      setUnseenNotificationsCount(response.data.unseenCount);
    } catch (error) {
      console.error("Error fetching unseen notifications count:", error);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink
                      to="/"
                      className="bg-gray-900 text-white rounded-md px-3 py-2 text-2xl font-medium"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/about"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="/categories"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                    >
                      Categories
                    </NavLink>
                    <NavLink
                      to="/review"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                    >
                      Vote
                    </NavLink>
                    <NavLink
                      to="/contact"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                    >
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {loggedInUser ? (
                    loggedInUser.role === 'admin' ? (
                      // For Admin: Show Notification Bell Icon
                      <div className="relative">
                        <NavLink to="/notification" className="relative">
                          <BellIcon className="h-10 w-10 text-white cursor-pointer" aria-hidden="true" />
                          {unseenNotificationsCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                              {unseenNotificationsCount}
                            </span>
                          )}
                        </NavLink>
                      </div>
                    ) : (
                      <div className="relative">
                        <NavLink
                          to={`/${loggedInUser.role}/${loggedInUser._id}`}
                          className="h-10 w-10 text-white cursor-pointer"
                          aria-label="View Profile"
                        >
                          <UserIcon className="h-10 w-10 text-white" aria-hidden="true" />
                        </NavLink>
                      </div>
                    )
                  ) : (
                    <div className="relative ml-3">
                      <NavLink
                        to="/login"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                      >
                        Log in
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-2 text-xl font-medium"
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
        </main>
      </div>
    </>
  );
};

export default HeaderComponent;
