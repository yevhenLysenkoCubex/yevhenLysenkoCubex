import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ReactComponent as Infinity } from 'icons/infinity.svg';
import { ReactComponent as ArrowRight } from 'icons/arrow-right.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { parse, format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useAppDispatch } from 'redux/hooks';
import { updateAppointment } from 'redux/appointmentSlice';

interface ISlot {
  date: string;
  time: string;
  bookingInfo: object;
}

interface ICardProps {
  id: string;
  slot: ISlot;
  destination: string;
  address: string;
  distance: string;
  price: number;
  styles?: object;
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
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.Destination': {
              paddingTop: '3px',
              fontSize: '14px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#212121',
              [theme.breakpoints.up('lg')]: {
                paddingTop: 0,
                fontSize: '16px',
                lineHeight: 1.5,
                letterSpacing: '0.2px',
              },
            },
            '&.Address': {
              fontSize: '12px',
              lineHeight: 1.5,
              color: '#607D8B',
              letterSpacing: '0.4px',
              textTransform: 'capitalize',
            },
            '&.Distance': {
              marginLeft: 'auto',
              fontSize: '14px',
              lineHeight: 1.4,
              color: '#607D8B',
              letterSpacing: '0.3px',
            },
            '&.Date': {
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#263238',
              textTransform: 'capitalize',
            },
            '&.Price': {
              paddingLeft: '9px',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.2px',
              color: '#263238',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Action': {
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
    },
  });
};

const Card = (props: ICardProps): JSX.Element => {
  const { id, slot, destination, address, distance, price, styles } = props;

  const { date } = slot;
  // const parsed = parse(date, 'dd/MM/yyyy', new Date());

  const parsed = parse(date, 'yyyy-MM-dd', new Date());
  const month = format(parsed, 'LLLL', { locale: it });
  const day = `${format(parsed, 'EEEE', { locale: it })}, ${format(
    parsed,
    'dd',
  )}`;
  const formatted = `${day} ${month}`;

  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  const onCardClick = (
    ID: string,
    destination: string,
    address: string,
    price: number,
  ) => {
    const payload = {
      centerID: ID,
      center: destination,
      address,
      price: `${price.toFixed(2)}€`,
    };
    dispatch(updateAppointment(payload));
    navigate(`/results/${ID}`);
  };

  const isDesktop = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Box
        sx={{
          // width: '100%',
          padding: isDesktop ? '16px' : '8px',
          background: '#F4F8FB;',
          borderRadius: '20px',
          ...styles,
        }}
      >
        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
          <Box
            sx={{
              minWidth: isDesktop ? '40px' : '36px',
              height: isDesktop ? '40px' : '36px',
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
            <Typography className="Destination">{destination}</Typography>
            <Typography className="Address">{address}</Typography>
          </Box>
          <Typography className="Distance">{distance}</Typography>
        </Box>
        <Box
          sx={{
            width: '205px',
            margin: '0 auto 10px auto',
            padding: '2px',
            textAlign: 'center',
            border: '1px solid #B0BEC5',
            borderRadius: '6px',
          }}
        >
          <Typography className="Date">{formatted}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography className="Price">{`da ${price.toFixed(2)}€`}</Typography>
          <Button
            className="Action"
            endIcon={<ArrowRight />}
            onClick={() => onCardClick(id, destination, address, price)}
          >
            Vedi orari
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Card;
