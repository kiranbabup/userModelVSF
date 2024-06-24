import React, { useState, useEffect } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { graph4names } from "../../constants";
import CompareViewGraphOptions from "../CompareViewGraphOptions";
import StockGraph2 from "../StockGraph2";
import { containerGraphStyle, loadingGraphBox, mainGraphDivStyle, selectGraphStyle } from "../../assets/data/styles";

const UnSubscribedGraph = () => {
  const [stockData, setStockData] = useState([]);
  const [mainOption, setMainOption] = useState(["tri__Nifty_50"]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const snackbarPosition = { vertical: "top", horizontal: "center" };
  const [isMainOption, setIsMainOption] = useState(true);
  const [isCompare, setIsCompare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    const fetchStockData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://heatmap-node-1.onrender.com/getstockdata");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const reversedData = data.message.reverse(); // Reverse the data here
            setStockData(reversedData);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchStockData();

}, []); // Empty dependency array ensures useEffect runs only on mount

  const cleanOptionName = (option) => {
    if (typeof option !== 'string') {
      option = String(option);
    }
    return option.replace(/tri__/g, ' ').replace(/_/g, ' ');
  };

  const handleDropdownChange1 = (event) => {
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
      // setIsCompare(false);
      // setSelectedOption([]);
      // setIsMainOption(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDropdownChange = (event) => {
    const { target: { value } } = event;
    if (value.length <= 4) {
      setSelectedOption(typeof value === "string" ? value.split(",") : value);
    } else {
      setSnackbarMessage("You can only select upto 4 stocks");
      setOpenSnackbar(true);
    }
    // setIsMainOption(false);
    setIsCompare(false);
  };

  const onCompareClick = (reason) => {
    if (selectedOption.length > 3) {
      setSnackbarMessage("You can add only 3 stock to compare");
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
          <option value="tri__Nifty_50" key="tri__Nifty_50">Nifty 50</option>
          <option value="tri__Nifty_Midcap_50" key="tri__Nifty_Midcap_50">Nifty Midcap 50</option>
          <option value="tri__NIFTY_SMLCAP_50" key="tri__NIFTY_SMLCAP_50">NIFTY SMLCAP 50</option>
          <option value="tri__NIFTY_LARGEMIDCAP_250" key="tri__NIFTY_LARGEMIDCAP_250">NIFTY LARGEMIDCAP 250</option>
        </select>
        <Button onClick={handleClickOpen} variant="outlined" sx={{borderRadius:"50px"}}>Compare</Button>
        {open && <CompareViewGraphOptions names={graph4names} open={open} handleClose={handleClose} 
          handleDropdownChange={handleDropdownChange} selectedOption={selectedOption} 
          onCompareClick={onCompareClick} />}
      </div>
      {
        isLoading ? <Box style={loadingGraphBox}><CircularProgress /> </Box> :
          <div style={containerGraphStyle}>
            {isMainOption &&
              <Box>
                <Typography sx={{ pl: 3, color: "green" }}>{cleanOptionName(mainOption)}</Typography>
                <StockGraph2 options={mainOption} stockData= {stockData}/>
              </Box>
            }
            {isCompare && <Box>
              <Typography sx={{ pl: 3, color: "orange" }}>Compare Mode</Typography>
              <StockGraph2 options={selectedOption} stockData= {stockData}/>
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

export default UnSubscribedGraph;