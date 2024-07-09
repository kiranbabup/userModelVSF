// SubcriptionHeatMap
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import BroadHeatMap from '../Components/heatmaps/BroadHeatMap';
import StrategyHeatMap from '../Components/heatmaps/StrategyHeatMap';
import ThematicHeatMap from '../Components/heatmaps/ThematicHeatMap';
import SectorHeatMap from '../Components/heatmaps/SectorHeatMap';
import AllHeatMap from '../Components/heatmaps/weekNmonth/AllHeatMap';
import { columnStyle, dsiplayMesgStyle, fieldsetStyle, loadingSpace, lodButton, mainDivStyle, selectStyle, subDivStyle } from '../assets/data/styles';
import { months } from '../constants';
import YearlyHeatMap from '../Components/dataComponents/YearlyHeatMap';
import TopDrawer from '../Components/TopDrawer';
import { calculateDaysLeft } from '../assets/data/functions';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import LsService from "../services/localstorage";

const SubHeatMapPage = () => {
    // const resultData = useSelector(state => state.data.resultData);
    // const isLoadingHeatMap = useSelector(state => state.data.isLoadingHeatmap);

    const [resultData, setResultData] = useState([]);
    const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(false);
    const [data, setData] = useState([]);
    const [selectedOptionStock1, setSelectedOptionStock1] = useState("NFT50");
    const [selectedOptionStock2, setSelectedOptionStock2] = useState("");
    const [selectedOptionStock3, setSelectedOptionStock3] = useState("");
    const [selectedOptionStock4, setSelectedOptionStock4] = useState("");
    const [displayedOption, setDisplayedOption] = useState("");
    const [isSingleSheet, setIsSingleSheet] = useState(true);
    const [isBroadSheet, setIsBroadSheet] = useState(false);
    const [isStrategySheet, setIsStrategySheet] = useState(false);
    const [isThematicSheet, setIsThematicSheet] = useState(false);
    const [isSectorSheet, setIsSectorSheet] = useState(false);
    const [isAllSheet, setIsAllSheet] = useState(false);
    const [isLoadingBroadHeatMap, setIsLoadingBroadHeatMap] = useState(false);
    const [isLoadingStrategyHeatMap, setIsLoadingStrategyHeatMap] = useState(false);
    const [isLoadingThematicHeatMap, setIsLoadingThematicHeatMap] = useState(false);
    const [isLoadingSectorHeatMap, setIsLoadingSectorHeatMap] = useState(false);
    const [isLoadingAllHeatMap, setIsLoadingAllHeatMap] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [expiryMsg, setexpiryMsg] = useState("");
    const [daysLeft, setdaysLeft] = useState(20);
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoadingHeatMap(true);
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/getheatmappcntdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setResultData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingHeatMap(false);
        }
    };

    // const endingDate = "25-12-2024";

    useEffect(() => {
        fetchData();
        const userdata = LsService.getCurrentUser();
        const endingDate = userdata.subscribe_expired_on;
        setdaysLeft(calculateDaysLeft(endingDate));
        if (daysLeft <= 5) {
            setIsDrawerOpen(true);
            setexpiryMsg(`Subscription Expires in ${daysLeft} days`);
        }

    }, []);
    console.log(daysLeft);

    const setStatetoUse = () => {
        setIsSingleSheet(true);
        setIsBroadSheet(false);
        setIsStrategySheet(false);
        setIsThematicSheet(false);
        setIsSectorSheet(false);
        setIsAllSheet(false);
    }

    const handleSelectChange = (selectedOption) => {
        setDisplayedOption(selectedOption);
        setStatetoUse();
        const modifiedData = resultData.map((item) => {
            const year = new Date(item.DATE).getFullYear().toString().slice(-2);
            const month = new Date(item.DATE).getMonth() + 1;
            const value = item[selectedOption];
            return { label: year, month, value: value };
        });
        const groupedData = [];
        modifiedData.map((item) => {
            var index = groupedData.findIndex((e) => e.label == item.label);
            if (index != -1) {
                return groupedData[index].data[item.month - 1].push(item.value);
            } else {
                var newItem = {
                    label: item.label,
                    data: Array.from({ length: months.length }, (_, i) => []),
                    average: Array.from({ length: months.length }, (_, i) => 0)
                };
                newItem.data[item.month - 1].push(item.value);
                return groupedData.push(newItem);
            }
        });
        groupedData.map((item) => {
            for (var index in item.data) {
                var sum = item.data[index].reduce((acc, val) => acc + val, 0);
                var average = sum / item.data[index].length;
                item.average[index] = isNaN(average) ? 0 : parseFloat(average.toFixed(1));
            }
        })
        const truncatedData = groupedData.slice(0, groupedData.length - 10);
        setData(truncatedData);
        // console.log(truncatedData);
    }

    useEffect(() => {
        handleSelectChange(selectedOptionStock1);
    }, [resultData]);

    const handleBroadStocksChange = (a) => {
        setSelectedOptionStock2(" ");
        setSelectedOptionStock3(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(a);
    }
    const handleStrategyStocksChange = (b) => {
        setSelectedOptionStock1(" ");
        setSelectedOptionStock3(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(b);
    }
    const handleThematicStocksChange = (c) => {
        setSelectedOptionStock1(" ");
        setSelectedOptionStock2(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(c);
    }
    const handleSectorStocksChange = (d) => {
        setSelectedOptionStock1(" ");
        setSelectedOptionStock2(" ");
        setSelectedOptionStock3(" ");
        handleSelectChange(d);
    }
    const optionToempty = () => {
        setSelectedOptionStock1(" ");
        setSelectedOptionStock2(" ");
        setSelectedOptionStock3(" ");
        setSelectedOptionStock4(" ");
    }
    const sheetFalse = () => {
        optionToempty();
        setIsSingleSheet(false);
        setIsAllSheet(false);
    }
    const onBroadHandle = () => {
        sheetFalse();
        setIsBroadSheet(true);
        setIsStrategySheet(false);
        setIsThematicSheet(false);
        setIsSectorSheet(false);
    }
    const onStrategyHandle = () => {
        sheetFalse();
        setIsBroadSheet(false);
        setIsStrategySheet(true);
        setIsThematicSheet(false);
        setIsSectorSheet(false);
    }
    const onThematicHandle = () => {
        sheetFalse();
        setIsBroadSheet(false);
        setIsStrategySheet(false);
        setIsThematicSheet(true);
        setIsSectorSheet(false);
    }
    const onSectorHandle = () => {
        sheetFalse();
        setIsBroadSheet(false);
        setIsStrategySheet(false);
        setIsThematicSheet(false);
        setIsSectorSheet(true);
    }
    const onAllHandle = () => {
        optionToempty();
        setIsSingleSheet(false);
        setIsBroadSheet(false);
        setIsStrategySheet(false);
        setIsThematicSheet(false);
        setIsSectorSheet(false);
        setIsAllSheet(true);
    }

    const handleDrawerClose = () => {
        if (daysLeft <= 0) {
            navigate("/120/subscriptionexpired");

        } else {
            setIsDrawerOpen(false);
        }
    }

    return (
        <div style={mainDivStyle}>
            <div style={subDivStyle}>
                <fieldset style={fieldsetStyle}>
                    <legend>Broad</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock1} onChange={(e) => { setSelectedOptionStock1(e.target.value); handleBroadStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Broad Stock</option>
                            <option value="NFT50" key="NFT50" >NFT50</option>
                            <option value="NFTN50" key="NFTN50">NFTN50</option>
                            <option value="NFT100" key="NFT100">NFT100</option>
                            <option value="NFT200" key="NFT200">NFT200</option>
                            <option value="NFTTTLMAR" key="NFTTTLMAR">NFTTTLMAR</option>
                            <option value="NFT500" key="NFT500">NFT500</option>
                            <option value="NFT500MC50_25_25" key="NFT500MC50_25_25">NFT500MC50_25_25</option>
                            <option value="NFT500LGMSEQLCAPWTD" key="NFT500LGMSEQLCAPWTD">NFT500LGMSEQLCAPWTD</option>
                            <option value="NFTMC150" key="NFTMC150">NFTMC150</option>
                            <option value="NFTMC50" key="NFTMC50">NFTMC50</option>
                            <option value="NFTMCSEL" key="NFTMCSEL">NFTMCSEL</option>
                            <option value="NFTMC100" key="NFTMC100">NFTMC100</option>
                            <option value="NFTSC250" key="NFTSC250">NFTSC250</option>
                            <option value="NFTSC50" key="NFTSC50">NFTSC50</option>
                            <option value="NFTFSC100" key="NFTFSC100">NFTFSC100</option>
                            <option value="NFTMC250" key="NFTMC250">NFTMC250</option>
                            <option value="NFTLMC250" key="NFTLMC250">NFTLMC250</option>
                            <option value="NFTMSC400" key="NFTMSC400">NFTMSC400</option>
                        </select>
                        <LoadingButton loading={isLoadingBroadHeatMap} variant="contained" style={lodButton} onClick={() => onBroadHandle()}>Compare All Broad Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => { setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Strategy Stock</option>
                            <option value="NFT100EQLWGT" key="NFT100EQLWGT" >NFT100EQLWGT</option>
                            <option value="NFT100LVLT30" key="NFT100LVLT30" >NFT100LVLT30</option>
                            <option value="NFT50A" key="NFT50A" >NFT50A</option>
                            <option value="NFT50FPR" key="NFT50FPR" >NFT50FPR</option>
                            <option value="NFT50FTR" key="NFT50FTR" >NFT50FTR</option>
                            <option value="NFT200MOM30" key="NFT200MOM30" >NFT200MOM30</option>
                            <option value="NFT200AL30" key="NFT200AL30" >NFT200AL30</option>
                            <option value="NFT100AL30" key="NFT100AL30" >NFT100AL30</option>
                            <option value="NFTAL50" key="NFTAL50" >NFTAL50</option>
                            <option value="NFTALVLT30" key="NFTALVLT30" >NFTALVLT30</option>
                            <option value="NFTAQLTLVLT30" key="NFTAQLTLVLT30" >NFTAQLTLVLT30</option>
                            <option value="NFTAQLTVLLVLT30" key="NFTAQLTVLLVLT30" >NFTAQLTVLLVLT30</option>
                            <option value="NFTDO50" key="NFTDO50" >NFTDO50</option>
                            <option value="NFTGRTHSEC15" key="NFTGRTHSEC15" >NFTGRTHSEC15</option>
                            <option value="NFTHBETA50" key="NFTHBETA50" >NFTHBETA50</option>
                            <option value="NFTLVLT50" key="NFTLVLT50" >NFTLVLT50</option>
                            <option value="NFTT10EQLWGT" key="NFTT10EQLWGT" >NFTT10EQLWGT</option>
                            <option value="NFT100QLT30" key="NFT100QLT30" >NFT100QLT30</option>
                            <option value="NFTMC150MOM50" key="NFTMC150MOM50" >NFTMC150MOM50</option>
                            <option value="NFT500MOM50" key="NFT500MOM50" >NFT500MOM50</option>
                            <option value="NFTMC150QLT50" key="NFTMC150QLT50" >NFTMC150QLT50</option>
                            <option value="NFTSC250QLT50" key="NFTSC250QLT50" >NFTSC250QLT50</option>
                            <option value="NFTMSC400MOMQLT100" key="NFTMSC400MOMQLT100" >NFTMSC400MOMQLT100</option>
                            <option value="NFTSC250MOMQLT100" key="NFTSC250MOMQLT100" >NFTSC250MOMQLT100</option>
                            <option value="NFTQLTLVLT30" key="NFTQLTLVLT30" >NFTQLTLVLT30</option>
                            <option value="NFT50DIVPNT" key="NFT50DIVPNT" >NFT50DIVPNT</option>
                            <option value="NFT50EW" key="NFT50EW" >NFT50EW</option>
                            <option value="NFT50PR1XINVS" key="NFT50PR1XINVS" >NFT50PR1XINVS</option>
                            <option value="NFT50PR2XLVG" key="NFT50PR2XLVG" >NFT50PR2XLVG</option>
                            <option value="NFT50TR1XINVS" key="NFT50TR1XINVS" >NFT50TR1XINVS</option>
                            <option value="NFT50TR2XLVG" key="NFT50TR2XLVG" >NFT50TR2XLVG</option>
                            <option value="NFT50VL20" key="NFT50VL20" >NFT50VL20</option>
                            <option value="NFT200VL30" key="NFT200VL30" >NFT200VL30</option>
                            <option value="NFT500VL50" key="NFT500VL50" >NFT500VL50</option>
                            <option value="NFT500EQLWGT" key="NFT500EQLWGT" >NFT500EQLWGT</option>
                            <option value="NFT200QLT30" key="NFT200QLT30" >NFT200QLT30</option>
                            <option value="NFT50SRTDURDEBTDYNP_B" key="NFT50SRTDURDEBTDYNP_B" >NFT50SRTDURDEBTDYNP_B</option>
                            <option value="NFT50SRTDURDEBTDYNP_E" key="NFT50SRTDURDEBTDYNP_E" >NFT50SRTDURDEBTDYNP_E</option>
                            <option value="NFTEQTSAV" key="NFTEQTSAV" >NFTEQTSAV</option>
                        </select>
                        <LoadingButton loading={isLoadingStrategyHeatMap} variant="contained" style={lodButton} onClick={() => onStrategyHandle()}>Compare All Strategy Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Thematic Stock</option>
                            <option value="NFTCORPGRPIABG" key="NFTCORPGRPIABG" >NFTCORPGRPIABG</option>
                            <option value="NFTCOMM" key="NFTCOMM" >NFTCOMM</option>
                            <option value="NFTCH" key="NFTCH" >NFTCH</option>
                            <option value="NFTCPSE" key="NFTCPSE" >NFTCPSE</option>
                            <option value="NFTENG" key="NFTENG" >NFTENG</option>
                            <option value="NFTEVNAAMT" key="NFTEVNAAMT" >NFTEVNAAMT</option>
                            <option value="NFTHOUS" key="NFTHOUS" >NFTHOUS</option>
                            <option value="NFT100ESG" key="NFT100ESG" >NFT100ESG</option>
                            <option value="NFT100EESG" key="NFT100EESG" >NFT100EESG</option>
                            <option value="NFT100ESGSL" key="NFT100ESGSL" >NFT100ESGSL</option>
                            <option value="NFTCONS" key="NFTCONS" >NFTCONS</option>
                            <option value="NFTINDCONS" key="NFTINDCONS" >NFTINDCONS</option>
                            <option value="NFTINDDIG" key="NFTINDDIG" >NFTINDDIG</option>
                            <option value="NFTINDMFG" key="NFTINDMFG" >NFTINDMFG</option>
                            <option value="NFTINDTR" key="NFTINDTR" >NFTINDTR</option>
                            <option value="NFTINFS" key="NFTINFS" >NFTINFS</option>
                            <option value="NFTINDCORPGRPIMG" key="NFTINDCORPGRPIMG" >NFTINDCORPGRPIMG</option>
                            <option value="NFTMCL15" key="NFTMCL15" >NFTMCL15</option>
                            <option value="NFTMSINDCON" key="NFTMSINDCON" >NFTMSINDCON</option>
                            <option value="NFTMNC" key="NFTMNC" >NFTMNC</option>
                            <option value="NFTMOB" key="NFTMOB" >NFTMOB</option>
                            <option value="NFTPSE" key="NFTPSE" >NFTPSE</option>
                            <option value="NFTRI" key="NFTRI" >NFTRI</option>
                            <option value="NFTNCC" key="NFTNCC" >NFTNCC</option>
                            <option value="NFTSERSEC" key="NFTSERSEC" >NFTSERSEC</option>
                            <option value="NFTSH25" key="NFTSH25" >NFTSH25</option>
                            <option value="NFTINDCORPGRPITG" key="NFTINDCORPGRPITG" >NFTINDCORPGRPITG</option>
                            <option value="NFTINDCORPGRPITG25PC" key="NFTINDCORPGRPITG25PC" >NFTINDCORPGRPITG25PC</option>
                            <option value="NFTTRANSLOG" key="NFTTRANSLOG" >NFTTRANSLOG</option>
                            <option value="NFT100L15" key="NFT100L15" >NFT100L15</option>
                            <option value="NFT50SH" key="NFT50SH" >NFT50SH</option>
                            <option value="NFT500SH" key="NFT500SH" >NFT500SH</option>
                            <option value="NFT500MULCINDMFG50_30_20" key="NFT500MULCINDMFG50_30_20" >NFT500MULCINDMFG50_30_20</option>
                            <option value="NFT500MULCINFS50_30_20" key="NFT500MULCINFS50_30_20" >NFT500MULCINFS50_30_20</option>
                            <option value="NFTSMEEMG" key="NFTSMEEMG" >NFTSMEEMG</option>
                        </select>
                        <LoadingButton loading={isLoadingThematicHeatMap} variant="contained" style={lodButton} onClick={() => onThematicHandle()}>Compare All Thematic Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Sector  Stock</option>
                            <option value="NFTAUTO" key="NFTAUTO">NFTAUTO</option>
                            <option value="NFTBANK" key="NFTBANK">NFTBANK</option>
                            <option value="NFTFINSERV" key="NFTFINSERV">NFTFINSERV</option>
                            <option value="NFTFINSERV25_50" key="NFTFINSERV25_50">NFTFINSERV25_50</option>
                            <option value="NFTFINSERVEB" key="NFTFINSERVEB">NFTFINSERVEB</option>
                            <option value="NFTFMCG" key="NFTFMCG">NFTFMCG</option>
                            <option value="NFTHLTC" key="NFTHLTC">NFTHLTC</option>
                            <option value="NFTIT" key="NFTIT">NFTIT</option>
                            <option value="NFTMEDIA" key="NFTMEDIA">NFTMEDIA</option>
                            <option value="NFTMETAL" key="NFTMETAL">NFTMETAL</option>
                            <option value="NFTPHARMA" key="NFTPHARMA">NFTPHARMA</option>
                            <option value="NFTPVTB" key="NFTPVTB">NFTPVTB</option>
                            <option value="NFTPSUB" key="NFTPSUB">NFTPSUB</option>
                            <option value="NFTREAL" key="NFTREAL">NFTREAL</option>
                            <option value="NFTCD" key="NFTCD">NFTCD</option>
                            <option value="NFTOG" key="NFTOG">NFTOG</option>
                            <option value="NFTMSFS" key="NFTMSFS">NFTMSFS</option>
                            <option value="NFTMSHC" key="NFTMSHC">NFTMSHC</option>
                            <option value="NFTMSITTEL" key="NFTMSITTEL">NFTMSITTEL</option>
                            <option value="NFT50USD" key="NFT50USD">NFT50USD</option>
                            <option value="NFTVIX" key="NFTVIX">NFTVIX</option>
                        </select>
                        <LoadingButton loading={isLoadingSectorHeatMap} variant="contained" style={lodButton} onClick={() => onSectorHandle()}>Compare All Sector Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={{
                    display: "inline-block",
                    margin: "0px 3px",
                    borderRadius: "10px",
                    maxWidth: "19%",
                    height: "93px"
                }}
                >
                    <legend>All Stocks</legend>
                    <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
                        <LoadingButton loading={isLoadingAllHeatMap} variant="contained" style={lodButton} onClick={() => onAllHandle()}>Compare All Stocks</LoadingButton>
                    </Box>
                </fieldset>
            </div>
            {
                isLoadingHeatMap ? <Box style={loadingSpace}><CircularProgress /> </Box> :
                    <Box>
                        {isSingleSheet &&
                            <Box>
                                <Typography style={dsiplayMesgStyle} >{displayedOption}</Typography>
                                <Box sx={{
                                    width: '100%',
                                    // [mediaQueries.mobile]: {
                                    // fontSize: "13.4px"
                                    // },
                                    fontSize: { xs: "13.4px", md: "16px" }
                                }}>
                                    <YearlyHeatMap data={data} months={months} />
                                </Box>
                            </Box>
                        }
                        {isBroadSheet && <BroadHeatMap isLoadingBroadHeatMap={isLoadingBroadHeatMap} setIsLoadingBroadHeatMap={setIsLoadingBroadHeatMap} />}
                        {isStrategySheet && <StrategyHeatMap isLoadingStrategyHeatMap={isLoadingStrategyHeatMap} setIsLoadingStrategyHeatMap={setIsLoadingStrategyHeatMap} />}
                        {isThematicSheet && <ThematicHeatMap isLoadingThematicHeatMap={isLoadingThematicHeatMap} setIsLoadingThematicHeatMap={setIsLoadingThematicHeatMap} />}
                        {isSectorSheet && <SectorHeatMap isLoadingSectorHeatMap={isLoadingSectorHeatMap} setIsLoadingSectorHeatMap={setIsLoadingSectorHeatMap} />}
                        {isAllSheet && <AllHeatMap isLoadingAllHeatMap={isLoadingAllHeatMap} setIsLoadingAllHeatMap={setIsLoadingAllHeatMap} />}
                    </Box>
            }
            <TopDrawer isDrawerOpen={isDrawerOpen} onClose={handleDrawerClose} expiryMsg={expiryMsg} />
        </div>
    );
};

// export default SubHeatMapPage;
