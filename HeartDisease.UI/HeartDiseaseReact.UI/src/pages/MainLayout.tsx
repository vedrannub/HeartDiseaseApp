import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Switch,
  FormControlLabel,
  Badge
} from '@mui/material';
import {
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Folder as FolderIcon,
  MedicalServices as MedicalServicesIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  Forum as ForumIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '~/resources/routes-constants';
const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
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
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
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
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
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
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
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
            }}
            role="presentation"
            onKeyDown={handleToggle}
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
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            transition: 'margin-left 0.3s',
            marginTop: '64px',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
