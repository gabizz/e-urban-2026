import React from 'react';
import { renderToString } from 'react-dom/server';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const Test = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker slotProps={{ textField: { sx: { border: '5px solid red' } } }} />
    </LocalizationProvider>
  </ThemeProvider>
);

console.log(renderToString(<Test />));
