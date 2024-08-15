import { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

const useAuth = () => {
  return useContext(LoadingContext);
};

export default useAuth;
