// /src/contexts/ApplicationContext.js
import React, { createContext, useState } from 'react';

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [applicationToEdit, setApplicationToEdit] = useState({});
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const openApplicationModal = (application) => {
    console.log("openApplicationModal");
    console.log(application);
    setApplicationToEdit(application);
    setIsApplicationModalOpen(true);
  }

  const closeApplicationModal = () => {
    setApplicationToEdit({});
    setIsApplicationModalOpen(false);
  }

  return (
    <ApplicationContext.Provider value={{ applicationToEdit, isApplicationModalOpen, openApplicationModal, closeApplicationModal }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationProvider };
