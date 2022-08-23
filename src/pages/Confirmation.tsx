import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { ReactComponent as Lock } from 'icons/lock.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';
import { useAppDispatch } from 'redux/hooks';
import authOperations from 'redux/authOperations';

import Header from 'components/Header';

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
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&:not(:last-of-type)': {
              marginRight: '12px',
            },
            fontFamily: 'inherit',
          },
          input: {
            width: '46px',
            height: '56px',
            padding: '0',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
            textAlign: 'center',
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
            '&:focus': {
              borderColor: '#263238',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            paddingTop: '16px',
            paddingBottom: '16px',
            fontFamily: 'inherit',
            textTransform: 'none',

            '&.Resend': {
              marginTop: '24px',
              marginBottom: '54px',
              color: '#00838F',
            },
            '&.Verify': {
              color: '#FFFFFF',
              background: '#D81B60',
              borderRadius: '16px',
              '&.Mui-disabled': {
                background: '#90A4AE',
              },
            },
          },
        },
      },
    },
  });
};

const Confirmation = (): JSX.Element => {
  const [digits, setDigits] = useState<string[]>(() => Array(5).fill(''));
  const refs = useRef<HTMLDivElement[]>([]);
  const valid = Array.from({ length: 10 }, (_, i) => i.toString());

  console.log(digits, 'digits');

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ): void => {
    const value = event.target.value;
    const copy = digits.slice();
    const previous = copy[index];
    copy[index] = value.replace(previous, '');
    setDigits(copy);

    const last = digits.length - 1;
    const next = index + 1;
    index === last ? refs.current[index].blur() : refs.current[next].focus();
  };

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ): void => {
    if (!valid.includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (digits[index] !== '') {
        const copy = digits.slice();
        copy[index] = '';
        setDigits(copy);
      } else {
        const previous = index - 1;
        previous < 0
          ? refs.current[index].blur()
          : refs.current[previous].focus();
      }
    }
  };

  useEffect(() => {
    refs.current[0].focus();
  }, []);

  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  const isEmpty = digits.some((digit: string) => digit === '');
  // const isUserLoggedIn = useAppSelector(authSelectors.getIsUserLoggedIn);
  const userEmail = useAppSelector(authSelectors.getUsersEmail);
  const code = digits.join('');

  const isLoggedIn = useAppSelector(authSelectors.getIsUserLoggedIn);

  const dispatch = useAppDispatch();
  console.log(userEmail, 'userEmail');
  const onButtonClick = () => {
    dispatch(authOperations.signin({ email: userEmail, code, navigate }));
  };
  console.log('isLoggedIn', isLoggedIn);
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ paddingBottom: '12px' }}>
        <Header onIconButtonClick={goBack} />
        <Box mt="34px">
          <Typography className="Title">Codice di verifica mail</Typography>
          <Typography className="Body1">
            Abbiamo inviato un codice di 5 cifre al l’indirizzo mail da te
            inserito
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {digits.map((digit: string, index: number) => (
            <InputBase
              key={index}
              type="number"
              autoFocus
              value={digit}
              onChange={event => onInputChange(event, index)}
              onKeyDown={event => onInputKeyDown(event, index)}
              inputRef={(element: HTMLDivElement) =>
                (refs.current[index] = element)
              }
            />
          ))}
        </Box>
        <Button className="Resend" startIcon={<Lock />}>
          Reinviami il codice
        </Button>
        <Button onClick={onButtonClick} className="Verify" disabled={isEmpty}>
          Verifica
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Confirmation;
