import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ReactComponent as Close } from 'icons/close.svg';
import { ReactComponent as Prev } from 'icons/prev.svg';
import { ReactComponent as Next } from 'icons/next.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import 'index.css';
import DatePicker from 'react-datepicker';
import { format, parse, endOfYear } from 'date-fns';
import { it } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('it', it);

interface IDateProps {
  selected: string;
  onClose: () => void;
  onTextFieldChange?: (date: string) => void;
  onDateChangeExpanded?: any;
}

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
            '&.CloseIcon': {
              padding: 0,
              position: 'absolute',
              top: '16px',
              left: '24px',

              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
            },
            '&.ArrowIcon': {
              padding: '8px',
              background: '#F4F8FB',
              borderRadius: '12px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            padding: '14px 0px',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: '150%',
            color: '#121A26',
            textTransform: 'none',
            border: '1px solid #B0BEC5',
            borderRadius: '16px',

            [theme.breakpoints.up('lg')]: {
              paddingTop: '16px',
              paddingBottom: '16px',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: '24px',
            marginBottom: '24px',
            borderColor: '#CFD8DC',

            [theme.breakpoints.up('lg')]: {
              marginTop: '16px',
              marginBottom: '16px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Call': {
              marginBottom: '21px',

              [theme.breakpoints.up('lg')]: {
                marginBottom: '16px',
              },
            },
            '&.Month': {
              textTransform: 'capitalize',
            },
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: '150%',
            textAlign: 'center',
          },
        },
      },
    },
  });
};

const getSelectedDate = (date: string) => {
  if (date.length === 0 || date === 'Prima possibile') {
    return new Date();
  }

  const [, cut] = date.split(' ');
  const parsed = parse(cut, 'dd/MM/yy', new Date());
  return parsed;
};

const DateComponent = (props: IDateProps): JSX.Element => {
  const { selected, onClose, onTextFieldChange, onDateChangeExpanded } = props;
  const [value, setValue] = useState<Date | null>(() =>
    getSelectedDate(selected),
  );
  const [isOpen, setIsOpen] = useState(true);

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container className="bare">
        <Box
          sx={
            isDesktop
              ? {
                  padding: '26px 17px',
                  width: '326px',
                  border: '1px solid #B0BEC5',
                  borderRadius: '20px',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }
              : { paddingTop: '68px' }
          }
        >
          <IconButton className="CloseIcon" onClick={onClose}>
            <Close />
          </IconButton>
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              if (onTextFieldChange) {
                onTextFieldChange('Prima possibile');
              }
              if (onDateChangeExpanded) {
                onDateChangeExpanded('Prima possibile');
              }
              onClose();
            }}
          >
            Mostra la prima disponibilità
          </Button>
          <Divider />
          <Typography className="Call">oppure seleziona una data</Typography>
          <DatePicker
            open={isOpen}
            locale="it"
            startOpen
            minDate={new Date()}
            maxDate={endOfYear(new Date())}
            fixedHeight
            autoFocus={false}
            selected={value}
            onChange={setValue}
            onSelect={date => {
              const result = `${format(date, 'EEEE', { locale: it })} ${format(
                date,
                'dd/MM/yy',
              )}`;
              if (onTextFieldChange) {
                onTextFieldChange(result);
              }
              if (onDateChangeExpanded) {
                onDateChangeExpanded(date);
              }
              onClose();
            }}
            onClickOutside={() => setIsOpen(true)}
            shouldCloseOnSelect={false}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
              const month = format(date, 'LLLL', { locale: it });
              return (
                <Box
                  sx={{
                    ...(isDesktop
                      ? { marginBottom: '10px' }
                      : { marginBottom: '26px' }),
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    className="ArrowIcon"
                    onClick={() => decreaseMonth()}
                  >
                    <Prev />
                  </IconButton>
                  <Typography className="Month">{month}</Typography>
                  <IconButton
                    className="ArrowIcon"
                    onClick={() => increaseMonth()}
                  >
                    <Next />
                  </IconButton>
                </Box>
              );
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DateComponent;
