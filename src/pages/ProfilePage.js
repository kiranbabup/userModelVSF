import { Box, Card, Typography } from "@mui/material"
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import LsService from "../services/localstorage";
import React, { useEffect, useState } from "react";
import { useStyles } from "./LoginPage";
import bgstrip from "../assets/images/bgstrip.jpg";
import { calculateDaysLeft } from "../assets/data/functions";
import styled, { css } from 'styled-components';

const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const [subscriptionStatus, setsubscriptionStatus] = useState("");
    const [subscribedOnDate, setsubscribedOnDate] = useState("");
    const classes = useStyles();

    const endingDate = "25-12-2024";

    const daysLeft = calculateDaysLeft(endingDate);

    const convertDateFormat = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        let userdata = LsService.getCurrentUser();
        setUser(userdata);
        if (userdata.is_subscribed === 0) {
            setsubscriptionStatus("Not Subscribed");
        } else {
            setsubscriptionStatus("Subscribed");
            setsubscribedOnDate(convertDateFormat(userdata.subscribed_on));
        }
    }, []);
    // console.log(user);

    const tDATA = css`
    padding: 10px;
`;

    const headDATA = css`
    padding: 10px;
    font-weight: bold;
`;

    const TableData = styled.td`
    ${tDATA}
`;

    const TableHeader = styled.td`
    ${headDATA}
`;

    const Table = styled.table``;

    // Media queries for mobile view
    const mobileStyles = css`
    @media only screen and (max-width: 600px) {
        ${TableData}, ${TableHeader} {
            font-size: 11px;
        }
    }
`;

    // Media queries for tablet and larger screens
    const desktopStyles = css`
    @media only screen and (min-width: 601px) {
        ${TableData}, ${TableHeader} {
            font-size: 16px;
        }
    }
`;

    // Apply media queries to the Table component
    const ResponsiveTable = styled(Table)`
    ${mobileStyles}
    ${desktopStyles}
`;

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 50px)", backgroundColor: "aliceblue"
            }}>
                <Card className={classes.card} sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 2, sm: 4, md: 6 } }}>
                    <Typography
                        sx={{
                            width: "100%", height: "2.5rem", backgroundImage: `url(${bgstrip})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: { xs: 20, sm: 30, },
                            color: "white", fontWeight: "bold", borderRadius: "5px"
                        }}
                    >
                        Profile Status
                    </Typography>
                    <Box p={1} />
                    <ResponsiveTable >
                        <tbody>
                            <tr>
                                <TableHeader >User Name:</TableHeader>
                                <TableData >{user.first_name} {user.last_name}</TableData>
                            </tr>
                            <tr>
                                <TableHeader >Email ID:</TableHeader>
                                <TableData >{user.email}</TableData>
                            </tr>
                            <tr>
                                <TableHeader >Subcription Status:</TableHeader>
                                <TableData >{subscriptionStatus}</TableData>
                            </tr>
                            {user.is_subscribed === 1 && (
                                <React.Fragment>
                                    <tr>
                                        <TableHeader >Subcribed On:</TableHeader>
                                        <TableData >{subscribedOnDate}</TableData>
                                    </tr>
                                    <tr>
                                        <TableHeader >Subcription Ends On:</TableHeader>
                                        <TableData >{endingDate}</TableData>
                                    </tr>
                                    <tr>
                                        <TableHeader >Expires in:</TableHeader>
                                        <TableData >{daysLeft} Days</TableData>
                                    </tr>
                                </React.Fragment>
                            )}
                        </tbody>
                    </ResponsiveTable>
                </Card>
            </Box>
        </Box>
    )
}
export default ProfilePage;