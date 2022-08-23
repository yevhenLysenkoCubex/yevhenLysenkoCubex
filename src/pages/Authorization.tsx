import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Arrow } from 'icons/slot-back-arrow.svg';
import { ReactComponent as Google } from 'icons/google.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { left, setCountdownOn, setCountdownOff } from 'countdown';
import { useReactiveVar } from '@apollo/client';
import { chooseFlow } from 'redux/authSlice';

import Countdown from 'components/Countdown';
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
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,
            '&.Arrow': {
              position: 'absolute',
              top: '24px',
              left: '29px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Title': {
              maxWidth: '307px',
              margin: '24px 0 12px',
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
            '&.Caption': {
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#78909C',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            padding: 0,
            marginBottom: '32px',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: 0,
            '&:not(:last-of-type)': {
              marginBottom: '12px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.SignIn': {
              width: '100%',
              paddingTop: '16px',
              paddingBottom: '16px',
              background: '#D81B60',
              borderRadius: '16px',
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              textTransform: 'none',
              boxShadow: 'none',
            },
            '&.Inverse': {
              fontWeight: 600,
              color: '#121A26',
              background: '#ffffff',
              border: '1px solid #B0BEC5',
            },
          },
        },
      },
    },
  });
};

const Authorization = (): JSX.Element => {
  let navigate = useNavigate();

  useEffect(() => {
    setCountdownOn();
    return () => {
      setCountdownOff();
    };
  }, []);
  const timeLeft = useReactiveVar(left);

  const dispatch = useAppDispatch();

  useGoogleOneTapLogin({
    onSuccess: ({ credential }) =>
      dispatch(authOperations.signInWithGoogle({ credential, navigate })),
    onError: () => console.log('Error!'),
  });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '16px', overflow: 'hidden' }}>
        <Box
          sx={{
            padding: '16px 0px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IconButton className="Arrow" onClick={() => navigate(-1)}>
            <Arrow />
          </IconButton>
          <Logo />
        </Box>
        <Typography className="Title" variant="h4">
          Completa la tua prenotazione in meno di un minuto
        </Typography>
        <Typography className="Body1">
          Registrati per creare una tua area personale e gestire tutte le
          prenotazioni
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <List>
            <ListItem>
              <Button
                className="SignIn"
                size="large"
                variant="contained"
                onClick={() => {
                  dispatch(chooseFlow('user'));
                  navigate('/signup');
                }}
              >
                Registrati
              </Button>
            </ListItem>
            <ListItem>
              <Button
                startIcon={<Google />}
                className="SignIn Inverse"
                size="large"
                variant="contained"
                // onClick={() => onGoogleAuth()}
              >
                Accedi con Google
              </Button>
            </ListItem>
            <ListItem
              sx={{
                position: 'relative',
                '& > div': {
                  width: '100%',
                  position: 'absolute',
                  top: '-60px',
                  left: '20px',
                  opacity: 0,
                },
              }}
            >
              <GoogleLogin
                width="325px"
                locale="it"
                onSuccess={({ credential }) =>
                  dispatch(
                    authOperations.signInWithGoogle({ credential, navigate }),
                  )
                }
              />
            </ListItem>
          </List>
          <Divider flexItem />
          <Button
            sx={{ m: '32px 0px 46px' }}
            className="SignIn Inverse"
            size="large"
            variant="contained"
            onClick={() => {
              dispatch(chooseFlow('guest'));
              navigate('/checkout');
            }}
          >
            Continua come ospite
          </Button>
          <Box
            sx={{
              mt: '46px',
              mb: '34px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography className="Caption">
              Hai già un account?&nbsp;
              <Link to="/signin">
                <span style={{ fontWeight: 800, color: '#D81B60' }}>Login</span>
              </Link>
            </Typography>
          </Box>
          <Countdown timeLeft={timeLeft} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Authorization;
