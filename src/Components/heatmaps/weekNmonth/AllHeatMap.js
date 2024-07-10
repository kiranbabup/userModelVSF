import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../../assets/data/styles";
import { All_Compare_msg } from "../../../constants";
import LastMonthandWeekHeatMap from "./LastMonthandWeekHeatMap";
import { lastMonthName, sliceMonthWeekValue } from "../../../assets/data/functions";
import instance from "../../../services/axios";

const AllHeatMap = ({ isLoadingAllHeatMap, setIsLoadingAllHeatMap }) => {
    const [resultDataA, setResultDataA] = useState([]);
    const [resultDataB, setResultDataB] = useState([]);

    const lastMonth = lastMonthName();
    const months = [lastMonth, "Prev_week"];

        const fetchAllData = async () => {
            setIsLoadingAllHeatMap(true);
            try {
                // const response = await fetch(`https://heatmapapi.onrender.com/getMonthAndWeekData`);
                const responseA = await instance.get(`/getMonthAndWeekData`);
                // console.log(responseA);
                // console.log(responseA.data);
                // const result = await response.json();
                const result = responseA.data;
                // console.log(result);
                // setResultDataA(result)
                setResultDataA(result.slice(0, sliceMonthWeekValue));
                setResultDataB(result.slice(sliceMonthWeekValue));
            } catch (error) {
                console.error("Error fetching stock data:", error);
            } finally {
                setIsLoadingAllHeatMap(false);
            }
        };

    useEffect(() => {
        fetchAllData();
        // console.log("month");

    }, []);

    // console.log(resultDataA);
    return (
        <Box>
            {
                isLoadingAllHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box>
                    :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{All_Compare_msg}</Typography>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: { md: "space-between" }, gap: { xs: 2, md: 0 } }}>
                            <LastMonthandWeekHeatMap data={resultDataA} months={months} />
                            <LastMonthandWeekHeatMap data={resultDataB} months={months} />
                        </Box>
                    </Box>
            }
        </Box>
    )
}
export default AllHeatMap;