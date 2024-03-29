import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../assets/data/styles";
import { All_Compare_msg } from "../constants";
import LastMonthandWeekHeatMap from "./LastMonthandWeekHeatMap";
import { getLast12Months, lastMonthName } from "../assets/data/functions";

// const verticalLine = [
//     'Nifty Auto', 'Nifty Bank', 'Nifty Fin Service', 'NIFTY FINSRV25 50', 'Nifty Financial Services Ex-Bank', 'Nifty FMCG',
//     'NIFTY HEALTHCARE', 'Nifty IT', 'Nifty Pharma', 'Nifty Metal', 'Nifty Media', 'Nifty Pvt Bank', 'Nifty PSU Bank', 'Nifty Realty',
//     'NIFTY CONSR DURBL', 'Nifty MidSmall Financial Services', 'Nifty MidSmall Healthcare', 'Nifty MidSmall IT & Telecom'
// ];
const AllHeatMap = ({ isLoadingAllHeatMap, setIsLoadingAllHeatMap }) => {
    const [resultDataA, setResultDataA] = useState([]);
    const [resultDataB, setResultDataB] = useState([]);
    const months = getLast12Months();

    const lastMonth = lastMonthName();
    // const months = [lastMonth, "current_week"];
    // console.log(xlabel);

    const fetchAllData = async () => {
        setIsLoadingAllHeatMap(true);
        try {
            const response = await fetch(`https://heatmap-node-1.onrender.com/getbroadheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            setResultDataA(result.data.slice(0,44));

            const responseB = await fetch(`https://heatmap-node-1.onrender.com/getsectorheatmapdata`);
            if (!responseB.ok) {
                throw new Error(`http error status:${responseB.status}`);
            }
            const resultB = await responseB.json();
            // console.log(result.data);
            setResultDataB(resultB.data.slice(0,44));
            // setResultDataB(result.data.slice(10));
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingAllHeatMap(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <Box>
            {
                isLoadingAllHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box> 
                :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{All_Compare_msg}</Typography>
                        <Box sx={{width: "100%", display: "flex", flexDirection:{xs:"column", md:"row"}, justifyContent: {md:"space-between"}, gap:{xs: 2, md:0}}}>
                            <LastMonthandWeekHeatMap data={resultDataA} months={months} />
                            <LastMonthandWeekHeatMap data={resultDataB} months={months} />
                        </Box>
                    </Box>
            }
        </Box>
    )
}
export default AllHeatMap;