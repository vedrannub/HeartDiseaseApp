import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Switch,
  FormControlLabel,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Folder as FolderIcon,
  MedicalServices as MedicalServicesIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '~/resources/routes-constants';
import logo from '../../public/logo.png.webp';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleMenuClose();
    navigate(ROUTES.MY_ACCOUNT);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/signin');
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
            borderRadius: '8px',
            padding: open ? '0 8px' : '0 4px',
          },
        },
      },
    },
  });

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.HOMEPAGE_ROUTE },
    { text: 'My Predictions', icon: <AssessmentIcon />, path: ROUTES.MY_PREDICTIONS },
    { text: 'My Reports', icon: <FolderIcon />, path: '/myreports' },
    { text: 'Doctor’s Suggestions', icon: <MedicalServicesIcon />, path: '/doctorsuggestions' },
    { text: 'Appointments', icon: <CalendarTodayIcon />, path: '/appointments' },
    { text: 'Health Data', icon: <PersonIcon />, path: '/healthdata' },
    { text: 'Messages', icon: <ForumIcon />, path: '/messages' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 40,
                cursor: 'pointer',
                marginRight: 2,
              }}
              onClick={() => navigate(ROUTES.HOMEPAGE_ROUTE)}
            />
            <Box sx={{ flexGrow: 1 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  icon={<Brightness7Icon />}
                  checkedIcon={<Brightness4Icon />}
                />
              }
              label=""
            />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleAvatarClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedDrawerWidth,
            flexShrink: 0,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : collapsedDrawerWidth,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
              padding: open ? '0 8px' : '0 4px',
            },
          }}
        >
          <Box
            sx={{
              width: open ? drawerWidth : collapsedDrawerWidth,
              paddingTop: 8,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            role="presentation"
          >
            <List sx={{ width: '100%', padding: open ? '0 8px' : '0 4px' }}>
              {menuItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: '8px',
                    margin: '5px 0',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    padding: '8px',
                    '& .MuiListItemIcon-root': {
                      minWidth: '36px',
                      fontSize: '20px',
                      justifyContent: 'center',
                      margin: open ? '0 16px 0 0' : '0 auto 0 0',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '20px',
                    },
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.contrastText,
                      },
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light, // Remove hover effect when selected
                      },
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.contrastText,
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              ))}
            </List>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: 2,
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggle}
                sx={{
                  transition: 'transform 0.3s',
                }}
              >
                {open ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            transition: 'margin-left 0.3s',
            marginTop: '64px',
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
