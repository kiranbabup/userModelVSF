import React from "react";
import { LoadingButton } from "@mui/lab";

const CustomButton = ({ title, loading, startIcon, onPressed, sx, hoverColor, hoverTxtColor, ...other }) => {
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={onPressed}
      startIcon={startIcon}
      sx={{ fontSize: 12, fontWeight: "bold", px: 3, py: 1, color:"white",
       border: "1px solid #5C67C7", 
      ":hover": {
        backgroundColor: hoverColor,
        fontWeight:"bold",
        color: hoverTxtColor,
      },
      ...sx }}
      {...other}
    >
      {title}
    </LoadingButton>
  );
};

export default CustomButton;
