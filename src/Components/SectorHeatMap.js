import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../assets/data/styles";
import { Sector_Compare_msg } from "../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { months } from "./BroadHeatMap";

// const verticalLine = [
//     'Nifty Auto', 'Nifty Bank', 'Nifty Fin Service', 'NIFTY FINSRV25 50', 'Nifty Financial Services Ex-Bank', 'Nifty FMCG',
//     'NIFTY HEALTHCARE', 'Nifty IT', 'Nifty Pharma', 'Nifty Metal', 'Nifty Media', 'Nifty Pvt Bank', 'Nifty PSU Bank', 'Nifty Realty',
//     'NIFTY CONSR DURBL', 'Nifty MidSmall Financial Services', 'Nifty MidSmall Healthcare', 'Nifty MidSmall IT & Telecom'
// ];
const SectorHeatMap = ({ isLoadingSectorHeatMap, setIsLoadingSectorHeatMap }) => {
    const [resultSectorData, setresultSectorData] = useState([]);

    const fetchSectorData = async () => {
        setIsLoadingSectorHeatMap(true);
        try {
            const response = await fetch(`https://heatmap-node-1.onrender.com/getsectorheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setresultSectorData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingSectorHeatMap(false);
        }
    };

    useEffect(() => {
        fetchSectorData();
    }, []);

    return (
        <Box>
            {
                isLoadingSectorHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box> :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{Sector_Compare_msg}</Typography>
                        <MonthlyCompareStocksHeatMap data={resultSectorData} months={months} />
                    </Box>
            }
        </Box>
    )
}
export default SectorHeatMap;