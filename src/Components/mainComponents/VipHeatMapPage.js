import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import BroadHeatMap from '../heatmaps/BroadHeatMap';
import StrategyHeatMap from '../heatmaps/StrategyHeatMap';
import ThematicHeatMap from '../heatmaps/ThematicHeatMap';
import SectorHeatMap from '../heatmaps/SectorHeatMap';
import AllHeatMap from '../heatmaps/weekNmonth/AllHeatMap';
import { columnStyle, dsiplayMesgStyle, fieldsetStyle, loadingSpace, lodButton, mainDivStyle, selectStyle, subDivStyle } from '../../assets/data/styles';
import { broadStocksNames, months, sectorStockName, strategyStockName, thematicStockName } from '../../constants';
import YearlyHeatMap from '../dataComponents/YearlyHeatMap';
import TopDrawer from '../TopDrawer';
import { calculateDaysLeft } from '../../assets/data/functions';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import LsService from "../../services/localstorage";

const VipHeatMapPage = () => {
    // const resultData = useSelector(state => state.data.resultData);
    // const isLoadingHeatMap = useSelector(state => state.data.isLoadingHeatmap);

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

    const handleSelectChange = async (selectedOption) => {
        const dateString = "DATE"
        setDisplayedOption(selectedOption);
        setStatetoUse();
        setIsLoadingHeatMap(true);
        try {
            const response = await fetch('https://heatmapapi.onrender.com/getselectedheatmapdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "data": [dateString, selectedOption] }),
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                const arr = data.data.reverse();
                const modifiedData = arr.map((item) => {
                    const year = new Date(item.DATE).getFullYear().toString().slice(-2);
                    const month = new Date(item.DATE).getMonth() + 1;
                    const value = item[selectedOption];
                    return { label: year, month, value: value };
                });
                // console.log(modifiedData);
                const groupedData = [];

                modifiedData.forEach((item) => {
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
                // console.log(groupedData);
                groupedData.forEach((item) => {
                    for (var index in item.data) {
                        var sum = item.data[index].reduce((acc, val) => acc + val, 0);
                        var average = sum / item.data[index].length;
                        item.average[index] = isNaN(average) ? 0 : parseFloat(average.toFixed(2));
                    }
                })

                const truncatedData = groupedData.slice(0, groupedData.length - 10);
                setData(truncatedData);
            }
            if (!response.ok) {
                throw new Error('Failed to get data');
            }
            setIsLoadingHeatMap(false);
        } catch (err) {
            console.error('Error getting data:', err);
            setIsLoadingHeatMap(false);
        }
    };

    useEffect(() => {
        handleSelectChange(selectedOptionStock1);

        const userdata = LsService.getCurrentUser();
        const endingDate = userdata.subscribe_expired_on;
        setdaysLeft(calculateDaysLeft(endingDate));
        if (daysLeft <= 5) {
            setIsDrawerOpen(true);
            setexpiryMsg(`Subscription Expires in ${daysLeft} days`);
        }
    }, []);

    const setStatetoUse = () => {
        setIsSingleSheet(true);
        setIsBroadSheet(false);
        setIsStrategySheet(false);
        setIsThematicSheet(false);
        setIsSectorSheet(false);
        setIsAllSheet(false);
    }

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
                            {broadStocksNames.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName}>{e.shortName}</option>
                                )
                            })}
                        </select>
                        <LoadingButton loading={isLoadingBroadHeatMap} variant="contained" style={lodButton} onClick={() => onBroadHandle()}>Compare All Broad Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => { setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Strategy Stock</option>
                            {strategyStockName.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName}>{e.shortName}</option>
                                )
                            })}
                        </select>
                        <LoadingButton loading={isLoadingStrategyHeatMap} variant="contained" style={lodButton} onClick={() => onStrategyHandle()}>Compare All Strategy Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Thematic Stock</option>
                            {thematicStockName.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName}>{e.shortName}</option>
                                )
                            })}
                        </select>
                        <LoadingButton loading={isLoadingThematicHeatMap} variant="contained" style={lodButton} onClick={() => onThematicHandle()}>Compare All Thematic Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Sector  Stock</option>
                            {sectorStockName.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName}>{e.shortName}</option>
                                )
                            })}
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

export default VipHeatMapPage;
