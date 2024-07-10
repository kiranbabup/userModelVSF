import { Box, Typography } from "@mui/material"
import bgstrip from "../assets/images/bgstrip.jpg"
import CardComponent from "../Components/CardComponent";
import SubscribeCard from "../Components/SubscribeCard";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import { useEffect, useState } from "react";
import instance from "../services/axios";
// import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([]);
    // const [isLoading, setLoading] = React.useState(false);
    // const navigate = useNavigate();
    // window.open("https://rzp.io/l/SQ6riaQK2", "_blank");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/getPlans`);
                // console.log(response.data);
                setPlans(response.data.data);
            } catch (error) {
                console.error("Error fetching plans data:", error);
            } 
        };
        fetchData();
    }, []);

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "aliceblue" }}>
                <Typography sx={{ width: "100%", height: "5rem", mt: 2, backgroundImage: `url(${bgstrip})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "white", fontWeight: "bold" }}>SUBSCRIBE NOW</Typography>
                <Box p={1} />
                <Typography>Choose the right plan!</Typography>
                <Typography>Change your future!</Typography>
                <Typography textAlign="center">Access the complete data for all the indices in 1 click away.</Typography>
                <Box p={1} />
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pb: 2, mb: 2, justifyContent: "center" }}>
                    <CardComponent />
                    {
                        plans.map((plan,index)=>{
                            return(
                                <SubscribeCard key={index} titleType={`Subcribe for ${plan.months}-months`} prices={plan.amount} months={plan.months} />

                            )
                        })
                    }
                    {/* <SubscribeCard titleType={"Subcribe for 3-months"} onSubscribeClickHandle={onSubscribeClickHandle} /> */}
                    {/* <SubscribeCard titleType={"Subcribe for 6-months"} onSubscribeClickHandle={onSubscribeClickHandle} /> */}
                    {/* <SubscribeCard titleType={"Subcribe for an Year"} onSubscribeClickHandle={onSubscribeClickHandle} /> */}
                </Box>
            </Box>
        </Box>
    )
}
export default SubscriptionPage;