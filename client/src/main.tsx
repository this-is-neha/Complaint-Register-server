import React from "react";
import "./index.css";


import ReactDOM from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.css";
import RouterConfig from "./config/router.config";
import "./index.css"

import { CoordinatesProvider } from '../src/MaoContext';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from '../src/userContext'; // Adjust the path as necessary
import { FormProvider}  from "../src/MessageContext";

import{ ReviewsProvider} from "../src/pages/auth/BentoContext"
const htmlRoot: HTMLElement = document.getElementById('root') as HTMLElement;
const RootElement = ReactDOM.createRoot(htmlRoot);
RootElement.render(
  <React.StrictMode>
      <ReviewsProvider>
     <FormProvider>
    <CoordinatesProvider>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider> 
          <RouterConfig />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
    </CoordinatesProvider>
    </FormProvider>
   </ReviewsProvider>
  </React.StrictMode>
);
