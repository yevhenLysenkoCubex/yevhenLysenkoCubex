import gql from "graphql-tag";

export const GET_ALL_COMPANIES = gql`
    query {
        findCompanies {
            id
            name
        }
    }
`;

export const CREATE_COMPANY = gql`
    mutation createCompany($name: String!){
        createCompany(company: {name: $name}){
            id
            name
        }
    } 
`;