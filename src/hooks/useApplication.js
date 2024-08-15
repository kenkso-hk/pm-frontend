import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';

const useApplication = () => {
  return useContext(ApplicationContext);
};

export default useApplication;
