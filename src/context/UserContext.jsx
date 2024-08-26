import React, { createContext, useState, useEffect } from 'react';
import Api from '../utils/api';
import { requestSuccess } from '../utils/Utils';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}



export { UserContext, UserProvider };