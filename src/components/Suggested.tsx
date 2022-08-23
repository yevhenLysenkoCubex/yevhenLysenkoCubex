import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ISuggestedProps {
  query: string;
  suggested: string;
}

const getMuiTheme = () => {
  return createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: '#E0F7FA',
            borderRadius: '20px',
            boxShadow: 'none',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '12px',
            '&:last-child': {
              paddingBottom: '12px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: 1.5,
            letterSpacing: '0.4px',
            color: '#263238',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingTop: '7px',
            paddingBottom: '7px',
            background: 'transparent',
            border: '1px solid #B0BEC5',
            borderRadius: '8px',
          },
          text: {
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
  });
};

const Suggested = (props: ISuggestedProps): JSX.Element => {
  const { query, suggested } = props;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Container sx={{ pt: '12px' }}>
        <Card>
          <CardContent>
            <Typography
              sx={{ mb: '8px' }}
            >{`Prima di una ${query} è consigliata una ${suggested}. Se
            non l’hai già fatta, cerca:`}</Typography>
            <Button>{`${suggested} + ${query}`}</Button>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Suggested;
