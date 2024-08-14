import { Box, Card, Typography } from "@mui/material";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import React, { useEffect, useState } from "react";
import bgstrip from "../assets/images/bgstrip.jpg";
import { useStyles } from "./LoginPage";
import CircularProgress from '@mui/material/CircularProgress';
import { loadingSpace } from "../assets/data/styles";
import instance from "../services/axios";
import ReadMore from "../Components/ReadMore";

const BlogPage = () => {
    const classes = useStyles();
    const [resultData, setResultData] = useState([]);
    const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingBlogs(true);
            try {
                const response = await instance.get(`/getblogsdata`);
                // console.log(response);
                setResultData(response.data.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setIsLoadingBlogs(false);
            }
        };
        fetchData();
    }, []);
    // // console.log(resultData);
    // const arrayBufferToBase64 = (buffer) => {
    //     let binary = '';
    //     const bytes = new Uint8Array(buffer);
    //     for (let i = 0; i < bytes.byteLength; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    // };

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{ backgroundColor: "aliceblue" }}>
                <Typography
                    sx={{
                        width: "100%",
                        height: { sm: "4rem", xs: "3rem" },
                        backgroundImage: `url(${bgstrip})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: { xs: 20, sm: 30 },
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    BLOG
                </Typography>

                {
                    isLoadingBlogs ? <Box style={loadingSpace}><CircularProgress /> </Box> :
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                            {resultData.slice().reverse().map((item, index) => (
                                <Card
                                    key={index}
                                    className={classes.card}
                                    sx={{
                                        px: { xs: 4 },
                                        py: { xs: 2 },
                                        width: { xs: "310px", sm: "80%" },
                                        display: "flex",
                                        flexDirection: { sm: "row", xs: "column" },
                                        gap: 4,
                                    }}
                                >
                                    {item.image ? (
                                        <Box
                                            sx={{
                                                width: { xs: "100%", sm: "50%" },
                                                borderRadius: "10px",
                                                maxHeight:"20rem"
                                            }}
                                            component="img"
                                            src={item.image}
                                        />
                                    ) : null}
                                    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                                        <Typography sx={{ fontSize: { xs: 17, sm: 23 }, fontWeight: "bold" }}>
                                            {item.title}
                                        </Typography>
                                        <Box p={1} />
                                        <ReadMore content={item.content} maxCharacterCount={500} />
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                }
            </Box>
        </Box>
    );
};

export default BlogPage;