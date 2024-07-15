import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({type,id,label,onHandleChange,ref})=>{
    return(
        <TextField
        type={type}
        id={id}
        label={label}
        onChange={onHandleChange}
        ref={ref}
        />
    )
}
export default CustomTextField;