import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import Resources from './pages/Resources';
import Crowdfunding from './pages/Crowdfunding';
import About from './pages/about-us';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import BusinessDashboard from './pages/BusinessDashboard';
import BusinessProfile from './pages/BusinessProfile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Initialize AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration: 800,
  once: true,
});

// Private Route component
const PrivateRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // For business dashboard, check if user is a business owner
  if (children.type === BusinessDashboard && !userData?.isBusinessOwner) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/community"
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              }
            />

            <Route path="/about-us" element={<About />} />
            <Route
              path="/marketplace"
              element={
                <PrivateRoute>
                  <Marketplace />
                </PrivateRoute>
              }
            />
            <Route
              path="/crowdfunding"
              element={
                <PrivateRoute>
                  <Crowdfunding />
                </PrivateRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <PrivateRoute>
                  <Resources />
                </PrivateRoute>
              }
            />
            <Route
              path="/business-dashboard"
              element={
                <PrivateRoute>
                  <BusinessDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/business-profile"
              element={
                <PrivateRoute>
                  <BusinessProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
