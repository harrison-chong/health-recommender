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

export const DRAWER_WIDTH = 240;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = mode === 'dark';

  const ink = isDark ? '#F2F1EC' : '#15171A';
  const muted = isDark ? '#8A857C' : '#9A9388';
  const wall = isDark ? '#161719' : '#FAFAF7';
  const rule = isDark ? 'rgba(255,255,255,0.08)' : '#E3E0D8';

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
        backgroundColor: wall,
        borderRight: '1px solid',
        borderColor: rule,
      }}
    >
      {/* Logo — monospace mark, no gradient tile */}
      <Box sx={{ px: 3, py: 3, borderBottom: '1px solid', borderColor: rule }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            className="num"
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ink,
              color: wall,
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '2px',
            }}
          >
            V
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: ink, letterSpacing: '-0.01em', fontSize: '1rem', lineHeight: 1 }}
            >
              Vitality
            </Typography>
            <Typography className="num" sx={{ color: muted, fontSize: '0.6875rem', letterSpacing: '0.1em', mt: 0.25 }}>
              HEALTH / METRICS
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '2px',
                  py: 1.25,
                  px: 2,
                  cursor: 'pointer',
                  borderLeft: '2px solid',
                  borderColor: isSelected ? ink : 'transparent',
                  backgroundColor: 'transparent',
                  color: isSelected ? ink : muted,
                  '&:hover': { backgroundColor: 'transparent', color: ink },
                  transition: 'color 0.15s ease',
                }}
              >
                <ListItemIcon
                  sx={{ color: 'inherit', minWidth: 40, '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.9rem', color: 'inherit' }}>
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Theme toggle */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: rule }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          <Typography className="num" sx={{ color: muted, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {mode} mode
          </Typography>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="right">
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                p: 1,
                borderRadius: '2px',
                color: muted,
                '&:hover': { backgroundColor: 'transparent', color: ink },
                '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
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
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundColor: wall },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundColor: wall },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
