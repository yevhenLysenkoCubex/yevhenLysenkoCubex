import { Dispatch } from 'react';
import apolloClient from 'graphql';
import {
  ServiceCategoriesActionTypes,
  TServiceCategoriesAction,
} from 'redux/types/categories';
import { FIND_SERVICE_CATEGORIES } from 'services/categories';

export const findServiceCategories = () => {
  return async (dispatch: Dispatch<TServiceCategoriesAction>) => {
    try {
      dispatch({
        type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_PENDING,
      });
      const response = await apolloClient.query({
        query: FIND_SERVICE_CATEGORIES,
      });
      dispatch({
        type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_FULFILLED,
        payload: response.data.findServiceCategories,
      });
    } catch {
      dispatch({
        type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_REJECTED,
        payload: 'Error Message.',
      });
    }
  };
};
