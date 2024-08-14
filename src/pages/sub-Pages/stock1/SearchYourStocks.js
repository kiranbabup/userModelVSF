import React, { useEffect, useState } from 'react';
import './stock1Styles.css'; // Import your CSS file
import risk1 from './images/risk1.png';
import risk2 from './images/risk2.png';
import risk3 from './images/risk3.png';
import risk4 from './images/risk4.png';
import risk5 from './images/risk5.png';
import { apiKey, firstBox, headerTypo } from '../stock2/stock2styles';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const SearchYourStocks = () => {
    const [values, setValues] = useState([]);
    const [myArray, setMyArray] = useState([]);
    const [keyValuePairs, setKeyValuePairs] = useState({});
    const [sort, setSort] = useState([]);
    const [sort1, setSort1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(new Set());
    const [totalSum, setTotalSum] = useState(0);
    const [showTable3, setShowTable3] = useState(false);
    const [isIndustriesView, setIsIndustriesView] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(107);
    const [table2Page, setTable2Page] = useState(0);
    const [table2RowsPerPage, setTable2RowsPerPage] = useState(10);

    useEffect(() => {
        setLoading(true);
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/18IDm-Ut2i3zXsLSxLU5h-Ox9Xm0Bxi1kK9qVrPLR2dA/values/Latest_values?alt=json&key=${apiKey}`)
            .then(response => response.json())
            .then(response => {
                const valuesData = response.values.slice(1);
                setValues(valuesData);

                const industrySet = new Set();
                valuesData.forEach(row => {
                    if (row[3] !== "#N/A") {
                        industrySet.add(row[3]);
                    }
                });
                const industries = Array.from(industrySet).sort();
                setMyArray(industries);

                const keyValueMap = {};
                industries.forEach(industry => {
                    const industryValues = valuesData.filter(row => row[3] === industry).map(row => row[4]);
                    keyValueMap[industry] = industryValues;
                });
                setKeyValuePairs(keyValueMap);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let sum = 0;
        Array.from(load).forEach(value => {
            const numericValue = parseFloat(value.split(',,')[1]);
            sum += numericValue;
        });

        setTotalSum(sum);
        setShowTable3(load.size > 0);
    }, [load]);

    const myfun1 = (index) => {
        setIsIndustriesView(false);
        document.getElementById('image').innerHTML = '';
        document.getElementById('text').innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const filteredValues = values.filter(value => value[3].includes(myArray[index]));
        const sortValues = filteredValues.map(value => value[4]);
        const sort1Values = filteredValues.map(value => `${value[0]},,${value[4]},,${value[5]},,${value[6]}`);

        setSort(sortValues);
        setSort1(sort1Values);
    };

    const myfunn = (index) => {
        let imgSrc = '';
        let text = '';

        let indexValue = parseFloat(index.split(',,')[0]);

        if (indexValue > '2.5' && indexValue <= '10') {
            imgSrc = risk1;
            text = index.split(',,')[1];
        } else if (indexValue > '1.3' && indexValue <= '2.5') {
            imgSrc = risk2;
            text = index.split(',,')[1];
        } else if (indexValue > '0.8' && indexValue <= '1.3') {
            imgSrc = risk3;
            text = index.split(',,')[1];
        } else if (indexValue > '0.4' && indexValue <= '0.8') {
            imgSrc = risk4;
            text = index.split(',,')[1];
        } else {
            imgSrc = risk5;
            text = index.split(',,')[1];
        }
        document.getElementById('image').innerHTML = `<img src="${imgSrc}" alt="Page Image">`;
        document.getElementById('text').innerHTML = text;
    };

    const handleClick = (event, value, splitValue) => {
        let updatedLoad = new Set(load);
        updatedLoad.add(splitValue);

        setLoad(updatedLoad);
        setShowTable3(true);
    };

    const handleDelete = (value) => {
        const updatedLoad = new Set(load);
        updatedLoad.delete(value);
        setLoad(updatedLoad);
        if (updatedLoad.size === 0) {
            setShowTable3(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTable = () => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = myArray.slice(start, end);
        return (
            <Box>
                <table>
                    <thead >
                        <tr >
                            <th style={{
                                borderEndStartRadius: " 0.5rem",
                                borderStartStartRadius: " 0.5rem",
                                backgroundColor: "navy", color: "white",
                                padding:"0.5rem"
                            }}>Industries</th>
                            <th style={{
                                borderStartEndRadius: "0.5rem",
                                borderEndEndRadius: "0.5rem",
                                backgroundColor: "navy", color: "white",
                                padding:"0.5rem"
                            }}>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((value, index) => {
                            let undervalue = 0;
                            let balanced = 0;
                            let overvalue = 0;

                            keyValuePairs[value].forEach(val => {
                                if (val > 1.3 && val <= 10) {
                                    undervalue++;
                                } else if (val > 0.8 && val <= 1.3) {
                                    balanced++;
                                } else {
                                    overvalue++;
                                }
                            });

                            let ovl = '';
                            if (undervalue >= balanced && undervalue > overvalue) {
                                ovl = "Undervalued";
                            } else if (balanced > undervalue && balanced > overvalue) {
                                ovl = "Balanced";
                            } else {
                                ovl = "Overvalue";
                            }

                            return (
                                <tr key={index} >
                                    <td style={{
                                        borderEndStartRadius: " 0.5rem",
                                        borderStartStartRadius: " 0.5rem",
                                    }}>
                                        <Button variant='contained' color='info'
                                            sx={{
                                                textAlign: "start",
                                                display: "flex",
                                                justifyContent: "start"
                                            }}
                                            fullWidth
                                            onClick={() => myfun1(index)}>
                                            {value}</Button>
                                    </td>
                                    <td style={{
                                        borderStartEndRadius: "0.5rem",
                                        borderEndEndRadius: "0.5rem",
                                        paddingRight: ".5rem",
                                        paddingLeft: ".5rem",
                                        backgroundColor: ovl === 'Undervalued' ? '#4CAF50' :
                                            ovl === 'Overvalue' ? '#F44336' :
                                                ovl === 'Balanced' ? '#FFEB3B' :
                                                    '#FFFFFF'
                                    }}>
                                        {ovl}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <TablePagination
                    rowsPerPageOptions={[107, 10, 25, 50, 100]}
                    component="div"
                    count={myArray.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        );
    };

    const onBackClick = () => {
        setIsIndustriesView(true);
    }

    const handleTable2ChangePage = (event, newPage) => {
        setTable2Page(newPage);
    };

    const handleTable2ChangeRowsPerPage = (event) => {
        setTable2RowsPerPage(parseInt(event.target.value, 10));
        setTable2Page(0);
    };

    const renderTable2 = () => {
        const start = table2Page * table2RowsPerPage;
        const end = start + table2RowsPerPage;
        const paginatedData = sort.slice(start, end);
        return (
            <Box sx={{ width: { xs: "95%", sm: "50%" } }}>
                <Button sx={{ padding: "5px" }} variant="contained" color='warning' startIcon={<WestIcon />} onClick={onBackClick} >Back to industries</Button>
                <Box p={1} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "navy" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold", borderEndStartRadius: "1rem", borderStartStartRadius: "1rem" }}>Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Value</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Quality</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Growth</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem", textAlign: "center" }}>Add</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((value, i) => {
                                const splitValues = sort1[i].split(',,');
                                const value4 = parseFloat(splitValues[1]);
                                const value2 = parseFloat(splitValues[2]);
                                const value3 = parseFloat(splitValues[3]);

                                let tdClassName = '';
                                if (value4 > 2.5 && value4 <= 10) {
                                    tdClassName = 'darkgreen-value';
                                } else if (value4 > 1.3 && value4 <= 2.5) {
                                    tdClassName = 'lightgreen-value';
                                } else if (value4 > 0.8 && value4 <= 1.3) {
                                    tdClassName = 'yellow-value';
                                } else if (value4 > 0.4 && value4 <= 0.8) {
                                    tdClassName = 'orange-value';
                                } else {
                                    tdClassName = 'vlow-value';
                                }

                                let tdClassName2 = '';
                                if (value2 > 80 && value2 <= 100) {
                                    tdClassName2 = 'darkgreen-value';
                                } else if (value2 > 60 && value2 <= 80) {
                                    tdClassName2 = 'lightgreen-value';
                                } else if (value2 > 40 && value2 <= 60) {
                                    tdClassName2 = 'yellow-value';
                                } else if (value2 > 20 && value2 <= 40) {
                                    tdClassName2 = 'orange-value';
                                } else {
                                    tdClassName2 = 'vlow-value';
                                }

                                let tdClassName3 = '';
                                if (value3 > 80 && value3 <= 100) {
                                    tdClassName3 = 'darkgreen-value';
                                } else if (value3 > 60 && value3 <= 80) {
                                    tdClassName3 = 'lightgreen-value';
                                } else if (value3 > 40 && value3 <= 60) {
                                    tdClassName3 = 'yellow-value';
                                } else if (value3 > 20 && value3 <= 40) {
                                    tdClassName3 = 'orange-value';
                                } else {
                                    tdClassName3 = 'vlow-value';
                                }

                                return (
                                    <TableRow key={i}>
                                        <TableCell >
                                            <Button variant='contained' color='info'
                                                fullWidth
                                                sx={{
                                                    textAlign: "start",
                                                    display: "flex",
                                                    justifyContent: "start"
                                                }}
                                                onClick={() => myfunn(`${value},,${splitValues[0]}`)}>
                                                {splitValues[0]}</Button>
                                        </TableCell>

                                        <TableCell className={tdClassName} sx={{ textAlign: "center" }}>{splitValues[1]}</TableCell>
                                        <TableCell className={tdClassName2} sx={{ textAlign: "center" }}>{splitValues[2]}</TableCell>
                                        <TableCell className={tdClassName3} sx={{ textAlign: "center" }}>{splitValues[3]}</TableCell>

                                        <TableCell style={{ textAlign: "center" }}>
                                            <Button variant="contained" color='success' style={{ minWidth: "1.5rem" }} onClick={(event) => {
                                                handleClick(event, value, `${splitValues[0]},,${splitValues[1]}`);
                                                event.stopPropagation();
                                            }}>+</Button>

                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={sort.length}
                    rowsPerPage={table2RowsPerPage}
                    page={table2Page}
                    onPageChange={handleTable2ChangePage}
                    onRowsPerPageChange={handleTable2ChangeRowsPerPage}
                />
            </Box>
        );
    };

    const renderTable3 = () => {
        return (
            <Box sx={{ width: { xs: "95%", sm: "40%" } }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "navy" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold", borderEndStartRadius: "1rem", borderStartStartRadius: "1rem" }}>#</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>%</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", borderStartEndRadius: "1rem", borderEndEndRadius: "1rem" }}>Del</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from(load).map((value, i) => {
                                const numericValue = parseFloat(value.split(',,')[1]);
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{value.split(',,')[0]}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{((numericValue / totalSum) * 100).toFixed(1)}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <Button variant="contained" color="error" style={{ minWidth: "1.5rem" }} onClick={() => handleDelete(value)}><DeleteForeverIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    }
    return (
        <Box style={firstBox}>
            <Typography style={headerTypo}>Choose Your Green industry</Typography>
            <Typography style={headerTypo}>Choose Your Green stocks</Typography>
            <Typography style={headerTypo}>Choose Your Green basket</Typography>
            {/* <h4 style={{ textAlign: "center" }}>Right Time, Right Price<br />Right Stock, Right Proportion</h4> */}
            <Box p={1} />

            {showTable3 && (renderTable3())}
            <Box p={1} />

            {!loading && isIndustriesView && renderTable()}
            <Box sx={{
                width: "100%", display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: { xs: 'center', md: "start" },
                justifyContent: { md: "space-evenly" },
            }}>
                {loading && <p>Loading...</p>}
                {!loading && !isIndustriesView && renderTable2()}
                <Box p={1} />

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div id="image"></div>
                    <Typography id="text" ></Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchYourStocks;