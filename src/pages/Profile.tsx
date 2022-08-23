import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { ReactComponent as Edit } from 'icons/edit.svg';
import { ReactComponent as Patient } from 'icons/patient.svg';
import { ReactComponent as UserHeart } from 'icons/user-heart.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TabNav from 'components/TabNav';
import BasicButton from 'components/Buttons/BasicButton';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import authSelectors from 'redux/selectors/auth';
import authOperations from 'redux/authOperations';
import paths from 'routes/paths';

interface IGuestProps {
  name: string;
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#263238',

            '&.Title1': {
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              textTransform: 'capitalize',
            },
            '&.Body1': {
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: 1.4,
              letterSpacing: '0.3px',
            },
            '&.Title2': {
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
            },
            '&.Body2': {
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
            },
            '&.Subtitle': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#607D8B',
            },
            '&.GuestCardName': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
            },
            '&.Actions': {
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#00838F',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            width: '100%',
            background: '#F4F8FB',
            borderRadius: '16px',
            boxShadow: 'none',
            '&:not(:last-of-type)': {
              marginBottom: '8px',
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&:last-child': {
              paddingBottom: '12px',
            },
            '&.GuestCardContent': {
              justifyContent: 'start',
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
      MuiButton: {
        styleOverrides: {
          root: {
            padding: 0,
            background: 'transparent',
            border: 'none',
          },
          text: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#00838F',
            textTransform: 'none',
          },
        },
      },
    },
  });
};

const basicButtonStyles = {
  color: '#121A26',
  background: '#FFFFFF',
  border: '1px solid #B0BEC5',
  '&:hover': {
    color: '#121A26',
    background: '#FFFFFF',
    border: '1px solid #B0BEC5',
  },
};

const Guest = (props: IGuestProps): JSX.Element => {
  const { name } = props;
  return (
    <Card>
      <CardContent className="GuestCardContent">
        <UserHeart />
        <Typography sx={{ ml: '12px' }} className="GuestCardName">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const onLogout = () => {
    dispatch(authOperations.signout());
    navigate(paths().homepage);
  };

  const firstName = useAppSelector(authSelectors.getUsersFirstName);
  const lastName = useAppSelector(authSelectors.getUsersLastName);
  const email = useAppSelector(authSelectors.getUsersEmail);

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pb: '80px' }}>
        <div className="section flex">
          <Typography className="Title1">Profilo</Typography>
        </div>
        <Box sx={{ pt: '22px', pb: '24', display: 'flex' }}>
          <Box
            sx={{
              mr: '15px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F4F8FB;',
              borderRadius: '10px',
            }}
          >
            <Patient />
          </Box>
          <Box>
            <Typography className="Title1">{`${firstName} ${lastName}`}</Typography>
            <Typography className="Body1">{email}</Typography>
          </Box>
        </Box>
        <Box sx={{ pt: '21px' }}>
          <Card>
            <CardContent>
              <Box>
                <Typography className="Title2">Dati profilo</Typography>
                <Typography className="Body2">
                  60% del profilo completato
                </Typography>
              </Box>
              <IconButton>
                <Edit />
              </IconButton>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box>
                <Typography className="Title2">Metodi di pagamento</Typography>
                <Typography className="Body2">1 carta salvata</Typography>
              </Box>
              <IconButton>
                <Edit />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ pt: '32px', pb: '32px' }}>
          <Typography sx={{ mb: '12px' }} className="Subtitle">
            Persone di cui ti prendi cura
          </Typography>
          <List>
            {['Enrico Rossi', 'Anna Rossi'].map((val: string, idx: number) => (
              <ListItem sx={{ mb: '8px' }} key={idx}>
                <Guest name={val} />
              </ListItem>
            ))}
          </List>
          <BasicButton
            type="button"
            text="Aggiungi persona"
            styles={basicButtonStyles}
          />
        </Box>
        <Divider sx={{ mb: '32px' }} />
        <Typography sx={{ mb: '24px' }} className="Actions">
          Termini e condizioni
        </Typography>
        <Button onClick={onLogout}>Logout</Button>
      </Container>
      <TabNav />
    </ThemeProvider>
  );
};

export default Profile;
