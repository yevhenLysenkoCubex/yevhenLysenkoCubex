import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ReactComponent as Cross } from 'icons/close.svg';
import { ReactComponent as Map } from 'icons/map-pin-line.svg';
import { ReactComponent as Calendar } from 'icons/calendar-event-line.svg';
import { ReactComponent as Patient } from 'icons/patient.svg';
import { ReactComponent as Doctor } from 'icons/doctor.svg';
import { ReactComponent as ArrowRight } from 'icons/arrow-right.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from 'redux/hooks';

// TODO: Adjust styles, add box-shadow, think of other media formats (2x, webp, etc)

interface IBookingProps {
  handleClose: () => void;
}

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
            position: 'absolute',
            top: '16px',
            left: '24px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.AppointmentCode': {
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#546E7A',
            },
            '&.AppointmentMeta': {
              fontWeight: 800,
              fontSize: '18px',
              lineHeight: 1.35,
              letterSpacing: '0.2px',
              color: '#212121',
            },
            '&.Subtitle': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#263238',
              textTransform: 'capitalize',
            },
            '&.ListItemText': {
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#263238',
            },
            '&.ListItemTitle': {
              marginBottom: '12px',
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#607D8B',
            },
            '&.Caption': {
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '0',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: '0',
            '&:not(:last-of-type)': {
              marginBottom: '24px',
            },
            alignItems: 'flex-start',
            '&.Column': {
              display: 'block',
            },
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
            '&.Download': {
              width: '100%',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              paddingTop: '16px',
              paddingBottom: '16px',
              background: '#D81B60',
              borderRadius: '16px',
              textTransform: 'none',
              color: '#FFFFFF',
            },
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            '&.MuiGrid-item': {
              paddingTop: 0,
            },
          },
        },
      },
    },
  });
};

const Booking = (props: IBookingProps): JSX.Element => {
  const { handleClose } = props;

  const test = useAppSelector(state => state.query.test);
  const date = useAppSelector(state => state.query.date);
  const time = useAppSelector(state => state.appointment.time);
  const center = useAppSelector(state => state.appointment.center);
  const address = useAppSelector(state => state.appointment.address);
  const destination = useAppSelector(state => state.query.destination);

  let navigate = useNavigate();

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <Box sx={{ pt: '68px', pb: '122px' }}>
          <IconButton onClick={handleClose}>
            <Cross />
          </IconButton>
          <Box
            sx={{
              p: '24px 16px',
              position: 'relative',
              background: '#F4F8FB',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              borderBottom: '1px dashed #FFFFFF',
              // boxShadow: ' inset 0px 1px 2px rgba(121, 134, 203, 0.6)',
              '&::before': {
                content: '""',
                width: '17px',
                height: '17px',
                position: 'absolute',
                bottom: '-8px',
                left: '-8px',
                background: '#FFFFFF',
                borderRadius: '50%',
              },
              '&::after': {
                content: '""',
                width: '17px',
                height: '17px',
                position: 'absolute',
                bottom: '-8px',
                right: '-8px',
                background: '#FFFFFF',
                borderRadius: '50%',
              },
            }}
          >
            <Typography className="AppointmentCode">
              CODICE PRENOTAZIONE: 125142
            </Typography>
            <Typography className="AppointmentMeta">{test}</Typography>
          </Box>
          <Box
            sx={{
              p: '24px 16px',
              background: '#F4F8FB',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
            }}
          >
            <List>
              <ListItem>
                <Calendar width="16px" height="16px" />
                <Box sx={{ ml: '17px' }}>
                  <Typography sx={{ mb: '4px' }} className="Subtitle">
                    {date}
                  </Typography>
                  <Typography
                    sx={{ marginBottom: '8px' }}
                    className="ListItemText"
                  >
                    {`ore: ${time}`}
                    <span
                      style={{
                        marginLeft: '5px',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: 1.5,
                        letterSpacing: '0.4px',
                        color: '#607D8B',
                      }}
                    >
                      · Durata indicativa: 25 minuti
                    </span>
                  </Typography>
                  <Button className="Action" endIcon={<ArrowRight />}>
                    Salva a calendario
                  </Button>
                </Box>
              </ListItem>
              <ListItem>
                <Map width="16px" height="16px" />
                <Box sx={{ ml: '17px' }}>
                  <Typography sx={{ mb: '4px' }} className="Subtitle">
                    {center}
                  </Typography>
                  <Typography sx={{ mb: '8px' }} className="ListItemText">
                    {`${address} - ${destination}`}
                  </Typography>
                  <Button className="Action" endIcon={<ArrowRight />}>
                    Ottieni indicazioni
                  </Button>
                </Box>
              </ListItem>
              <ListItem>
                <Patient width="16px" height="16px" />
                <Typography sx={{ ml: '17px' }} className="ListItemText">
                  Mario Rossi
                </Typography>
              </ListItem>
              <ListItem>
                <Doctor width="16px" height="16px" />
                <Typography sx={{ ml: '17px' }} className="ListItemText">
                  Dottore Luca Bianchi
                </Typography>
              </ListItem>
            </List>
          </Box>
          <Grid
            sx={{ mt: '27px', mb: '26px' }}
            container
            spacing="10px"
            alignItems="center"
          >
            <Grid item xs={9.25}>
              <Button
                className="Download"
                onClick={() => {
                  navigate('/booking');
                }}
              >
                Scarica la prenotazione
              </Button>
            </Grid>
            <Grid item xs={2.75}>
              <img alt="logo" src="/apple-pay-logo.png" />
            </Grid>
          </Grid>
          <List>
            <ListItem className="Column">
              <Typography className="ListItemTitle">Come prepararsi</Typography>
              <Typography className="Caption">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                vivamus felis amet, commodo pretium. Nunc a viverra elit,
                ultrices. Scelerisque at purus faucibus sed euismod. Vitae
                tortor at nascetur donec accumsan, vitae est eget.
              </Typography>
            </ListItem>
            <ListItem className="Column">
              <Typography className="ListItemTitle">Cosa portare</Typography>
              <Typography className="Caption">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                vivamus felis amet, commodo pretium. Nunc a viverra elit,
                ultrices. Scelerisque at purus faucibus sed euismod. Vitae
                tortor at nascetur donec accumsan, vitae est eget.
              </Typography>
            </ListItem>
            <ListItem className="Column">
              <Typography className="ListItemTitle">Importo pagato</Typography>
              <Typography className="ListItemText">30,00€</Typography>
              <Typography className="Caption">
                Pagato con carta di credito in data 12/05/22
              </Typography>
              <Button
                sx={{ mt: '4px' }}
                className="Action"
                endIcon={<ArrowRight />}
              >
                Scarica la ricevuta
              </Button>
            </ListItem>
            <ListItem className="Column">
              <Typography className="ListItemTitle">
                Cancellazione e rimborsi
              </Typography>
              <Typography className="Caption">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                vivamus felis amet, commodo pretium. Nunc a viverra elit,
                ultrices. Scelerisque at purus faucibus sed euismod. Vitae
                tortor at nascetur donec accumsan, vitae est eget.
              </Typography>
              <Button
                sx={{ mt: '4px' }}
                className="Action"
                endIcon={<ArrowRight />}
              >
                Cancella la prenotazione
              </Button>
            </ListItem>
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Booking;
