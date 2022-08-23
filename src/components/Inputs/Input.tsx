import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IInputProps {
  label: string;
  value: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  styles?: object;
  className?: string;
  isFocused?: boolean;
  type?: 'text' | 'password';
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
            '&.Nome input': {
              textTransform: 'capitalize',
            },
            '&.Cognome input': {
              textTransform: 'capitalize',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
            '&.Mui-focused': {
              border: '1px solid #263238',
            },
          },
          input: {
            padding: '16.5px 16px 16.5px 20px',
          },
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: '-8px',
            left: '-12px',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.2,
            letterSpacing: '0.2px',
            color: '#607D8B',
            '&.Mui-focused': {
              color: '#607D8B',
            },
          },
        },
      },
    },
  });
};

const Input = (props: IInputProps): JSX.Element => {
  const { label, value, onInputChange, styles, className, isFocused, type } =
    props;

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <TextField
        type={type || 'text'}
        sx={styles}
        className={className}
        autoFocus={isFocused || false}
        label={label}
        value={value}
        onChange={onInputChange}
        InputLabelProps={{ shrink: true }}
      />
    </ThemeProvider>
  );
};

export default Input;
