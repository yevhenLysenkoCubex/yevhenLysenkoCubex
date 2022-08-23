// import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ReactComponent as Close } from 'icons/close.svg';
import { ReactComponent as MenuArrow } from 'icons/menu-arrow.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IMenuProps {
  onClose: () => void;
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
            position: 'absolute',
            top: '16px',
            left: '24px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.MenuTitle': {
              marginBottom: '60px',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: 0,
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

const Menu = (props: IMenuProps): JSX.Element => {
  const { onClose } = props;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container>
        <Box sx={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <Typography className="MenuTitle">Menu</Typography>
          <Stack divider={<Divider />}>
            <MenuItem>
              <ListItemText>Login</ListItemText>
              <ListItemIcon className="ArrowIcon">
                <MenuArrow />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>Le mie prenotazioni</ListItemText>
              <ListItemIcon className="ArrowIcon">
                <MenuArrow />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>Chi è OneCheck</ListItemText>
              <ListItemIcon className="ArrowIcon">
                <MenuArrow />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>Come funziona</ListItemText>
              <ListItemIcon className="ArrowIcon">
                <MenuArrow />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>Assistenza</ListItemText>
              <ListItemIcon className="ArrowIcon">
                <MenuArrow />
              </ListItemIcon>
            </MenuItem>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Menu;
