import * as React from 'react';
import { Box, Drawer, IconButton, Snackbar, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import { SUBSCRIBE_MSG, SUBSCRIBE_Success_MSG } from '../constants';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function AnchorTemporaryDrawer({ isDrawerOpen, onClose }) {
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
      <Typography sx={{ color: "black", fontWeight: "bold" }}>{SUBSCRIBE_MSG}</Typography>
      <CustomButton title="Subscribe"
        onPressed={() => onSubscribeClickHandle()}
        sx={{ backgroundColor: "green" }}
        hoverColor="green"
      />
    </Box>
  );

  return (
    <div>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={SUBSCRIBE_Success_MSG}
        action={action}
      />

    <Drawer
      anchor="bottom"
      open={isDrawerOpen}
      onClose={onClose}
    >
      {list}
    </Drawer>
    </div>
  );
}