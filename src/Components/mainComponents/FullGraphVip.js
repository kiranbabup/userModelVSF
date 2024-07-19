import React, { useState, useEffect } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CompareViewGraphOptions from "../CompareViewGraphOptions";
import { graphStocks113Names } from "../../constants";
import { containerGraphStyle, loadingGraphBox, mainGraphDivStyle, selectGraphStyle } from "../../assets/data/styles";
import StockGraph2 from "../dataComponents/StockGraph2";
import { cleanOptionName } from "../../assets/data/functions";

const FullGraphVip = () => {
  const [stockData, setStockData] = useState([]);
  const [mainOption, setMainOption] = useState(["GNFT50"]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const snackbarPosition = { vertical: "top", horizontal: "center" };
  const [isMainOption, setIsMainOption] = useState(true);
  const [isCompare, setIsCompare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = async (selectedOptions) => {
    const dateString = "DATE"
    setIsLoading(true);
    try {
      const response = await fetch('https://heatmapapi.onrender.com/getselectedheatmapdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "data": [dateString, selectedOptions] }),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setStockData(data.data);
      }
      if (!response.ok) {
        throw new Error('Failed to get data');
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Error getting data:', err);
      setIsLoading(false);
    }
  };
  // console.log(stockData);
  useEffect(() => {
    handleSelectChange(mainOption);
    setMainOption([mainOption]);
    setIsMainOption(true);
    setIsCompare(false);
    setSelectedOption([]);
  }, []);

  const handleDropdownChange1 = (event) => {
    handleSelectChange(event.target.value);
    setMainOption([event.target.value]);
    setIsMainOption(true);
    setIsCompare(false);
    setSelectedOption([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDropdownChange = (event) => {
    const { target: { value } } = event;
    handleSelectChange(value);
    if (value.length <= 10) {
      setSelectedOption(typeof value === "string" ? value.split(",") : value);
    } else {
      setSnackbarMessage("You can only select upto 10 stocks");
      setOpenSnackbar(true);
    }
    setIsCompare(false);
  };

  const onCompareClick = (reason) => {
    if (selectedOption.length > 10) {
      setSnackbarMessage("You can add only 10 stock to compare");
      setOpenSnackbar(true);
    } else {
      setIsMainOption(false);
      setIsCompare(true);
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    }
  }

  return (
    <div style={mainGraphDivStyle}>
      <div>
        <select value={mainOption} onChange={handleDropdownChange1} style={selectGraphStyle}>
          {graphStocks113Names.map((e) => {
            return (
              <option value={e.graphNames} key={e.graphNames} title={e.fullNames}>{e.shortNames}</option>
            )
          })}
        </select>
        <Button onClick={handleClickOpen} variant="outlined" sx={{ borderRadius: "50px" }}>Compare</Button>
        {open && <CompareViewGraphOptions names={graphStocks113Names} open={open} handleClose={handleClose} handleDropdownChange={handleDropdownChange} selectedOption={selectedOption}
          onCompareClick={onCompareClick} />}
      </div>
      {
        isLoading ? <Box style={loadingGraphBox}><CircularProgress /> </Box> :
          <div style={containerGraphStyle}>
            {isMainOption &&
              <Box>
                <Typography sx={{ pl: 3, color: "green" }}>{cleanOptionName(mainOption)}</Typography>
                <StockGraph2 options={mainOption} stockData={stockData} />
              </Box>
            }
            {isCompare && <Box>
              <Typography sx={{ pl: 3, color: "orange" }}>Compare Mode</Typography>
              <StockGraph2 options={selectedOption} stockData={stockData} />
            </Box>
            }
          </div>
      }

      <Snackbar
        anchorOrigin={snackbarPosition}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FullGraphVip;