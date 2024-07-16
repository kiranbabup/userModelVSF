import React, { useState, useEffect } from 'react';
import { Box, TextField, } from "@mui/material"
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";
import { apiKey } from '../stock2/stock2styles';

const MutualFunds = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/1NS5VblGblodP1jebtGFyhClaD0PmGH_CVOLKSS8uCOY/values/benchmark?alt=json&key=${apiKey}`)
                .then(response => response.json())
                .then(response => {
                    const valuesSheet = response.values.slice(1);
                    // console.log('Data from Sheet 1:', valuesSheet);
                    const filteredData = valuesSheet.filter(row => row[2].toLowerCase().includes(searchTerm.toLowerCase()));
                    setData(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setData([]);
        }
    }, [searchTerm]);

    const handleAddItem = (item) => {
        const [name, value] = item.split(',,');
        if (value > 0) {
            setSelectedItems(prev => new Set([...prev, item]));
        }
    };

    const handleDeleteItem = (item) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(item);
            return newSet;
        });
    };

    const getSelectedData = () => {
        let total = 0;
        const selectedArray = Array.from(selectedItems).map(item => {
            const [name, value] = item.split(',,');
            total += parseFloat(value);
            return { name, value: parseFloat(value) };
        });
        return { selectedArray, total };
    };

    const { selectedArray, total } = getSelectedData();

    return (
        <Box>
            <HeaderComponent />
            <Box p={2} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "90%", }}>
                    <TextField
                        type="text"
                        id="searchBar"
                        label="Enter search term"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // ref={searchBarRef}
                        value={searchTerm}
                    />

                    <Box p={2} />
                    
                    <div id="table1">
                        {selectedArray.length > 0 && (
                            <table id='myTable' border="1">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Stock</th>
                                        <th onClick={() => { }}>%</th>
                                        <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedArray.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{((item.value / total) * 100).toFixed(1)}</td>
                                            <td>
                                                <button style={{width: "1.5rem", cursor: 'pointer'}} onClick={() => handleDeleteItem(`${item.name},,${item.value}`)}>-</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Box p={2} />
                    <div id="resultsList">
                        <table border="1">
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row[2]}</td>
                                        <td>{row[9]}</td>
                                        <td>{row[10]}</td>
                                        <td>{row[11]}</td>
                                        <td>
                                            <button style={{width: "1.5rem", cursor: 'pointer'}} onClick={() => handleAddItem(`${row[2]},,${row[9]}`)}>+</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Box>
            </Box>
            <Box p={2} />
        </Box>
    )
}
export default MutualFunds;