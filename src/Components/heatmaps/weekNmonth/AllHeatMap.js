import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { dsiplayMesgStyle, loadingSpace } from "../../../assets/data/styles";
import { All_Compare_msg } from "../../../constants";
import LastMonthandWeekHeatMap from "./LastMonthandWeekHeatMap";
import { getLast12Months, lastMonthName, sliceMonthWeekValue } from "../../../assets/data/functions";

const AllHeatMap = ({ isLoadingAllHeatMap, setIsLoadingAllHeatMap }) => {
    const [resultDataA, setResultDataA] = useState([]);
    const [resultDataB, setResultDataB] = useState([]);
    // const months = getLast12Months();

    const lastMonth = lastMonthName();
    const months = [lastMonth, "Prev_week"];
    // console.log(xlabel);

        const fetchAllData = async () => {
            // console.log("AllHeatMap");
            setIsLoadingAllHeatMap(true);
            try {
                const response = await fetch(`https://heatmapapi.onrender.com/getMonthAndWeekData`);
                if (!response.ok) {
                    throw new Error(`http error status:${response.status}`);
                }
                const result = await response.json();
                // console.log(result);
                // setResultDataA(result)
                setResultDataA(result.slice(0, sliceMonthWeekValue));

                const responseB = await fetch(`https://heatmapapi.onrender.com/getMonthAndWeekData`);
                if (!responseB.ok) {
                    throw new Error(`http error status:${responseB.status}`);
                }
                const resultB = await responseB.json();
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