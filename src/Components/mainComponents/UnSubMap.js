// UnSubcriptionHeatmap
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AnchorTemporaryDrawer from '../BottomDrawer';
import { columnStyle, dsiplayMesgStyle, fieldsetStyle, loadingSpace, lodButton, mainDivStyle, mediaQueries, selectStyle, subDivStyle, verylightGray } from '../../assets/data/styles';
import { months, strategyStockName, thematicStockName } from '../../constants';
import YearlyHeatMap from '../dataComponents/YearlyHeatMap';
// import { useSelector } from 'react-redux';

const UnSubHeatmap = () => {
    // const resultData = useSelector(state => state.data.resultData);
    // const isLoadingHeatMap = useSelector(state => state.data.isLoadingHeatmap);

    // const [resultData, setResultData] = useState([]);
    const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(false);
    const [data, setData] = useState([]);
    const [selectedOptionStock1, setSelectedOptionStock1] = useState("NFT50");
    const [selectedOptionStock2, setSelectedOptionStock2] = useState("");
    const [selectedOptionStock3, setSelectedOptionStock3] = useState("");
    const [selectedOptionStock4, setSelectedOptionStock4] = useState("");
    const [displayedOption, setDisplayedOption] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSelectChange = async (selectedOption) => {
        const dateString = "DATE"
        setDisplayedOption(selectedOption);
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
                    if (selectedOption === "NFT50" || selectedOption === "NFTMC50" || selectedOption === "NFTSC50" || selectedOption === "NFTLMC250" || selectedOption === "NFTBANK" || selectedOption === " ") {
                        var value = item[selectedOption];
                    } else {
                        setIsDrawerOpen(true)
                    }
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

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    useEffect(() => {
        handleSelectChange(selectedOptionStock1);
    }, []);

    const handleBroadStocksChange = (a)=>{
        setSelectedOptionStock2(" ");
        setSelectedOptionStock3(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(a);
    }
    const handleStrategyStocksChange = (b)=>{
        setSelectedOptionStock1(" ");
        setSelectedOptionStock3(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(b);
    }
    const handleThematicStocksChange = (c)=>{
        setSelectedOptionStock1(" ");
        setSelectedOptionStock2(" ");
        setSelectedOptionStock4(" ");
        handleSelectChange(c);
    }
    const handleSectorStocksChange = (d)=>{
        setSelectedOptionStock1(" ");
        setSelectedOptionStock2(" ");
        setSelectedOptionStock3(" ");
        handleSelectChange(d);
    }

    return (
        <div style={mainDivStyle}>
            <div style={subDivStyle}>
                <fieldset style={fieldsetStyle}>
                    <legend>Broad</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock1} onChange={(e) => {setSelectedOptionStock1(e.target.value); handleBroadStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Broad Stock</option>
                            <option value="NFT50" key="NFT50" title="NIFTY 50" style={{ backgroundColor: "#98FF98" }} >NFT50</option>
                            <option value="NFTMC50" key="NFTMC50" title="NIFTY MIDCAP 50" style={{ backgroundColor: "#98FF98" }} >NFTMC50</option>
                            <option value="NFTSC50" key="NFTSC50" title="NIFTY SMALLCAP 50" style={{ backgroundColor: "#98FF98" }} >NFTSC50</option>
                            <option value="NFTLMC250" key="NFTLMC250" title="NIFTY LARGEMIDCAP 250" style={{ backgroundColor: "#98FF98" }} >NFTLMC250</option>
                            <option value="NFT100" key="NFT100" style={verylightGray} >Subscribe-For-Rest</option>
                           
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Broad Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => {setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Strategy Stock</option>
                            {strategyStockName.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName} style={verylightGray} >{e.shortName}</option>
                                )
                            })}
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Strategy Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Thematic Stock</option>
                            {thematicStockName.map((e)=>{
                                return(
                                    <option value={e.shortName} key={e.shortName} title={e.fullName} style={verylightGray} >{e.shortName}</option>
                                )
                            })}
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Thematic Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Sector  Stock</option>
                            <option value="NFTBANK" key="NFTBANK" title="NIFTY BANK" style={{ backgroundColor: "#98FF98" }} >NFTBANK</option>
                            <option value="NFTFINSERV" key="NFTFINSERV" style={verylightGray} >Subscribe-For-Rest</option>
                            
                            </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Sector Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={{
                    display: "inline-block",
                    margin: "0px 3px",
                    borderRadius: "10px",
                    maxWidth:"19%",
                    height:"93px"
                }}
                >
                    <legend>All Stocks</legend>
                    <Box sx={{height:"100%", display:"flex", alignItems:"center"}}>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Stocks</LoadingButton>
                    </Box>
                    </fieldset>
            </div>
            {
                isLoadingHeatMap ? <Box style={loadingSpace} ><CircularProgress /> </Box> :
                    <Box>
                        <Typography style={dsiplayMesgStyle} >{displayedOption}</Typography>
                        <Box sx={{
                            width: '100%',
                            [mediaQueries.mobile]: {
                                fontSize: "13.4px"
                            },
                        }}>
                                    <YearlyHeatMap data={data} months={months} />
                        </Box>
                    </Box>
            }
            <AnchorTemporaryDrawer isDrawerOpen={isDrawerOpen} onClose={handleDrawerClose} />
        </div>
    );
};

export default UnSubHeatmap;
