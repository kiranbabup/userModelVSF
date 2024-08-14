import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import vsfintechLogo from "../../assets/images/vsfintechLogo.png";
import { useDispatch } from 'react-redux';
import { authLogout } from '../../actions/auth';
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import LsService from "../../services/localstorage";

const drawerWidth = 240;
const navItems = ['Codes', 'Blog', 'Indices', 'Mutual Funds', 'Industries', 'Stocks', 'Subscribe', 'Profile', 'Logout'];

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
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/heatmap");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav('/120/vipheatmap');
    } else {
      nav("/404")
    }
  }

  const handleIndustries = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/industries");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav('/120/stock1');
    } else {
      nav("/404")
    }
  }

  const handleStock2 = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/stocks");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav('/120/stock2');
    } else {
      nav("/404")
    }
  }

  const handleMutualFunds = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/mutualfunds");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav('/120/mutual_funds');
    } else {
      nav("/404")
    }
  }

  const handleHome = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/home");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav('/120/viphome');
    } else {
      nav("/404")
    }
  }

  const handleProfile = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/profile");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav("/120/vipprofile");
    } else {
      nav("/404")
    }
  }

  const handleBlog = () => {
    if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 0 || user.is_subscribed === false) : 0) {
      nav("/120/blog");
    } else if (user ? (user.email_verified === 1 || user.email_verified === true) && (user.is_subscribed === 1 || user.is_subscribed === true) : 0) {
      nav("/120/vipblog");
    } else {
      nav("/404")
    }
  }

  const onListItemButtonClick = (item) => {
    if (item === "Logout") {
      handleLogout();
    } else if (item === "Codes") {
      handleHome();
    } else if (item === "Profile") {
      handleProfile();
    } else if (item === "Indices") {
      handleHeatmap();
    } else if (item === "Industries") {
      handleIndustries();
    } else if (item === "Stocks") {
      handleStock2();
    } else if (item === "Mutual Funds") {
      handleMutualFunds();
    } else if (item === "Subscribe") {
      nav("/120/subscription");
    } else {
      handleBlog();
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getNavPath = (item) => {
    if (item === 'Codes') return user ? (user.is_subscribed ? '/120/viphome' : '/120/home') : '/404';
    if (item === 'Indices') return user ? (user.is_subscribed ? '/120/vipheatmap' : '/120/heatmap') : '/404';
    if (item === 'Industries') return user ? (user.is_subscribed ? '/120/stock1' : '/120/industries') : '/404';
    if (item === 'Stocks') return user ? (user.is_subscribed ? '/120/stock2' : '/120/stocks') : '/404';
    if (item === 'Mutual Funds') return user ? (user.is_subscribed ? '/120/mutual_funds' : '/120/mutualfunds') : '/404';
    if (item === 'Subscribe') return user ? (user.is_subscribed ? '' : '/120/subscription') : '/404';
    if (item === 'Blog') return user ? (user.is_subscribed ? '/120/vipblog' : '/120/blog') : '/404';
    if (item === 'Profile') return user ? (user.is_subscribed ? '/120/vipprofile' : '/120/profile') : '/404';
    if (item === 'Logout') return '/120/login';
    return '/404';
  };
  const filteredNavItems = navItems.filter(item => !(item === 'Subscribe' && user?.is_subscribed));

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
        {filteredNavItems.map((item) => (
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
        {filteredNavItems.map((item) => (
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