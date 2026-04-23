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
  HealthAndSafety as HealthIcon,
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
    { text: 'Health Assessment', icon: <HealthIcon />, path: '/health' },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDark ? '#09090B' : '#FAFAFA',
        borderRight: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 4,
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Logo mark */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark
                ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(34,211,238,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(14,165,233,0.05) 100%)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.15)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4C13 4 6 14 6 24C6 34 13 44 24 44C35 44 42 34 42 24"
                stroke={isDark ? '#818CF8' : '#6366F1'}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M24 14C18 14 14 20 14 24C14 28 18 34 24 34C30 34 34 28 34 24"
                stroke={isDark ? '#22D3EE' : '#0EA5E9'}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="24" cy="24" r="3" fill={isDark ? '#818CF8' : '#6366F1'} />
            </svg>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDark ? '#FAFAFA' : '#09090B',
                letterSpacing: '-0.01em',
                fontSize: '1.0625rem',
              }}
            >
              Vitality
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDark ? '#71717A' : '#A1A1AA', mt: 0.25 }}
            >
              AI Health Compass
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 3 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '10px',
                  py: 1.5,
                  px: 2,
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? (isDark ? 'rgba(99,102,241,0.15)' : 'rgba(79,70,229,0.08)')
                    : 'transparent',
                  color: isSelected
                    ? (isDark ? '#818CF8' : '#4F46E5')
                    : (isDark ? '#A1A1AA' : '#71717A'),
                  '&:hover': {
                    backgroundColor: isSelected
                      ? (isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.12)')
                      : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 44,
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.25rem',
                    },
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
          p: 3,
          borderTop: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDark ? '#A1A1AA' : '#71717A',
              fontWeight: 500,
              px: 1,
            }}
          >
            Theme
          </Typography>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="right">
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                p: 1,
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.125rem',
                  color: isDark ? '#A1A1AA' : '#71717A',
                },
              }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>
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
              backgroundColor: isDark ? '#09090B' : '#FAFAFA',
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
              backgroundColor: isDark ? '#09090B' : '#FAFAFA',
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