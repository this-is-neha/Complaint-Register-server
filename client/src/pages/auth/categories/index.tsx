


import { useContext, useEffect } from 'react';
import { HeaderComponent, FooterComponent } from '../../../components/common';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context';

const CategoriesPage = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('Is logged in:', !!auth.loggedInUser);
  }, [auth.loggedInUser]);

  const checkAuth = (to: string) => {
    return auth.loggedInUser ? to : '/login';
  };

  return (
    <>
      <HeaderComponent />

      <div className="container mx-auto justify-left px-0">
        <h1 className="text-4xl text-left">Categories</h1>

        <NavLink
          to={checkAuth('/healthcare')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          HEALTHCARE
        </NavLink>

        <NavLink
          to={checkAuth('/transportation')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          TRANSPORTATION
        </NavLink>

        <NavLink
          to={checkAuth('/drinking-water')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          DRINKING WATER
        </NavLink>

        <NavLink
          to={checkAuth('/road')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          ROAD
        </NavLink>

        <NavLink
          to={checkAuth('/education')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          EDUCATION
        </NavLink>

        <NavLink
          to={checkAuth('/crimes')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          CRIMES
        </NavLink>

        <NavLink
          to={checkAuth('/domestic')}
          className="bg-blue-200 text-2xl shadow:2xl border border-gray-200 rounded-lg p-14 flex items-center mt-8 justify-left shadow hover:bg-gray-300"
        >
          DOMESTIC VIOLENCE AND CHILD ABUSE
        </NavLink>
      </div>

      <FooterComponent />
    </>
  );
};

export default CategoriesPage;
