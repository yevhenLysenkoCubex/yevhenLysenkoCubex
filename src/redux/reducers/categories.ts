import {
  IServiceCategoriesState,
  TServiceCategoriesAction,
  ServiceCategoriesActionTypes,
} from 'redux/types/categories';

const initialState: IServiceCategoriesState = {
  categories: [],
  error: null,
  isLoading: false,
};

// TODO: Add cases!
export const serviceCategoriesReducer = (
  state = initialState,
  action: TServiceCategoriesAction,
) => {
  switch (action.type) {
    case ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: action.payload,
        error: null,
        isLoading: false,
      };
    case ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
