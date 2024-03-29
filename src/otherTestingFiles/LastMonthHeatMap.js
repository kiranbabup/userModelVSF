// LastMonthHeatMap
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Heatmap from 'react-heatmap-grid';
import { getLast12Months, mapMonthName } from "../assets/data/functions";

const LastMonthHeatMap = () => {
    const [resultData, setResultData] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const cellFontSize = isMobile ? '9px' : (isTablet ? '12px' : (isLaptop ? '13px' : '15px'));
    const cellminwidth = isMobile && '30px';
    // const cellHeight = isMobile ? '35px' : (isTablet ? '45px' : '55px');

    const fetchData = async () => {
        try {
            const response = await fetch(`https://heatmap-node-1.onrender.com/getBroadHeatMapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data.slice(0, 8));
            setResultData(result.data.slice(0, 8));
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const months = getLast12Months()
    // console.log(months);
    return (
        <Box>
            <Typography sx={{ pl: 5, fontWeight: "bold", color: "blue" }}>Displaying All Broad Stocks with last month</Typography>

            <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ width: "45%", }}>
                    <Heatmap
                        // data={resultData.map((entry) => Object.values(entry).slice(1))}
                        data={resultData.map((entry) => {
                            const mappedData = months.map(monthYear => entry[mapMonthName(monthYear)]);
                            // console.log(mappedData);
                            return mappedData;
                        })}
                        // xLabels={months}
                        xLabels={months.slice(1, -10)}
                        yLabels={resultData.map((entry) => entry.Stocks)}
                        yLabelWidth={160}
                        yLabelTextAlign="left"
                        backgroundColor="#eeeeee"
                        cellStyle={(background, value, min, max, data, x, y) => ({
                            background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                            fontSize: cellFontSize,
                            minWidth: cellminwidth,
                            border: '1px solid #ffffff',
                            height: 30,
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        })}
                        cellRender={(value) => value && `${value.toFixed(2)}`}
                    />
                </Box>
                <Box sx={{ width: "45%", }}>
                    <Heatmap
                        // data={resultData.map((entry) => Object.values(entry).slice(1))}
                        data={resultData.map((entry) => {
                            const mappedData = months.map(monthYear => entry[mapMonthName(monthYear)]);
                            // console.log(mappedData);
                            return mappedData;
                        })}
                        // xLabels={months}
                        xLabels={months.slice(1, -10)}
                        yLabels={resultData.map((entry) => entry.Stocks)}
                        yLabelWidth={160}
                        yLabelTextAlign="left"
                        backgroundColor="#eeeeee"
                        cellStyle={(background, value, min, max, data, x, y) => ({
                            background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                            fontSize: cellFontSize,
                            minWidth: cellminwidth,
                            border: '1px solid #ffffff',
                            height: 30,
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        })}
                        cellRender={(value) => value && `${value.toFixed(2)}`}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default LastMonthHeatMap;