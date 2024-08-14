import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Box, TextField } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";
import { apiKey, firstBox } from '../stock2/stock2styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HeightIcon from '@mui/icons-material/Height';

const MutualFunds = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [sortOrder, setSortOrder] = useState('default');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/1NS5VblGblodP1jebtGFyhClaD0PmGH_CVOLKSS8uCOY/values/benchmark?alt=json&key=${apiKey}`)
                .then(response => response.json())
                .then(response => {
                    const valuesSheet = response.values.slice(1);
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

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            const valueA = parseFloat(a[9]) || -Infinity;
            const valueB = parseFloat(b[9]) || -Infinity;

            if (sortOrder === 'asc') {
                return valueA - valueB;
            } else if (sortOrder === 'desc') {
                return valueB - valueA;
            } else {
                return 0;
            }
        });
    }, [data, sortOrder]);

    const handleSort = () => {
        setSortOrder(prevOrder => {
            if (prevOrder === 'default') {
                return 'desc';
            } else if (prevOrder === 'desc') {
                return 'asc';
            } else {
                return 'desc';
            }
        });
    };

    const renderSortIcon = () => {
        if (sortOrder === 'asc') {
            return <ArrowDropUpIcon />;
        } else if (sortOrder === 'desc') {
            return <ArrowDropDownIcon />;
        } else {
            return <HeightIcon />;
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return sortedData.slice(startIndex, startIndex + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);

    return (
        <Box>
            <HeaderComponent />
            <Box p={2} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box style={firstBox}>
                    <TextField
                        type="text"
                        id="searchBar"
                        label="Enter search term"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Box p={2} />

                    <div id="table1">
                        {selectedArray.length > 0 && (
                            <TableContainer>
                                <Table id='myTable'>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "navy" }}>
                                            <TableCell sx={{ color: "white", fontWeight: "bold", borderEndStartRadius: "1rem", borderStartStartRadius: "1rem" }}>#</TableCell>
                                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
                                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>%</TableCell>
                                            <TableCell sx={{ color: "white", fontWeight: "bold", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem" }}>Del</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedArray.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{((item.value / total) * 100).toFixed(1)}</TableCell>
                                                <TableCell style={{ textAlign: "center" }}>
                                                    <Button variant="contained" color="error" style={{ minWidth: "1.5rem" }} onClick={() => handleDeleteItem(`${item.name},,${item.value}`)}><DeleteForeverIcon /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </div>

                    <Box p={2} />
                    <div id="resultsList" style={{ width: "95%" }} >
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ borderRadius: "1rem" }}>
                                    <TableRow sx={{ backgroundColor: "navy", }}>
                                        <TableCell sx={{
                                            color: "white", fontWeight: "bold",
                                            borderEndStartRadius: "1rem", borderStartStartRadius: "1rem"
                                        }}>Stock Names</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <Button variant="contained" sx={{ padding: "0px", width: "4.5rem" }} onClick={handleSort}>
                                                Ratio {renderSortIcon()}
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Alpha</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Beta</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem" }}>Add</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row[2]}</TableCell>
                                            <TableCell>{row[9]}</TableCell>
                                            <TableCell>{row[10]}</TableCell>
                                            <TableCell>{row[11]}</TableCell>
                                            <TableCell style={{ textAlign: "center" }}>
                                                <Button variant="contained" color='success' style={{ minWidth: "1.5rem" }} onClick={() => handleAddItem(`${row[2]},,${row[9]}`)}>+</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={sortedData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </Box>
            </Box>
            <Box p={2} />
        </Box>
    );
}

export default MutualFunds;
