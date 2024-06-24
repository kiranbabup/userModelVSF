import { Box, Card, Typography } from "@mui/material";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import React, { useEffect, useState } from "react";
import bgstrip from "../assets/images/bgstrip.jpg";
import { useStyles } from "./LoginPage";

const BlogPage = () => {
    const classes = useStyles();
    const [resultData, setResultData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://vsfintech-adminpanel-node.onrender.com/blog-data`);
            if (!response.ok) {
                throw new Error(`http error status: ${response.status}`);
            }
            const result = await response.json();
            setResultData(result.results);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

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

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                    {resultData.slice().reverse().map((item, index) => (
                        <Card
                            key={index}
                            className={classes.card}
                            sx={{
                                px: { xs: 1 },
                                py: { xs: 1 },
                                width: { xs: "310px", sm: "80%" },
                                display: "flex",
                                flexDirection: { sm: "row", xs: "column" },
                                gap: 2,
                            }}
                        >
                            {item.image && item.image.data ? (
                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "50%" },
                                        borderRadius: "10px",
                                    }}
                                    component="img"
                                    src={`data:image/jpeg;base64,${arrayBufferToBase64(item.image.data)}`}
                                />
                            ) : null}
                            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                                <Typography sx={{ fontSize: { xs: 17, sm: 23 }, fontWeight: "bold" }}>
                                    {item.title}
                                </Typography>
                                <Box p={1} />
                                <Typography
                                    sx={{ fontSize: { xs: 14, sm: 16 }, textAlign: "justify", textIndent: "30px" }}
                                >
                                    {item.content}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BlogPage;
