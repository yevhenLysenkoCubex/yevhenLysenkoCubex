import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { ReactComponent as IsChecked } from 'icons/isChecked.svg';
import { ReactComponent as IsNotChecked } from 'icons/isNotChecked.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from 'components/Header';
import Input from 'components/Inputs/Input';
import IntlTelInput from 'components/Inputs/IntlTelInput';
import { useAppDispatch } from 'redux/hooks';
// import { setIsUserLoggedIn } from 'redux/userSlice';
import authOperations from 'redux/authOperations';

interface IFieldShape {
  name: string;
  label: string;
}

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
            '&.Caption': {
              fontSize: '10px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
            },
            '&.Label': {
              maxWidth: '75%',
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
              '& > a': {
                fontWeight: 700,
                color: '#00838F',
                textDecoration: 'underline',
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            margin: 0,
            alignItems: 'start',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '0px 12px 0px 0px',
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

const fields = [
  {
    name: 'name',
    label: 'Nome',
  },
  {
    name: 'surname',
    label: 'Cognome',
  },
  {
    name: 'mail',
    label: 'Mail',
  },
];

const Signup = (): JSX.Element => {
  const [dial, setDial] = useState('+39');
  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  console.log(dial, 'dial');

  const dispatch = useAppDispatch();

  const onFormSubmit = (values: any) => {
    const payload = {
      email: values.mail,
      firstName: values.name,
      lastName: values.surname,
      // phone: `${dial}${values.tel}`,
      phone: `${dial}0309997523`,
      role: 'user',
      password: 'password',
    };
    dispatch(authOperations.signup(payload))
      .unwrap()
      .then(response => {
        if (typeof response === 'string') {
          return;
        }
        navigate('/confirmation');
      });
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '50px' }}>
        <Header onIconButtonClick={goBack} />
        <Box sx={{ pt: '24px' }}>
          <Typography sx={{ mb: '47px' }} className="Title">
            Compila i tuoi dati
          </Typography>
          <Form
            onSubmit={onFormSubmit}
            render={({ handleSubmit, values }) => {
              const isDisabled = Object.values(values).length < 4;
              return (
                <form onSubmit={handleSubmit}>
                  {fields.map((field: IFieldShape, index: number) => {
                    return (
                      <Field
                        key={index}
                        name={field.name}
                        render={({ input: { value, onChange } }) => (
                          <Input
                            styles={{ mb: '47px' }}
                            className={field.label}
                            isFocused={index === 0}
                            label={field.label}
                            value={value}
                            onInputChange={onChange}
                          />
                        )}
                      />
                    );
                  })}
                  <Field
                    name="tel"
                    render={({ input: { value, onChange } }) => (
                      <IntlTelInput
                        value={value}
                        onInputChange={onChange}
                        onDialCodePass={(code: string) => setDial(code)}
                      />
                    )}
                  />
                  <Typography sx={{ mb: '24px' }} className="Caption">
                    Questo contatto viene richiesto dai centri per comunicarti
                    informazioni importanti sulla tua prenotazione
                  </Typography>
                  <Field
                    name="areTermsAccepted"
                    type="checkbox"
                    initialValue={false}
                    render={({ input: { checked, onChange } }) => {
                      return (
                        <FormControlLabel
                          sx={{ mb: '12px' }}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={onChange}
                              icon={<IsNotChecked />}
                              checkedIcon={<IsChecked />}
                            />
                          }
                          label={
                            <Typography className="Label">
                              Ho letto e compreso la{' '}
                              <Link to="#">Privacy Policy</Link> e accetto
                              integralmente le{' '}
                              <Link to="#">Condizioni del Servizio</Link>
                            </Typography>
                          }
                        />
                      );
                    }}
                  />
                  <Button type="submit" disabled={isDisabled}>
                    Registrati
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

export default Signup;
