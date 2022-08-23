import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'components/Header';
import Select from 'components/Inputs/Select';
import Input from 'components/Inputs/Input';

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
            '&.Body1': {
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: '#D81B60',
            borderRadius: '16px',
            boxShadow: 'none',
            '&:hover': {
              color: '#FFFFFF',
              background: '#D81B60',
            },
            '&.Mui-disabled': {
              color: '#FFFFFF',
              background: '#90A4AE',
            },
          },
          text: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#FFFFFF',
            textTransform: 'none',
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

const Checkout = (): JSX.Element => {
  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '60px' }}>
        <Header onIconButtonClick={goBack} />
        <Box sx={{ pt: '18px' }}>
          <Typography sx={{ mb: '8px' }} className="Title">
            Per chi stai prenotando?
          </Typography>
          <Typography sx={{ mb: '24px' }} className="Body1">
            Seleziona se la prenotazione è per te stesso o per un altra persona
          </Typography>
          <Form
            onSubmit={console.log}
            render={({ handleSubmit, values }) => {
              const isDisabled = Object.values(values).length < 3;

              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="belogning"
                    type="select"
                    render={({ input: { value, onChange } }) => (
                      <Select
                        styles={{ mb: '47px' }}
                        value={value}
                        onSelectChange={onChange}
                        options={options}
                      />
                    )}
                  />
                  {fields.map((field: any, index: number) => {
                    const last = fields.length - 1;
                    return (
                      <Field
                        key={index}
                        name={field.name}
                        render={({ input: { value, onChange } }) => (
                          <Input
                            styles={
                              index === last ? { mb: '24px' } : { mb: '47px' }
                            }
                            className={field.label}
                            label={field.label}
                            value={value}
                            onInputChange={onChange}
                          />
                        )}
                      />
                    );
                  })}
                  <Button type="submit" disabled={isDisabled}>
                    Continua
                  </Button>
                </form>
              );
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
