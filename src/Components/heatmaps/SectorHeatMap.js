import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../assets/data/styles";
import { months } from "./BroadHeatMap";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { Sector_Compare_msg } from "../../constants";
import instance from "../../services/axios";

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
            const response = await instance.get(`/getsectorheatmapdata`);
            // console.log(response.data.data);
            setresultSectorData(response.data.data);
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