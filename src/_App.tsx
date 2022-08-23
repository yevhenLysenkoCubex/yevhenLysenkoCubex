import './App.css';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COMPANIES, CREATE_COMPANY } from './query/companyQuery';

interface companytData {
  id: string;
  name: string;
}

interface CompanyResult {
  findCompanies: Array<companytData>;
}

interface CompanyDetails {
  id: string;
  name: string;
  __typename: string;
}

interface AddCompanyResponse {
  createCompany: CompanyDetails;
}

function App() {
  const { loading, error, data } = useQuery<CompanyResult>(GET_ALL_COMPANIES);
  const [name, setName] = useState('');
  const [addCompany, { data: companyData }] = useMutation<AddCompanyResponse>(
    CREATE_COMPANY,
    {
      refetchQueries: [{ query: GET_ALL_COMPANIES }],
    },
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addCompany({ variables: { name } });
    setName('');
  }

  return (
    <>
      <div>
        <h1>Current Companies</h1>
        {loading || !data ? (
          <p>Loading...</p>
        ) : (
          data.findCompanies.map((company: any) => (
            <div key={company.id}>
              <h2>
                <a
                  href={`https://one-check-admin-staging.herokuapp.com/companies-info/${company.id}`}
                >
                  {company.name}
                </a>
              </h2>
            </div>
          ))
        )}
        {error ? error : ''}
      </div>
      <div>
        <h1>Company Add</h1>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="username">Company name: </label>
          <input
            required
            name="username"
            type="text"
            onChange={handleOnChange}
            value={name}
            autoComplete="off"
          />
          <button type="submit">Add Company</button>
          <p>
            New company ID: {companyData ? companyData.createCompany.id : ''}
          </p>
        </form>
      </div>
    </>
  );
}

export default App;
