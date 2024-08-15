// /src/components/LoadingIndicator.js
import React from 'react';
import useLoading from '../hooks/useLoading';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
