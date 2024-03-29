import * as React from 'react';
import { Box, Card, CardActions, CardContent, Checkbox, TextField, Typography } from '@mui/material';
// import { formatTimestamp } from '../assets/data/functions';
import CustomButton from './CustomButton';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import bgstrip from "../assets/images/bgstrip.jpg";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function SubscribeCard({ titleType, onSubscribeClickHandle }) {
    const [havingCC, setHavingCC] = useState(false);
    const [couponApplied, setCouponApplied] = useState("");
    const [codeApplied, setCodeApplied] = useState(false);
    const [wrongCode, setWrongCode] = useState(false);
    const [priceChanged, setPriceChanged] = useState(false);
    const [CCprice, setCCPrice] = useState(0);

    var price;
    if (titleType === "Subcribe for 3-months") {
        price = 6000;
    } else if (titleType === "Subcribe for 6-months") {
        price = 12000;
    } else if (titleType === "Subcribe for an Year") {
        price = 24000;
    }
    const handleCheckboxChange = () => {
        setHavingCC(!havingCC);
        setCodeApplied(false);
    };

    const onApplyClickHandle = (couponApplied) => {
        // console.log(couponApplied);
        if (couponApplied === "") {
            // console.log("empty");
            setWrongCode(true);
        } else {
            setPriceChanged(true);
            setCodeApplied(true);
            const discount = price * 0.2;
            const discountedPrice = price - discount;
            setCCPrice(discountedPrice);
        }
    }
    return (
        <Card sx={{
            minWidth: 275, maxWidth: 330,
            '&:hover': {
                background: 'linear-gradient(to bottom, #e6dede, white)',
            },
        }}>
            <CardContent>
                <Typography 
                sx={{ width: "100%", height: "2.5rem", backgroundImage: `url(${bgstrip})`, display: "flex", alignItems: "center", justifyContent: "center", 
                fontSize: "21px",
                color: "white", fontWeight: "bold", borderRadius:"5px" }}
                >
                    {titleType}
                </Typography>
                <Box p={1} />
                <Typography >
                    Get the Access to:
                </Typography>
                <Typography color="text.secondary">
                    {bull} All 88 indices individual yearly heatmap data.
                </Typography>
                <Typography color="text.secondary">
                    {bull} Last 12 months comparision heatmap data.
                </Typography>
                <Typography color="text.secondary">
                    {bull} Previous month and Current Week heatmap data.
                </Typography>
                <Typography color="text.secondary">
                    {bull} All 88 indices Graph charts.
                </Typography>
                <Box p={1} />
                {!priceChanged ?
                    <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                        Rs. {price}/-
                    </Typography> :
                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: "bold", color:"red" }}>
                            <del>Rs. {price}/-</del>
                        </Typography>
                        <Typography>Discount: 20%</Typography>
                        <Box sx={{display:"flex", alignItems:"center", gap:1}}>
                            <Typography>After discount:</Typography>
                            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                             Rs. {CCprice}/-
                        </Typography>
                        </Box>
                        
                    </Box>
                }

                <Box p={1} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox onChange={() => handleCheckboxChange()} />
                    <Typography color="text.secondary">
                        Having a coupon code?
                    </Typography>
                </Box>
                {havingCC && !codeApplied && (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", }}>
                        <TextField id="couponCode" label="Enter Coupon Code" variant="outlined" onChange={(e) => setCouponApplied(e.target.value)} />
                        <CustomButton
                            title="Apply"
                            onPressed={() => onApplyClickHandle(couponApplied)}
                            sx={{ maxWidth: "97px" }}
                        />
                    </Box>
                )}
                {codeApplied && (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                        <CheckCircleIcon color='success' />
                        <Typography sx={{ fontSize: "12px" }}> Code Applied Successfully</Typography>
                    </Box>
                )}
                {wrongCode && (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                    <CancelRoundedIcon color='error' />
                    <Typography sx={{ fontSize: "12px" }}>Code might be expired or invalid</Typography>
                </Box>
                )}
            </CardContent>
            <CardActions sx={{p:2}}>
                <CustomButton
                    title="Subscribe"
                    onPressed={() => onSubscribeClickHandle(titleType, couponApplied)}
                    sx={{ backgroundColor: "white", color: "black" }}
                    hoverColor="green"
                    fullWidth
                    hoverTxtColor="white" />
            </CardActions>
        </Card>
    );
}