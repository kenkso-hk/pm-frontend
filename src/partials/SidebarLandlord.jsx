import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const sidebarWidth = 240;

const openSidebarMixin = (theme) => ({
  width: sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#f7f7f7',
  backgroundImage: 'url("/path-to-your-image.jpg")',
  backgroundSize: 'cover',
});

const closedSidebarMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#f7f7f7',
  backgroundImage: 'url("/path-to-your-image.jpg")',
  backgroundSize: 'cover',
});

const SidebarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SidebarDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openSidebarMixin(theme),
      '& .MuiDrawer-paper': openSidebarMixin(theme),
    }),
    ...(!open && {
      ...closedSidebarMixin(theme),
      '& .MuiDrawer-paper': closedSidebarMixin(theme),
    }),
  }),
);

export default function CustomSidebar() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(true);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const navLinkStyles = ({ isActive }) => ({
    backgroundColor: isActive ? '#1976d2' : 'transparent',
    color: isActive ? '#fff' : 'inherit',
    borderRadius: '10px',
    margin: '0 10px',
    minHeight: 48,
    justifyContent: isOpen ? 'initial' : 'center',
    px: 2.5,
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <SidebarDrawer variant="permanent" open={isOpen}>
        <SidebarHeader>
          {isOpen && (
            <IconButton onClick={closeSidebar}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </SidebarHeader>

        {isOpen && (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" component="div">
              Welcome!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select an option from the menu.
            </Typography>
          </Box>
        )}

        <Divider style={{ borderColor: '#1976d2', borderWidth: '1px',
        marginTop: "-2px"
      }} />

        <List>
          {[
            { text: 'Home', path: '/landlord-dashboard', icon: <HomeIcon /> },
            { text: 'My Applications', path: '/landlord-applications', icon: <WorkIcon /> },
            { text: 'My Complex', path: '/my-complexes', icon: <ApartmentIcon /> },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                style={navLinkStyles}
                // Aquí no abrimos el Drawer al hacer clic en un ícono
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {/* Solo mostrar el texto si el drawer está abierto */}
                <ListItemText primary={item.text} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      
      </SidebarDrawer>

      {!isOpen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openSidebar}
          edge="center"
          sx={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
}
