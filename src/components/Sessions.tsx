import React from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

            '&.Session': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#263238',
            },
            '&.Price': {
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '20px 16px',
            justifyContent: 'space-between',
            background: '#F4F8FB',
            borderRadius: '16px',
            '&:hover': {
              background: '#F4F8FB',
            },
          },
        },
      },
    },
  });
};

const Sessions = (): JSX.Element => {
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Stack mt="24px" spacing="12px">
        <MenuItem>
          <Typography className="Session">1 sessione</Typography>
          <Typography className="Price">32,00€</Typography>
        </MenuItem>
        <MenuItem>
          <Typography className="Session">Mese (4 sessioni)</Typography>
          <Typography className="Price">136.00€</Typography>
        </MenuItem>
        <MenuItem>
          <Typography className="Session">2 mesi (8 sessioni)</Typography>
          <Typography className="Price">232.00€</Typography>
        </MenuItem>
      </Stack>
    </ThemeProvider>
  );
};

export default Sessions;
