import { Box, Typography } from "@mui/material"
import bgstrip from "../assets/images/bgstrip.jpg"
import CardComponent from "../Components/CardComponent";
import SubscribeCard from "../Components/SubscribeCard";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import { useNavigate } from "react-router-dom";
const SubscriptionPage = () => {
    // const [isLoading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    // window.open("https://rzp.io/l/SQ6riaQK2", "_blank");

    const onSubscribeClickHandle = (titleType, code) => {
        let url = '/paybyrazorpay';
        if (titleType === "Subcribe for 3-months") {
            console.log(titleType, "t1", code);
            navigate(url);
        } else if (titleType === "Subcribe for 6-months") {
            console.log(titleType, "t2", code);
            navigate(url);
        } else {
            console.log(titleType, "t3", code);
            navigate(url);
        }
    }

        // setLoading(true);
        //link to Payment
        // window.open("https://rzp.io/l/SQ6riaQK2", "_blank");

        // setTimeout(() => {
        // setLoading(false);
        // onClose();
        // handleClick();
        // window.location.reload();
        // }, 8000);
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
                    <SubscribeCard titleType={"Subcribe for 3-months"} onSubscribeClickHandle={onSubscribeClickHandle} />
                    <SubscribeCard titleType={"Subcribe for 6-months"} onSubscribeClickHandle={onSubscribeClickHandle} />
                    <SubscribeCard titleType={"Subcribe for an Year"} onSubscribeClickHandle={onSubscribeClickHandle} />
                </Box>
            </Box>
        </Box>
    )
}
export default SubscriptionPage;