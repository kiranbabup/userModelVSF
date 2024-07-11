import { Box, Typography} from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../assets/data/styles";
import { Strategy_Compare_msg } from "../../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { months } from "./BroadHeatMap";
import instance from "../../services/axios";
import { processResult } from "../../assets/data/functions";

const StrategyHeatMap = ({ isLoadingStrategyHeatMap, setIsLoadingStrategyHeatMap }) => {
    const [resultStrategyData, setresultStrategyData] = useState([]);

    const fetchStrategyData = async () => {
        setIsLoadingStrategyHeatMap(true);
        try {
            const response = await instance.get(`/getstrategyheatmapdata`);
            // console.log(response.data.data);
            let result = processResult(response.data.data);
            setresultStrategyData(result);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingStrategyHeatMap(false);
        }
    };

    useEffect(() => {
        fetchStrategyData();
    }, []);

    return (
        <Box>
            {
                isLoadingStrategyHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box> :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{Strategy_Compare_msg}</Typography>
                        <MonthlyCompareStocksHeatMap data={resultStrategyData} months={months} />
                    </Box>
            }
        </Box>
    )
}
export default StrategyHeatMap;