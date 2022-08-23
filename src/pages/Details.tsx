import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Share } from 'icons/share.svg';
import { ReactComponent as Arrow } from 'icons/slot-back-arrow.svg';
import { ReactComponent as ArrowRight } from 'icons/arrow-right.svg';
import { ReactComponent as ArrowDownDetails } from 'icons/arrow-down-details.svg';
import { ReactComponent as ArrowRightDetails } from 'icons/arrow-right-details.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector } from 'redux/hooks';

import Header from 'components/Desktop/Header';

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
            padding: 0,
            '&.Arrow': {
              position: 'absolute',
              top: '24px',
              left: '29px',
              [theme.breakpoints.up('lg')]: {
                position: 'static',
                marginRight: '20px',
              },
            },
            '&.Share': {
              width: '40px',
              height: '40px',
              position: 'absolute',
              top: '12px',
              right: '24px',
              background: '#F4F8FB',
              borderRadius: '12px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#263238',
            '&.Title': {
              marginBottom: '12px',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: 1.2,
              letterSpacing: '0.15px',
              color: '#323F4B',
              textTransform: 'capitalize',
              [theme.breakpoints.up('lg')]: {
                marginBottom: 0,
                fontWeight: 800,
                fontSize: '24px',
                lineHeight: 1.3,
              },
            },
            '&.Caption': {
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
            '&.Subtitle': {
              marginBottom: '12px',
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
            },
            '&.Body1': {
              marginBottom: '4px',
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
            },
            '&.Body2': {
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: 1.4,
              letterSpacing: '0.3px',
            },
            '&.Bold': {
              marginBottom: '4px',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: 1.4,
              letterSpacing: '0.2px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Action': {
              marginTop: '8px',
              padding: 0,
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#00838F',
              textTransform: 'none',
            },
            '&.Proceed': {
              padding: '16px 40px',
              background: '#D81B60',
              borderRadius: '16px',
              textTransform: 'none',
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
            },
            '&.Confirm': {
              width: '100%',
              marginTop: '40px',
              paddingTop: '16px',
              paddingBottom: '16px',
              background: '#D81B60',
              borderRadius: '16px',
              textTransform: 'none',
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
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
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            width: '100%',
            maxWidth: '287px',
            padding: '20px',
            borderRadius: '20px',
          },
        },
      },
    },
  });
};

const Details = (): JSX.Element => {
  const areDetailsVisible = false;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const time = useAppSelector(state => state.appointment.time);
  const price = useAppSelector(state => state.appointment.price);
  const date = useAppSelector(state => state.query.date);
  const test = useAppSelector(state => state.query.test);
  const staff = useAppSelector(state => state.appointment.staff);
  const center = useAppSelector(state => state.appointment.center);
  const address = useAppSelector(state => state.appointment.address);
  const destination = useAppSelector(state => state.query.destination);
  const [, cut] = date.split(' ');

  console.log(date, 'date');

  let navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      {isDesktop ? (
        <Header isQueryShown={false} />
      ) : (
        <Container sx={{ paddingBottom: '16px' }}>
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
            <IconButton className="Share">
              <Share />
            </IconButton>
          </Box>
        </Container>
      )}
      <Container>
        <Box sx={{ padding: `${isDesktop ? '50px' : '24px'} 0px 28px` }}>
          {isDesktop ? (
            <Box sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}>
              <IconButton className="Arrow" onClick={() => navigate(-1)}>
                <Arrow />
              </IconButton>
              <Typography className="Title" variant="h3">
                {test}
              </Typography>
            </Box>
          ) : (
            <Typography className="Title" variant="h3">
              {test}
            </Typography>
          )}
          <Typography className="Caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus
            gravida tellus, praesent felis. Pretium arcu pretium viverra ipsum
            at
          </Typography>
          <Button
            className="Action"
            endIcon={
              areDetailsVisible ? (
                <ArrowDownDetails />
              ) : (
                <ArrowRightDetails width="16px" height="16px" />
              )
            }
            // onClick={() => setAreDetailsVisible(!areDetailsVisible)}
          >
            Leggi di più
          </Button>
        </Box>
        <Box>
          <Box mb="32px">
            <Typography className="Subtitle">Quando</Typography>
            <Typography sx={{ textTransform: 'capitalize' }} className="Body1">
              {date}
            </Typography>
            <Typography className="Body2">{`ore ${time}`}</Typography>
            <Button className="Action" endIcon={<ArrowRight />}>
              Vedi altre disponibilità
            </Button>
          </Box>
          <Box mb="32px">
            <Typography className="Subtitle">
              Dove si terrà la visita
            </Typography>
            <Typography className="Body1">{center}</Typography>
            <Typography className="Body2">{`${address} - ${destination}`}</Typography>
            <Button className="Action" endIcon={<ArrowRight />}>
              Come arrivarci
            </Button>
          </Box>
          <Box mb="32px">
            <Typography className="Subtitle">Prezzo finale</Typography>
            <Typography className="Bold">{price}</Typography>
            <Typography sx={{ maxWidth: '185px' }} className="Caption">
              Cancella gratuitamento fino a 24 ore dalla data appuntamento
            </Typography>
          </Box>
          <Divider sx={{ margin: '32px 0px 4px' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <List>
            <ListItem>
              <Typography className="Body1">{`${cut} ore ${time}`}</Typography>
            </ListItem>
            <ListItem>
              <Typography className="Body2">{price}</Typography>
            </ListItem>
            <ListItem>
              <Typography className="Body2">{staff}</Typography>
            </ListItem>
          </List>
          <Button
            className="Proceed"
            size="large"
            variant="contained"
            onClick={handleClick}
          >
            Continua
          </Button>
        </Box>
        <Box mt="32px">
          <Typography className="Subtitle">Cose da ricordare</Typography>
          <Typography className="Caption">
            Devi avere l’impegnativa e restare a disgiuno consectetur adipiscing
            elit. Risus gravida tellus, praesent felis. Pretium arcu pretium
            viverra ipsum at phasellus.
          </Typography>
        </Box>
        <Box mt="32px">
          <Typography className="Subtitle">Cancellazione e rimborsi</Typography>
          <Typography className="Caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
            vivamus felis amet, commodo pretium. Nunc a viverra elit, ultrices.
            Scelerisque at purus faucibus sed euismod. Vitae tortor at nascetur
            donec accumsan, vitae est eget.
          </Typography>
        </Box>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={null}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Typography className="Bold">
            Prescrizione medica necessaria
          </Typography>
          <Typography className="Caption">
            Ricorda che il giorno dell’esame dovrai portare con te la
            prescrizione del medico
          </Typography>
          <Button
            className="Confirm"
            size="large"
            variant="contained"
            onClick={() => navigate('/auth')}
          >
            Ok, continua
          </Button>
        </Popover>
      </Container>
    </ThemeProvider>
  );
};

export default Details;
