import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import vsfintechLogo from "../../assets/images/vsfintechLogo.png";
import { useDispatch } from 'react-redux';
import { authLogout } from '../../actions/auth';
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import LsService from "../../services/localstorage";

const drawerWidth = 240;
const navItems = ['Home', 'Heatmap', 'Blog', 'Profile', 'Logout'];

const HeaderComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState();
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let userdata = LsService.getCurrentUser();
    setUser(userdata)
  }, []);

  const handleLogout = () => {
    dispatch(authLogout());
    localStorage.clear();
    nav('/120/login');
  };

  const handleHeatmap = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      nav("/120/heatmap");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav('/120/vipheatmap');
    } else {
      nav("/404")
    }
  }

  const handleHome = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      nav("/120/home");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav('/120/viphome');
    } else {
      nav("/404")
    }
  }

  const handleProfile = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      nav("/120/profile");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav("/120/vipprofile");
    } else {
      nav("/404")
    }
  }

  const handleBlog = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      nav("/120/blog");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav("/120/vipblog");
    } else {
      nav("/404")
    }
  }

  const onListItemButtonClick = (item) => {
    if (item === "Logout") {
      handleLogout();
    } else if (item === "Home") {
      handleHome();
    } else if (item === "Profile") {
      handleProfile();
    } else if (item === "Heatmap") {
      handleHeatmap();
    } else {
      handleBlog();
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getNavPath = (item) => {
    if (item === 'Home') return user ? (user.is_subscribed ? '/120/viphome' : '/120/home') : '/404';
    if (item === 'Heatmap') return user ? (user.is_subscribed ? '/120/vipheatmap' : '/120/heatmap') : '/404';
    if (item === 'Blog') return user ? (user.is_subscribed ? '/120/vipblog' : '/120/blog') : '/404';
    if (item === 'Profile') return user ? (user.is_subscribed ? '/120/vipprofile' : '/120/profile') : '/404';
    if (item === 'Logout') return '/120/login';
    return '/404';
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        component="img"
        sx={{
          height: 50,
          width: 130,
        }}
        alt="VSFINTECH"
        src={vsfintechLogo}
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton 
              sx={{ 
                textAlign: 'center', 
                color: location.pathname === getNavPath(item) ? 'blue' : 'black' 
              }}
              onClick={() => onListItemButtonClick(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: { xs: 2, sm: 3 }, pr: { xs: 2, sm: 4 } }}>
      <Box
        component="img"
        sx={{
          height: 50,
          width: 130,
        }}
        alt="VSFINTECH"
        src={vsfintechLogo}
      />
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {navItems.map((item) => (
          <Button 
            key={item} 
            sx={{ 
              color: location.pathname === getNavPath(item) ? 'blue' : 'black' 
            }} 
            onClick={() => onListItemButtonClick(item)}
          >
            {item}
          </Button>
        ))}
      </Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
export default HeaderComponent;