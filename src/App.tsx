import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale/ro';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
        <CssBaseline />
        <BrowserRouter>
          <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              e-urban.ro - Asistent Formulare (Legea 169/2026)
            </Typography>
            <Button color="inherit" component={Link} to="/">Acasa</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:id" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
