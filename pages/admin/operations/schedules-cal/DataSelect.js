import React from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';

// third-party
import { useIntl } from 'react-intl';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const optionsOne = ['Schedules', 'Rooms'];
const optionsTwo = ['All Branches', 'CCBC-CC', 'CCBC-CEC'];

export default function DataSelect() {
  const [value, setValue] = React.useState(optionsOne[0]);
  const [value2, setValue2] = React.useState(optionsTwo[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [dateValue, setDateValue] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(Date.now());
  const intl = useIntl();

  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: { root: { 'font-size': '16px', 'font-weight': '400', color: '#212B36' } },
      },
    },
  });

  return (
    <Grid container>
      <Grid item lg={6}>
        <ThemeProvider theme={theme}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (newValue) setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={optionsOne}
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </ThemeProvider>
      </Grid>
      <Grid item lg={6}>
        <ThemeProvider theme={theme}>
          <Autocomplete
            value={value2}
            onChange={(event, newValue) => {
              if (newValue) setValue2(newValue);
            }}
            inputValue={inputValue2}
            onInputChange={(event, newInputValue) => {
              setInputValue2(newInputValue);
            }}
            id="controllable-states-demo2"
            options={optionsTwo}
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </ThemeProvider>
      </Grid>
      <Grid item lg={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            openTo="month"
            views={['year', 'month']}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
