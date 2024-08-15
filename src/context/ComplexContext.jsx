// /src/contexts/ComplexContext.js
import React, { createContext, useState } from 'react';

const ComplexContext = createContext();

const ComplexProvider = ({ children }) => {
  const [complexToEdit, setComplexToEdit] = useState({});
  const [isComplexModalOpen, setIsComplexModalOpen] = useState(false);

  const openComplexModal = (complex) => {
    console.log("openComplexModal");
    console.log(complex);
    setComplexToEdit(complex);
    setIsComplexModalOpen(true);
  }

  const closeComplexModal = () => {
    setComplexToEdit({});
    setIsComplexModalOpen(false);
  }

  return (
    <ComplexContext.Provider value={{ complexToEdit, isComplexModalOpen, openComplexModal, closeComplexModal }}>
      {children}
    </ComplexContext.Provider>
  );
};

export { ComplexContext, ComplexProvider };
