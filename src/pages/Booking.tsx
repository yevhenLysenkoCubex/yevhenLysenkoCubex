import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Equalizer } from 'icons/equalizer.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAppSelector } from 'redux/hooks';

import Appointment from 'components/Appointment';
import TabNav from 'components/TabNav';
import Details from 'components/Booking';

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 16px',
            background: '#FFFFFF',
            border: '1px solid #B0BEC5',
            borderRadius: '12px',
          },
          text: {
            fontFamily: 'inherit',
            lineHeight: 1.4,
            letterSpacing: '0.3px',
            color: '#607D8B',
            textTransform: 'none',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 800,
            fontSize: '14px',
            lineHeight: 1.2,
            color: '#263238',
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
            '&:not(:last-of-type)': {
              marginBottom: '8px',
            },
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

const BookingList = (): JSX.Element => {
  const doesQueryExist = useAppSelector(state => state.query.test).length > 0;
  const [isModalOpen, setIsModalOpen] = useState(doesQueryExist);

  const location = useLocation();
  console.log(location, 'location');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <div className="section flex s-b">
          <Logo />
          <Button startIcon={<Equalizer />}>Vedi tutti</Button>
        </div>
        <div style={{ padding: '20px 0px 16px' }}>
          <Typography sx={{ mb: '12px' }}>Prossime</Typography>
          <Appointment />
        </div>
        <div style={{ padding: '16px 0px 80px' }}>
          <Typography sx={{ mb: '12px' }}>Passate</Typography>
          <List>
            {Array.from({ length: 2 }, (_, i) => i).map((val: number) => (
              <ListItem key={val}>
                <Appointment isPast isCancelled={val === 1} />
              </ListItem>
            ))}
          </List>
        </div>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hideBackdrop
          closeAfterTransition
        >
          <Box sx={{ height: '100%' }}>
            <Details handleClose={() => setIsModalOpen(false)} />
          </Box>
        </Modal>
      </Container>
      <TabNav />
    </ThemeProvider>
  );
};

export default BookingList;
