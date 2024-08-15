import React, { createContext, useState, useEffect } from 'react';
import Api from '../utils/api';
import { requestSuccess } from '../utils/Utils';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    if (!jwt) return;
    console.log("jwt");
    console.log(jwt);
    const jsonUser = JSON.parse(
      decodeURIComponent(atob(jwt.split(".")[1]))
    );
    console.log(jsonUser);

    getMyLandlordAPI(jsonUser);
    getMyUserAPI(jsonUser);
  }, []);

  const getMyLandlordAPI = async (jsonUser) => {
    try {
      var res = await Api.landlord.getMyLandlord();

      if (res.ok) {
        var data = await res.json();
        console.log("data");
        console.log(data);
        setUser({
          ...data.landlord,
          ...jsonUser
        });

      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  };

  const getMyUserAPI = async (jsonUser) => {
    try {
      var res = await Api.users.getMyUser();

      if (res.ok) {
        var data = await res.json();
        console.log("user");
        console.log(data);
        setUser({
          ...data.user,
          ...jsonUser
        });

      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}



export { UserContext, UserProvider };