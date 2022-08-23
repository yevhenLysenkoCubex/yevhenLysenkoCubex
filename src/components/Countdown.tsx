import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ICountdownProps {
  timeLeft: string;
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
            color: '#263238',
            '&.Time': {
              fontWeight: 800,
              fontSize: '20px',
              lineHeight: 1.35,
              letterSpacing: '0.2px',
            },
            '&.Meta': {
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
            },
          },
        },
      },
    },
  });
};

const Countdown = (props: ICountdownProps): JSX.Element => {
  const { timeLeft } = props;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Box
        sx={{
          width: '-webkit-fill-available',
          padding: '12px 14px 12px 17px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#E0F7FA',
          borderRadius: '20px',
        }}
      >
        <Typography className="Time">{timeLeft}</Typography>
        <Typography sx={{ width: '219px' }} className="Meta">
          Tempo rimanente per concludere la prenotazione. Alla scadenza altri
          utenti potranno prenotare questo blocco orario.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Countdown;
