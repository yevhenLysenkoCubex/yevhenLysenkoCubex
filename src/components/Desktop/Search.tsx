import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as Pulse } from 'icons/pulse.svg';
import { ReactComponent as Map } from 'icons/map.svg';
import { ReactComponent as Date } from 'icons/date.svg';
import { ReactComponent as Magnifier } from 'icons/magnifier.svg';
import { ReactComponent as Cleaner } from 'icons/cleaner.svg';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Test from 'components/Test';
import City from 'components/City';
import Calendar from 'components/Date';

interface IExpandedState {
  content: null | string;
  isExpanded: boolean;
}

const Search = (props: any): JSX.Element => {
  const [expanded, setExpanded] = useState<IExpandedState>({
    content: null,
    isExpanded: false,
  });

  const {
    test,
    onTestChange,
    passTestID,
    passAnswers,
    passSuggested,
    city,
    onCityChange,
    date,
    onDateChange,
    onQuerySubmit,
  } = props;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Paper sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Pulse />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="SharedCleanerIconButton"
                      sx={test.length === 0 ? { display: 'none' } : {}}
                      onClick={() => onTestChange('')}
                    >
                      <Cleaner />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Visita, esame o trattamento"
              value={test}
              onClick={() => setExpanded({ content: 'test', isExpanded: true })}
              disabled
            />
            {expanded.isExpanded && expanded.content === 'test' && (
              <ClickAwayListener
                onClickAway={() =>
                  setExpanded({ isExpanded: false, content: null })
                }
              >
                <Box sx={{ position: 'absolute', top: 'calc(100% + 25px)' }}>
                  <Test
                    onClose={() =>
                      setExpanded({ content: null, isExpanded: false })
                    }
                    onTextFieldChange={onTestChange}
                    passTestID={passTestID}
                    passAnswers={passAnswers}
                    passSuggested={passSuggested}
                  />
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Map />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="SharedCleanerIconButton"
                      sx={city.length === 0 ? { display: 'none' } : {}}
                      onClick={() => onCityChange('')}
                    >
                      <Cleaner />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Città"
              value={city}
              disabled
              onClick={() => setExpanded({ content: 'city', isExpanded: true })}
            />
            {expanded.isExpanded && expanded.content === 'city' && (
              <ClickAwayListener
                onClickAway={() =>
                  setExpanded({ isExpanded: false, content: null })
                }
              >
                <Box sx={{ position: 'absolute', top: 'calc(100% + 25px)' }}>
                  <City
                    onClose={() =>
                      setExpanded({ content: null, isExpanded: false })
                    }
                    onTextFieldChange={onCityChange}
                  />
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Date />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="SharedCleanerIconButton"
                      sx={date.length === 0 ? { display: 'none' } : {}}
                      onClick={() => onDateChange('')}
                    >
                      <Cleaner />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Data"
              value={date}
              onClick={() => setExpanded({ content: 'date', isExpanded: true })}
              disabled
            />
            {expanded.isExpanded && expanded.content === 'date' && (
              <ClickAwayListener
                onClickAway={() =>
                  setExpanded({ isExpanded: false, content: null })
                }
              >
                <Box sx={{ position: 'absolute', top: 'calc(100% + 25px)' }}>
                  <Calendar
                    selected={date}
                    onClose={() =>
                      setExpanded({ content: null, isExpanded: false })
                    }
                    onTextFieldChange={onDateChange}
                  />
                </Box>
              </ClickAwayListener>
            )}
          </Box>
        </Paper>
        <IconButton className="DesktopSearchIconButton" onClick={onQuerySubmit}>
          <Magnifier />
        </IconButton>
      </Box>
    </>
  );
};

export default Search;
