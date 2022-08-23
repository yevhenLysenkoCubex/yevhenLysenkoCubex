import React, {
  useContext,
  useState,
  useEffect,
  Fragment,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { parse, format, areIntervalsOverlapping } from 'date-fns';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from 'icons/logo-alternative.svg';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { ReactComponent as FilterIcon } from 'icons/filter.svg';
import { ReactComponent as Map } from 'icons/map-alternative.svg';
import { ReactComponent as Arrow } from 'icons/arrow-down.svg';
import { ReactComponent as ListCheck } from 'icons/list-check.svg';
import { ReactComponent as ArrowLeftCircle } from 'icons/arrow-left-circle.svg';
import { ReactComponent as ArrowRightCircle } from 'icons/arrow-right-circle.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SocketContext } from 'App';
import { useAppSelector } from 'redux/hooks';
import { useJsApiLoader } from '@react-google-maps/api';

import Card from 'components/Card';
import Filter from 'components/Filter';
import NoResults from 'components/NoResults';
import Suggested from 'components/Suggested';
import Header from 'components/Desktop/Header';

import GoogleMap from 'components/Map';

import { FIND_SERVICE_CATEGORY_BY_ID } from 'services/categories';

import { getFilter } from 'redux/filter/selectors';

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

// TODO: Add "suggested"!

const KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const theme = createTheme();
const getMuiTheme = () => {
  return createTheme(theme, {
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
            '&.Actions': {
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              [theme.breakpoints.up('lg')]: {
                marginBottom: 0,
              },
            },
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
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Query': {
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#263238',
            },
            '&.Meta': {
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#263238',
              textTransform: 'capitalize',
            },
            '&.CentersQuantity': {
              fontWeight: 800,
              fontSize: '24px',
              lineHeight: 1.3,
              color: '#263238',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '9px 16px',
            fontFamily: 'inherit',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 1.4,
            letterSpacing: '0.3px',
            textTransform: 'none',
            color: '#607D8B',
            border: '1px solid #B0BEC5',
            borderRadius: '12px',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            // marginBottom: '12px',
            borderColor: '#B0BEC5',
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
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
    },
  });
};

const getSelectedDate = (date: string) => {
  if (date.length === 0 || date === 'Prima possibile') {
    return format(new Date(), 'yyyy-MM-dd');
  }

  const [, cut] = date.split(' ');
  const parsed = parse(cut, 'dd/MM/yy', new Date());
  const formatted = format(parsed, 'yyyy-MM-dd');
  return formatted;
};

const Results = () => {
  const socket = useContext(SocketContext);
  const query = useAppSelector(state => state.query);
  const [mock, setMock] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<any>({
    isOpen: false,
    content: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const test = query.test;
  const category = query.testID;
  const answers = query.answers;
  const suggested = query.suggested;

  const { data: sugMeta } = useQuery(FIND_SERVICE_CATEGORY_BY_ID, {
    fetchPolicy: 'network-only',
    variables: {
      id: suggested,
    },
    skip: !Boolean(suggested),
  });

  const formatted = getSelectedDate(query.date);

  // Views: 'list' || 'map'
  const [view, setView] = useState('list');

  let navigate = useNavigate();
  const goBack = () => navigate(-1);

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
        date: formatted,
      },
      (data: any) => {
        setIsLoading(false);
        setMock(data);
      },
    );
  }, [socket, formatted, category, answers]);

  console.log(mock, 'mock');

  const isMapLoaded = useJsApiLoader({
    id: 'oc-map',
    googleMapsApiKey: KEY ?? '',
    language: 'it',
  });

  const [curr, setCurr] = useState(0);

  const isDesktop = useMediaQuery('(min-width:1200px)');

  const dest = query.destination;
  const date = query.date;

  const filter = useAppSelector(getFilter);

  const getResults = (res: any, fil: any) => {
    const keys = Object.keys(fil);
    const filter: any = {};
    let filtered = [];

    for (const key of keys) {
      const nested = fil[key];

      if (Object.values(nested).some(val => val === true)) {
        const interm: any = {};
        const nkeys = Object.keys(nested);
        for (const nkey of nkeys) {
          if (nested[nkey] === true) {
            interm[nkey] = nested[nkey];
          }
        }

        filter[key] = interm;
      }
    }

    console.log(filter, 'filter');

    if (Object.entries(filter).length === 0) {
      return res;
    }

    if (filter.hasOwnProperty('centers')) {
      const required = Object.keys(filter['centers']);
      filtered = res?.filter((opt: any) => {
        const label = opt.center.name;
        const split = label.split(' ');
        const name =
          split.length === 1
            ? label.toLowerCase()
            : split[split.length - 1].toLowerCase();
        return required.includes(name);
      });
    }

    if (filter.hasOwnProperty('timeframe')) {
      const required = Object.keys(filter['timeframe']);
      console.log(required, 'required');

      const dictionary: any = {
        morning: { start: '06:00', end: '12:59' },
        afternoon: { start: '13:00', end: '17:59' },
        evening: { start: '18:00', end: '21:00' },
        morningTillEvening: { start: '06:00', end: '21:00' },
      };

      console.log(dictionary[required[0]]);

      filtered = (filter.hasOwnProperty('centers') ? filtered : res)
        ?.map((opt: any) => {
          return {
            ...opt,
            slots: opt.slots.filter((slot: any) => {
              const [start, end] = slot.time.split(' - ');
              const [, cut] = date.split(' ');

              return required.length === 1
                ? areIntervalsOverlapping(
                    {
                      start: parse(
                        `${cut}/${start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(`${cut}/${end}`, 'dd/MM/yy/HH:mm', new Date()),
                    },
                    {
                      start: parse(
                        `${cut}/${dictionary[required[0]].start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(
                        `${cut}/${dictionary[required[0]].end}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                    },
                  )
                : required.length === 2
                ? areIntervalsOverlapping(
                    {
                      start: parse(
                        `${cut}/${start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(`${cut}/${end}`, 'dd/MM/yy/HH:mm', new Date()),
                    },
                    {
                      start: parse(
                        `${cut}/${dictionary[required[0]].start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(
                        `${cut}/${dictionary[required[0]].end}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                    },
                  ) ||
                  areIntervalsOverlapping(
                    {
                      start: parse(
                        `${cut}/${start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(`${cut}/${end}`, 'dd/MM/yy/HH:mm', new Date()),
                    },
                    {
                      start: parse(
                        `${cut}/${dictionary[required[1]].start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(
                        `${cut}/${dictionary[required[1]].end}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                    },
                  )
                : areIntervalsOverlapping(
                    {
                      start: parse(
                        `${cut}/${start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(`${cut}/${end}`, 'dd/MM/yy/HH:mm', new Date()),
                    },
                    {
                      start: parse(
                        `${cut}/${dictionary['morningTillEvening'].start}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                      end: parse(
                        `${cut}/${dictionary['morningTillEvening'].end}`,
                        'dd/MM/yy/HH:mm',
                        new Date(),
                      ),
                    },
                  );
            }),
          };
        })
        .filter((opt: any) => opt.slots.length > 0);
    }

    return filtered;
  };

  console.log(getResults(mock, filter), 'getResults(filter)');

  const data = useMemo(() => getResults(mock, filter), [mock, filter]);

  console.log(data, 'test');

  console.log(
    parse('26/08/22-07:15', 'dd/MM/yy-HH:mm', new Date()),
    'converted',
  );

  const overlap = areIntervalsOverlapping(
    {
      start: parse('26/08/22-12:00', 'dd/MM/yy-HH:mm', new Date()),
      end: parse('26/08/22-12:15', 'dd/MM/yy-HH:mm', new Date()),
    },
    {
      start: parse('26/08/22-06:00', 'dd/MM/yy-HH:mm', new Date()),
      end: parse('26/08/22-11:59', 'dd/MM/yy-HH:mm', new Date()),
    },
  );

  console.log(overlap, 'overlap');
  const quantity = data && data.length;

  // const [sort, setSort] = useState({ val: 'none', dir: 'asc' });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      {isDesktop ? (
        <Header
          isQueryShown
          test={test}
          dest={dest}
          date={date}
          onQueryClick={goBack}
        />
      ) : (
        <Container>
          <Box
            sx={{
              marginBottom: '16px',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Logo />
            <Box
              sx={{
                width: '100%',
                marginLeft: '27px',
                padding: '9px 0px 9px 18px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #B0BEC5',
                borderRadius: '16px',
              }}
              onClick={goBack}
            >
              <Magnifier style={{ marginRight: '12px' }} />
              <List>
                <ListItem>
                  <Typography className="Query">{test}</Typography>
                </ListItem>
                <ListItem>
                  <Typography className="Meta">{`${query.destination} - ${query.date}`}</Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Container>
      )}
      <Container>
        <Box
          sx={
            isDesktop
              ? {
                  pt: '46px',
                  pb: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              : {}
          }
        >
          {isDesktop && data && (
            <Typography className="CentersQuantity">{`${quantity} centri trovati`}</Typography>
          )}
          <List className="Actions">
            {!isDesktop && (
              <ListItem>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() =>
                    setIsModalOpen({ isOpen: true, content: 'filter' })
                  }
                  disabled={!mock || mock.length === 0}
                >
                  Filtri
                </Button>
              </ListItem>
            )}
            <ListItem sx={isDesktop ? { mr: '8px' } : {}}>
              <Button
                variant="outlined"
                startIcon={view === 'list' ? <Map /> : <ListCheck />}
                onClick={() =>
                  view === 'list' ? setView('map') : setView('list')
                }
                disabled={!mock || mock.length === 0}
              >
                {view === 'list' ? 'Mappa' : 'Lista'}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={view === 'map' ? { visibility: 'hidden' } : {}}
                variant="outlined"
                startIcon={<Arrow />}
                disabled={!mock || mock.length === 0}
              >
                Ordina
              </Button>
            </ListItem>
          </List>
        </Box>
      </Container>
      {!isDesktop && <Divider />}
      {isDesktop ? (
        <Container>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Filter />
            </Grid>
            <Grid sx={{ pl: '24px' }} item xs={9}>
              {view === 'list' ? (
                isLoading ? (
                  <Box
                    sx={{
                      mt: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress style={{ color: '#00838F' }} />
                  </Box>
                ) : mock && mock.length === 0 ? (
                  <NoResults />
                ) : (
                  <Fragment>
                    {/* {sugMeta && (
                      <Suggested
                        query={test}
                        suggested={sugMeta?.findServiceCategoryById?.name}
                      />
                    )} */}
                    {mock &&
                      data.map((data: any, index: number) => {
                        const {
                          center: { id, name, address },
                          distance,
                          price,
                          slots,
                        } = data;
                        const [slot] = slots;
                        return (
                          <ListItem key={id} sx={{ mb: '20px' }}>
                            <Card
                              id={id}
                              key={id}
                              slot={slot}
                              destination={name}
                              address={address}
                              distance={distance}
                              price={price}
                              styles={isDesktop ? { width: '100%' } : {}}
                            />
                          </ListItem>
                        );
                      })}
                  </Fragment>
                )
              ) : (
                <Box sx={{ overflow: 'hidden' }}>
                  {isMapLoaded ? (
                    <GoogleMap
                      idx={curr}
                      center={{ lat: 45.47, lng: 9.19 }}
                      // testingCenters={mock}
                      testingCenters={data}
                      onMarkerClick={setCurr}
                    />
                  ) : (
                    <CircularProgress />
                  )}
                  <Box
                    sx={{
                      p: '15px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <List
                      sx={{
                        mb: '12px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                      }}
                    >
                      <ListItem sx={{ mr: '12px' }}>
                        <IconButton
                          onClick={() => {
                            if (curr === 0) {
                              setCurr(mock.length - 1);
                            } else {
                              setCurr(prev => prev - 1);
                            }
                          }}
                        >
                          <ArrowLeftCircle />
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        <IconButton
                          onClick={() => {
                            if (curr === mock.length - 1) {
                              setCurr(0);
                            } else {
                              setCurr(prev => prev + 1);
                            }
                          }}
                        >
                          <ArrowRightCircle />
                        </IconButton>
                      </ListItem>
                    </List>
                    <List
                      sx={{
                        display: 'flex',
                        transform: `translateX(${-325 * curr}px)`,
                        transition: 'transform 500ms linear',
                      }}
                    >
                      {data &&
                        data.map((data: any, index: number) => {
                          const {
                            center: { id, name, address },
                            distance,
                            price,
                            slots,
                          } = data;
                          const [slot] = slots;
                          return (
                            <ListItem
                              key={id}
                              sx={{ flexShrink: 0, width: '325px', mr: '12px' }}
                            >
                              <Card
                                id={id}
                                key={id}
                                slot={slot}
                                destination={name}
                                address={address}
                                distance={distance}
                                price={price}
                                styles={
                                  index === curr
                                    ? {
                                        border: '1px solid #000000',
                                        width: '100%',
                                      }
                                    : {
                                        width: '100%',
                                      }
                                }
                              />
                            </ListItem>
                          );
                        })}
                    </List>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      ) : view === 'list' ? (
        isLoading ? (
          <Container>
            <Box
              sx={{
                mt: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress style={{ color: '#00838F' }} />
            </Box>
          </Container>
        ) : mock && mock.length === 0 ? (
          <Container sx={{ pt: '12px' }}>
            <NoResults />
          </Container>
        ) : (
          <Fragment>
            {sugMeta && (
              <Suggested
                query={test}
                suggested={sugMeta?.findServiceCategoryById?.name}
              />
            )}
            <Container sx={{ pt: '12px' }}>
              {data &&
                data.map((data: any) => {
                  const {
                    center: { id, name, address },
                    distance,
                    price,
                    slots,
                  } = data;
                  const [slot] = slots;
                  return (
                    <Box key={id} sx={{ mb: '20px' }}>
                      <Card
                        id={id}
                        key={id}
                        slot={slot}
                        destination={name}
                        address={address}
                        distance={distance}
                        price={price}
                      />
                    </Box>
                  );
                })}
            </Container>
          </Fragment>
        )
      ) : (
        <Box sx={{ overflow: 'hidden' }}>
          {isMapLoaded ? (
            <GoogleMap
              idx={curr}
              center={{ lat: 45.47, lng: 9.19 }}
              testingCenters={data}
              onMarkerClick={setCurr}
            />
          ) : (
            <CircularProgress />
          )}
          <Box
            sx={{ p: '15px 24px', display: 'flex', flexDirection: 'column' }}
          >
            <List sx={{ mb: '12px', display: 'flex', alignSelf: 'flex-end' }}>
              <ListItem sx={{ mr: '12px' }}>
                <IconButton
                  onClick={() => {
                    if (curr === 0) {
                      setCurr(mock.length - 1);
                    } else {
                      setCurr(prev => prev - 1);
                    }
                  }}
                >
                  <ArrowLeftCircle />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton
                  onClick={() => {
                    if (curr === mock.length - 1) {
                      setCurr(0);
                    } else {
                      setCurr(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowRightCircle />
                </IconButton>
              </ListItem>
            </List>
            <List
              sx={{
                display: 'flex',
                transform: `translateX(${-325 * curr}px)`,
                transition: 'transform 500ms linear',
              }}
            >
              {data &&
                data.map((data: any, index: number) => {
                  const {
                    center: { id, name, address },
                    distance,
                    price,
                    slots,
                  } = data;
                  const [slot] = slots;
                  return (
                    <ListItem
                      key={id}
                      sx={{ flexShrink: 0, width: '325px', mr: '12px' }}
                    >
                      <Card
                        id={id}
                        key={id}
                        slot={slot}
                        destination={name}
                        address={address}
                        distance={distance}
                        price={price}
                        styles={
                          index === curr
                            ? {
                                border: '1px solid #000000',
                                width: '100%',
                              }
                            : {
                                width: '100%',
                              }
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Box>
      )}
      {/* {view === 'list' ? (
        isLoading ? (
          <Container>
            <Box
              sx={{
                mt: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress style={{ color: '#00838F' }} />
            </Box>
          </Container>
        ) : mock && mock.length === 0 ? (
          <Container sx={{ pt: '12px' }}>
            <NoResults />
          </Container>
        ) : (
          <Fragment>
            {sugMeta && (
              <Suggested
                query={test}
                suggested={sugMeta?.findServiceCategoryById?.name}
              />
            )}
            <Container sx={{ pt: '12px' }}>
              {data &&
                data.map((data: any) => {
                  const {
                    center: { id, name, address },
                    distance,
                    price,
                    slots,
                  } = data;
                  const [slot] = slots;
                  return (
                    <Box key={id} sx={{ mb: '20px' }}>
                      <Card
                        id={id}
                        key={id}
                        slot={slot}
                        destination={name}
                        address={address}
                        distance={distance}
                        price={price}
                      />
                    </Box>
                  );
                })}
            </Container>
          </Fragment>
        )
      ) : (
        <Box sx={{ overflow: 'hidden' }}>
          {isMapLoaded ? (
            <GoogleMap
              idx={curr}
              center={{ lat: 45.47, lng: 9.19 }}
              testingCenters={data}
              onMarkerClick={setCurr}
            />
          ) : (
            <CircularProgress />
          )}
          <Box
            sx={{ p: '15px 24px', display: 'flex', flexDirection: 'column' }}
          >
            <List sx={{ mb: '12px', display: 'flex', alignSelf: 'flex-end' }}>
              <ListItem sx={{ mr: '12px' }}>
                <IconButton
                  onClick={() => {
                    if (curr === 0) {
                      setCurr(mock.length - 1);
                    } else {
                      setCurr(prev => prev - 1);
                    }
                  }}
                >
                  <ArrowLeftCircle />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton
                  onClick={() => {
                    if (curr === mock.length - 1) {
                      setCurr(0);
                    } else {
                      setCurr(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowRightCircle />
                </IconButton>
              </ListItem>
            </List>
            <List
              sx={{
                display: 'flex',
                transform: `translateX(${-325 * curr}px)`,
                transition: 'transform 500ms linear',
              }}
            >
              {data &&
                data.map((data: any, index: number) => {
                  const {
                    center: { id, name, address },
                    distance,
                    price,
                    slots,
                  } = data;
                  const [slot] = slots;
                  return (
                    <ListItem
                      key={id}
                      sx={{ flexShrink: 0, width: '325px', mr: '12px' }}
                    >
                      <Card
                        id={id}
                        key={id}
                        slot={slot}
                        destination={name}
                        address={address}
                        distance={distance}
                        price={price}
                        styles={
                          index === curr
                            ? {
                                border: '1px solid #000000',
                                width: '100%',
                              }
                            : {
                                width: '100%',
                              }
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Box>
      )} */}
      <Modal
        open={isModalOpen.isOpen}
        onClose={() => setIsModalOpen({ isOpen: false, content: 'null' })}
        hideBackdrop
        closeAfterTransition
      >
        <Box
          sx={{
            height: '100%',
          }}
        >
          {(() => {
            switch (isModalOpen.content) {
              case 'filter':
                return (
                  <Filter
                    handleClose={() =>
                      setIsModalOpen({ isOpen: false, content: 'null' })
                    }
                  />
                );
              case 'map':
                return isMapLoaded && <CircularProgress />;
            }
          })()}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Results;
