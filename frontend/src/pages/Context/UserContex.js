import React, { useState, createContext, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '', 
  });

  const updateUserEmail = (newEmail) => {
    setUserData((prevUserData) => ({ ...prevUserData, email: newEmail }));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);


  return (
    <UserContext.Provider value={{ userData, updateUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
