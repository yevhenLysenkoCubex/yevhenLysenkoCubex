import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import paths from 'routes/paths';

interface IHeaderProps {
  test?: string;
  dest?: string;
  date?: string;
  isQueryShown: boolean;
  onQueryClick?: () => void;
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
            display: 'flex',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: 0,
            width: 'auto',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'auto',
            color: '#00838F',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
          },
          primary: {
            marginRight: '19px',
            fontWeight: 800,
            fontSize: '14px',
            lineHeight: 1.2,
            color: '#263238',
          },
          secondary: {
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#263238',
            textTransform: 'capitalize',
          },
        },
      },
    },
  });
};

const Header = (props: IHeaderProps): JSX.Element => {
  const { test, dest, date, isQueryShown, onQueryClick } = props;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            p: isQueryShown ? '16px 24px 12px' : '37.5px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link
            style={{
              display: 'block',
              position: 'absolute',
              top: '22px',
              left: '24px',
            }}
            to={paths().homepage}
          >
            <Logo />
          </Link>
          {isQueryShown && (
            <Box
              sx={{
                p: '12px 16px',
                width: '577px',
                border: '1px solid #B0BEC5',
                borderRadius: '16px',
                cursor: 'pointer',
              }}
              onClick={onQueryClick}
            >
              <List>
                <ListItem sx={{ mr: '12px' }}>
                  <ListItemIcon>
                    <Magnifier />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={test}
                    secondary={`${dest} - ${date}`}
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
        <Divider />
      </Box>
    </ThemeProvider>
  );
};

export default Header;
