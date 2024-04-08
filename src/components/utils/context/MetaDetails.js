import React, { createContext, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';

const useUserMetaData = createContext();

function MetaDetails({ children }) {
  const [country, setCountry] = useState("in");
  const [category,setCategory] = useState([])

  const values = {
    country,
    setCountry,
    category,
    setCategory
  };

  return (
    <useUserMetaData.Provider value={values}>
      {children}
      <ToastContainer />
    </useUserMetaData.Provider>
  );
}

export function useDetails() {
  return useContext(useUserMetaData);
}

export default MetaDetails;