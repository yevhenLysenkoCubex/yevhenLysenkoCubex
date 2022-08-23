import Button from '@mui/material/Button';
import { ReactComponent as Google } from 'icons/google.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IBasicButtonProps {
  type: 'submit' | 'button';
  text: string;
  onButtonClick?: () => void;
  hasStartIcon?: boolean;
  isDisabled?: boolean;
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
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: '#D81B60',
            borderRadius: '16px',
            boxShadow: 'none',
            '&:hover': {
              color: '#FFFFFF',
              background: '#D81B60',
            },
            '&.Mui-disabled': {
              color: '#FFFFFF',
              background: '#90A4AE',
            },
            '&.Inverse': {
              fontWeight: 600,
              color: '#121A26',
              background: '#ffffff',
              border: '1px solid #B0BEC5',
            },
          },
          text: {
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#FFFFFF',
            textTransform: 'none',
          },
        },
      },
    },
  });
};

const BasicButton = (props: IBasicButtonProps): JSX.Element => {
  const { type, text, onButtonClick, hasStartIcon, isDisabled, styles } = props;

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Button
        sx={styles}
        className={hasStartIcon ? 'Inverse' : ''}
        type={type}
        // onClick={onButtonClick}
        // startIcon={hasStartIcon && <Google />}
        // disabled={isDisabled}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default BasicButton;
