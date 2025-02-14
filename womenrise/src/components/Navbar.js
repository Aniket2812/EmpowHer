import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
  ListItemIcon
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ExitToApp, Person, Person as PersonIcon, Store as StoreIcon, Inventory as InventoryIcon, LocationOn as LocationIcon, Phone as PhoneIcon, Email as EmailIcon } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LogoIcon from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 12px rgba(255, 77, 141, 0.1)',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  marginLeft: theme.spacing(2),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
    background: 'rgba(255, 77, 141, 0.08)',
  },
  position: 'relative',
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '30%',
    height: '3px',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  } : {},
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& svg': {
    width: 32,
    height: 32,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [businessProducts, setBusinessProducts] = useState([]);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);

  useEffect(() => {
    const fetchBusinessProducts = async () => {
      if (currentUser && userData?.isBusinessOwner) {
        try {
          const productsQuery = query(
            collection(db, 'products'),
            where('sellerId', '==', currentUser.uid),
            limit(5)
          );
          const productsSnapshot = await getDocs(productsQuery);
          const productsData = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBusinessProducts(productsData);
        } catch (error) {
          console.error('Error fetching business products:', error);
        }
      }
    };

    fetchBusinessProducts();
  }, [currentUser, userData]);

  const businessData = {
    businessName: "Artisanal Treasures",
    ownerName: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    phone: "+91 98765 43210",
    email: "priya.sharma@artisanaltreasures.com",
    description: "Empowering local artisans through traditional handicrafts",
    expertise: "Traditional Rajasthani Handicrafts",
    yearsInBusiness: 5,
    artisansEmployed: 25
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (page) => {
    handleCloseNavMenu();
    navigate('/' + page.toLowerCase());
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    
    switch (setting) {
      case 'My Business':
        navigate('/business-dashboard');
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Community', path: '/community' },
    { text: 'Marketplace', path: '/marketplace' },
    { text: 'Crowdfunding', path: '/crowdfunding' },
    { text: 'Resources', path: '/resources' },
    { text: 'About Us', path: '/about-us' },
  ];

  const settings = ['My Business'];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={RouterLink}
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            color: location.pathname === item.path ? 'primary.main' : 'text.primary',
          }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Logo
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 5 } }}
              >
                <LogoIcon />
                EmpowHer
              </Logo>

              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {menuItems.map((item) => (
                      <NavButton
                        key={item.text}
                        component={RouterLink}
                        to={item.path}
                        active={location.pathname === item.path ? 1 : 0}
                      >
                        {item.text}
                      </NavButton>
                    ))}
                  </Box>
                  <Box>
                    {currentUser ? (
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open profile menu">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                              <Person />
                            </Avatar>
                        </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          {currentUser && (
                            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {currentUser.displayName || currentUser.email}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {currentUser.uid}
                              </Typography>
                            </Box>
                          )}
                          
                          {userData?.isBusinessOwner && (
                            <>
                              <MenuItem onClick={() => navigate('/business-profile')}>
                                <ListItemIcon>
                                  <StoreIcon fontSize="small" />
                                </ListItemIcon>
                                My Business
                              </MenuItem>
                              <MenuItem onClick={() => navigate('/business-dashboard')}>
                                <ListItemIcon>
                                  <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                Business Dashboard
                              </MenuItem>
                            </>
                          )}
                          
                          <Divider />
                          
                          <MenuItem 
                            onClick={handleLogout}
                            sx={{ 
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.contrastText',
                              }
                            }}
                          >
                            <ListItemIcon>
                              <ExitToApp sx={{ mr: 1 }} />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </Menu>
                      </Box>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mr: 2 }}
                          component={RouterLink}
                          to="/login"
                        >
                          Login
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          component={RouterLink}
                          to="/signup"
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </StyledAppBar>
      </HideOnScroll>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar /> 
    </>
  );
};

export default Navbar;
