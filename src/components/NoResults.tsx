import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAppSelector } from 'redux/hooks';

const getMuiTheme = () => {
  return createTheme({
    components: {
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
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#263238',
            textAlign: 'center',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingTop: '7px',
            paddingBottom: '7px',
            background: 'transparent',
            border: '1px solid #B0BEC5',
            borderRadius: '8px',
          },
          text: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#00838F',
            textTransform: 'none',
          },
        },
      },
    },
  });
};

const NoResults = (): JSX.Element => {
  const [, date] = useAppSelector(state => state.query.date).split(' ');
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Box
        sx={{
          p: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#E0F7FA',
          borderRadius: '20px',
        }}
      >
        <Typography sx={{ mb: '10px' }}>
          {`Non ci sono risultati per il il ${date}.`}
        </Typography>
        <List>
          <ListItem sx={{ mb: '10px' }}>
            <Button>Cerca per prima disponibilità</Button>
          </ListItem>
          <ListItem>
            <Button sx={{ width: '100%' }}>Contattaci via chat</Button>
          </ListItem>
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default NoResults;
