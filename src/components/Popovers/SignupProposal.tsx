import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Popover from 'components/Popovers/Popover';
import BasicButton from 'components/Buttons/BasicButton';

interface ISignupProposal {
  isOpen: boolean;
  anchorEl?: () => HTMLElement;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAccept: () => void;
  onDecline: () => void;
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: 1.4,
            letterSpacing: '0.2px',
            color: '#263238',
          },
        },
      },
    },
  });
};

const SignupProposal = (props: ISignupProposal): JSX.Element => {
  const { onAccept, onDecline, ...popoverProps } = props;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Popover {...popoverProps}>
        <Typography sx={{ mb: '24px' }}>
          Registrati per trovare e gestire più facilmente le tue prenotazioni
        </Typography>
        <BasicButton
          styles={{ marginBottom: '16px' }}
          type="button"
          text="Registrati in OneCheck"
          onButtonClick={onAccept}
        />
        <BasicButton
          styles={{ background: '#FFFFFF', border: '1px solid #B0BEC5' }}
          type="button"
          text="No grazie"
          onButtonClick={onDecline}
        />
      </Popover>
    </ThemeProvider>
  );
};

export default SignupProposal;
