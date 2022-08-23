import React from 'react';
import { matchPath, useLocation, Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { ReactComponent as HealthBook } from 'icons/health-book.svg';
import { ReactComponent as UserSettings } from 'icons/user-settings.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            background: '#FFFFFF',
            boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.12)',
          },
          flexContainer: {
            justifyContent: 'space-evenly',
          },
          indicator: {
            display: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 'auto',
            padding: '9px 18px',
            fontFamily: 'inherit',
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#78909C',
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#263238',
              fontWeight: 800,
            },
          },
          iconWrapper: {
            width: '24px',
            height: '24px',
            color: '#78909C',
          },
        },
      },
    },
  });
};

const useRouteMatch = (patterns: readonly string[]) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
};

const TabNav = (): JSX.Element => {
  const routeMatch = useRouteMatch(['/booking', '/profile']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Tabs value={currentTab}>
        <Tab
          label="Cerca"
          icon={<Magnifier />}
          value=""
          to="#"
          component={Link}
        />
        <Tab
          label="Prenotazioni"
          icon={<HealthBook />}
          value="/booking"
          to="/booking"
          component={Link}
        />
        <Tab
          label="Profilo"
          icon={<UserSettings />}
          value="/profile"
          to="/profile"
          component={Link}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default TabNav;
