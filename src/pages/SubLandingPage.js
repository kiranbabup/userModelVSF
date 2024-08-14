import React, { useEffect, useState } from "react";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import FullGraphVip from "../Components/mainComponents/FullGraphVip";
import VipHeatMapPage from "../Components/mainComponents/VipHeatMapPage";
import { useNavigate } from "react-router-dom";
import { calculateDaysLeft } from "../assets/data/functions";
import TopDrawer from "../Components/TopDrawer";
import LsService from "../services/localstorage";

// import SubHeatMapPage from "../Components/mainComponents/SubHeatMapPage";
// import { useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { setResultData, setIsLoadingHeatmap } from '../actions/actions';

const SubLandingPage = () => {
    // const dispatch = useDispatch();

    // const fetchData = async () => {
    //     dispatch(setIsLoadingHeatmap(true));
    //     try {
    //         const response = await fetch(`https://heatmapapi.onrender.com/getheatmappcntdata`);
    //         if (!response.ok) {
    //             throw new Error(`http error status:${response.status}`);
    //         }
    //         const result = await response.json();
    //         // console.log(result.data);
    //         // setResultData(result.data);
    //         dispatch(setResultData(result.data));
    //     } catch (error) {
    //         console.error("Error fetching stock data:", error);
    //     } finally {
    //         dispatch(setIsLoadingHeatmap(false));
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [dispatch]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [expiryMsg, setexpiryMsg] = useState("");
    const [daysLeft, setdaysLeft] = useState(20);
    const navigate = useNavigate();
    // const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const userdata = LsService.getCurrentUser();
        console.log(userdata);

        if (userdata && userdata.id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api.vsfintech.in/alluserdata`);
                    if (!response.ok) {
                        throw new Error(`http error status:${response.status}`);
                    }
                    const result = await response.json();
                    const details = result.data.find(user => user.id === userdata.id);
                    if (details) {
                        // setUserDetails(details);
                        const endingDate = details.subscribe_expired_on;
                        console.log(endingDate);
                        setdaysLeft(calculateDaysLeft(endingDate));
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        } else {
            console.error("User data is not available.");
        }
    }, []);

    // useEffect(() => {
    //     if (userDetails) {
    //         console.log(userDetails);
    //         const endingDate = userDetails.subscribe_expired_on;
    //         console.log(endingDate);
    //         setdaysLeft(calculateDaysLeft(endingDate));
    //     }
    // }, [userDetails]);

    useEffect(() => {
        if (daysLeft <= 5) {
            console.log(daysLeft);
            setIsDrawerOpen(true);
            setexpiryMsg(`Subscription Expires in ${daysLeft} days`);
        }
    }, [daysLeft]);

    const handleDrawerClose = () => {
        if (daysLeft <= 0) {
            navigate("/120/subscriptionexpired");
        } else {
            setIsDrawerOpen(false);
        }
    }
    return (
        <div>
            <HeaderComponent />
            <VipHeatMapPage />
            <FullGraphVip />
            <TopDrawer isDrawerOpen={isDrawerOpen} onClose={handleDrawerClose} expiryMsg={expiryMsg} />
        </div>
    )
}
export default SubLandingPage;