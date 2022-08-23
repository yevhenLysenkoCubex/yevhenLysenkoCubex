export interface IServiceCategoriesState {
  categories: any;
  isLoading: any;
  error: any;
}

export enum ServiceCategoriesActionTypes {
  FIND_SERVICE_CATEGORIES_PENDING = 'FIND_SERVICE_CATEGORIES_PENDING',
  FIND_SERVICE_CATEGORIES_FULFILLED = 'FIND_SERVICE_CATEGORIES_FULFILLED',
  FIND_SERVICE_CATEGORIES_REJECTED = 'FIND_SERVICE_CATEGORIES_REJECTED',
}

interface IFindServiceCategoriesPending {
  type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_PENDING;
}

interface IFindServiceCategoriesFulfilled {
  type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_FULFILLED;
  payload: any;
}

interface IFindServiceCategoriesRejected {
  type: ServiceCategoriesActionTypes.FIND_SERVICE_CATEGORIES_REJECTED;
  payload: any;
}

export type TServiceCategoriesAction =
  | IFindServiceCategoriesPending
  | IFindServiceCategoriesFulfilled
  | IFindServiceCategoriesRejected;
