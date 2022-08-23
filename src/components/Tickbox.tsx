import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactComponent as IsChecked } from 'icons/isChecked.svg';
import { ReactComponent as IsNotChecked } from 'icons/isNotChecked.svg';
// import { ReactComponent as SliderThumbIcon } from 'icons/slider-thumb.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ITickboxProps {
  label: string | React.ReactNode;
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSliderVisible?: boolean;
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
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '0px 12px 0px 0px',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            width: '100%',
            margin: 'auto 0px',
          },
          label: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.2px',
            color: '#263238',
            [theme.breakpoints.up('lg')]: {
              fontWeight: 400,
              fontSize: '12px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.FormLabelTitle': {
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1.2,
              [theme.breakpoints.up('lg')]: {
                fontSize: '12px',
              },
            },
            '&.FormLabelCaption': {
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: 1.5,
              letterSpacing: '0.4px',
              color: '#607D8B',
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          track: {
            display: 'none',
          },
          rail: {
            height: '4px',
            opacity: 1,
            background: '#CFD8DC',
            borderRadius: '50px',
          },
          thumb: {
            width: '16px',
            height: '16px',
            background: '#121A26',
            border: '4px solid #FFFFFF',
            '&.Mui-active': {
              boxShadow: '1px 2px 16px rgba(18, 26, 38, 0.16)',
            },
            '&.Mui-disabled': {
              display: 'none',
            },
          },
        },
      },
    },
  });
};

const Tickbox = (props: ITickboxProps): JSX.Element => {
  const { label, isChecked, isSliderVisible, handleChange } = props;

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <FormControlLabel
        sx={{ mb: '12px' }}
        value=""
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            icon={<IsNotChecked />}
            checkedIcon={<IsChecked />}
          />
        }
        label={label}
        labelPlacement="end"
      />
      {isSliderVisible && <Slider disabled={!isChecked} components={{}} />}
    </ThemeProvider>
  );
};

export default Tickbox;
