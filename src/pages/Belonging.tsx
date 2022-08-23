import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'components/Header';
import Select from 'components/Inputs/Select';
import Input from 'components/Inputs/Input';
import BasicButton from 'components/Buttons/BasicButton';

import { useAppSelector } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Title': {
              fontWeight: 800,
              fontSize: '24px',
              lineHeight: 1.3,
              color: '#263238',
            },
            '&.Body': {
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
          },
        },
      },
    },
  });
};

const options = ['Per me stesso', 'Per un’altra persona'];
const fields = [
  {
    name: 'name',
    label: 'Nome',
  },
  {
    name: 'surname',
    label: 'Cognome',
  },
];

const Belonging = (): JSX.Element => {
  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  const name = useAppSelector(authSelectors.getUsersFirstName);
  const surname = useAppSelector(authSelectors.getUsersLastName);

  const handleSelectChange = (
    [_, value]: any,
    state: object,
    { changeValue }: any,
  ) => {
    if (value.includes('me')) {
      changeValue(state, 'name', () => name);
      changeValue(state, 'surname', () => surname);
    } else {
      changeValue(state, 'name', () => '');
      changeValue(state, 'surname', () => '');
    }
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '16px' }}>
        <Header onIconButtonClick={goBack} />
        <Box sx={{ pt: '18px' }}>
          <Typography sx={{ mb: '8px' }} className="Title">
            Per chi stai prenotando?
          </Typography>
          <Typography sx={{ mb: '24px' }} className="Body">
            Seleziona se la prenotazione è per te stesso o per un altra persona
          </Typography>
          <Form
            onSubmit={() => navigate('/payment')}
            mutators={{ handleSelectChange }}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="belonging"
                  type="select"
                  render={({ input: { value, onChange } }) => (
                    <Select
                      styles={{ mb: '47px' }}
                      value={value}
                      onSelectChange={event => {
                        onChange(event.target.value);
                        form.mutators.handleSelectChange(
                          '',
                          event.target.value,
                        );
                      }}
                      options={options}
                    />
                  )}
                />
                {fields.map((field: any, index: number) => (
                  <Field
                    key={index}
                    name={field.name}
                    render={({ input: { value, onChange } }) => (
                      <Input
                        styles={
                          index === field.length - 1
                            ? { mb: '24px' }
                            : { mb: '47px' }
                        }
                        className={field.label}
                        label={field.label}
                        value={value}
                        onInputChange={onChange}
                      />
                    )}
                  />
                ))}
                <BasicButton type="submit" text="Continua" />
              </form>
            )}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Belonging;
