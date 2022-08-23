import React from 'react';
import { Navigate } from 'react-router-dom';

import paths from 'routes/paths';
import { useAppSelector } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';

const Private = ({ children }: any) => {
  const isLoggedIn = useAppSelector(authSelectors.getIsUserLoggedIn);

  return isLoggedIn ? children : <Navigate to={paths().auth} />;
};

export default Private;
