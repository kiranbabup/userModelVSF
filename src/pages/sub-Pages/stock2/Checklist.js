import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { centerBText, containerBox, excelDataStyle, firstBox, headerTypo } from './stock2styles';

const Checklist = ({ values }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredValues, setFilteredValues] = useState([]);
    const [embedHTML, setEmbedHTML] = useState("");
    const [headingText, setHeadingText] = useState("");
    const [display, setDisplay] = useState(false);
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredValues([]);
            setEmbedHTML("")
            return;
        }

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDisplay(true);
    };

    const handleCellClick = (cell) => {
        const [embedCode, displayText] = cell.split(',');
        setEmbedHTML(`
            <blockquote class="trendlyne-widgets" 
                data-get-url="https://trendlyne.com/web-widget/checklist-widget/Poppins/${embedCode}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E" 
                data-theme="light">
            </blockquote>
        `);
        setHeadingText(displayText);
        setFilteredValues([]);
        setDisplay(false);
    };

    return (
        <Box style={firstBox}>
            <Typography style={headerTypo}>CHECKLIST</Typography>
            <Box style={containerBox}>
                <TextField
                    type="text"
                    id="searchBar"
                    label="Enter search term"
                    onChange={handleSearchChange}
                    ref={searchBarRef}
                />

                <Box p={2} />
                {
                    (searchTerm.length === 0) &&
                    (<Typography style={centerBText}>Type to view CHECKLIST of a stock.</Typography>)
                }
                {
                    display ?
                        <Box id="filteredData" style={excelDataStyle}>
                            {filteredValues.length > 0 ? (
                                <table border="1">
                                    <tbody>
                                        {filteredValues.map((row, index) => (
                                            <tr key={index}>
                                                <td onClick={() => handleCellClick(`${row[1]},${row[0]}`)}>{row[0]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) :
                                <>
                                    {
                                        (searchTerm.length > 0) &&
                                        (<Typography style={centerBText}>No matching data found.</Typography>)
                                    }

                                </>
                            }
                        </Box>
                        :
                        <Box >
                            <Typography style={centerBText}>{headingText}</Typography>
                            <Box id="embedContainer" dangerouslySetInnerHTML={{ __html: embedHTML }} />
                        </Box>
                }
            </Box>
        </Box>
    );
};

export default Checklist;
