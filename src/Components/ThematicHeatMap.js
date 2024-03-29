import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../assets/data/styles";
import { Thematic_Compare_msg } from "../constants";
import MonthlyCompareStocksHeatMap from "./MonthlyCompareStocksHeatMap";
import { months } from "./BroadHeatMap";

const ThematicHeatMap = ({ isLoadingThematicHeatMap, setIsLoadingThematicHeatMap }) => {
    const [resultThematicData, setresultThematicData] = useState([]);

    const fetchThematicData = async () => {
        setIsLoadingThematicHeatMap(true);
        try {
            const response = await fetch(`https://heatmap-node-1.onrender.com/getthematicheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setresultThematicData(result.data);
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