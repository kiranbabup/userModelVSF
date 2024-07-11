import { Box, Card, IconButton, TextField, Typography } from "@mui/material"
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import LsService from "../services/localstorage";
import React, { useEffect, useState } from "react";
import { useStyles } from "./LoginPage";
import bgstrip from "../assets/images/bgstrip.jpg";
import { calculateDaysLeft } from "../assets/data/functions";
import styled, { css } from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import instance from "../services/axios";

const tDATA = css`
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
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

const mobileStyles = css`
@media only screen and (max-width: 600px) {
    ${TableData}, ${TableHeader} {
        font-size: 12px;
    }
}
`;

const desktopStyles = css`
@media only screen and (min-width: 601px) {
    ${TableData}, ${TableHeader} {
        font-size: 16px;
    }
}
`;

const ResponsiveTable = styled(Table)`
${mobileStyles}
${desktopStyles}
`;

const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const [usersDBData, setUsersDBData] = useState([]);
    const [subscriptionStatus, setsubscriptionStatus] = useState("");
    const [phone, setPhone] = useState("");
    const [daysLeft, setDaysLeft] = useState("");
    const [isEditFN, setIsEditFN] = useState(false);
    const [newFN, setNewFN] = useState("");
    const [isEditLN, setIsEditLN] = useState(false);
    const [newLN, setNewLN] = useState("");
    const [isEditE, setIsEditE] = useState(false);
    const [newEM, setNewEM] = useState("");
    const [isEditP, setIsEditP] = useState(false);
    const [newPhone, setNewPhone] = useState("");
    const [disableIConBtn, setDisableIConBtn] = useState(false);

    const classes = useStyles();

    const convertDateFormat = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        let userdata = LsService.getCurrentUser();
        setUser(userdata);
        // setNewFN(userdata.first_name || "");
        // setNewLN(userdata.last_name || "");
        // setNewEM(userdata.email || "");
        // setNewPhone(userdata.phone_no || "");

        if (userdata.is_subscribed === 0) {
            setsubscriptionStatus("Not Subscribed");
        } else {
            setsubscriptionStatus("Subscribed");
            setDaysLeft(calculateDaysLeft(userdata.subscribe_expired_on));
        }

        if (userdata.phone_no === null) {
            setPhone("Edit Profile & Add Phone number");
        } else {
            setPhone(userdata.phone_no);
        }
    }, []);
    // console.log(user);
    useEffect(()=>{
        const fetchPersonalData = async () => {
            try {
                const response = await instance.get(`/getuserbyid/${user.id}`,);
                console.log(response.data);
                // console.log(response.data.data);
                // setUsersDBData();
              } catch (err) {
                console.error('Error getting data:', err);
              }
          };
          fetchPersonalData();
    },[user]);

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(number);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSave = async (field) => {
        let updatedUser = { ...user };

        switch (field) {
            case 'first_name':
                updatedUser.first_name = newFN;
                updatedUser.last_name = user.last_name;
                updatedUser.email = user.email;
                updatedUser.phone_no = user.phone_no;
                break;
            case 'last_name':
                updatedUser.last_name = newLN;
                updatedUser.first_name = user.first_name;
                updatedUser.email = user.email;
                updatedUser.phone_no = user.phone_no;
                break;
            case 'email':
                if (!validateEmail(newEM)) {
                    alert("Please enter a valid email address.");
                    return;
                }
                updatedUser.first_name = user.first_name;
                updatedUser.last_name = user.last_name;
                updatedUser.email = newEM;
                updatedUser.phone_no = user.phone_no;
                break;
            case 'phone_no':
                if (!validatePhoneNumber(newPhone)) {
                    alert("Please enter a valid 10-digit phone number.");
                    return;
                }
                updatedUser.first_name = user.first_name;
                updatedUser.last_name = user.last_name;
                updatedUser.email = user.email;
                updatedUser.phone_no = newPhone;
                break;
            default:
                return;
        }
        setDisableIConBtn(true);
        try {
            console.log(updatedUser);
            console.log(updatedUser.first_name);
            console.log(updatedUser.last_name);
            console.log(updatedUser.phone_no);
            let first_name = updatedUser.first_name;
            let last_name = updatedUser.last_name;
            let email = updatedUser.email;
            let phone_no = updatedUser.phone_no;
            const response = await fetch(`https://heatmapapi.onrender.com/updateuser/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({first_name, last_name, email, phone_no}),
            });
            setDisableIConBtn(false);
            console.log(response);
            console.log(response.ok);
            if (response.ok) {
                LsService.updateCurrentUser(updatedUser);
                setIsEditFN(false);
                setIsEditLN(false);
                setIsEditE(false);
                setIsEditP(false);
                window.location.reload();
            } else {
                alert('Something went wrong. Please try again later');
            }
        } catch (error) {
            console.error('Error editing Profile:', error.message);
            alert('Something went wrong. Please try again later');
            setIsEditFN(false);
            setIsEditLN(false);
            setIsEditE(false);
            setIsEditP(false);
            window.location.reload();
        }
    };

    const handlePhoneChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setNewPhone(onlyNums);
    };

    const handlePhoneKeyPress = (e) => {
        const charCode = e.charCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

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
                                <TableHeader >First Name:</TableHeader>
                                {!isEditFN ?
                                    <TableData >{user.first_name}
                                        <IconButton onClick={() => setIsEditFN(true)} ><EditIcon color="primary" /></IconButton>
                                    </TableData>

                                    : <TableData >
                                        <TextField
                                            id="edit-first_name"
                                            label="Write first name"
                                            defaultValue={user.first_name}
                                            style={{ width: '73%' }}
                                            onChange={(e) => setNewFN(e.target.value)}
                                        />
                                        <IconButton disabled={disableIConBtn} onClick={() => handleSave('first_name')} ><SaveIcon color={disableIConBtn ? "gray" : "primary"} /></IconButton>
                                    </TableData>
                                }
                            </tr>
                            <tr>
                                <TableHeader >Last Name:</TableHeader>
                                {!isEditLN ?
                                    <TableData>
                                        {user.last_name}
                                        <IconButton onClick={() => setIsEditLN(true)}><EditIcon color="primary" /></IconButton>
                                    </TableData>
                                    :
                                    <TableData>
                                        <TextField
                                            id="edit-last_name"
                                            label="Write last name"
                                            defaultValue={user.last_name}
                                            onChange={(e) => setNewLN(e.target.value)}
                                            style={{ width: '73%' }}
                                        />
                                        <IconButton disabled={disableIConBtn} onClick={() => handleSave('last_name')}><SaveIcon color={disableIConBtn ? "gray" : "primary"} /></IconButton>
                                    </TableData>
                                }
                            </tr>
                            <tr>
                                <TableHeader >Email ID:</TableHeader>
                                {!isEditE ?
                                    <TableData>
                                        {user.email}
                                        <IconButton onClick={() => setIsEditE(true)}><EditIcon color="primary" /></IconButton>
                                    </TableData>
                                    :
                                    <TableData>
                                        <TextField
                                            id="edit-email"
                                            label="Write email"
                                            defaultValue={user.email}
                                            onChange={(e) => setNewEM(e.target.value)}
                                            style={{ width: '73%' }}
                                        />
                                        <IconButton disabled={disableIConBtn} onClick={() => handleSave('email')}><SaveIcon color={disableIConBtn ? "gray" : "primary"} /></IconButton>
                                    </TableData>
                                }
                            </tr>
                            <tr>
                                <TableHeader >Phone Number:</TableHeader>
                                {!isEditP ?
                                    <TableData>
                                        {phone}
                                        <IconButton onClick={() => setIsEditP(true)}><EditIcon color="primary" /></IconButton>
                                    </TableData>
                                    :
                                    <TableData>
                                        <TextField
                                            id="edit-phone"
                                            label="Write phone number"
                                            defaultValue={phone !== "Edit Profile & Add Phone number" ? phone : ''}
                                            inputProps={{ maxLength: 10 }}
                                            onChange={(e) => handlePhoneChange(e)}
                                            onKeyPress={(e) => handlePhoneKeyPress(e)}
                                            style={{ width: '73%' }}
                                        />
                                        <IconButton disabled={disableIConBtn} onClick={() => handleSave('phone_no')}><SaveIcon color={disableIConBtn ? "gray" : "primary"} /></IconButton>
                                    </TableData>
                                }
                            </tr>
                            <tr>
                                <TableHeader >Subcription Status:</TableHeader>
                                <TableData >{subscriptionStatus}</TableData>
                            </tr>
                            {user.is_subscribed === 1 && (
                                <React.Fragment>
                                    <tr>
                                        <TableHeader >Subcribed On:</TableHeader>
                                        <TableData >{convertDateFormat(user.subscribed_on)}</TableData>
                                    </tr>
                                    <tr>
                                        <TableHeader >Subcription Ends On:</TableHeader>
                                        <TableData >{convertDateFormat(user.subscribe_expired_on)}</TableData>
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