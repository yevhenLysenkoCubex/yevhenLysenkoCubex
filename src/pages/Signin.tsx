import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'components/Header';
import Input from 'components/Inputs/Input';
import BasicButton from 'components/Buttons/BasicButton';

import { useAppDispatch } from 'redux/hooks';
import authOperations from 'redux/authOperations';

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
            fontWeight: 800,
            fontSize: '24px',
            lineHeight: 1.3,
            color: '#263238',
          },
        },
      },
    },
  });
};

const Signin = (): JSX.Element => {
  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useAppDispatch();

  const onFormSubmit = (values: any) => {
    dispatch(authOperations.verifyEmail(values));
    navigate('/confirmation');
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '16px' }}>
        <Header onIconButtonClick={goBack} />
        <Typography sx={{ mt: '18px', mb: '70px' }}>Login</Typography>
        <Form
          onSubmit={onFormSubmit}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  render={({ input: { value, onChange } }) => (
                    <Input
                      styles={{ mb: '32px' }}
                      label="Indirizzo mail"
                      isFocused
                      value={value}
                      onInputChange={onChange}
                    />
                  )}
                />
                {/* <Field
                  name="password"
                  render={({ input: { value, onChange } }) => (
                    <Input
                      styles={{ mb: '32px' }}
                      label="Password"
                      value={value}
                      onInputChange={onChange}
                      type="password"
                    />
                  )}
                /> */}
                <BasicButton
                  type="submit"
                  styles={{ mb: '25px' }}
                  text="Invia codice di verifica"
                  // isDisabled={isFieldEmpty}
                />
              </form>
            );
          }}
        />
        <Divider sx={{ mb: '29px' }} />
        <BasicButton type="button" text="Continua con Google" hasStartIcon />
      </Container>
    </ThemeProvider>
  );
};

export default Signin;
