import React from 'react';
import { Navigate } from 'react-router-dom';

import paths from 'routes/paths';
import { useAppSelector } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';

const Public = (props: any) => {
  const { children, isRestricted } = props;
  const isLoggedIn = useAppSelector(authSelectors.getIsUserLoggedIn);
  const shouldRedirect = isLoggedIn && isRestricted;

  return shouldRedirect ? <Navigate to={paths().homepage} /> : children;
};

export default Public;
