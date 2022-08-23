import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { ReactComponent as Arrow } from 'icons/slot-back-arrow.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { left, setCountdownOff, setCountdownOn } from 'countdown';
import { useReactiveVar } from '@apollo/client';

interface IHeaderProps {
  onIconButtonClick: () => void;
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: '7px 4px',
            position: 'absolute',
            top: '16px',
            left: '24px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: '35px',

            position: 'absolute',
            top: '14px',
            right: '18px',

            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
            background: '#E0F7FA',
            borderRadius: '20px',
          },
          label: {
            padding: '7px 14px',
          },
        },
      },
    },
  });
};

const Header = (props: IHeaderProps): JSX.Element => {
  const { onIconButtonClick } = props;

  useEffect(() => {
    setCountdownOn();
    return () => {
      setCountdownOff();
    };
  }, []);

  const timeLeft = useReactiveVar(left);

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pt: '16px', pb: '16px' }}>
        <IconButton onClick={onIconButtonClick}>
          <Arrow />
        </IconButton>
        <Logo />
        <Chip sx={{ width: '70px' }} label={timeLeft} />
      </Container>
    </ThemeProvider>
  );
};

export default Header;
