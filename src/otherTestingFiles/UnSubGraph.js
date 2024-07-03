import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { graph4names } from "../../constants";
import CompareViewGraphOptions from "../CompareViewGraphOptions";

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const CanvasJSStockChart2 = CanvasJSReact.CanvasJSStockChart;

const UnSubGraph = () => {
  const [stockData, setStockData] = useState([]);
  const [mainOption, setMainOption] = useState("tri__Nifty_50");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const snackbarPosition = { vertical: "top", horizontal: "center" };
  const [isMainOption, setIsMainOption] = useState(true);
  const [isView, setIsView] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const mainDivStyle = {
    background: "lightGray",
    fontWeight: "bold",
  };

  const containerStyle = {
    width: "100%",
    height: "auto",
    margin: "auto",
    marginBottom: "200px",
  };

  const selectStyle = {
    outline: 'none',
    margin: '10px 0px',
    height: '25px',
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://heatmap-node-1.onrender.com/getstockdata");
      // const response = await fetch("https://heatmap-node-1.onrender.com/getStockGraphData");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStockData(data.message);
      // console.log(data.message);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDataPoints1 = () => {
    const dps = [];
    for (let i = 0; i < stockData.length; i++) {
      const dataPoint = {
        x: new Date(stockData[i].date),
        y: stockData[i][mainOption],
      };
      dps.push(dataPoint);
    }
    return dps;
  }

  const cleanOptionName = (option) => {
    if (typeof option !== 'string') {
      option = String(option);
    }
    return option.replace(/tri__/g, ' ').replace(/_/g, ' ');
  };

  const options1 = {
    title: {
      // text: "StockChart with Date Axis",
    },
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
      valueFormatString: "DD/MM/YY",
    },
    axisY: {
      stripLines: [],
      ticks: {
        min: 0,
        stepSize: 5000,
      },
      gridLines: {
        display: false,
      },
      crosshair: {
        enabled: true,
      },
    },
    charts: [{
      axisXType: "primary",
      axisYType: "primary",
      data: [
        {
          type: "spline",
          name: cleanOptionName(mainOption),
          color: "green",
          toolTipContent: "{name}: {x}: {y}",
          dataPoints: generateDataPoints1(),
        }
      ],
    }],
  };

  const handleDropdownChange1 = (event) => {
    setMainOption(event.target.value);
    setIsMainOption(true);
    setIsView(false);
    setIsCompare(false);
    setSelectedOption([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setSelectedOption([]);
      setIsMainOption(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDropdownChange = (event) => {
    const { target: { value } } = event;
    if (value.length <= 9) {
      setSelectedOption(typeof value === "string" ? value.split(",") : value);
    } else {
      setSnackbarMessage("You can only select upto 9 stocks");
      setOpenSnackbar(true);
    }
    setIsMainOption(false);
    setIsView(false);
    setIsCompare(false);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    const excludeColors = ["808080", "D3D3D3", "A9A9A9", "000000", "FFFFFF", "008000"];
    let color = "#";
    do {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (excludeColors.includes(color.slice(1)));
    return color;
  };

  const onViewClick = (reason) => {
    setIsMainOption(false);
    setIsView(true);
    setIsCompare(false);
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }

  const viewGenerateDataPoints = () => {
    const mainOptionDataPoints = generateDataPoints1();
    const dataSeries = [];
    for (let i = 0; i < selectedOption.length; i++) {
      const dps = [];
      for (let j = 0; j < stockData.length; j++) {
        const dataPoint = {
          x: new Date(stockData[j].date),
          y: stockData[j][selectedOption[i]],
        };
        dps.push(dataPoint);
      }
      dataSeries.push({
        type: "spline",
        name: cleanOptionName(selectedOption[i]),
        color: getRandomColor(),
        toolTipContent: "{name}: {x}: {y}",
        dataPoints: dps,
      });
    }
    return [
      {
        type: "spline",
        name: cleanOptionName(mainOption),
        color: "green",
        toolTipContent: "{name}: {x}: {y}",
        dataPoints: mainOptionDataPoints,
      },
      ...dataSeries,
    ];
  };

  const viewOptions = {
    title: {
      // text: "StockChart with Date Axis",
    },
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
      valueFormatString: "DD/MM/YY",
    },
    axisY: {
      stripLines: [],
      ticks: {
        min: 0,
        stepSize: 5000,
      },
      gridLines: {
        display: false,
      },
      crosshair: {
        enabled: true,
      },
    },
    charts: [
      {
        axisXType: "primary",
        axisYType: "primary",
        data: viewGenerateDataPoints(),
      },
    ],
  };

  const onCompareClick = (reason) => {
    if (selectedOption.length > 1) {
      setSnackbarMessage("You can add only 1 stock to compare");
      setOpenSnackbar(true);
    } else {
      setIsMainOption(false);
      setIsView(false);
      setIsCompare(true);
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    }
  }

  const generateDataPointsForOption = (option) => {
    const dps = [];
    for (let i = 0; i < stockData.length; i++) {
      const dataPoint = {
        x: new Date(stockData[i].date),
        y: stockData[i][option],
      };
      dps.push(dataPoint);
    }
    return dps;
  };

  const compareGenerateDataPoints = () => {
    // datapoints from db
    const mainOptionDataPoints = generateDataPoints1();
    const dataSeries = [];
    var mainPointMedian = null;
  
    // Convert negative values to positive in mainOptionDataPoints
    const mainOptionPositiveDataPoints = mainOptionDataPoints.map((dataPoint) => ({
      x: dataPoint.x,
      y: Math.abs(dataPoint.y),
    }));
  
    // Calculate the percentage values relative to mainOption
    const mainOptionPercentageDataPoints = mainOptionPositiveDataPoints.map((dataPoint) => ({
      x: dataPoint.x,
      y: (dataPoint.y / mainOptionPositiveDataPoints[dataPoint.x.getDate() - 1].y) * 100,
    }));
    // console.log(mainOptionPercentageDataPoints);
  
    if (mainOptionPercentageDataPoints.length > 0) {
      mainPointMedian = mainOptionPercentageDataPoints[mainOptionPercentageDataPoints.length - 1];
    }
  
    dataSeries.push({
      type: "spline",
      name: cleanOptionName(mainOption),
      color: "green",
      toolTipContent: "{name}: {x}: {y}",
      dataPoints: mainOptionPercentageDataPoints,
    });
  
    for (let i = 0; i < selectedOption.length; i++) {
      const selectedOptionDataPoints = generateDataPointsForOption(selectedOption[i]);
  
      // Convert negative values to positive in selectedOptionDataPoints
      const selectedOptionPositiveDataPoints = selectedOptionDataPoints.map((dataPoint) => ({
        x: dataPoint.x,
        y: Math.abs(dataPoint.y),
      }));
  
      if (selectedOptionPositiveDataPoints.length > 0) {
        const selectedOptionPercentageDataPoints = selectedOptionPositiveDataPoints.map((dataPoint) => ({
          x: dataPoint.x,
          y: (dataPoint.y / mainOptionPositiveDataPoints[dataPoint.x.getDate() - 1].y) * 100,
        }));
  
        // console.log(selectedOptionPercentageDataPoints);
        // console.log(mainPointMedian);
        // const newDataPoints = selectedOptionPercentageDataPoints.map((dataPoint) => ({
        //   x: dataPoint.x,
        //   y: dataPoint.y + (mainPointLast.y - dataPoint.y),
        // }));
        
        const newDataPoints = selectedOptionPercentageDataPoints.map((dataPoint) => ({
          x: dataPoint.x,
          y: dataPoint.y - mainPointMedian.y,
        }));
  
        // Ensure the last point is set to the median value
        if (newDataPoints.length > 0) {
          newDataPoints[newDataPoints.length - 1].y = mainPointMedian.y;
        }
        
        // console.log(newDataPoints);
  
        dataSeries.push({
          type: "spline",
          name: cleanOptionName(selectedOption[i]),
          color: getRandomColor(),
          toolTipContent: "{name}: {x}: {y}",
          // dataPoints: selectedOptionPercentageDataPoints,
          dataPoints: newDataPoints,
        });
      }
    }
    return dataSeries;
  };
  
  const compareOptions = {
    title: {
      // text: "StockChart with Date Axis",
    },
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
      valueFormatString: "DD-MM/YY",
    },
    axisY: {
      suffix: "%",
      stripLines: [],
      ticks: {
        min: 0,
        max: 500,
        stepSize: 20,
      },
      gridLines: {
        display: false,
      },
      crosshair: {
        enabled: true,
      },
    },
    charts: [
      {
        axisXType: "primary",
        axisYType: "primary",
        data: compareGenerateDataPoints(),
      },
    ],
  };

  return (
    <div style={mainDivStyle}>
      <div>
        <label>Select Main Stock: </label>
        <select value={mainOption} onChange={handleDropdownChange1} style={selectStyle}>
          <option value="tri__Nifty_50" key="tri__Nifty_50">Nifty 50</option>
          <option value="tri__Nifty_Midcap_50" key="tri__Nifty_Midcap_50">Nifty Midcap 50</option>
          <option value="tri__NIFTY_SMLCAP_50" key="tri__NIFTY_SMLCAP_50">NIFTY SMLCAP 50</option>
          <option value="tri__NIFTY_LARGEMIDCAP_250" key="tri__NIFTY_LARGEMIDCAP_250">NIFTY LARGEMIDCAP 250</option>

          {/* <option value="tri__Nifty_Next_50" key="tri__Nifty_Next_50">tri - Nifty Next 50</option>
                    <option value="tri__NIFTY_MIDCAP_100" key="tri__NIFTY_MIDCAP_100">tri - NIFTY MIDCAP 100</option>
                    <option value="tri__NIFTY_SMLCAP_100" key="tri__NIFTY_SMLCAP_100">tri - NIFTY SMLCAP 100</option>
                    <option value="Nifty_100" key="Nifty_100">Nifty 100</option>
                    <option value="Nifty_200" key="Nifty_200">Nifty 200</option>
                    <option value="NIFTY_MICROCAP_250" key="NIFTY_MICROCAP_250">NIFTY MICROCAP 250</option>
                    <option value="NIFTY_TOTAL_MARKET" key="NIFTY_TOTAL_MARKET">NIFTY TOTAL MARKET</option>
                    <option value="tri__NIFTY_MIDCAP_150" key="tri__NIFTY_MIDCAP_150">tri - NIFTY MIDCAP 150</option>
                    <option value="tri__NIFTY_MIDSMALLCAP_400" key="tri__NIFTY_MIDSMALLCAP_400">tri - NIFTY MIDSMALLCAP 400</option>
                    <option value="tri__NIFTY_500" key="tri__NIFTY_500">tri - NIFTY 500</option>
                    <option value="tri__NIFTY_SMALLCAP_250" key="tri__NIFTY_SMALLCAP_250">tri - NIFTY SMALLCAP 250</option>
                    <option value="tri__NIFTY_SMALLCAP_50" key="tri__NIFTY_SMALLCAP_50">tri - NIFTY SMALLCAP 50</option>
                    <option value="tri__NIFTY_SMALLCAP_100" key="tri__NIFTY_SMALLCAP_100">tri - NIFTY SMALLCAP 100</option> */}
        </select>
        <Button onClick={handleClickOpen}><AddCircleOutlineIcon /></Button>
        {open && <CompareViewGraphOptions names={graph4names} open={open} handleClose={handleClose} handleDropdownChange={handleDropdownChange} selectedOption={selectedOption} mainOption={mainOption} onViewClick={onViewClick} onCompareClick={onCompareClick} />}
      </div>
      {
        isLoading ? <Box sx={{ height: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /> </Box> :
          <div style={containerStyle}>
            {isMainOption &&
              <Box>
                <Typography sx={{ pl: 3, color: "green" }}>{cleanOptionName(mainOption)}</Typography>
                <CanvasJSStockChart options={options1} />
              </Box>
            }
            {isView && <Box>
              <Typography sx={{ pl: 3, color: "blue" }}>View Mode</Typography>
              <CanvasJSStockChart options={viewOptions} />
            </Box>
            }
            {isCompare && <Box>
              <Typography sx={{ pl: 3, color: "orange" }}>Compare Mode</Typography>
              <CanvasJSStockChart2 options={compareOptions} />
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

export default UnSubGraph;
