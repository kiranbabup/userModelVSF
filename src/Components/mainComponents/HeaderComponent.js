import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import vsfintechLogo from "../../assets/images/vsfintechLogo.png";
import { useDispatch } from 'react-redux';
import { authLogout } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import LsService from "../../services/localstorage";

const drawerWidth = 240;
const navItems = ['Home', 'Blog', 'Profile', 'Logout'];

const HeaderComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    let userdata = LsService.getCurrentUser();
    setUser(userdata)
  }, []);

  // console.log(user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    localStorage.clear();
    nav('/login');
  };

  const handleHome = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      // console.log("unsub");
      nav("/heatmap");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav('/vipheatmap');
      // console.log("sub");
    } else {
      nav("/404")
    }
  }

  const handleProfile = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      // console.log("unsub");
      nav("/profile");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav("/vipprofile");
      // console.log("sub");
    } else {
      nav("/404")
    }
  }
  
  const handleBlog = () => {
    if (user ? user.email_verified === 1 && user.is_subscribed === 0 : 0) {
      // console.log("unsub");
      nav("/blog");
    } else if (user ? user.email_verified === 1 && user.is_subscribed === 1 : 0) {
      nav("/vipblog");
      // console.log("sub");
    } else {
      nav("/404")
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onListItemButtonClick = (item) => {
    // console.log(item);
    if (item === "Logout") {
      handleLogout();
    } else if (item === "Home") {
      handleHome();
    } else if (item === "Profile") {
      handleProfile();
    } else{
      handleBlog();
    }
  }

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
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} onClick={() => onListItemButtonClick(item)} />
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
          <Button key={item} sx={{ color: 'black' }} onClick={() => onListItemButtonClick(item)}>
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
        // container={container}
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