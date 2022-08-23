import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import { ReactComponent as IsChecked } from 'icons/isChecked.svg';
import { ReactComponent as IsNotChecked } from 'icons/isNotChecked.svg';
import { ReactComponent as ArrowRight } from 'icons/arrow-right.svg';
import { ReactComponent as Map } from 'icons/map-pin-line.svg';
import { ReactComponent as Calendar } from 'icons/calendar-event-line.svg';
import { ReactComponent as RadioUnchecked } from 'icons/radio.svg';
import { ReactComponent as RadioChecked } from 'icons/radio-checked.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';
import paths from 'routes/paths';

import Booking from 'components/Booking';
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
            '&.Subtitle': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#607D8B',
            },
            '&.Body1': {
              marginBottom: '24px',
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
            '&.Caption': {
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
            },
            '&.Price1': {
              fontWeight: 800,
              fontSize: '24px',
              lineHeight: 1.3,
              color: '#263238',
            },
            '&.Price2': {
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#263238',
            },
            '&.Appointment': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#212121',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: 0,
            marginBottom: '12px',
            '&:first-of-type': {
              marginBottom: '4px',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'auto',
            marginRight: '10px',
            color: '#7986CB',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0,
          },
          primary: {
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#263238',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            '&.Action': {
              padding: 0,
              fontWeight: 800,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#00838F',
              textTransform: 'none',
            },
            '&.Book': {
              width: '100%',
              marginBottom: '24px',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              paddingTop: '16px',
              paddingBottom: '16px',
              background: '#D81B60',
              borderRadius: '16px',
              textTransform: 'none',
              '&.Mui-disabled': {
                background: '#90A4AE',
                color: '#FFFFFF',
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            marginRight: '8px',
            padding: 0,
            color: '#B0BEC5',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
          },
          label: {
            fontWeight: 800,
            fontSize: '14px',
            lineHeight: 1.2,
            color: '#263238',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFanily: 'inherit',
            background: '#FFFFFF',
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
          },
          input: {
            padding: '18px 16px 18px 20px',
            '&::placeholder': {
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#78909C',
            },
          },
          notchedOutline: {
            border: 'none',
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
    },
  });
};

const methods = [
  { value: 'card', label: 'Carta di credito' },
  { value: 'payPal', label: 'Pay Pal' },
  { value: 'applePay', label: 'Apple Pay' },
  { value: 'cash', label: 'Paga in struttura' },
];

const Payment = (): JSX.Element => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  const handleTermsAcceptanceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAreTermsAccepted(event.target.checked);
  };

  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  const test = useAppSelector(state => state.query.test);
  const price = useAppSelector(state => state.appointment.price);
  const date = useAppSelector(state => state.query.date);
  const time = useAppSelector(state => state.appointment.time);
  const center = useAppSelector(state => state.appointment.center);
  const address = useAppSelector(state => state.appointment.address);
  const destination = useAppSelector(state => state.query.destination);

  const isUserLoggedIn = useAppSelector(authSelectors.getIsUserLoggedIn);

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ paddingBottom: '67px' }}>
        <Header onIconButtonClick={goBack} />
        <Box mt="34px">
          <Typography className="Title" variant="h2">
            Pagamento
          </Typography>
          <Typography className="Body1">
            Completa il pagamento per confermare la prenotazione
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ mb: '12px' }} className="Subtitle" variant="h3">
            Importo da pagare
          </Typography>
          <Typography sx={{ mb: '4px' }} className="Price1">
            {price}
          </Typography>
          <Typography sx={{ mb: '24px' }} className="Caption">
            OneCheck non chiede nessun sovraprezzo
          </Typography>
          <Typography sx={{ mb: '16px' }} className="Subtitle" variant="h3">
            Riepilogo prenotazione
          </Typography>
          <Box
            sx={{
              mb: '24px',
              padding: '12px',
              background: '#F4F8FB',
              borderRadius: '20px',
            }}
          >
            <Typography sx={{ mb: '12px' }} className="Appointment">
              {test}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Map width="16px" height="16px" />
                </ListItemIcon>
                <ListItemText>{`${center} - ${address} - ${destination}`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Calendar width="16px" height="16px" />
                </ListItemIcon>
                <ListItemText
                  sx={{ textTransform: 'capitalize' }}
                >{`${date} - ore: ${time}`}</ListItemText>
              </ListItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography className="Price2">{price}</Typography>
                <Button className="Action" endIcon={<ArrowRight />}>
                  Modifica
                </Button>
              </Box>
            </List>
          </Box>
          <Box>
            <Typography sx={{ mb: '16px' }} className="Subtitle" variant="h3">
              Metodo di pagamento
            </Typography>
            <RadioGroup value={paymentMethod} onChange={handleMethodChange}>
              {paymentMethod === 'card' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      marginBottom: '12px',
                      padding: '16px',
                      background: '#F4F8FB',
                      borderRadius: '16px',
                    }}
                  >
                    <FormControlLabel
                      value={paymentMethod}
                      control={
                        <Radio
                          icon={<RadioUnchecked width="24px" height="24px" />}
                          checkedIcon={
                            <RadioChecked width="24px" height="24px" />
                          }
                        />
                      }
                      label={
                        methods.find(
                          (method: any) => method.value === paymentMethod,
                        )?.label
                      }
                    />
                    <Grid container spacing="12px">
                      <Grid mt="16px" item xs={12}>
                        <TextField
                          type="number"
                          autoFocus
                          placeholder="1234 1234 1234 1234"
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField placeholder="MM/AA" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField placeholder="CVC" />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    sx={{ alignSelf: 'flex-end' }}
                    className="Action"
                    endIcon={<ArrowRight />}
                    onClick={() => setPaymentMethod('')}
                  >
                    Modifica
                  </Button>
                </Box>
              ) : (
                methods.map(
                  (method: { value: string; label: string }, index: number) => {
                    return (
                      <Box
                        key={method.value}
                        sx={{
                          mb: `${
                            index === methods.length - 1 ? '0px' : '12px'
                          }`,
                          padding: '16px',
                          background: '#F4F8FB',
                          borderRadius: '16px',
                        }}
                      >
                        <FormControlLabel
                          value={method.value}
                          control={
                            <Radio
                              icon={
                                <RadioUnchecked width="24px" height="24px" />
                              }
                              checkedIcon={
                                <RadioChecked width="24px" height="24px" />
                              }
                            />
                          }
                          label={method.label}
                        />
                      </Box>
                    );
                  },
                )
              )}
            </RadioGroup>
          </Box>
          <FormControlLabel
            sx={{ marginTop: '24px', marginBottom: '27px' }}
            className="Terms"
            control={
              <Checkbox
                icon={<IsNotChecked />}
                checkedIcon={<IsChecked />}
                value={areTermsAccepted}
                onChange={handleTermsAcceptanceChange}
              />
            }
            label={
              <Typography className="Caption">
                Accetto{' '}
                <span
                  style={{
                    fontWeight: '700',
                    color: '#00838F',
                    textDecoration: 'underline',
                  }}
                >
                  Termini e Condizioni
                </span>{' '}
                del servizio
              </Typography>
            }
          />
        </Box>
        <Button
          className="Book"
          size="large"
          variant="contained"
          disabled={paymentMethod === '' || !areTermsAccepted}
          onClick={() =>
            isUserLoggedIn ? navigate(paths().booking) : setIsModalOpen(true)
          }
        >
          Paga e prenota
        </Button>
        <Typography mb="24px" className="Caption">
          La sicurezza è importante per noi. Le tue informazioni sono private e
          protette
        </Typography>
        <Typography mb="12px" className="Subtitle" variant="h3">
          Cancellazione e rimborsi
        </Typography>
        <Typography className="Caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget vivamus
          felis amet, commodo pretium. Nunc a viverra elit, ultrices.
          Scelerisque at purus faucibus sed euismod. Vitae tortor at nascetur
          donec accumsan, vitae est eget.
        </Typography>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hideBackdrop
          closeAfterTransition
        >
          <Box sx={{ height: '100%' }}>
            <Booking handleClose={() => setIsModalOpen(false)} />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Payment;
