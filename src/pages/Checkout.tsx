import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from 'redux/hooks';
import authOperations from 'redux/authOperations';

import { Form, Field } from 'react-final-form';

import Header from 'components/Header';
import Input from 'components/Inputs/Input';
import IntlTelInput from 'components/Inputs/IntlTelInput';
import BasicButton from 'components/Buttons/BasicButton';

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
              marginBottom: '8px',
              fontWeight: 800,
              fontSize: '24px',
              lineHeight: 1.3,
              color: '#263238',
            },
            '&.Body1': {
              marginBottom: '24px',
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
            '&.Contacts': {
              marginBottom: '9px',
              fontWeight: 800,
              fontSize: '18px',
              lineHeight: 1.35,
              letterSpacing: '0.2px',
            },
            '&.Small': {
              marginBottom: '47px',
              fontSize: '14px',
              lineHeight: 1.4,
            },
          },
        },
      },
    },
  });
};

const Check = (): JSX.Element => {
  const [dial, setDial] = useState('+39');
  console.log(dial, 'dial');

  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useAppDispatch();
  const onSubmit = (values: any) => {
    dispatch(authOperations.verifyEmail({ email: values.email }))
      .unwrap()
      .then((response: any) => {
        if (typeof response === 'string') {
          return;
        }
        navigate('/confirmation');
      });
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <Header onIconButtonClick={goBack} />
        <Box mt="34px">
          <Typography className="Title">Per chi stai prenotando?</Typography>
          <Typography className="Body1">
            Seleziona se la prenotazione è per te stesso o per un altra persona
          </Typography>
        </Box>
        <Box sx={{ mt: '47px', pb: '94px' }}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="name"
                    render={({ input: { value, onChange } }) => (
                      <Input
                        styles={{ mb: '47px' }}
                        className="Nome"
                        isFocused
                        label="Nome"
                        value={value}
                        onInputChange={onChange}
                      />
                    )}
                  />
                  <Field
                    name="surname"
                    render={({ input: { value, onChange } }) => (
                      <Input
                        styles={{ mb: '47px' }}
                        className="Cognome"
                        label="Cognome"
                        value={value}
                        onInputChange={onChange}
                      />
                    )}
                  />
                  <Typography className="Contacts">Contatti</Typography>
                  <Typography className="Body1 Small">
                    Per comunicarti informazioni importanti sulla tua
                    prenotazione
                  </Typography>
                  <Field
                    name="email"
                    render={({ input: { value, onChange } }) => (
                      <Input
                        styles={{ mb: '47px' }}
                        label="Indirizzo email"
                        value={value}
                        onInputChange={onChange}
                      />
                    )}
                  />
                  <Field
                    name="tel"
                    type="select"
                    render={({ input: { value, onChange } }) => (
                      <IntlTelInput
                        value={value}
                        onInputChange={onChange}
                        onDialCodePass={(code: string) => setDial(code)}
                        styles={{ mb: '24px' }}
                      />
                    )}
                  />
                  <BasicButton type="submit" text="Continua" />
                </form>
              );
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Check;
