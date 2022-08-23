import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as MagnifierIcon } from 'icons/magnifier.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Form, Field } from 'react-final-form';

import Tickbox from 'components/Tickbox';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { getFilter } from 'redux/filter/selectors';
import { setFilter } from 'redux/filter/slice';

interface IFilterProps {
  handleClose?: () => void;
}

// TODO: Adjust <Switch /> <Divider /> styles

interface IComplexLabelProps {
  title: string;
  caption: string;
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
            padding: 0,
            position: 'absolute',
            top: '16px',
            left: '24px',
            [theme.breakpoints.up('lg')]: {
              display: 'none',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Title': {
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#263238',
              textAlign: 'center',
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
            },
            '&.Subtitle': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#607D8B',
            },
            '&.Weekday': {
              fontSize: '16px',
              lineHeight: 1.2,
              letterSpacing: '0.4px',
              color: '#9C9D9F',
              '&.Active': {
                color: '#FFFFFF',
              },
              [theme.breakpoints.up('lg')]: {
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#263238',
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#607D8B',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          thumb: {
            background: '#FFFFFF',
          },
          track: {
            background: '#CFD8DC',
          },
          switchBase: {
            '&.Mui-checked+.MuiSwitch-track': {
              opacity: 1,
              background: '#00838F',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
            display: 'flex',
            aligItems: 'center',
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
      MuiButton: {
        styleOverrides: {
          root: {
            padding: 0,
            '&.Search': {
              width: '100%',
              marginTop: '12px',
              paddingTop: '15px',
              paddingBottom: '15px',
              background: '#D81B60',
              borderRadius: '16px',
            },
          },
          text: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#607D8B',
            textTransform: 'none',
            '&.Search': {
              fontSize: '16px',
              letterSpacing: '0.2px',
              color: '#FFFFFF',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.ListItemDivider': {
              height: '10px',
              margin: '0px 6px',
              alignSelf: 'center',
              background: '#607D8B',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '100%',
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
            [theme.breakpoints.up('lg')]: {
              fontSize: '12px',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            border: '1px solid #B0BEC5',
            borderRadius: '16px',
          },
          input: {
            padding: '16px 12px',
            [theme.breakpoints.up('lg')]: {
              padding: '14px 12px',
            },
            '&::placeholder': {
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: '#78909C',
              [theme.breakpoints.up('lg')]: {
                fontSize: '12px',
                letterSpacing: '0.4px',
              },
            },
          },
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up('lg')]: {
              color: '#09121F',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
    },
  });
};

const centers = [
  { name: 'centers.donato', label: 'Gruppo Donato' },
  { name: 'centers.cdi', label: 'CDI' },
  { name: 'centers.synlab', label: 'Synlab' },
  { name: 'centers.appheal', label: 'Appheal' },
  { name: 'centers.bianalisi', label: 'Bianalisi' },
];

const weekdays = [
  { name: 'weekdays.mon', label: 'Lun' },
  { name: 'weekdays.tue', label: 'Mar' },
  { name: 'weekdays.wed', label: 'Mer' },
  { name: 'weekdays.thu', label: 'Gio' },
  { name: 'weekdays.fri', label: 'Ven' },
];

const ComplexLabel = (props: IComplexLabelProps): JSX.Element => {
  const { title, caption } = props;
  return (
    <Box>
      <Typography className="FormLabelTitle">{title}</Typography>
      <Typography className="FormLabelCaption">{caption}</Typography>
    </Box>
  );
};

const WeekdayCheckbox = (props: {
  isChecked: boolean;
  weekday: string;
}): JSX.Element => {
  const { isChecked, weekday } = props;
  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <Box
      sx={{
        ...(isDesktop
          ? {
              width: '30px',
              height: '25px',
            }
          : {
              width: '40px',
              height: '40px',
            }),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isChecked ? '#00838F' : 'transparent',
        border: `1px solid ${isChecked ? '#00838F' : '#B0BEC5'}`,
        borderRadius: isDesktop ? '6px' : '4px',
      }}
    >
      <Typography className={isChecked ? 'Weekday Active' : 'Weekday'}>
        {weekday}
      </Typography>
    </Box>
  );
};

const Filter = (props: IFilterProps): JSX.Element => {
  const { handleClose } = props;

  const clear = ([name]: [string], state: object, { changeValue }: any) => {
    changeValue(state, name, () => false);
  };

  const select = ([name]: [string], state: object, { changeValue }: any) => {
    changeValue(state, name, () => true);
  };

  const dispatch = useAppDispatch();
  const filterState = useAppSelector(getFilter);

  const onFormSubmit = (values: any) => {
    dispatch(setFilter(values));
  };

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pt: '16px', pb: '16px' }} className="bare">
        {!isDesktop && (
          <Box sx={{ mb: '40px' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography className="Title">Filtra risultati</Typography>
          </Box>
        )}
        <Box sx={isDesktop ? { display: 'flex' } : {}}>
          <Box sx={isDesktop ? { mr: '15px' } : {}}>
            <Form
              onSubmit={onFormSubmit}
              initialValues={filterState}
              mutators={{ clear, select }}
              render={({ handleSubmit, form }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Typography sx={{ mb: '16px' }} className="Subtitle">
                      Disponibilità
                    </Typography>
                    <FormControlLabel
                      sx={{ mb: '16px', mr: isDesktop ? '0px' : 'auto`' }}
                      label="Scegli degli slot orari più precisi"
                      control={<Switch />}
                    />
                    <Field
                      name="timeframe.morning"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Mattina"
                              caption="Dalle 06:00 alle 12:59"
                            />
                          }
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="timeframe.afternoon"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Pomeriggio"
                              caption="Dalle 13:00 alle 17:59"
                            />
                          }
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="timeframe.evening"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Sera"
                              caption="Dalle 18:00 alle 21:00"
                            />
                          }
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Typography
                      sx={{ mt: isDesktop ? '12px' : '25px', mb: '16px' }}
                      className="Subtitle"
                    >
                      Giorno della settimana
                    </Typography>
                    <List
                      sx={{
                        mb: '24px',
                        justifyContent: isDesktop ? 'start' : 'space-between',
                        maxWidth: '250px',
                      }}
                    >
                      {weekdays.map(
                        (
                          weekday: { name: string; label: string },
                          index: number,
                        ) => (
                          <ListItem
                            sx={
                              index === weekdays.length - 1 ? {} : { mr: '3px' }
                            }
                          >
                            <Field
                              key={index}
                              type="checkbox"
                              name={weekday.name}
                              render={({ input: { checked, onChange } }) => (
                                <Checkbox
                                  checked={checked}
                                  onChange={onChange}
                                  icon={
                                    <WeekdayCheckbox
                                      isChecked={false}
                                      weekday={weekday.label}
                                    />
                                  }
                                  checkedIcon={
                                    <WeekdayCheckbox
                                      isChecked
                                      weekday={weekday.label}
                                    />
                                  }
                                />
                              )}
                            />
                          </ListItem>
                        ),
                      )}
                    </List>
                    <Divider sx={{ mb: '24px' }} />
                    <Typography sx={{ mb: '16px' }} className="Subtitle">
                      Centro medico
                    </Typography>
                    <List
                      sx={{
                        mb: '16px',
                      }}
                    >
                      <ListItem>
                        <Button
                          onClick={() =>
                            centers.forEach(
                              (center: { name: string; label: string }) =>
                                form.mutators.select(center.name),
                            )
                          }
                        >
                          Seleziona tutti
                        </Button>
                      </ListItem>
                      <Divider
                        className="ListItemDivider"
                        orientation="vertical"
                        flexItem
                      />
                      <ListItem>
                        <Button
                          sx={{ color: '#00838F' }}
                          onClick={() =>
                            centers.forEach(
                              (center: { name: string; label: string }) =>
                                form.mutators.clear(center.name),
                            )
                          }
                        >
                          Cancella tutto
                        </Button>
                      </ListItem>
                    </List>
                    {centers.map(
                      (
                        center: { name: string; label: string },
                        index: number,
                      ) => (
                        <Field
                          key={index}
                          name={center.name}
                          type="checkbox"
                          render={({ input: { checked, onChange } }) => (
                            <Tickbox
                              label={center.label}
                              isChecked={checked || false}
                              handleChange={onChange}
                            />
                          )}
                        />
                      ),
                    )}
                    <Divider sx={{ mt: '12px', mb: '24px' }} />
                    <Typography sx={{ mb: '16px' }} className="Subtitle">
                      Medico
                    </Typography>
                    <Field
                      name="medical"
                      render={({ input: { value, onChange } }) => (
                        <TextField
                          sx={{ mb: '18px' }}
                          type="text"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MagnifierIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Filtra per nome medico"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="staff"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label="Mostra solo medico generico di staff"
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Divider sx={{ mt: '12px', mb: '24px' }} />
                    <Typography sx={{ mb: '16px' }} className="Subtitle">
                      Convenzione
                    </Typography>
                    <Field
                      name="terms"
                      render={({ input: { value, onChange } }) => (
                        <TextField
                          sx={{ mb: '18px' }}
                          type="text"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MagnifierIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Filtra convenzioni per nome"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {['Unisalute', 'Allianz', 'Fondo salute'].map(
                      (field: string, index: number) => (
                        <Field
                          key={index}
                          name={field.split(' ')[0].toLowerCase()}
                          type="checkbox"
                          render={({ input: { checked, onChange } }) => (
                            <Tickbox
                              label={field}
                              isChecked={checked || false}
                              handleChange={onChange}
                            />
                          )}
                        />
                      ),
                    )}
                    <Divider sx={{ mt: '24px', mb: '24px' }} />
                    <Typography sx={{ mb: '16px' }} className="Subtitle">
                      Logistica
                    </Typography>
                    <Field
                      name="with_parking_lot"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label="Parcheggio in struttura"
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="close_to_subway"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label="Vicino alla metro"
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    {/* <Divider sx={{ mt: '24px', mb: '24px' }} />
                    <Field
                      name="morning_v2"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Mattina"
                              caption="Dalle 06:00 alle 12:59"
                            />
                          }
                          isSliderVisible
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="afternoon_v2"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Pomeriggio"
                              caption="Dalle 13:00 alle 17:59"
                            />
                          }
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    />
                    <Field
                      name="evening_v2"
                      type="checkbox"
                      render={({ input: { checked, onChange } }) => (
                        <Tickbox
                          label={
                            <ComplexLabel
                              title="Sera"
                              caption="Dalle 18:00 alle 21:00"
                            />
                          }
                          isChecked={checked || false}
                          handleChange={onChange}
                        />
                      )}
                    /> */}
                    <Button type="submit" className="Search">
                      Cerca
                    </Button>
                  </form>
                );
              }}
            />
          </Box>
          {isDesktop && <Divider orientation="vertical" flexItem />}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Filter;
