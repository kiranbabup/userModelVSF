import { useEffect, useState, useRef } from "react";
import { Box, Button, TextField, Typography, TablePagination } from "@mui/material";
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";
import SwotAnalysis from "./SwotAnalysis";
import Checklist from "./Checklist";
import Technicals from "./Technicals";
import QVT from "./QVT";
import { apiKey, centerBText, containerBox, excelDataStyle, firstBox } from "./stock2styles";

const Stock2 = () => {
    const [values, setValues] = useState([]);
    const [BtnDisplay, setBtnDisplay] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [isSwot, setIsSwot] = useState(false);
    const [isTech, setIsTech] = useState(false);
    const [isQvt, setIsQvt] = useState(false);
    const searchBarRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [display, setDisplay] = useState(false);
    const [filteredValues, setFilteredValues] = useState([]);
    const [embedHTML, setEmbedHTML] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [embedCode, setEmbedCode] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Op6I3TnPXOxHwWxaFsDdPRZRFB-wnO3nzxuXVlhSZO0/values/Latest_values?alt=json&key=${apiKey}`)
            .then(response => response.json())
            .then(response => {
                const fetchedValues = response.values.slice(1);
                setValues(fetchedValues);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredValues([]);
            setEmbedHTML("")
            return;
        }
        // console.log(values);
        
        const filtered = values.filter(row =>
            row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase().trim()))
        );
        setFilteredValues(filtered);
    }, [searchTerm, values]);

    useEffect(() => {
        if (embedHTML) {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
            scriptElement.async = true;
            scriptElement.charset = 'utf-8';
            document.body.appendChild(scriptElement);
            return () => {
                document.body.removeChild(scriptElement);
            };
        }
    }, [embedHTML]);

    const onCheckClick = () => {
        setIsCheck(true);
        setIsSwot(false);
        setIsTech(false);
        setIsQvt(false);
        setEmbedHTML(`<blockquote class="trendlyne-widgets" data-get-url="https://trendlyne.com/web-widget/checklist-widget/Poppins/${embedCode}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E" data-theme="light"></blockquote>`);
    };

    const onSwotClick = () => {
        setIsCheck(false);
        setIsSwot(true);
        setIsTech(false);
        setIsQvt(false);
        setEmbedHTML(`<blockquote class="trendlyne-widgets" data-get-url="https://trendlyne.com/web-widget/swot-widget/Poppins/${embedCode}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E" data-theme="light"></blockquote>`);
    };

    const onTechClick = () => {
        setIsCheck(false);
        setIsSwot(false);
        setIsTech(true);
        setIsQvt(false);
        setEmbedHTML(`<blockquote class="trendlyne-widgets" data-get-url="https://trendlyne.com/web-widget/technical-widget/Poppins/${embedCode}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E" data-theme="light"></blockquote>`);
    };

    const onQvtClick = () => {
        setIsCheck(false);
        setIsSwot(false);
        setIsTech(false);
        setIsQvt(true);
        setEmbedHTML(`<blockquote class="trendlyne-widgets" data-get-url="https://trendlyne.com/web-widget/qvt-widget/Poppins/${embedCode}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E" data-theme="light"></blockquote>`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDisplay(true);
        setIsCheck(false);
        setIsSwot(false);
        setIsTech(false);
        setIsQvt(false);
        setEmbedHTML('');
    };

    const handleCellClick = (cell) => {
        setBtnDisplay(true);
        const [code, displayText] = cell.split(',');
        setEmbedCode(code);
        setHeadingText(displayText);
        setFilteredValues([]);
        setDisplay(false);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Box>
            <HeaderComponent />
            <Box p={2} />
            <Box style={containerBox}>
                <Box style={firstBox}>
                    <TextField
                        type="text"
                        id="searchBar"
                        label="Enter search term"
                        onChange={handleSearchChange}
                        ref={searchBarRef}
                    />
                    <Box p={1} />
                    {
                        (searchTerm.length === 0) && !display &&
                        (<Typography style={centerBText}>Type to view LIST of stocks.</Typography>)
                    }
                    {
                        BtnDisplay && !display &&
                        (
                            <Box>
                                <Typography style={centerBText}>Click any Button to display about</Typography>
                                <Typography style={centerBText} sx={{color:"green"}}>{headingText}</Typography>
                            </Box>
                        )
                    }
                    <Box p={1} />
                    {
                        BtnDisplay && !display &&
                        <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "1rem", }} >
                            <Button variant="contained" sx={{ width: "150px" }} onClick={() => onCheckClick()}>Check List</Button>
                            <Button variant="contained" sx={{ width: "150px" }} onClick={() => onSwotClick()}>Swot Analysis</Button>
                            <Button variant="contained" sx={{ width: "150px" }} onClick={() => onTechClick()}>Technicals</Button>
                            <Button variant="contained" sx={{ width: "150px" }} onClick={() => onQvtClick()}>Q.V.T</Button>
                        </Box>
                    }
                    <Box p={1} />
                    {display &&
                        <Box id="filteredData" style={excelDataStyle}>
                            {filteredValues.length > 0 ? (
                                <Box>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{
                                                    borderRadius: " 0.5rem",
                                                    backgroundColor: "navy", color: "white",
                                                    padding: "0.5rem", fontWeight: "bold"
                                                }}>Select a Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredValues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                <tr key={index}>
                                                    <Button variant='contained' color='info' fullWidth sx={{ fontWeight: "bold" }} onClick={() => handleCellClick(`${row[1]},${row[0]}`)}>{row[0]}</Button>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 50, 100]}
                                        component="div"
                                        count={filteredValues.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Box>
                            ) :
                                (
                                    searchTerm && (
                                        <Typography style={centerBText}>No matching data found.</Typography>
                                    )
                                )
                            }
                        </Box>}
                    {isCheck && <Checklist display={display} headingText={headingText} embedHTML={embedHTML} />}

                    {isSwot && <SwotAnalysis display={display} headingText={headingText} embedHTML={embedHTML} />}

                    {isTech && <Technicals display={display} headingText={headingText} embedHTML={embedHTML} />}

                    {isQvt && <QVT display={display} headingText={headingText} embedHTML={embedHTML} />}
                    <Box p={2} />
                </Box>
            </Box>
        </Box>
    );
};

export default Stock2;
