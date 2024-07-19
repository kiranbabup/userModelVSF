import React, { useEffect, useState } from 'react';
import './stock1Styles.css'; // Import your CSS file
import { Box, TextField, Typography } from '@mui/material';
import { firstBox, headerTypo } from '../stock2/stock2styles';

const CreateYourOwnBasket = () => {
    const [values, setValues] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [basket, setBasket] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [stockInfo, setStockInfo] = useState({ name: '', image: '' });
    const [isBasket, setIsBasket] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    // const [isTable1, setisTable1] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1AMJIekwmTduIjNvExBDT3MjuV8gtOUFL-cofVR9gF5Y/values/totalmarketcap?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k');
            const data = await response.json();
            setValues(data.values.slice(1));
        };

        fetchData();
    }, []);

    const filterData = () => {
        if (searchTerm === '') {
            setFilteredData([]);
        } else {
            const filtered = values.filter(row =>
                row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        filterData();
    }, [searchTerm, values]);

    const handleAddToBasket = (stock) => {
        if (stock[4] > 0) {
            basket.add(`${stock[0]},${stock[4]}`);
            setBasket(new Set(basket));
            setIsBasket(true);
        }
    };

    const handleDeleteFromBasket = (item) => {
        basket.delete(item);
        setBasket(new Set(basket));
        if (basket.size === 0) {
            setIsBasket(false);
        }
    };

    const handleStockClick = (stock) => {
        const value = parseFloat(stock[4]);
        let img = '';

        if (value > 2.5) {
            img = 'https://drive.google.com/thumbnail?id=1zhGdQ6sxr67JinDTvFzmhFLcmHEzdboh';
        } else if (value <= 2.5 && value > 1.3) {
            img = 'https://drive.google.com/thumbnail?id=1C60IZr8uagF6LQDGZucOJqRoSyhqgREZ';
        } else if (value <= 1.3 && value > 0.8) {
            img = 'https://drive.google.com/thumbnail?id=1TViDmHt1TzGix67THyy_8lAQ4Tb4ja30';
        } else if (value <= 0.8 && value > 0.4) {
            img = 'https://drive.google.com/thumbnail?id=1cbOqENyYkRcqVXiEcRad7Iw5YAkaQy3Q';
        } else {
            img = 'https://drive.google.com/thumbnail?id=1_Y0qgCP60on471bY6qVFVZLJtqPwyqQh';
        }

        setStockInfo({ name: stock[0], image: img });
    };

    const getBasketTable = () => {
        const arr = Array.from(basket);
        const total = arr.reduce((sum, item) => sum + parseFloat(item.split(',')[1]), 0);

        return (
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Stock</th>
                        <th>%</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((item, index) => {
                        const [stock, value] = item.split(',');
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{stock}</td>
                                <td>{((value / total) * 100).toFixed(1)}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button style={{ width: "1.5rem", cursor: 'pointer' }} onClick={() => handleDeleteFromBasket(item)}>-</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const handleSort = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const renderStockTable = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = parseFloat(a[4]);
            const valueB = parseFloat(b[4]);
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        });

        return (
            <table border="1">
                <thead>
                    <tr>
                        <th>Stocks</th>
                        <td style={{ textAlign: "center" }}>
                            <button style={{ width: "2.5rem", cursor: 'pointer' }} onClick={() => handleSort()}>%</button>
                        </td>
                        {/* <th onClick={handleSort} style={{ cursor: 'pointer' }}>%</th> */}
                        <th>Quality</th>
                        <th>Growth</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => {
                        const qualityData = row[4] > 2.5 ? 'darkgreen-value' :
                            row[4] > 1.3 ? 'lightgreen-value' :
                                row[4] > 0.8 ? 'yellow-value' :
                                    row[4] > 0.4 ? 'orange-value' : 'vlow-value';
                        const qualityValue = parseFloat(row[5]);
                        const growthValue = parseFloat(row[6]);

                        let qualityClass = '';
                        let growthClass = '';

                        if (qualityValue > 80 && qualityValue <= 100) {
                            qualityClass = 'darkgreen-value';
                        } else if (qualityValue > 60 && qualityValue <= 80) {
                            qualityClass = 'lightgreen-value';
                        } else if (qualityValue > 40 && qualityValue <= 60) {
                            qualityClass = 'yellow-value';
                        } else if (qualityValue > 20 && qualityValue <= 40) {
                            qualityClass = 'orange-value';
                        } else {
                            qualityClass = 'vlow-value';
                        }

                        if (growthValue > 80 && growthValue <= 100) {
                            growthClass = 'darkgreen-value';
                        } else if (growthValue > 60 && growthValue <= 80) {
                            growthClass = 'lightgreen-value';
                        } else if (growthValue > 40 && growthValue <= 60) {
                            growthClass = 'yellow-value';
                        } else if (growthValue > 20 && growthValue <= 40) {
                            growthClass = 'orange-value';
                        } else {
                            growthClass = 'vlow-value';
                        }
                        return (
                            <tr key={index}>
                                <td onClick={() => handleStockClick(row)} >{row[0]}</td>
                                <td className={qualityData} >{row[4]}</td>
                                <td className={qualityClass}>{row[5]}</td>
                                <td className={growthClass}>{row[6]}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button style={{ width: "1.5rem", cursor: 'pointer' }} onClick={() => handleAddToBasket(row)}>+</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const handleSerachterm = (e) => {
        setSearchTerm(e.target.value);
        if (searchTerm.length === 0) {
            setStockInfo({ name: '', image: '' });
        }
    }
    return (
        <Box style={firstBox}>
            <Typography style={headerTypo}>Create Your Own Basket</Typography>
            <Box p={1} />
            {
                isBasket &&
                <div>
                    {getBasketTable()}
                    <Box p={2} />
                </div>
            }
            <TextField
                id="searchBar"
                type="text"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => handleSerachterm(e)}
                label="Search your stock"
            />
            <Box p={1} />
            <Box sx={{
                width: "100%", display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: { xs: 'center', md: "start" },
                justifyContent: { md: "space-evenly" },
                gap: { xs: 2, md: 0 }, flexWrap: { md: "wrap", lg: "nowrap", }
            }}>
                {renderStockTable()}
                <Box p={2} />
                {(stockInfo.name && searchTerm.length > 0) && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h3>{stockInfo.name}</h3>
                        <img src={stockInfo.image} alt={stockInfo.name} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CreateYourOwnBasket;
