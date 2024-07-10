import { Box, Button, Divider, Typography } from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import { useDispatch } from 'react-redux';
import { authLogout } from "../actions/auth";

const PaymentSuccessful = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        localStorage.clear();
        navigate('/120/login');
      };
    return (
        <>
            <HeaderComponent />
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor: "#bbbbbb", 
                    width: "100vw", 
                    height: "calc(100vh - 50px)" 
                }}
            >
                <Box 
                    sx={{ 
                        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", 
                        width: "320px", 
                        height: "320px", 
                        backgroundColor: "white", 
                        borderRadius: "10px",
                    }}
                >
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            flexDirection: "column", 
                            width: "100%", 
                            height: "50%" 
                        }}
                    >
                        <CheckCircleRoundedIcon color="success" sx={{ fontSize: "5rem" }} />
                        <Box p={1} />
                        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>Payment Successful</Typography>
                    </Box>
                    <Divider />
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            flexDirection: "column", 
                            width: "100%", 
                            height: "50%" 
                        }}
                    >
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={() => handleLogout()}
                        >
                            Login Again
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default PaymentSuccessful;
