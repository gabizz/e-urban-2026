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
import { FormCustomizationProvider } from './contexts/FormCustomizationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
        <CssBaseline />
        <BrowserRouter>
          <FormCustomizationProvider>
            <AppBar
              position="static"
              color="primary"
              sx={{
                borderRadius: { xs: 0, sm: '0 0 16px 16px' },
                background: 'linear-gradient(180deg, #1976d2 0%, #0d47a1 55%, #0a3880 100%)',
                boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.2),
                  0 10px 24px -2px rgba(13, 71, 161, 0.45),
                  0 18px 30px -4px rgba(0, 0, 0, 0.18),
                  inset 0 1.5px 0.5px rgba(255, 255, 255, 0.4),
                  inset 0 -3px 4px rgba(0, 0, 0, 0.35)
                `,
                borderBottom: '3px solid #062656',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
                <Tooltip title="Acasă">
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/"
                    edge="start"
                    aria-label="Acasă"
                    sx={{
                      p: 1,
                      mr: { xs: 0.5, sm: 1.5 },
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.18)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      },
                      '&:active': {
                        transform: 'translateY(1px)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.35)',
                      },
                    }}
                  >
                    <HomeRoundedIcon sx={{ fontSize: { xs: 28, sm: 34 } }} />
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
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.15)',
                    letterSpacing: '0.015em',
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
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    — utilitar formulare urbanism (Legea 169/2026)
                  </Typography>
                </Typography>

                <Tooltip title="Manual de utilizare & Informații legale (GDPR)">
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/about"
                    aria-label="Despre aplicație și manual"
                    sx={{
                      p: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.18)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      },
                      '&:active': {
                        transform: 'translateY(1px)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.35)',
                      },
                    }}
                  >
                    <HelpRoundedIcon sx={{ fontSize: { xs: 28, sm: 34 } }} />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form/:id" element={<FormPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </FormCustomizationProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
