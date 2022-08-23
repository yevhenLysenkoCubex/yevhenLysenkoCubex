import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Form, Field } from 'react-final-form';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Burger } from 'icons/menu.svg';
import { ReactComponent as Pulse } from 'icons/pulse.svg';
import { ReactComponent as Map } from 'icons/map.svg';
import { ReactComponent as Arrow } from 'icons/arrow.svg';
import { ReactComponent as Calendar } from 'icons/date.svg';
import { ReactComponent as Cleaner } from 'icons/cleaner.svg';
import { ReactComponent as IsChecked } from 'icons/isChecked.svg';
import { ReactComponent as IsNotChecked } from 'icons/isNotChecked.svg';
import { ReactComponent as LogoLarge } from 'icons/desktop/logo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createQuery } from 'redux/querySlice';

import Menu from 'components/Menu';
import Test from 'components/Test';
import City from 'components/City';
import Date from 'components/Date';

import Search from 'components/Desktop/Search';

interface IModalState {
  isOpen: boolean;
  content: string | null;
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const theme = createTheme();
const getMuiTheme = () => {
  return createTheme(theme, {
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.MobileMenuIconButton': {
              background: '#F4F8FB',
              borderRadius: '12px',
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
            },
            '&.DesktopSearchIconButton': {
              marginLeft: 'auto',
              padding: '18px 25px',

              color: '#FFFFFF',
              background: '#D81B60',
              border: '1px solid #B0BEC5',
              borderLeft: 'none',
              borderRadius: '16px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,

              '& > svg': {
                width: '29px',
                height: '29px',
              },
              '&:hover': {
                color: '#FFFFFF',
                background: '#D81B60',
              },
            },
            '&.SharedCleanerIconButton': {
              padding: 0,
            },
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('lg')]: {
              display: 'none',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '0px 12px',
            '&:not(:first-of-type)': {
              paddingLeft: '24px',
            },
            '&:not(:last-of-type)': {
              paddingRight: '24px',
            },
            '&.MuiDivider-root': {
              margin: 0,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            height: '10px',
            background: '#263238',
            borderRightWidth: 'initial',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: '24px',
            fontWeight: 800,
            lineHeight: 1.3,
            color: '#263238',
            letterSpacing: 'inherit',
            [theme.breakpoints.up('lg')]: {
              maxWidth: '520px',
              fontSize: '48px',
              lineHeight: 1.2,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
            marginBottom: '16px',
            [theme.breakpoints.up('lg')]: {
              margin: 0,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'Manrope',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
            [theme.breakpoints.up('lg')]: {
              border: 'none',
            },
          },
          input: {
            padding: '16px 16px 16px 12px',
            '&::placeholder': {
              fontWeight: 400,
              letterSpacing: '0.3px',
              color: '#78909C',
            },
            '&.Mui-disabled': {
              textFillColor: '#263238',
              textTransform: 'capitalize',
            },
            [theme.breakpoints.up('lg')]: {
              padding: '23px 16px 23px 12px',
            },
          },
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            margin: 0,
          },
          label: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
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
            marginTop: '24px',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: '#D81B60',
            borderRadius: '16px',
            '&:hover': {
              background: '#D81B60',
            },
            '&.Mui-disabled': {
              background: '#90A4AE',
              color: '#ffffff',
            },
          },
          text: {
            fontFamily: 'Manrope',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            textTransform: 'none',
            color: '#ffffff',
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            height: '100vh',
            background: '#fff',
            overflow: 'scroll',
          },
        },
      },

      // Desktop

      MuiPaper: {
        styleOverrides: {
          root: {
            display: 'flex',
            alignItems: 'center',

            border: '1px solid #B0BEC5',
            borderRight: 'none',
            borderRadius: '16px',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: 'none',
          },
        },
      },
    },
  });
};

const Home = (): JSX.Element => {
  const selected = {
    test: useAppSelector(state => state.query.test),
    testID: useAppSelector(state => state.query.testID),
    answers: useAppSelector(state => state.query.answers),
    city: useAppSelector(state => state.query.destination),
    date: useAppSelector(state => state.query.date),
  };

  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    content: null,
  });
  const [test, setTest] = useState(selected.test);
  const [testID, setTestID] = useState(selected.testID);
  const [answers, setAnswers] = useState<string[]>(selected.answers);
  const [city, setCity] = useState(selected.city);
  const [date, setDate] = useState(selected.date);
  const [suggested, setSuggested] = useState<any>(null);

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (): void => {
    const payload = {
      test,
      testID,
      destination: city,
      date,
      answers,
      suggested,
    };
    dispatch(createQuery(payload));
    navigate('/results');
  };
  const isDisabed = [test, city, date].some(
    (value: string) => value.length === 0,
  );

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <Box
          sx={{
            paddingTop: '16px',
            paddingBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/">{isDesktop ? <LogoLarge /> : <Logo />}</Link>
          <IconButton
            className="MobileMenuIconButton"
            onClick={() => setModal({ isOpen: true, content: 'menu' })}
          >
            <Burger />
          </IconButton>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <MenuItem>
              <Link to="">
                <ListItemText>Assistenza</ListItemText>
              </Link>
            </MenuItem>
            <MenuItem>
              <ListItemText>Come funziona</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Chi è OneCheck</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Login</ListItemText>
            </MenuItem>
          </Stack>
        </Box>
        <Box
          sx={
            isDesktop
              ? { paddingTop: '39px', paddingBottom: '45px' }
              : { paddingTop: '24px', paddingBottom: '24px' }
          }
        >
          <Typography component="h1">
            Prenota esami e visite specialistiche
          </Typography>
        </Box>
        {isDesktop ? (
          <Search
            test={test}
            onTestChange={setTest}
            passTestID={setTestID}
            passAnswers={setAnswers}
            passSuggested={setSuggested}
            city={city}
            onCityChange={setCity}
            date={date}
            onDateChange={setDate}
            onQuerySubmit={onSubmit}
          />
        ) : (
          <Box sx={{ paddingTop: '8px' }}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="test"
                      render={() => (
                        <TextField
                          placeholder="Visita, esame o trattamento"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Pulse />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  className="SharedCleanerIconButton"
                                  sx={
                                    test.length === 0 ? { display: 'none' } : {}
                                  }
                                  onClick={() => setTest('')}
                                >
                                  <Cleaner />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={test}
                          onClick={() =>
                            setModal({ isOpen: true, content: 'test' })
                          }
                          disabled
                        />
                      )}
                    />
                    <Field
                      name="city"
                      render={() => (
                        <TextField
                          placeholder="Città"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Map />
                              </InputAdornment>
                            ),
                            endAdornment:
                              city.length === 0 ? (
                                <InputAdornment position="end">
                                  <Arrow />
                                </InputAdornment>
                              ) : (
                                <InputAdornment position="end">
                                  <IconButton
                                    className="Cleaner"
                                    onClick={() => setCity('')}
                                  >
                                    <Cleaner />
                                  </IconButton>
                                </InputAdornment>
                              ),
                          }}
                          onClick={() =>
                            setModal({ isOpen: true, content: 'city' })
                          }
                          value={city}
                          disabled
                        />
                      )}
                    />
                    <Field
                      name="date"
                      render={() => (
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Calendar />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  className="Cleaner"
                                  sx={
                                    date.length === 0 ? { display: 'none' } : {}
                                  }
                                  onClick={() => setDate('')}
                                >
                                  <Cleaner />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Data"
                          onClick={() =>
                            setModal({ isOpen: true, content: 'date' })
                          }
                          value={date}
                          disabled
                        />
                      )}
                    />
                    <Field
                      name="date"
                      render={() => (
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Calendar />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  className="Cleaner"
                                  sx={
                                    date.length === 0 ? { display: 'none' } : {}
                                  }
                                  onClick={() => setDate('')}
                                >
                                  <Cleaner />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Data"
                          onClick={() =>
                            setModal({ isOpen: true, content: 'date' })
                          }
                          value={date}
                          disabled
                        />
                      )}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<IsNotChecked />}
                          checkedIcon={<IsChecked />}
                        />
                      }
                      label="Urgente: mostra solo prossime 48 ore"
                    />
                    <Button type="submit" size="large" disabled={isDisabed}>
                      Cerca disponibilità
                    </Button>
                  </form>
                );
              }}
            />
          </Box>
        )}
        <Modal
          open={modal.isOpen}
          onClose={() => setModal({ isOpen: false, content: null })}
          hideBackdrop
          closeAfterTransition
        >
          <Box sx={{ height: '100%' }}>
            {(() => {
              switch (modal.content) {
                case 'test':
                  return (
                    <Test
                      passTestID={setTestID}
                      passAnswers={setAnswers}
                      passSuggested={setSuggested}
                      onClose={() => setModal({ isOpen: false, content: null })}
                      onTextFieldChange={setTest}
                    />
                  );
                case 'city':
                  return (
                    <City
                      onClose={() => setModal({ isOpen: false, content: null })}
                      onTextFieldChange={setCity}
                    />
                  );
                case 'date':
                  return (
                    <Date
                      onClose={() => setModal({ isOpen: false, content: null })}
                      onTextFieldChange={setDate}
                      selected={date}
                    />
                  );
                default:
                  return (
                    <Menu
                      onClose={() => setModal({ isOpen: false, content: null })}
                    />
                  );
              }
            })()}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
