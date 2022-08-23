import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { ReactComponent as Close } from 'icons/close.svg';
import { ReactComponent as Cleaner } from 'icons/cleaner.svg';
import { ReactComponent as Arrow } from 'icons/slot-back-arrow.svg';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { ReactComponent as MenuArrow } from 'icons/menu-arrow.svg';
import { ReactComponent as RadioUnchecked } from 'icons/radio.svg';
import { ReactComponent as RadioChecked } from 'icons/radio-checked.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FIND_SERVICE_CATEGORIES } from 'services/categories';

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any;
  }
}

interface ITestProps {
  onClose: () => void;
  onTextFieldChange: (value: string) => void;
  passTestID: (value: string) => void;
  passAnswers: (value: string[]) => void;
  passSuggested: (value: string) => void;
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
            '&.ArrowIcon': {
              position: 'absolute',
              top: '24px',
              left: '29px',

              [theme.breakpoints.up('lg')]: {
                left: '24px',
                width: '24px',
                height: '24px',
              },
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            color: '#263238',

            '&.SearchTitle': {
              textAlign: 'center',
            },
            '&.ListTitle': {
              marginBottom: '16px',
              [theme.breakpoints.up('lg')]: {
                marginBottom: '8px',
                paddingTop: '26px',
                paddingLeft: '17px',
              },
            },
            '&.QuestionsListTitle': {
              fontSize: '24px',
              lineHeight: 1.3,

              [theme.breakpoints.up('lg')]: {
                fontSize: '18px',
                lineHeight: 1.35,
                textAlign: 'center',
                letterSpacing: '0.2px',
              },
            },
            '&.QuestionsListSubtitle': {
              fontWeight: 400,
              letterSpacing: '0.3px',
              color: '#607D8B',
            },
            '&.TestChosen': {
              fontSize: '20px',
              lineHeight: 1.35,
              letterSpacing: '0.2px',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '100%',

            [theme.breakpoints.up('lg')]: {
              width: '297px',
            },

            '&.Radio': {
              '&:first-of-type': {
                marginBottom: '28px',
              },
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

            [theme.breakpoints.up('lg')]: {
              paddingRight: '22px',
            },
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
      MuiModal: {
        styleOverrides: {
          root: {
            height: '100vh',
            overflow: 'auto',
            background: '#FFFFFF',

            [theme.breakpoints.up('lg')]: {
              position: 'absolute',
              left: 'calc(100% + 25px)',
              width: '415px',
              height: 'fit-content',
              overflow: 'hidden',
              borderRadius: '20px',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '14px',
            lineHeight: 1.2,
            color: '#607D8B',
            '&.Mui-focused': {
              color: '#607D8B',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
            '&.Radio': {
              '&:not(:last-of-type)': {
                marginBottom: '24px',
              },
            },
          },
          label: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#607D8B',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            padding: '0px 16px 0px 0px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            marginTop: '24px',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: '#D81B60',
            borderRadius: '16px',
            '&:hover': {
              background: '#D81B60',
            },
            '&.Mui-disabled': {
              background: '#90A4AE',
              color: '#ffffff',
            },
          },
          text: {
            fontFamily: 'Manrope',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            textTransform: 'none',
            color: '#ffffff',
          },
        },
      },
    },
  });
};

const Test = (props: ITestProps): JSX.Element => {
  const { onClose, onTextFieldChange, passSuggested, passTestID } = props;

  const { loading, data } = useQuery(FIND_SERVICE_CATEGORIES, {
    fetchPolicy: 'network-only',
  });

  const [value, setValue] = useState('');
  const [testID, setTestID] = useState('');
  const isFieldEmpty = value.trim().length === 0;
  const hints = data?.findServiceCategories.filter((request: any) =>
    request.name.toLowerCase().includes(value.toLowerCase()),
  );

  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);

  console.log(data?.findServiceCategories);

  const [answers, seAnswers] = useState<any>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    seAnswers((prev: any) => ({
      ...prev,
      [event.target.name]: (event.target as HTMLInputElement).value,
    }));
  };
  console.log(answers, 'test');

  const isDesktop = useMediaQuery('(min-width:1200px)');

  const onQuestionsModalClose = (event: any, reason: any) => {
    console.log(reason, 'reason');
    console.log(event.target);
    setIsQuestionsModalOpen(false);
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ position: 'relative' }} className="bare">
        {!isDesktop && (
          <Box sx={{ paddingTop: '16px' }}>
            <IconButton className="CloseIcon" onClick={onClose}>
              <Close />
            </IconButton>
            <Typography className="SearchTitle">Cerca prestazione</Typography>
          </Box>
        )}
        <Box sx={{ marginTop: isDesktop ? '0px' : '28px' }}>
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
                    onClick={() => {
                      setValue('');
                      setIsQuestionsModalOpen(false);
                    }}
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
            disabled={loading}
          />
        </Box>
        <Box id="desktop-modal-container">
          {isFieldEmpty ? (
            <Box
              sx={{
                marginTop: isDesktop ? '11px' : '32px',
                ...(isDesktop
                  ? {
                      width: '360px',
                      maxHeight: '330px',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '0px',
                      },
                      border: '1px solid #121A26',
                      borderRadius: '20px',
                      boxShadow: isQuestionsModalOpen
                        ? 'none'
                        : '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }
                  : { paddingBottom: '16px' }),
              }}
            >
              <Typography className="ListTitle">Le più cercate</Typography>
              <Stack sx={{ overflowX: 'hidden' }} divider={<Divider />}>
                {loading
                  ? Array.from({ length: 4 }, (_, i) => i).map(value => (
                      <Skeleton key={value} animation="wave" height="65px" />
                    ))
                  : data.findServiceCategories.map(
                      (service: any, idx: number) => (
                        <MenuItem
                          key={idx}
                          onClick={() => {
                            setValue(service.name);
                            setTestID(service.id);
                            // onTextFieldChange(service.name);
                            // props.passTestID(service.id);

                            if (service.suggested) {
                              passSuggested(service.suggested);
                            }

                            if (service.questions.length === 0) {
                              onTextFieldChange(service.name);
                              passTestID(service.id);
                              onClose();
                              return;
                            }

                            setIsQuestionsModalOpen(true);

                            // service.questions.length === 0
                            //   ? onClose()
                            //   : setIsQuestionsModalOpen(true);
                          }}
                          disabled={isQuestionsModalOpen}
                        >
                          <ListItemText>{service.name}</ListItemText>
                          <ListItemIcon className="ArrowIcon">
                            <MenuArrow />
                          </ListItemIcon>
                        </MenuItem>
                      ),
                    )}
              </Stack>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: isDesktop ? '11px' : '12px',
                ...(isDesktop
                  ? {
                      // padding: '26px 17px 0px',
                      width: '360px',
                      minHeight: '60px',
                      maxHeight: '330px',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '0px',
                      },
                      border: '1px solid #121A26',
                      borderRadius: '20px',
                      boxShadow: isQuestionsModalOpen
                        ? 'none'
                        : '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }
                  : { paddingBottom: '16px' }),
              }}
            >
              <Stack divider={<Divider />}>
                {hints.length === 0 && (
                  <MenuItem disabled>
                    <ListItemText>
                      Nessun esame corrisponde alla ricerca
                    </ListItemText>
                  </MenuItem>
                )}
                {hints.map((hint: any, idx: number) => (
                  <MenuItem
                    sx={{
                      '&:first-of-type': {
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                      },
                    }}
                    key={idx}
                    onClick={() => {
                      setValue(hint.name);
                      setTestID(hint.id);

                      if (hint.suggested) {
                        passSuggested(hint.suggested);
                      }

                      if (hint.questions.length === 0) {
                        onTextFieldChange(hint.name);
                        passTestID(hint.id);
                        onClose();
                        return;
                      }

                      setIsQuestionsModalOpen(true);
                    }}
                    disabled={isQuestionsModalOpen}
                  >
                    <ListItemText>{hint.name}</ListItemText>
                    <ListItemIcon className="ArrowIcon">
                      <MenuArrow />
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
        <Modal
          sx={isDesktop ? { pb: '25px' } : {}}
          open={isQuestionsModalOpen}
          onClose={onQuestionsModalClose}
          container={() =>
            isDesktop
              ? document.getElementById('desktop-modal-container')
              : document.body
          }
          hideBackdrop
        >
          <Box
            sx={{
              height: isDesktop ? 'auto' : '100%',
              background: '#FFFFFF',
              padding: isDesktop ? '24px' : '0px 24px 12px',
              borderRadius: '20px',

              border: isDesktop ? '1px solid #263238' : 'none',
            }}
          >
            <IconButton
              className="ArrowIcon"
              onClick={() => setIsQuestionsModalOpen(false)}
            >
              <Arrow />
            </IconButton>
            <Typography
              sx={{
                pt: isDesktop ? '0px' : '80px',
                mb: isDesktop ? '24px' : '8px',
              }}
              className="QuestionsListTitle"
            >
              Dettagli prenotazione
            </Typography>
            <Typography sx={{ mb: '24px' }} className="QuestionsListSubtitle">
              Per trovare la disponibilità più corretta abbiamo bisogno di
              qualche dato in più
            </Typography>
            <Typography sx={{ mb: '24px' }} className="TestChosen">
              {value}
            </Typography>
            {data?.findServiceCategories
              .find((service: any) => service.id === testID)
              ?.questions.map((question: any) => (
                <FormControl key={question.id} className="Radio">
                  <FormLabel sx={{ mb: '20px' }}>{question.question}</FormLabel>
                  <RadioGroup
                    name={question.name}
                    value={answers[question.name]}
                    onChange={handleChange}
                  >
                    {question.options.map((option: any) => (
                      <FormControlLabel
                        className="Radio"
                        key={option.id}
                        value={option.id}
                        control={
                          <Radio
                            icon={<RadioUnchecked />}
                            checkedIcon={<RadioChecked />}
                          />
                        }
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ))}
            <Button
              sx={{ mt: isDesktop ? '8px' : '38px' }}
              type="submit"
              size="large"
              onClick={() => {
                onTextFieldChange(value);
                passTestID(testID);
                props.passAnswers(Object.values(answers));
                onClose();
              }}
            >
              Cerca
            </Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Test;
