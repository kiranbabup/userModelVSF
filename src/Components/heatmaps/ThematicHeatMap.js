import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../assets/data/styles";
import { Thematic_Compare_msg } from "../../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { months } from "./BroadHeatMap";
import instance from "../../services/axios";
import { processResult } from "../../assets/data/functions";

const ThematicHeatMap = ({ isLoadingThematicHeatMap, setIsLoadingThematicHeatMap }) => {
    const [resultThematicData, setresultThematicData] = useState([]);

    const fetchThematicData = async () => {
        setIsLoadingThematicHeatMap(true);
        try {
            const response = await instance.get(`/getthematicheatmapdata`);
            // console.log(result.data);
            let result = processResult(response.data.data);
            setresultThematicData(result);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingThematicHeatMap(false);
        }
    };

    useEffect(() => {
        fetchThematicData();
    }, []);

    return (
        <Box>
            {
                isLoadingThematicHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box> :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{Thematic_Compare_msg}</Typography>
                        <MonthlyCompareStocksHeatMap data={resultThematicData} months={months} />
                    </Box>
            }
        </Box>
    )
}
export default ThematicHeatMap;