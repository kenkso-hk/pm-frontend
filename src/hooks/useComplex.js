import { useContext } from 'react';
import { ComplexContext } from '../context/ComplexContext';

const useComplex = () => {
  return useContext(ComplexContext);
};

export default useComplex;
