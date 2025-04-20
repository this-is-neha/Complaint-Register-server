

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Complaint {
  userid: ReactNode;
  deleted: any;
  _id: string;
  lat: number;
  lng: number;
  message: string;
  placeName: string;
  category: string;

}
export interface CoordinatesContextType {
  coordinates: Complaint[];
  setCoordinates: React.Dispatch<React.SetStateAction<Complaint[]>>;
  addCoordinates: (coordinate: Complaint) => void;
  deleteCoordinate: (id: string) => void;
}

const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

export const useCoordinates = (): CoordinatesContextType => {
  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error('useCoordinates must be used within a CoordinatesProvider');
  }
  return context;
};

interface CoordinatesProviderProps {
  children: ReactNode;
}

export const CoordinatesProvider: React.FC<CoordinatesProviderProps> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Complaint[]>([]);

  useEffect(() => {
    const storedCoordinates = localStorage.getItem('coordinates');
    if (storedCoordinates) {
      setCoordinates(JSON.parse(storedCoordinates));
    } else {
      fetchAllCoordinates(); 
    }
  }, []);

  const addCoordinates = (coordinate: Complaint) => {
    const updatedCoordinates = [...coordinates, coordinate];
    setCoordinates(updatedCoordinates);
    localStorage.setItem('coordinates', JSON.stringify(updatedCoordinates));
  };
  

  const deleteCoordinate = (id: string) => {
    const updatedCoordinates = coordinates.filter(coordinate => coordinate._id !== id);
    setCoordinates(updatedCoordinates);
    localStorage.setItem('coordinates', JSON.stringify(updatedCoordinates));
  };

  const fetchAllCoordinates = async () => {
    try {
      const response = await fetch('/map/complaints');
      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }
      const data = await response.json();
      setCoordinates(data);
      localStorage.setItem('coordinates', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates, addCoordinates, deleteCoordinate }}>
      {children}
    </CoordinatesContext.Provider>
  );
};
