import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/homePage';
// import LoginPage from 'pages/loginPage';
import LoginPage from 'pages/loginPage/LoginPage.jsx';
import ProfilePage from 'pages/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js';
import { Toaster } from 'react-hot-toast';

function App() {
  //useSelector grabs the global state
  const mode = useSelector((state) => state.mode);
  //run only when mode state changes
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //if the token exists, we are authorised
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      {/* creating the routes of our application */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/" element={<RegisterPage />} /> */}
            {/* if the user is not authenticated, navigate to the login page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            {/* profile will have a param of userId */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
