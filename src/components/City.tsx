import React, { useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ReactComponent as Near } from 'icons/near.svg';
import { ReactComponent as Close } from 'icons/close.svg';
import { ReactComponent as Cleaner } from 'icons/cleaner.svg';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { ReactComponent as MenuArrow } from 'icons/menu-arrow.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

interface ICityProps {
  onClose: () => void;
  onTextFieldChange: (value: string) => void;
}

const theme = createTheme();
const getMuiTheme = () => {
  return createTheme(theme, {
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,

            '&.CloseIcon': {
              position: 'absolute',
              top: '16px',
              left: '24px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.SearchTitle': {
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
            },
            '&.ListTitle': {
              marginBottom: '16px',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: '150%',
              [theme.breakpoints.up('lg')]: {
                paddingLeft: '17px',
                marginBottom: '10px',
              },
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '100%',
            [theme.breakpoints.up('lg')]: {
              marginBottom: '11px',
              width: '297px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'Manrope',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
            caret: '#263238',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
            border: '1px solid #263238',
            borderRadius: '16px',
          },
          input: {
            padding: '16px 12px 16px 12px',
            [theme.breakpoints.up('lg')]: {
              paddingTop: '22px',
              paddingBottom: '22px',
            },
          },
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Near': {
              marginBottom: '32px',
              fontFamily: 'inherit',
              fontStyle: 'normal',
              fontWeight: 800,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#00838F',
              textTransform: 'none',

              [theme.breakpoints.up('lg')]: {
                marginBottom: '16px',
                marginLeft: '17px',
              },
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: 0,
            whiteSpace: 'normal',
            [theme.breakpoints.up('lg')]: {
              padding: '20px 17px',
              '&:last-of-type': {
                paddingBottom: '17px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
              },
              '&+.MuiDivider-root': {
                marginTop: 0,
                marginBottom: 0,
              },
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: 0.2,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            '&.ArrowIcon': {
              minWidth: '20px',
            },
          },
        },
      },
    },
  });
};

const requests = ['Milano', 'Roma', 'Bologna', 'Torino', 'Milano Marittima'];

const City = (props: ICityProps): JSX.Element => {
  const [value, setValue] = useState('');
  const isFieldEmpty = value.trim().length === 0;
  const hints = requests.filter((request: string) =>
    request.toLowerCase().includes(value.toLowerCase()),
  );

  const { onClose, onTextFieldChange } = props;

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container className="bare">
        {!isDesktop && (
          <Box sx={{ paddingTop: '16px' }}>
            <IconButton className="CloseIcon" onClick={onClose}>
              <Close />
            </IconButton>
            <Typography className="SearchTitle">Cerca città</Typography>
          </Box>
        )}
        <Box sx={isDesktop ? { maxWidth: '370px' } : { mt: '28px' }}>
          <TextField
            type="text"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Magnifier />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={isFieldEmpty ? { display: 'none' } : {}}
                    onClick={() => setValue('')}
                  >
                    <Cleaner />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
          />
          <Box
            sx={
              isDesktop
                ? {
                    width: '360px',
                    maxHeight: '330px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '0px',
                    },
                    border: '1px solid #121A26',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }
                : {}
            }
          >
            {isFieldEmpty ? (
              <Box sx={isDesktop ? { pt: '20px' } : { mt: '24px', pb: '16px' }}>
                <Button className="Near" startIcon={<Near />}>
                  Cerca vicino a me
                </Button>
                <Typography className="ListTitle">Le più cercate</Typography>
                <Stack divider={<Divider />}>
                  {requests.map((request: string, idx: number) => (
                    <MenuItem
                      key={idx}
                      onClick={() => {
                        setValue(request);
                        onTextFieldChange(request);
                        onClose();
                      }}
                    >
                      <ListItemText>{request}</ListItemText>
                      <ListItemIcon className="ArrowIcon">
                        <MenuArrow />
                      </ListItemIcon>
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            ) : (
              <Box
                sx={
                  isDesktop ? {} : { marginTop: '12px', paddingBottom: '16px' }
                }
              >
                <Stack divider={<Divider />}>
                  {hints.length === 0 && (
                    <MenuItem disabled>
                      <ListItemText>
                        Nessun esame corrisponde alla ricerca
                      </ListItemText>
                    </MenuItem>
                  )}
                  {hints.map((hint: string, idx: number) => (
                    <MenuItem
                      key={idx}
                      onClick={() => {
                        setValue(hint);
                        onTextFieldChange(hint);
                        onClose();
                      }}
                    >
                      <ListItemText>{hint}</ListItemText>
                      <ListItemIcon className="ArrowIcon">
                        <MenuArrow />
                      </ListItemIcon>
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default City;
