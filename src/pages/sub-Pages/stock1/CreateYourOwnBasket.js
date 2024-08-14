import React, { useEffect, useState } from 'react';
import './stock1Styles.css'; // Import your CSS file
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { firstBox, headerTypo } from '../stock2/stock2styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CreateYourOwnBasket = () => {
    const [values, setValues] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [basket, setBasket] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [stockInfo, setStockInfo] = useState({ name: '', image: '' });
    const [isBasket, setIsBasket] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "navy" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold", borderEndStartRadius: "1rem", borderStartStartRadius: "1rem" }}>#</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign:"center" }}>%</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem", textAlign:"center"  }}>Del</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arr.map((item, index) => {
                            const [stock, value] = item.split(',');
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{stock}</TableCell>
                                    <TableCell>{((value / total) * 100).toFixed(1)}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Button variant="contained" color="error" style={{ minWidth: "1.5rem" }} onClick={() => handleDeleteFromBasket(item)}><DeleteForeverIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const handleSort = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderStockTable = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = parseFloat(a[4]);
            const valueB = parseFloat(b[4]);
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        });

        const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <Box sx={{width:{xs:"95%",sm:"50%"}}}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ borderRadius: "1rem" }}>
                            <TableRow sx={{ backgroundColor: "navy", }}>
                                <TableCell sx={{
                                    color: "white", fontWeight: "bold",
                                    borderEndStartRadius: "1rem", borderStartStartRadius: "1rem"
                                }}>Stocks</TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <Button variant="contained" onClick={handleSort}>
                                        Value
                                    </Button>
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quality</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Growth</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem" }}>Add</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => {
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
                                    <TableRow key={index}>
                                        <TableCell >
                                            <Button variant='contained' color='info'
                                                fullWidth
                                                sx={{
                                                    textAlign: "start",
                                                    display: "flex",
                                                    justifyContent: "start"
                                                }}
                                                onClick={() => handleStockClick(row)}>
                                                {row[0]}</Button>
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }} className={qualityData} >{row[4]}</TableCell>
                                        <TableCell style={{ textAlign: "center" }} className={qualityClass}>{row[5]}</TableCell>
                                        <TableCell style={{ textAlign: "center" }} className={growthClass}>{row[6]}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <Button variant="contained" color='success' style={{ minWidth: "1.5rem" }} onClick={() => handleAddToBasket(row)}>+</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={sortedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
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
