import React, { useState, useEffect } from 'react';
import './stock1Styles.css'; // Import the CSS styles
import { Box, Typography } from '@mui/material';
import { firstBox, headerTypo } from '../stock2/stock2styles';

const fetchSpreadsheetData = async (setSort1, setSort11) => {
    const response = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1I3ctHbNOlmy7xseACHRbiOyP5W3rMOKYPgnOxQpGbm4/values/heatccsv?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k'
    );
    const data = await response.json();
    const values = data.values;

    const keys = values[0].slice(1, 41).map(item => item.toUpperCase());
    const keyval = values[1].slice(1, 41).map(item => item);
    const keys1 = values[0].slice(41, 89).map(item => item.toUpperCase());
    const keyval1 = values[1].slice(41, 89).map(item => item);

    const sort1 = keys.map((key, index) => ({
        name: key.split('-')[1].split('_')[0].replace('NIFTY', 'NFT'),
        value: parseFloat(keyval[index]).toFixed(2),
    }));

    const sort11 = keys1.map((key, index) => ({
        name: key.split('-')[1].split('_')[0].replace('NIFTY', 'NFT'),
        value: parseFloat(keyval1[index]).toFixed(2),
    }));

    setSort1(sort1);
    setSort11(sort11);
};

const getClassForValue = (value) => {
    if (value >= 0 && value <= 0.2) return 'darkgreen-value';
    if (value > 0.2 && value <= 0.4) return 'lightgreen-value';
    if (value > 0.4 && value <= 0.6) return 'yellow-value';
    if (value > 0.6 && value <= 0.8) return 'orange-value';
    return 'vlow-value';
};

const DataTable = ({ data, sortData, toggleSort, isAsc }) => (
    <table border="1">
        <thead>
            <tr>
                <th onClick={toggleSort}>{sortData ? 'Name' : 'Value'}</th>
                {/* <th onClick={toggleSort}>Value</th> */}
                <td>
                    <button style={{ width: "3.5rem", cursor: 'pointer' }} onClick={toggleSort}>Value</button>
                </td>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td className={getClassForValue(item.value)}>{item.value}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const IdentifyRightTime = () => {
    const [sort1, setSort1] = useState([]);
    const [sort11, setSort11] = useState([]);
    const [isSort1Asc, setIsSort1Asc] = useState(true);
    const [isSort11Asc, setIsSort11Asc] = useState(true);

    useEffect(() => {
        fetchSpreadsheetData(setSort1, setSort11);
    }, []);

    const toggleSort1 = () => {
        const sorted = [...sort1].sort((a, b) => isSort1Asc ? b.value - a.value : a.value - b.value);
        setSort1(sorted);
        setIsSort1Asc(!isSort1Asc);
    };

    const toggleSort11 = () => {
        const sorted = [...sort11].sort((a, b) => isSort11Asc ? b.value - a.value : a.value - b.value);
        setSort11(sorted);
        setIsSort11Asc(!isSort11Asc);
    };

    return (
        <Box style={firstBox}>
            <Typography style={headerTypo}>Identify The Right Time..?</Typography>
            <Box p={1} />
            <Box sx={{
                width: "100%", display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: 'center', md: "start" },
                justifyContent: { md: "space-evenly" },
                gap: { xs: 2, md: 0 }, flexWrap: { md: "wrap", lg: "nowrap", }
            }} >
                <div id="demo">
                    <DataTable data={sort1} sortData={isSort1Asc} toggleSort={toggleSort1} />
                </div>
                <div id="demo1">
                    <DataTable data={sort11} sortData={isSort11Asc} toggleSort={toggleSort11} />
                </div>
            </Box>
        </Box>
    );
};

export default IdentifyRightTime;