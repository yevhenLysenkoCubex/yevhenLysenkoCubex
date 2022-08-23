import React from 'react';
import {
  Box,
  IconButton,
  Stack,
  MenuItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Title } from 'components/Title';
import { ReactComponent as Map } from 'icons/map-alternative.svg';

export const Testing = () => {
  return (
    <Box sx={{ width: '1000px', margin: '0 auto' }}>
      <Box
        sx={{
          paddingTop: '16px',
          paddingBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          Link
          <IconButton className="MobileMenuIconButton">
            <Map />
          </IconButton>
        </Link>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <MenuItem>
            <Link to="">
              <ListItemText>Assistenza</ListItemText>
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemText>Come funziona</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Chi è OneCheck</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        </Stack>
        <Stack
          direction="row"
          // divider={<Divider orientation="vertical" flexItem />}
        >
          <MenuItem>
            <Link to="">
              <ListItemText>Assistenza</ListItemText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Button variant="contained">Click me</Button>
          </MenuItem>
          <IconButton className="MobileMenuIconButton">
            <Map />
          </IconButton>
        </Stack>
      </Box>
      <Title />
    </Box>
  );
};
