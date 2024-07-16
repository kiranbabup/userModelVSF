import { useEffect, useState } from "react";
import { Box } from "@mui/material"
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";
import SwotAnalysis from "./SwotAnalysis";
import Checklist from "./Checklist";
import Technicals from "./Technicals";
import QVT from "./QVT";
import { apiKey } from "./stock2styles";

const Stock2 = () => {
    const [values, setValues] = useState([]);

    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Vyx0O5atvsSMg9lqK-sH65Tb7vT3mcbyiNZ4A_ci_r8/values/Embed?alt=json&key=${apiKey}`)
            .then(response => response.json())
            .then(response => {
                const fetchedValues = response.values.slice(1);
                setValues(fetchedValues);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box p={1} />
                <SwotAnalysis values={values} />
                <Box p={2} />
                <Checklist values={values} />
                <Box p={2} />
                <Technicals values={values} />
                <Box p={2} />
                <QVT values={values} />
                <Box p={2} />
                </Box>
        </Box>
    )
}
export default Stock2;