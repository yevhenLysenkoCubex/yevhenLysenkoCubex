import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactComponent as Map } from 'icons/map-pin-line.svg';
import { ReactComponent as Calendar } from 'icons/calendar-event-line.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigateButton from 'components/Buttons/NavigateButton';

interface IAppointmentProps {
  isPast?: boolean;
  isCancelled?: boolean;
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            width: '100%',
            background: '#F4F8FB',
            borderRadius: '20px',
            boxShadow: 'none',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '12px',
            '&:last-child': {
              paddingBottom: '12px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Alert': {
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#EAB308',
            },
            '&.Appointment': {
              fontSize: '14px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#212121',
              '&.isDim': {
                color: '#78909C',
              },
              '&.isCancelled': {
                textDecoration: 'line-through',
              },
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
            '&:last-of-type': {
              marginBottom: 0,
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
            '&.isDim': {
              color: '#78909C',
            },
            '& > svg': {
              width: '16px',
              height: '16px',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0,
            color: '#263238',
            '&.isDim': {
              color: '#607D8B',
            },
          },
          primary: {
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: 'inherit',
          },
        },
      },
    },
  });
};

const Appointment = (props: IAppointmentProps): JSX.Element => {
  const { isPast, isCancelled } = props;

  const makeClasses = () => (isPast || isCancelled ? 'isDim' : '');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Card>
        <CardContent>
          {isCancelled && (
            <Typography sx={{ mb: '6px' }} className="Alert">
              Prenotazione Cancellata
            </Typography>
          )}
          <Typography
            sx={{ mb: '12px' }}
            className={`Appointment ${isPast ? 'isDim' : ''} ${
              isCancelled ? 'isCancelled' : ''
            }`}
          >
            Visita allergologica + Prick test
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon className={makeClasses()}>
                <Map />
              </ListItemIcon>
              <ListItemText className={makeClasses()}>
                Synlab - Piazza delle Erbe - Milano
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon className={makeClasses()}>
                <Calendar />
              </ListItemIcon>
              <ListItemText className={makeClasses()}>
                Oggi, 20 Maggio 2022 - ore: 09:00
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={makeClasses()}>
                Dott. Luca Bianchi
              </ListItemText>
              <NavigateButton text="Vedi dettagli" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default Appointment;
