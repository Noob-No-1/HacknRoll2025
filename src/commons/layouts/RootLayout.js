import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const RootLayout =  () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; 
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;