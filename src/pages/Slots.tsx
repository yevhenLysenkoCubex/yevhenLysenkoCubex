import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ReactComponent as Arrow } from 'icons/slot-back-arrow.svg';
import { ReactComponent as Infinity } from 'icons/infinity.svg';
import { ReactComponent as Calendar } from 'icons/slot-calendar.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SocketContext } from 'App';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { updateAppointment } from 'redux/appointmentSlice';
import { updateQuery } from 'redux/querySlice';

import Picker from 'components/Date';
import DatePicker from 'react-datepicker';
import {
  format,
  parse,
  addDays,
  startOfToday,
  isWithinInterval,
} from 'date-fns';
import { it } from 'date-fns/locale';

interface IPickerHeaderProps {
  date: Date | null;
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,

            '&.Arrow': {
              position: 'absolute',
              top: '24px',
              left: '29px',
            },
            '&.Calendar': {
              width: '61px',
              height: '61px',
              background: '#F4F8FB',
              borderRadius: '18px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#263238',

            '&.Title': {
              marginBottom: '28px',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              textAlign: 'center',
            },
            '&.Destination': {
              paddingTop: '3px',
              fontSize: '14px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#212121;',
            },
            '&.Address': {
              fontSize: '12px',
              lineHeight: 1.5,
              color: '#607D8B',
              letterSpacing: '0.4px',
              textTransform: 'capitalize',
            },
            '&.Session': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#263238',
            },
            '&.Price': {
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
            },
            '&.Time': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              color: '#263238',
            },
            '&.Meta': {
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
            },
            '&.WeekDay': {
              fontWeight: 500,
              fontSize: '14px',
              color: '#607d8b',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              textTransform: 'capitalize',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '20px 16px',
            justifyContent: 'space-between',
            background: '#F4F8FB',
            borderRadius: '16px',
            '&:hover': {
              background: '#F4F8FB',
            },
            '&.Appointment': {
              padding: '10px 16px',
            },
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            height: '100vh',
            background: '#fff',
            overflow: 'scroll',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'space-around',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: 0,
            width: 'auto',
            marginLeft: '10px',
            marginRight: '15px',
          },
        },
      },
    },
  });
};

const getDays = (date: Date | null): any => {
  if (!date) return [];
  const day = Number(format(date, 'e')) - 1;

  switch (day) {
    case 1:
      return [{ start: date, end: addDays(date, 4) }];
    case 2:
      // return [{ start: subDays(date, 1), end: addDays(date, 3) }];
      return [
        { start: date, end: addDays(date, 3) },
        { start: addDays(date, 6), end: addDays(date, 6) },
      ];
    case 3:
      // return [{ start: subDays(date, 2), end: addDays(date, 2) }];
      return [
        { start: date, end: addDays(date, 2) },
        { start: addDays(date, 5), end: addDays(date, 6) },
      ];
    case 4:
      // return [{ start: subDays(date, 3), end: addDays(date, 1) }];
      return [
        { start: date, end: addDays(date, 1) },
        { start: addDays(date, 4), end: addDays(date, 6) },
      ];
    case 5:
      // return [{ start: subDays(date, 4), end: date }];
      return [
        { start: date, end: date },
        { start: addDays(date, 3), end: addDays(date, 6) },
      ];
    default:
      return [];
  }
};

const getWeekDays = (date: Date | null): any => {
  if (!date) return [];
  const day = Number(format(date, 'e')) - 1;

  switch (day) {
    case 1:
      return ['lun', 'mar', 'mer', 'gio', 'ven'];
    case 2:
      return ['mar', 'mer', 'gio', 'ven', 'lun'];
    case 3:
      return ['mer', 'gio', 'ven', 'lun', 'mar'];
    case 4:
      return ['gio', 'ven', 'lun', 'mar', 'mer'];
    case 5:
      return ['ven', 'lun', 'mar', 'mer', 'gio'];
    default:
      return [];
  }
};

// const required = ['lun', 'mar', 'mer', 'gio', 'ven'];

const getSelectedDate = (date: any) => {
  if (date.length === 0 || date === 'Prima possibile') {
    return format(new Date(), 'yyyy-MM-dd');
  }
  console.log(date, 'date');
  // const [, cut] = date.split(' ');
  // const parsed = parse(cut, 'dd/MM/yy', new Date());
  const formatted = format(date, 'yyyy-MM-dd');
  return formatted;
};

const PickerHeader = (props: IPickerHeaderProps) => {
  const weekDays = getWeekDays(props.date);

  return (
    <List>
      {weekDays.map((weekDay: string) => (
        <ListItem>
          <Typography className="WeekDay">{weekDay}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

const Slot = (): JSX.Element => {
  const date = useAppSelector(state => state.query.date);
  const query = useAppSelector(state => state.query);

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('session');
  const [selected, setSelected] = useState<any>(() => {
    if (date.length === 0 || date === 'Prima possibile') {
      // return parse('20/07/22', 'dd/MM/yy', new Date());
      return startOfToday();
    }
    const [, cut] = date.split(' ');
    const parsed = parse(cut, 'dd/MM/yy', new Date());
    return parsed;
  });
  const socket = useContext(SocketContext);
  const [mock, setMock] = useState<any>(null);
  const [slots, setSlots] = useState<any>(null);

  const category = query.testID;
  const answers = query.answers;
  const formatted = getSelectedDate(selected);
  const center = useAppSelector(state => state.appointment.center);
  const centerID = useAppSelector(state => state.appointment.centerID);
  const address = useAppSelector(state => state.appointment.address);
  const destination = useAppSelector(state => state.query.destination);
  const price = useAppSelector(state => state.appointment.price);

  useEffect(() => {
    setIsLoading(true);
    socket.emit(
      'find.slots',
      {
        location: [12.23, 15.57],
        service: {
          category,
          answers,
        },
        center: centerID,
        date: formatted,
      },
      (data: any) => {
        setIsLoading(false);
        setMock(data);
      },
    );
  }, [socket, selected, answers, formatted, category, centerID]);

  useEffect(() => {
    if (!mock || mock.length === 0) {
      return setSlots([{ time: 'N/A - N/A', id: 'N/A' }]);
    }
    const { slots: values } = mock[0];
    setSlots(
      values.slice().sort((a: any, b: any) => {
        return (
          Number(a.time.split('-')[0].split(':').join('')) -
          Number(b.time.split('-')[0].split(':').join(''))
        );
      }),
    );
  }, [mock]);

  // @ts-ignore
  const start = new Date(selected);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const days = getDays(start);

  // const setNewDate = (value: string) => {
  //   if (value.length === 0 || value === 'Prima possibile') {
  //     return setSelected(parse('20/07/22', 'dd/MM/yy', new Date()));
  //   }

  //   const [, cut] = value.split(' ');
  //   const parsed = parse(cut, 'dd/MM/yy', new Date());
  //   return setSelected(parsed);
  // };

  let navigate = useNavigate();
  const getBack = () => {
    if (content !== 'session') {
      setContent('session');
      return;
    }
    return navigate(-1);
  };

  const dispatch = useAppDispatch();
  const onAppointmentClick = (payload: {
    time: string;
    staff: string;
    price: string;
  }) => {
    dispatch(updateAppointment(payload));
    navigate('/details');
  };

  const handleDateChange = (date: any) => {
    if (date.length === 0 || date === 'Prima possibile') {
      const today = startOfToday();
      const formatted = `${format(today, 'EEEE', { locale: it })} ${format(
        today,
        'dd/MM/yy',
      )}`;
      dispatch(updateQuery(formatted));
      return setSelected(today);
    }

    const result = `${format(date, 'EEEE', { locale: it })} ${format(
      date,
      'dd/MM/yy',
    )}`;
    dispatch(updateQuery(result));
    setSelected(date);
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <Box sx={{ padding: '16px 0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton className="Arrow" onClick={getBack}>
              <Arrow />
            </IconButton>
            <Box sx={{ width: '185px' }}>
              {/* <Typography className="Title">
                {(() => {
                  switch (content) {
                    case 'single':
                      return 'Seleziona disponibilità';
                    case 'multiple':
                      return 'Seleziona le data della prima sessione';
                    default:
                      return 'Seleziona l’opzione';
                  }
                })()}
              </Typography> */}
              <Typography className="Title">Seleziona disponibilità</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                marginRight: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#D81B60',
                borderRadius: '12px',
              }}
            >
              <Infinity />
            </Box>
            <Box>
              <Typography className="Destination">{center}</Typography>
              <Typography className="Address">{`${address} - ${destination}`}</Typography>
            </Box>
          </Box>
          <Box>
            <Box
              mt="32px"
              sx={{
                maxWidth: '375px',
                display: 'flex',
                alignItems: 'center',
                '& > div': {
                  width: '75%',
                },
              }}
            >
              <DatePicker
                calendarClassName="custom-datepicker"
                selected={selected}
                onChange={handleDateChange}
                // weekDayClassName={date => {
                //   const day = format(date, 'eee', { locale: it });
                //   return required.includes(day) ? 'isWithin' : 'isNotWithin';
                // }}
                weekDayClassName={() => 'isNotWithin'}
                dayClassName={date =>
                  //@ts-ignore
                  isWithinInterval(date, ...days) ? 'isWithin' : 'isNotWithin'
                }
                renderCustomHeader={() => <PickerHeader date={start} />}
                includeDateIntervals={days}
                locale={it}
                inline
                minDate={startOfToday()}
              />
              <IconButton
                sx={{ marginLeft: 'auto' }}
                className="Calendar"
                onClick={() => setIsDatePickerOpen(true)}
              >
                <Calendar />
              </IconButton>
            </Box>
            {isLoading ? (
              <Box
                sx={{
                  mt: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress style={{ color: '#00838F' }} />
              </Box>
            ) : (
              slots && (
                <Stack mt="30px" spacing="12px">
                  {slots.map((slot: any) => (
                    <MenuItem
                      className="Appointment"
                      key={slot.id}
                      onClick={() => {
                        console.log(slot, 'slot');
                        onAppointmentClick({
                          time: slot.time.split('-')[0],
                          price,
                          staff: 'Dott. Luca Bianchi',
                        });
                      }}
                    >
                      <Typography className="Time">
                        {slot.time.split('-')[0]}
                      </Typography>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography className="Meta">
                          {slot.id === 'N/A' ? 'N/A' : price}
                        </Typography>
                        <Typography className="Meta">
                          {slot.id === 'N/A' ? 'N/A' : 'Dott. Luca Bianchi'}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Stack>
              )
            )}
          </Box>
        </Box>
        <Modal
          open={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          hideBackdrop
        >
          <Box sx={{ height: '100%' }}>
            <Picker
              onClose={() => setIsDatePickerOpen(false)}
              // onTextFieldChange={setNewDate}
              onDateChangeExpanded={handleDateChange}
              selected={`${format(selected, 'EEEE', { locale: it })} ${format(
                selected,
                'dd/MM/yy',
              )}`}
            />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Slot;
