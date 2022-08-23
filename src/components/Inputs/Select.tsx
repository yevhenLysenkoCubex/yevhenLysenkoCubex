import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as Chevron } from 'icons/chevron-down.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ISelectProps {
  value: string;
  onSelectChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
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
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
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
      MuiSelect: {
        styleOverrides: {
          icon: {
            right: '15px',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            top: '168px',
            border: '1px solid #263238',
            borderTop: 'none',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            boxShadow: 'none',
          },
        },
      },
    },
  });
};

const Select = (props: ISelectProps): JSX.Element => {
  const { styles, value, onSelectChange, options } = props;

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const borderStyles = isSelectOpen
    ? { borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }
    : { borderRadius: '16px' };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <TextField
        sx={styles}
        select
        SelectProps={{
          IconComponent: Chevron,
          onOpen: () => setIsSelectOpen(true),
          onClose: () => setIsSelectOpen(false),
        }}
        value={value}
        onChange={onSelectChange}
        defaultValue={'Seleziona'}
        InputProps={{ sx: borderStyles }}
      >
        {options.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </ThemeProvider>
  );
};

export default Select;
