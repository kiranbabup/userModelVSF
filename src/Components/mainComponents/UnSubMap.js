// UnSubcriptionHeatmap
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AnchorTemporaryDrawer from '../BottomDrawer';
import { columnStyle, dsiplayMesgStyle, fieldsetStyle, loadingSpace, lodButton, mainDivStyle, mediaQueries, selectStyle, subDivStyle, verylightGray } from '../../assets/data/styles';
import { months } from '../../constants';
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
                            <option value="NFT50" key="NFT50"  style={{ backgroundColor:{xs: "#98FF98"  }, background: "#98FF98" }} >NFT50</option>
                            <option value="NFTMC50" key="NFTMC50" style={{ backgroundColor:{xs: "#98FF98" }, background: "#98FF98" }} >NFTMC50</option>
                            <option value="NFTSC50" key="NFTSC50" style={{ backgroundColor:{xs: "#98FF98" }, background: "#98FF98" }} >NFTSC50</option>
                            <option value="NFTLMC250" key="NFTLMC250" style={{ backgroundColor:{xs: "#98FF98" }, background: "#98FF98" }} >NFTLMC250</option>
                            <option value="NFTN50" key="NFTN50" style={verylightGray} >NFTN50</option>
                            <option value="NFT100" key="NFT100" style={verylightGray} >NFT100</option>
                            <option value="NFT200" key="NFT200" style={verylightGray} >NFT200</option>
                            <option value="NFTTTLMAR" key="NFTTTLMAR" style={verylightGray} >NFTTTLMAR</option>
                            <option value="NFT500" key="NFT500" style={verylightGray} >NFT500</option>
                            <option value="NFT500MC50_25_25" key="NFT500MC50_25_25" style={verylightGray} >NFT500MC50_25_25</option>
                            <option value="NFT500LGMSEQLCAPWTD" key="NFT500LGMSEQLCAPWTD" style={verylightGray} >NFT500LGMSEQLCAPWTD</option>
                            <option value="NFTMC150" key="NFTMC150" style={verylightGray} >NFTMC150</option>
                            <option value="NFTMCSEL" key="NFTMCSEL" style={verylightGray} >NFTMCSEL</option>
                            <option value="NFTMC100" key="NFTMC100" style={verylightGray} >NFTMC100</option>
                            <option value="NFTSC250" key="NFTSC250" style={verylightGray} >NFTSC250</option>
                            <option value="NFTFSC100" key="NFTFSC100" style={verylightGray} >NFTFSC100</option>
                            <option value="NFTMC250" key="NFTMC250" style={verylightGray} >NFTMC250</option>
                            <option value="NFTMSC400" key="NFTMSC400" style={verylightGray} >NFTMSC400</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Broad Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => {setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Strategy Stock</option>
                            <option value="NFT100EQLWGT" key="NFT100EQLWGT"  style={verylightGray} >NFT100EQLWGT</option>
                            <option value="NFT100LVLT30" key="NFT100LVLT30"  style={verylightGray} >NFT100LVLT30</option>
                            <option value="NFT50A" key="NFT50A"  style={verylightGray} >NFT50A</option>
                            <option value="NFT50FPR" key="NFT50FPR"  style={verylightGray} >NFT50FPR</option>
                            <option value="NFT50FTR" key="NFT50FTR"  style={verylightGray} >NFT50FTR</option>
                            <option value="NFT200MOM30" key="NFT200MOM30"  style={verylightGray} >NFT200MOM30</option>
                            <option value="NFT200AL30" key="NFT200AL30"  style={verylightGray} >NFT200AL30</option>
                            <option value="NFT100AL30" key="NFT100AL30"  style={verylightGray} >NFT100AL30</option>
                            <option value="NFTAL50" key="NFTAL50"  style={verylightGray} >NFTAL50</option>
                            <option value="NFTALVLT30" key="NFTALVLT30"  style={verylightGray} >NFTALVLT30</option>
                            <option value="NFTAQLTLVLT30" key="NFTAQLTLVLT30"  style={verylightGray} >NFTAQLTLVLT30</option>
                            <option value="NFTAQLTVLLVLT30" key="NFTAQLTVLLVLT30"  style={verylightGray} >NFTAQLTVLLVLT30</option>
                            <option value="NFTDO50" key="NFTDO50"  style={verylightGray} >NFTDO50</option>
                            <option value="NFTGRTHSEC15" key="NFTGRTHSEC15"  style={verylightGray} >NFTGRTHSEC15</option>
                            <option value="NFTHBETA50" key="NFTHBETA50"  style={verylightGray} >NFTHBETA50</option>
                            <option value="NFTLVLT50" key="NFTLVLT50"  style={verylightGray} >NFTLVLT50</option>
                            <option value="NFTT10EQLWGT" key="NFTT10EQLWGT"  style={verylightGray} >NFTT10EQLWGT</option>
                            <option value="NFT100QLT30" key="NFT100QLT30"  style={verylightGray} >NFT100QLT30</option>
                            <option value="NFTMC150MOM50" key="NFTMC150MOM50"  style={verylightGray} >NFTMC150MOM50</option>
                            <option value="NFT500MOM50" key="NFT500MOM50"  style={verylightGray} >NFT500MOM50</option>
                            <option value="NFTMC150QLT50" key="NFTMC150QLT50"  style={verylightGray} >NFTMC150QLT50</option>
                            <option value="NFTSC250QLT50" key="NFTSC250QLT50"  style={verylightGray} >NFTSC250QLT50</option>
                            <option value="NFTMSC400MOMQLT100" key="NFTMSC400MOMQLT100"  style={verylightGray} >NFTMSC400MOMQLT100</option>
                            <option value="NFTSC250MOMQLT100" key="NFTSC250MOMQLT100"  style={verylightGray} >NFTSC250MOMQLT100</option>
                            <option value="NFTQLTLVLT30" key="NFTQLTLVLT30"  style={verylightGray} >NFTQLTLVLT30</option>
                            <option value="NFT50DIVPNT" key="NFT50DIVPNT"  style={verylightGray} >NFT50DIVPNT</option>
                            <option value="NFT50EW" key="NFT50EW"  style={verylightGray} >NFT50EW</option>
                            <option value="NFT50PR1XINVS" key="NFT50PR1XINVS"  style={verylightGray} >NFT50PR1XINVS</option>
                            <option value="NFT50PR2XLVG" key="NFT50PR2XLVG"  style={verylightGray} >NFT50PR2XLVG</option>
                            <option value="NFT50TR1XINVS" key="NFT50TR1XINVS"  style={verylightGray} >NFT50TR1XINVS</option>
                            <option value="NFT50TR2XLVG" key="NFT50TR2XLVG"  style={verylightGray} >NFT50TR2XLVG</option>
                            <option value="NFT50VL20" key="NFT50VL20"  style={verylightGray} >NFT50VL20</option>
                            <option value="NFT200VL30" key="NFT200VL30"  style={verylightGray} >NFT200VL30</option>
                            <option value="NFT500VL50" key="NFT500VL50"  style={verylightGray} >NFT500VL50</option>
                            <option value="NFT500EQLWGT" key="NFT500EQLWGT"  style={verylightGray} >NFT500EQLWGT</option>
                            <option value="NFT200QLT30" key="NFT200QLT30"  style={verylightGray} >NFT200QLT30</option>
                            <option value="NFT50SRTDURDEBTDYNP_B" key="NFT50SRTDURDEBTDYNP_B"  style={verylightGray} >NFT50SRTDURDEBTDYNP_B</option>
                            <option value="NFT50SRTDURDEBTDYNP_E" key="NFT50SRTDURDEBTDYNP_E"  style={verylightGray} >NFT50SRTDURDEBTDYNP_E</option>
                            <option value="NFTEQTSAV" key="NFTEQTSAV"  style={verylightGray} >NFTEQTSAV</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Strategy Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Thematic Stock</option>
                            <option value="NFTCORPGRPIABG" key="NFTCORPGRPIABG"  style={verylightGray} >NFTCORPGRPIABG</option>
                            <option value="NFTCOMM" key="NFTCOMM"  style={verylightGray} >NFTCOMM</option>
                            <option value="NFTCH" key="NFTCH"  style={verylightGray} >NFTCH</option>
                            <option value="NFTCPSE" key="NFTCPSE"  style={verylightGray} >NFTCPSE</option>
                            <option value="NFTENG" key="NFTENG"  style={verylightGray} >NFTENG</option>
                            <option value="NFTEVNAAMT" key="NFTEVNAAMT"  style={verylightGray} >NFTEVNAAMT</option>
                            <option value="NFTHOUS" key="NFTHOUS"  style={verylightGray} >NFTHOUS</option>
                            <option value="NFT100ESG" key="NFT100ESG"  style={verylightGray} >NFT100ESG</option>
                            <option value="NFT100EESG" key="NFT100EESG"  style={verylightGray} >NFT100EESG</option>
                            <option value="NFT100ESGSL" key="NFT100ESGSL"  style={verylightGray} >NFT100ESGSL</option>
                            <option value="NFTCONS" key="NFTCONS"  style={verylightGray} >NFTCONS</option>
                            <option value="NFTINDCONS" key="NFTINDCONS"  style={verylightGray} >NFTINDCONS</option>
                            <option value="NFTINDDIG" key="NFTINDDIG"  style={verylightGray} >NFTINDDIG</option>
                            <option value="NFTINDMFG" key="NFTINDMFG"  style={verylightGray} >NFTINDMFG</option>
                            <option value="NFTINDTR" key="NFTINDTR"  style={verylightGray} >NFTINDTR</option>
                            <option value="NFTINFS" key="NFTINFS"  style={verylightGray} >NFTINFS</option>
                            <option value="NFTINDCORPGRPIMG" key="NFTINDCORPGRPIMG"  style={verylightGray} >NFTINDCORPGRPIMG</option>
                            <option value="NFTMCL15" key="NFTMCL15"  style={verylightGray} >NFTMCL15</option>
                            <option value="NFTMSINDCON" key="NFTMSINDCON"  style={verylightGray} >NFTMSINDCON</option>
                            <option value="NFTMNC" key="NFTMNC"  style={verylightGray} >NFTMNC</option>
                            <option value="NFTMOB" key="NFTMOB"  style={verylightGray} >NFTMOB</option>
                            <option value="NFTPSE" key="NFTPSE"  style={verylightGray} >NFTPSE</option>
                            <option value="NFTRI" key="NFTRI"  style={verylightGray} >NFTRI</option>
                            <option value="NFTNCC" key="NFTNCC"  style={verylightGray} >NFTNCC</option>
                            <option value="NFTSERSEC" key="NFTSERSEC"  style={verylightGray} >NFTSERSEC</option>
                            <option value="NFTSH25" key="NFTSH25"  style={verylightGray} >NFTSH25</option>
                            <option value="NFTINDCORPGRPITG" key="NFTINDCORPGRPITG"  style={verylightGray} >NFTINDCORPGRPITG</option>
                            <option value="NFTINDCORPGRPITG25PC" key="NFTINDCORPGRPITG25PC"  style={verylightGray} >NFTINDCORPGRPITG25PC</option>
                            <option value="NFTTRANSLOG" key="NFTTRANSLOG"  style={verylightGray} >NFTTRANSLOG</option>
                            <option value="NFT100L15" key="NFT100L15"  style={verylightGray} >NFT100L15</option>
                            <option value="NFT50SH" key="NFT50SH"  style={verylightGray} >NFT50SH</option>
                            <option value="NFT500SH" key="NFT500SH"  style={verylightGray} >NFT500SH</option>
                            <option value="NFT500MULCINDMFG50_30_20" key="NFT500MULCINDMFG50_30_20"  style={verylightGray} >NFT500MULCINDMFG50_30_20</option>
                            <option value="NFT500MULCINFS50_30_20" key="NFT500MULCINFS50_30_20"  style={verylightGray} >NFT500MULCINFS50_30_20</option>
                            <option value="NFTSMEEMG" key="NFTSMEEMG"  style={verylightGray} >NFTSMEEMG</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Thematic Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Sector  Stock</option>
                            <option value="NFTBANK" key="NFTBANK" style={{ backgroundColor:{xs: "#98FF98" }, background: "#98FF98" }} >NFTBANK</option>
                            <option value="NFTAUTO" key="NFTAUTO" style={verylightGray} >NFTAUTO</option>
                            <option value="NFTFINSERV" key="NFTFINSERV" style={verylightGray} >NFTFINSERV</option>
                            <option value="NFTFINSERV25_50" key="NFTFINSERV25_50" style={verylightGray} >NFTFINSERV25_50</option>
                            <option value="NFTFINSERVEB" key="NFTFINSERVEB" style={verylightGray} >NFTFINSERVEB</option>
                            <option value="NFTFMCG" key="NFTFMCG" style={verylightGray} >NFTFMCG</option>
                            <option value="NFTHLTC" key="NFTHLTC" style={verylightGray} >NFTHLTC</option>
                            <option value="NFTIT" key="NFTIT" style={verylightGray} >NFTIT</option>
                            <option value="NFTMEDIA" key="NFTMEDIA" style={verylightGray} >NFTMEDIA</option>
                            <option value="NFTMETAL" key="NFTMETAL" style={verylightGray} >NFTMETAL</option>
                            <option value="NFTPHARMA" key="NFTPHARMA" style={verylightGray} >NFTPHARMA</option>
                            <option value="NFTPVTB" key="NFTPVTB" style={verylightGray} >NFTPVTB</option>
                            <option value="NFTPSUB" key="NFTPSUB" style={verylightGray} >NFTPSUB</option>
                            <option value="NFTREAL" key="NFTREAL" style={verylightGray} >NFTREAL</option>
                            <option value="NFTCD" key="NFTCD" style={verylightGray} >NFTCD</option>
                            <option value="NFTOG" key="NFTOG" style={verylightGray} >NFTOG</option>
                            <option value="NFTMSFS" key="NFTMSFS" style={verylightGray} >NFTMSFS</option>
                            <option value="NFTMSHC" key="NFTMSHC" style={verylightGray} >NFTMSHC</option>
                            <option value="NFTMSITTEL" key="NFTMSITTEL" style={verylightGray} >NFTMSITTEL</option>
                            <option value="NFT50USD" key="NFT50USD" style={verylightGray} >NFT50USD</option>
                            <option value="NFTVIX" key="NFTVIX" style={verylightGray} >NFTVIX</option>
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
