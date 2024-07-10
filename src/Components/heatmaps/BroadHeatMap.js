import { Box, Typography, } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../assets/data/styles";
import { Broad_Compare_msg } from "../../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { getLast12Months} from "../../assets/data/functions";
import instance from "../../services/axios";

export const months = getLast12Months()

const BroadHeatMap = ({ isLoadingBroadHeatMap, setIsLoadingBroadHeatMap }) => {
    const [resultBroadData, setResultBroadData] = useState([]);

    const fetchBroadData = async () => {
        setIsLoadingBroadHeatMap(true);
        try {
            const response = await instance.get(`/getbroadheatmapdata`);
            // console.log(response.data.data);
            setResultBroadData(response.data.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingBroadHeatMap(false);
        }
    };

    useEffect(() => {
        fetchBroadData();
    }, []);

    return (
        <Box>
            {
                isLoadingBroadHeatMap ? <Box style={loadingSpace} ><CircularProgress /></Box> 
                :   <Box>
                        <Typography style={dsiplayMesgStyle} >{Broad_Compare_msg}</Typography>
                        <MonthlyCompareStocksHeatMap data={resultBroadData} months={months} />
                    </Box>
            }
        </Box>
    )
}
export default BroadHeatMap;