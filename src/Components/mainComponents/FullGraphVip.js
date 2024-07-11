import React, { useState, useEffect } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CompareViewGraphOptions from "../CompareViewGraphOptions";
import { graph113names } from "../../constants";
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
useEffect(()=>{
  handleSelectChange(mainOption);
  setMainOption([mainOption]);
  setIsMainOption(true);
  setIsCompare(false);
  setSelectedOption([]);
},[]);

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
          <option value="GNFT50" key="GNFT50" >NFT50</option>
          <option value="GNFTN50" key="GNFTN50">NFTN50</option>
          <option value="GNFT100" key="GNFT100">NFT100</option>
          <option value="GNFT200" key="GNFT200">NFT200</option>
          <option value="GNFTTTLMAR" key="GNFTTTLMAR">NFTTTLMAR</option>
          <option value="GNFT500" key="GNFT500">NFT500</option>
          <option value="GNFT500MC50_25_25" key="GNFT500MC50_25_25">NFT500MC50_25_25</option>
          <option value="GNFT500LGMSEQLCAPWTD" key="GNFT500LGMSEQLCAPWTD">NFT500LGMSEQLCAPWTD</option>
          <option value="GNFTMC150" key="GNFTMC150">NFTMC150</option>
          <option value="GNFTMC50" key="GNFTMC50">NFTMC50</option>
          <option value="GNFTMCSEL" key="GNFTMCSEL">NFTMCSEL</option>
          <option value="GNFTMC100" key="GNFTMC100">NFTMC100</option>
          <option value="GNFTSC250" key="GNFTSC250">NFTSC250</option>
          <option value="GNFTSC50" key="GNFTSC50">NFTSC50</option>
          <option value="GNFTFSC100" key="GNFTFSC100">NFTFSC100</option>
          <option value="GNFTMC250" key="GNFTMC250">NFTMC250</option>
          <option value="GNFTLMC250" key="GNFTLMC250">NFTLMC250</option>
          <option value="GNFTMSC400" key="GNFTMSC400">NFTMSC400</option>
          <option >Select Strategy Stock</option>
          <option value="GNFT100EQLWGT" key="GNFT100EQLWGT" >NFT100EQLWGT</option>
          <option value="GNFT100LVLT30" key="GNFT100LVLT30" >NFT100LVLT30</option>
          <option value="GNFT50A" key="GNFT50A" >NFT50A</option>
          <option value="GNFT50FPR" key="GNFT50FPR" >NFT50FPR</option>
          <option value="GNFT50FTR" key="GNFT50FTR" >NFT50FTR</option>
          <option value="GNFT200MOM30" key="GNFT200MOM30" >NFT200MOM30</option>
          <option value="GNFT200AL30" key="GNFT200AL30" >NFT200AL30</option>
          <option value="GNFT100AL30" key="GNFT100AL30" >NFT100AL30</option>
          <option value="GNFTAL50" key="GNFTAL50" >NFTAL50</option>
          <option value="GNFTALVLT30" key="GNFTALVLT30" >NFTALVLT30</option>
          <option value="GNFTAQLTLVLT30" key="GNFTAQLTLVLT30" >NFTAQLTLVLT30</option>
          <option value="GNFTAQLTVLLVLT30" key="GNFTAQLTVLLVLT30" >NFTAQLTVLLVLT30</option>
          <option value="GNFTDO50" key="GNFTDO50" >NFTDO50</option>
          <option value="GNFTGRTHSEC15" key="GNFTGRTHSEC15" >NFTGRTHSEC15</option>
          <option value="GNFTHBETA50" key="GNFTHBETA50" >NFTHBETA50</option>
          <option value="GNFTLVLT50" key="GNFTLVLT50" >NFTLVLT50</option>
          <option value="GNFTT10EQLWGT" key="GNFTT10EQLWGT" >NFTT10EQLWGT</option>
          <option value="GNFT100QLT30" key="GNFT100QLT30" >NFT100QLT30</option>
          <option value="GNFTMC150MOM50" key="GNFTMC150MOM50" >NFTMC150MOM50</option>
          <option value="GNFT500MOM50" key="GNFT500MOM50" >NFT500MOM50</option>
          <option value="GNFTMC150QLT50" key="GNFTMC150QLT50" >NFTMC150QLT50</option>
          <option value="GNFTSC250QLT50" key="GNFTSC250QLT50" >NFTSC250QLT50</option>
          <option value="GNFTMSC400MOMQLT100" key="GNFTMSC400MOMQLT100" >NFTMSC400MOMQLT100</option>
          <option value="GNFTSC250MOMQLT100" key="GNFTSC250MOMQLT100" >NFTSC250MOMQLT100</option>
          <option value="GNFTQLTLVLT30" key="GNFTQLTLVLT30" >NFTQLTLVLT30</option>
          <option value="GNFT50DIVPNT" key="GNFT50DIVPNT" >NFT50DIVPNT</option>
          <option value="GNFT50EW" key="GNFT50EW" >NFT50EW</option>
          <option value="GNFT50PR1XINVS" key="GNFT50PR1XINVS" >NFT50PR1XINVS</option>
          <option value="GNFT50PR2XLVG" key="GNFT50PR2XLVG" >NFT50PR2XLVG</option>
          <option value="GNFT50TR1XINVS" key="GNFT50TR1XINVS" >NFT50TR1XINVS</option>
          <option value="GNFT50TR2XLVG" key="GNFT50TR2XLVG" >NFT50TR2XLVG</option>
          <option value="GNFT50VL20" key="GNFT50VL20" >NFT50VL20</option>
          <option value="GNFT200VL30" key="GNFT200VL30" >NFT200VL30</option>
          <option value="GNFT500VL50" key="GNFT500VL50" >NFT500VL50</option>
          <option value="GNFT500EQLWGT" key="GNFT500EQLWGT" >NFT500EQLWGT</option>
          <option value="GNFT200QLT30" key="GNFT200QLT30" >NFT200QLT30</option>
          <option value="GNFT50SRTDURDEBTDYNP_B" key="GNFT50SRTDURDEBTDYNP_B" >NFT50SRTDURDEBTDYNP_B</option>
          <option value="GNFT50SRTDURDEBTDYNP_E" key="GNFT50SRTDURDEBTDYNP_E" >NFT50SRTDURDEBTDYNP_E</option>
          <option value="GNFTEQTSAV" key="GNFTEQTSAV" >NFTEQTSAV</option>
          <option value="GNFTCORPGRPIABG" key="GNFTCORPGRPIABG" >NFTCORPGRPIABG</option>
          <option value="GNFTCOMM" key="GNFTCOMM" >NFTCOMM</option>
          <option value="GNFTCH" key="GNFTCH" >NFTCH</option>
          <option value="GNFTCPSE" key="GNFTCPSE" >NFTCPSE</option>
          <option value="GNFTENG" key="GNFTENG" >NFTENG</option>
          <option value="GNFTEVNAAMT" key="GNFTEVNAAMT" >NFTEVNAAMT</option>
          <option value="GNFTHOUS" key="GNFTHOUS" >NFTHOUS</option>
          <option value="GNFT100ESG" key="GNFT100ESG" >NFT100ESG</option>
          <option value="GNFT100EESG" key="GNFT100EESG" >NFT100EESG</option>
          <option value="GNFT100ESGSL" key="GNFT100ESGSL" >NFT100ESGSL</option>
          <option value="GNFTCONS" key="GNFTCONS" >NFTCONS</option>
          <option value="GNFTDEF" key="GNFTDEF" >NFTDEF</option>
          <option value="GNFTINDDIG" key="GNFTINDDIG" >NFTINDDIG</option>
          <option value="GNFTINDMFG" key="GNFTINDMFG" >NFTINDMFG</option>
          <option value="GNFTINDTR" key="GNFTINDTR" >NFTINDTR</option>
          <option value="GNFTINFS" key="GNFTINFS" >NFTINFS</option>
          <option value="GNFTINDCORPGRPIMG" key="GNFTINDCORPGRPIMG" >NFTINDCORPGRPIMG</option>
          <option value="GNFTMCL15" key="GNFTMCL15" >NFTMCL15</option>
          <option value="GNFTMSINDCON" key="GNFTMSINDCON" >NFTMSINDCON</option>
          <option value="GNFTMNC" key="GNFTMNC" >NFTMNC</option>
          <option value="GNFTMOB" key="GNFTMOB" >NFTMOB</option>
          <option value="GNFTPSE" key="GNFTPSE" >NFTPSE</option>
          <option value="GNFTRI" key="GNFTRI" >NFTRI</option>
          <option value="GNFTNCC" key="GNFTNCC" >NFTNCC</option>
          <option value="GNFTSERSEC" key="GNFTSERSEC" >NFTSERSEC</option>
          <option value="GNFTSH25" key="GNFTSH25" >NFTSH25</option>
          <option value="GNFTINDCORPGRPITG" key="GNFTINDCORPGRPITG" >NFTINDCORPGRPITG</option>
          <option value="GNFTINDCORPGRPITG25PC" key="GNFTINDCORPGRPITG25PC" >NFTINDCORPGRPITG25PC</option>
          <option value="GNFTTRANSLOG" key="GNFTTRANSLOG" >NFTTRANSLOG</option>
          <option value="GNFT100L15" key="GNFT100L15" >NFT100L15</option>
          <option value="GNFT50SH" key="GNFT50SH" >NFT50SH</option>
          <option value="GNFT500SH" key="GNFT500SH" >NFT500SH</option>
          <option value="GNFT500MULCINDMFG50_30_20" key="GNFT500MULCINDMFG50_30_20" >NFT500MULCINDMFG50_30_20</option>
          <option value="GNFT500MULCINFS50_30_20" key="GNFT500MULCINFS50_30_20" >NFT500MULCINFS50_30_20</option>
          <option value="GNFTSMEEMG" key="GNFTSMEEMG" >NFTSMEEMG</option>
          <option value="GNFTAUTO" key="GNFTAUTO">NFTAUTO</option>
          <option value="GNFTBANK" key="GNFTBANK">NFTBANK</option>
          <option value="GNFTFINSERV" key="GNFTFINSERV">NFTFINSERV</option>
          <option value="GNFTFINSERV25_50" key="GNFTFINSERV25_50">NFTFINSERV25_50</option>
          <option value="GNFTFINSERVEB" key="GNFTFINSERVEB">NFTFINSERVEB</option>
          <option value="GNFTFMCG" key="GNFTFMCG">NFTFMCG</option>
          <option value="GNFTHLTC" key="GNFTHLTC">NFTHLTC</option>
          <option value="GNFTIT" key="GNFTIT">NFTIT</option>
          <option value="GNFTMEDIA" key="GNFTMEDIA">NFTMEDIA</option>
          <option value="GNFTMETAL" key="GNFTMETAL">NFTMETAL</option>
          <option value="GNFTPHARMA" key="GNFTPHARMA">NFTPHARMA</option>
          <option value="GNFTPVTB" key="GNFTPVTB">NFTPVTB</option>
          <option value="GNFTPSUB" key="GNFTPSUB">NFTPSUB</option>
          <option value="GNFTREAL" key="GNFTREAL">NFTREAL</option>
          <option value="GNFTCD" key="GNFTCD">NFTCD</option>
          <option value="GNFTOG" key="GNFTOG">NFTOG</option>
          <option value="GNFTMSFS" key="GNFTMSFS">NFTMSFS</option>
          <option value="GNFTMSHC" key="GNFTMSHC">NFTMSHC</option>
          <option value="GNFTMSITTEL" key="GNFTMSITTEL">NFTMSITTEL</option>
          <option value="GNFT50USD" key="GNFT50USD">NFT50USD</option>
          <option value="GNFTVIX" key="GNFTVIX">NFTVIX</option>
        </select>
        <Button onClick={handleClickOpen} variant="outlined" sx={{ borderRadius: "50px" }}>Compare</Button>
        {open && <CompareViewGraphOptions names={graph113names} open={open} handleClose={handleClose} handleDropdownChange={handleDropdownChange} selectedOption={selectedOption}
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