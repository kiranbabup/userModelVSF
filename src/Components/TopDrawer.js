import * as React from 'react';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
// import CustomButton from './CustomButton';
// import { SUBSCRIBE_MSG, SUBSCRIBE_Success_MSG } from '../constants';
// import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function TopDrawer({ isDrawerOpen, onClose, expiryMsg }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onSubscribeClickHandle = () => {
    navigate("/subscription")
  }

  const list = (
    <Box
      sx={{ width: 'auto', display: "flex", justifyContent: "space-between", alignItems: "center", height: "10vh", pl: 4, pr: 4 }}
      role="presentation"
      onKeyDown={onClose}
    >
      <Typography sx={{ color: "black", fontWeight: "bold" }}>{expiryMsg}</Typography>
      {/* <CustomButton title="Subscribe"
        onPressed={() => onSubscribeClickHandle()}
        sx={{ backgroundColor: "green" }}
        hoverColor="green"
      /> */}
    </Box>
  );

  return (
    <Drawer
      anchor="top"
      open={isDrawerOpen}
      onClose={onClose}
    >
      {list}
    </Drawer>
  );
}