import React, { ChangeEvent, useState } from 'react';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as Chevron } from 'icons/chevron-down.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import countries from 'countries.json';

interface IIntlTelInputProps {
  value: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDialCodePass: (code: string) => void;
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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            border: 'none',
          },
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& > p': {
              color: '#263238',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.3px',
            color: '#607D8B',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            height: '56px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'none',
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            paddingTop: '15px',
            paddingLeft: '0px',
          },
          icon: {
            width: '16px',
            height: '16px',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            height: '100%',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            position: 'absolute',
            top: '-17px',
            left: '0px',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '12px',
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

const IntlTelInput = (props: IIntlTelInputProps): JSX.Element => {
  const { value, onInputChange, onDialCodePass, styles } = props;

  const [code, setCode] = useState('+39');
  const handleCodeChange = (event: { target: { value: string } }) => {
    setCode(event.target.value);
    onDialCodePass(event.target.value);
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Paper sx={{ pl: '16px', ...styles }}>
        <Select
          value={code}
          onChange={handleCodeChange}
          IconComponent={Chevron}
          MenuProps={{
            PaperProps: {
              sx: {
                height: '150px',
              },
            },
          }}
          renderValue={(value: string) => {
            const country = countries.find(
              (country: any) => country.dialCode === value,
            );

            return (
              <img
                style={{
                  width: '32px',
                  height: '32px',
                }}
                src={country?.flag}
                alt={`${country?.name}-flag`}
              />
            );
          }}
        >
          {countries.map((country: any) => (
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              key={country.isoCode}
              value={country.dialCode}
            >
              <img
                style={{ width: '24px', height: '24px' }}
                src={country.flag}
                alt={`${country.name}-flag`}
              />
              <Typography sx={{ ml: '5px' }}>{country.name}</Typography>
            </MenuItem>
          ))}
        </Select>
        <Divider
          sx={{
            height: '24px',
            marginLeft: '16px',
            marginRight: '12px',
          }}
          orientation="vertical"
        />
        <InputLabel htmlFor="tel">Telefono</InputLabel>
        <InputBase
          sx={{ width: '75%' }}
          id="tel"
          type="number"
          startAdornment={
            <InputAdornment position="start">{code}</InputAdornment>
          }
          value={value}
          onChange={onInputChange}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default IntlTelInput;
