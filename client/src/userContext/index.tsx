
import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface UserData {
  name: string;
  email: string;
  address: string;
  image: File | null;
  phone:number;
  gender:string;
  houseNo:string,
  toleName:string,
  occupation:string ,
  birthdate:string
}

interface UserContextProps {
  registeredUserData: UserData | null;
  setRegisteredUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registeredUserData, setRegisteredUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ registeredUserData, setRegisteredUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};



