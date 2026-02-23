import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  Drawer,
} from '@mui/material';
import { Home as HomeIcon, Assessment as AssessmentIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DRAWER_WIDTH = 260;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Health Assessment', icon: <AssessmentIcon />, path: '/health' },
  ];

  const drawerWidth = isMobile ? '100%' : DRAWER_WIDTH;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          Health Recommender
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Your personal health advisor
        </Typography>
      </Box>

      <List sx={{ flex: 1, p: 2 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  backgroundColor: isSelected ? 'rgba(0,0,0,0.08)' : 'transparent',
                  color: isSelected ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: isSelected ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.04)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="right">
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem',
                color: mode === 'dark' ? theme.palette.primary.main : 'text.primary',
                transition: 'color 0.3s ease-in-out',
              },
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
export { DRAWER_WIDTH };
