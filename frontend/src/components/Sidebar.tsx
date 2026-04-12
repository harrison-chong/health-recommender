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
  Tooltip,
  useMediaQuery,
  useTheme,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const DRAWER_WIDTH = 260;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = mode === 'dark';

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Health Assessment', icon: <AssessmentIcon />, path: '/health' },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        borderRight: '1px solid',
        borderColor: isDark ? '#334155' : '#e2e8f0',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isDark ? '#f8fafc' : '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          Vitality
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDark ? '#94a3b8' : '#64748b', mt: 0.5 }}
        >
          Your health compass
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? (isDark ? '#334155' : '#eff6ff')
                    : 'transparent',
                  color: isSelected
                    ? (isDark ? '#60a5fa' : '#2563eb')
                    : (isDark ? '#94a3b8' : '#64748b'),
                  '&:hover': {
                    backgroundColor: isSelected
                      ? (isDark ? '#334155' : '#dbeafe')
                      : (isDark ? '#29354a' : '#f1f5f9'),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: '0.9rem',
                        color: 'inherit',
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Theme Toggle */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <Tooltip
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          placement="right"
        >
          <IconButton
            onClick={toggleTheme}
            size="medium"
            sx={{
              p: 1.5,
              borderRadius: 2,
              cursor: 'pointer',
              backgroundColor: isDark ? '#334155' : '#f1f5f9',
              border: '1px solid',
              borderColor: isDark ? '#475569' : '#e2e8f0',
              '&:hover': {
                backgroundColor: isDark ? '#475569' : '#e2e8f0',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem',
                color: isDark ? '#cbd5e1' : '#475569',
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
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
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
              width: DRAWER_WIDTH,
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
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