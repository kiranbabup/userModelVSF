import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Checkbox, TextField, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import bgstrip from "../assets/images/bgstrip.jpg";
import { getTimeStamp } from '../assets/data/functions';
import LsService from "../services/localstorage";
import AuthServices from '../services/AuthServices';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function SubscribeCard({ titleType, prices, months }) {
    const [isHavingCC, setIsHavingCC] = useState(false);
    const [couponApplied, setCouponApplied] = useState("");
    const [isCodeApplied, setIsCodeApplied] = useState(false);
    const [isWrongCode, setIsWrongCode] = useState(false);
    const [isEmptyCode, setIsEmptyCode] = useState(false);
    const [isPriceChanged, setIsPriceChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [CCprice, setCCPrice] = useState(0);
    const [codesData, setCodesData] = useState([]);
    const [discountValue, setDiscountValue] = useState(0);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://heatmapapi.onrender.com/couponcodestatus`);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const result = await response.json();
                setCodesData(result.data);
            } catch (error) {
                console.error("Error fetching plans data:", error);
            }
        };
        fetchData();
        let userdata = LsService.getCurrentUser();
        setUser(userdata)
    }, []);

    const handleCheckboxChange = () => {
        setIsHavingCC(!isHavingCC);
        setIsCodeApplied(false);
    };

    const onChangeCode = () => {
        setCouponApplied("");
        setIsPriceChanged(false);
        handleCheckboxChange();
    }

    const onApplyClickHandle = (couponApplied) => {
        if (couponApplied === "") {
            setIsEmptyCode(true);
            setIsWrongCode(false);
        } else {
            const matchedCode = codesData.find(code => code.coupon_code === couponApplied);

            if (!matchedCode) {
                setIsWrongCode(true);
                setIsEmptyCode(false);
            } else if (matchedCode.status === 0) {
                setIsWrongCode(true);
                setIsEmptyCode(false);
            } else {
                setIsCodeApplied(true);
                setIsEmptyCode(false);
                setIsWrongCode(false);
                setIsPriceChanged(true);

                const discount = prices * (matchedCode.discount / 100);
                setDiscountValue(matchedCode.discount);
                const discountedPrice = prices - discount;
                setCCPrice(discountedPrice);
            }
        }
    }
    const timestamp = getTimeStamp();

    // let url = '/120/paybyphonepe';
    // if (titleType === "Subcribe for 3-months") {
    //     // console.log(titleType, "t1", code);
    //     navigate(url);
    // } else if (titleType === "Subcribe for 6-months") {
    //     // console.log(titleType, "t2", code);
    //     navigate(url);
    // } else {
    //     // console.log(titleType, "t3", code);
    //     navigate(url);
    // }

    const onSubscribeClickHandle = async() => {
        const data = {
            months: months,
            amount: isCodeApplied ? CCprice : prices,
            phone: user.phone_no,
            transactionid: `MT${timestamp}`,
            muid: `MUID${timestamp}`,
        };
        console.log("subscribe data:", data);
        try {
            setLoading(true);
            const response = await AuthServices.makeOrder(data);
            setLoading(false);
            if (response.status != "200") {
                console.log({ text: response.data ?? "error" });
                alert({ text: response.data ?? "error" });
                return;
            }

            const redirect = response.data.data.instrumentResponse.redirectInfo.url;

            window.location.href = redirect;
        } catch (error) {
            console.log(error);
            alert({ text: error });
            setLoading(false);
        }
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 330, '&:hover': { background: 'linear-gradient(to bottom, #e6dede, white)', }, }}>
            <CardContent>
                <Typography
                    sx={{
                        width: "100%", height: "2.5rem", backgroundImage: `url(${bgstrip})`, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "21px",
                        color: "white", fontWeight: "bold", borderRadius: "5px"
                    }}
                >
                    {titleType}
                </Typography>
                <Box p={1} />
                <Typography >Get the Access to:</Typography>
                <Typography color="text.secondary">{bull} All 115 indices individual yearly heatmap data.</Typography>
                <Typography color="text.secondary">{bull} Last 12 months comparision heatmap data.</Typography>
                <Typography color="text.secondary">{bull} Previous month and Current Week heatmap data.</Typography>
                <Typography color="text.secondary">{bull} All 115 indices Graph charts.</Typography>
                <Box p={1} />

                {!isPriceChanged ?
                    <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>Rs. {prices}/-</Typography> :

                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>
                            <del>Rs. {prices}/-</del>
                        </Typography>

                        <Typography>Discount: {discountValue}%</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography>After discount:</Typography>
                            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                                Rs. {CCprice}/-
                            </Typography>
                        </Box>

                    </Box>
                }

                <Box p={1} />
                {
                    !isCodeApplied && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox onChange={() => handleCheckboxChange()} />
                            <Typography color="text.secondary">
                                Having a coupon code?
                            </Typography>
                        </Box>
                    )
                }

                {isHavingCC && !isCodeApplied && (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", }}>
                        <TextField id="couponCode" label="Enter Coupon Code" variant="outlined" onChange={(e) => setCouponApplied(e.target.value)} />
                        <CustomButton
                            title="Apply"
                            onPressed={() => onApplyClickHandle(couponApplied)}
                            sx={{ maxWidth: "97px" }}
                        />
                    </Box>
                )}

                {isCodeApplied && (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography>Applied Code : {couponApplied}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                            <CheckCircleIcon color='success' />
                            <Typography sx={{ fontSize: "12px" }}> Code Applied Successfully.</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={() => onChangeCode()}>Change code</Button>
                        </Box>
                    </>
                )}
                {isEmptyCode && (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                        <CancelRoundedIcon color='warning' />
                        <Typography sx={{ fontSize: "12px" }}>Please enter a code to continue.</Typography>
                    </Box>
                )}
                {isWrongCode && (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                        <CancelRoundedIcon color='error' />
                        <Typography sx={{ fontSize: "12px" }}>Code might be expired or invalid.</Typography>
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ p: 2 }}>
                <CustomButton
                    title="Subscribe"
                    loading={loading}
                    onPressed={() => onSubscribeClickHandle()}
                    sx={{ backgroundColor: "white", color: "black" }}
                    hoverColor="green"
                    fullWidth
                    hoverTxtColor="white" />
            </CardActions>
        </Card>
    );
}