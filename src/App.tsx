import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale/ro';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import About from './pages/About';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
        <CssBaseline />
        <BrowserRouter>
          <AppBar position="static" sx={{ borderRadius: { xs: 0, sm: '0 0 1em 1em' } }} color="primary">
            <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
              <Tooltip title="Acasă">
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/"
                  edge="start"
                  aria-label="Acasă"
                  sx={{ mr: { xs: 0.5, sm: 1.5 } }}
                >
                  <HomeRoundedIcon fontSize="medium" />
                </IconButton>
              </Tooltip>

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  fontSize: { xs: '0.95rem', sm: '1.25rem' },
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  pr: 1,
                }}
              >
                e-urban.ro
                <Typography
                  component="span"
                  sx={{
                    display: { xs: 'none', sm: 'inline' },
                    fontSize: 'inherit',
                    fontWeight: 400,
                    opacity: 0.9,
                    ml: 1,
                  }}
                >
                  — Asistent Formulare (Legea 169/2026)
                </Typography>
              </Typography>

              <Tooltip title="Manual de utilizare & Informații legale (GDPR)">
                <IconButton
                  component={Link}
                  to="/about"
                  aria-label="Despre aplicație și manual"
                  sx={{
                    width: { xs: 34, sm: 38 },
                    height: { xs: 34, sm: 38 },
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.35)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <HelpRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form/:id" element={<FormPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
