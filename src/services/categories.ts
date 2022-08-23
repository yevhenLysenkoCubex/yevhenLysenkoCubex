import gql from 'graphql-tag';

export const FIND_SERVICE_CATEGORIES = gql`
  query findServiceCategories {
    findServiceCategories {
      id
      name
      questions {
        id
        question
        options {
          id
          label
        }
      }
      suggested
    }
  }
`;

export const FIND_SERVICE_CATEGORY_BY_ID = gql`
  query findServiceCategoryById($id: ID!) {
    findServiceCategoryById(id: $id) {
      id
      name
    }
  }
`;
