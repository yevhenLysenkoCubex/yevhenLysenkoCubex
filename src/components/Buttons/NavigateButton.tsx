import React from 'react';
import Button from '@mui/material/Button';
import { ReactComponent as Arrow } from 'icons/arrow-right.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface INavigateButton {
  text: string;
  onButtonClick?: () => void;
  styles?: object;
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: 0,
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

const NavigateButton = (props: INavigateButton): JSX.Element => {
  const { text, onButtonClick, styles } = props;

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Button
        sx={styles}
        type="button"
        onClick={onButtonClick}
        endIcon={<Arrow />}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default NavigateButton;
