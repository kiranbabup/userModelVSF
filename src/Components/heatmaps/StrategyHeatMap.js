import { Box, Typography} from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../assets/data/styles";
import { Strategy_Compare_msg } from "../../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { months } from "./BroadHeatMap";

const StrategyHeatMap = ({ isLoadingStrategyHeatMap, setIsLoadingStrategyHeatMap }) => {
    const [resultStrategyData, setresultStrategyData] = useState([]);

    const fetchStrategyData = async () => {
        setIsLoadingStrategyHeatMap(true);
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/getstrategyheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setresultStrategyData(result.data);
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