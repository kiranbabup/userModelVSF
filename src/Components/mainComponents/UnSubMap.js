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

    const [resultData, setResultData] = useState([]);
    const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(false);
    const [data, setData] = useState([]);
    const [selectedOptionStock1, setSelectedOptionStock1] = useState("tri__Nifty_50_Pcnt_Rank");
    const [selectedOptionStock2, setSelectedOptionStock2] = useState("");
    const [selectedOptionStock3, setSelectedOptionStock3] = useState("");
    const [selectedOptionStock4, setSelectedOptionStock4] = useState("");
    const [displayedOption, setDisplayedOption] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const fetchData = async () => {
        setIsLoadingHeatMap(true);
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/getheatmappcntdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            setResultData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingHeatMap(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    // console.log(resultData);

    const handleSelectChange = (selectedOption) => {
        setDisplayedOption(selectedOption.replace(/tri__/g, ' ').replace(/_Pcnt_Rank/g, ' ').replace(/_/g, ' '));

        const modifiedData = resultData.map((item) => {
            const year = new Date(item.DATE).getFullYear().toString().slice(-2);
            const month = new Date(item.DATE).getMonth() + 1;
            if (selectedOption === "tri__Nifty_50_Pcnt_Rank" || selectedOption === "tri__Nifty_Midcap_50_Pcnt_Rank" || selectedOption === "tri__NIFTY_SMALLCAP_50_Pcnt_Rank" || selectedOption === "tri__NIFTY_LARGEMID250_Pcnt_Rank" || selectedOption === "tri__Nifty_Bank_Pcnt_Rank" || selectedOption === " ") {
                var value = item[selectedOption];
            } else {
                setIsDrawerOpen(true)
            }
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
        // const truncatedData = groupedData;
        // const truncatedData = groupedData.slice(0, 12);
        const truncatedData = groupedData.slice(0, groupedData.length - 10);
        setData(truncatedData);
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    useEffect(() => {
        handleSelectChange(selectedOptionStock1);
    }, [resultData]);

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
                            <option value="tri__Nifty_50_Pcnt_Rank" key="tri__Nifty_50_Pcnt_Rank" style={{backgroundColor:"#98FF98"}}>Nifty 50</option>
                            <option value="tri__Nifty_Midcap_50_Pcnt_Rank" key="tri__Nifty_Midcap_50_Pcnt_Rank" style={{backgroundColor:"#98FF98"}}>Nifty Midcap 50</option>
                            <option value="tri__NIFTY_SMALLCAP_50_Pcnt_Rank" key="tri__NIFTY_SMALLCAP_50_Pcnt_Rank" style={{backgroundColor:"#98FF98"}}>NIFTY SMALLCAP 50</option>
                            <option value="tri__NIFTY_LARGEMID250_Pcnt_Rank" key="tri__NIFTY_LARGEMID250_Pcnt_Rank" style={{backgroundColor:"#98FF98"}}>NIFTY LARGEMIDCAP 250</option>

                            <option value="tri__Nifty_Next_50_Pcnt_Rank" key="tri__Nifty_Next_50_Pcnt_Rank" style={verylightGray}>Nifty Next 50</option>
                            <option value="tri__Nifty_100_Pcnt_Rank" key="tri__Nifty_100_Pcnt_Rank" style={verylightGray}>Nifty 100</option>
                            <option value="tri__Nifty_200_Pcnt_Rank" key="tri__Nifty_200_Pcnt_Rank" style={verylightGray}>Nifty 200</option>
                            <option value="tri__NIFTY_TOTAL_MKT_Pcnt_Rank" key="tri__NIFTY_TOTAL_MKT_Pcnt_Rank" style={verylightGray}>NIFTY TOTAL MKT</option>
                            <option value="tri__Nifty_500_Pcnt_Rank" key="tri__Nifty_500_Pcnt_Rank" style={verylightGray}>Nifty 500</option>
                            <option value="tri__NIFTY500_MULTICAP_Pcnt_Rank" key="tri__NIFTY500_MULTICAP_Pcnt_Rank" style={verylightGray}>NIFTY 500 MULTICAP</option>
                            <option value="tri__NIFTY_MIDCAP_150_Pcnt_Rank" key="tri__NIFTY_MIDCAP_150_Pcnt_Rank" style={verylightGray}>NIFTY MIDCAP 150</option>
                            <option value="tri__NIFTY_MID_SELECT_Pcnt_Rank" key="tri__NIFTY_MID_SELECT_Pcnt_Rank" style={verylightGray}>NIFTY MID SELECT</option>
                            <option value="tri__NIFTY_MIDCAP_100_Pcnt_Rank" key="tri__NIFTY_MIDCAP_100_Pcnt_Rank" style={verylightGray}>NIFTY MIDCAP 100</option>
                            <option value="tri__NIFTY_SMALLCAP_250_Pcnt_Rank" key="tri__NIFTY_SMALLCAP_250_Pcnt_Rank" style={verylightGray}>NIFTY SMALLCAP 250</option>
                            <option value="tri__NIFTY_SMLCAP_100_Pcnt_Rank" key="tri__NIFTY_SMLCAP_100_Pcnt_Rank" style={verylightGray}>NIFTY SMLCAP 100</option>
                            <option value="tri__NIFTY_MICROCAP250_Pcnt_Rank" key="tri__NIFTY_MICROCAP250_Pcnt_Rank" style={verylightGray}>NIFTY MICROCAP 250</option>
                            <option value="tri__NIFTY_MIDSML_400_Pcnt_Rank" key="tri__NIFTY_MIDSML_400_Pcnt_Rank" style={verylightGray}>NIFTY MIDSML 400</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Broad Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => {setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option >Select Strategy Stock</option>
                            <option value="tri__NIFTY100_EQL_WGT_Pcnt_Rank" key="tri__NIFTY100_EQL_WGT_Pcnt_Rank"  style={verylightGray}>NIFTY 100 EQL WGT</option>
                            <option value="tri__NIFTY100_LOWVOL30_Pcnt_Rank" key="tri__NIFTY100_LOWVOL30_Pcnt_Rank" style={verylightGray}>NIFTY 100 LOWVOL 30</option>
                            <option value="tri__Nifty200Momentm30_Pcnt_Rank" key="tri__Nifty200Momentm30_Pcnt_Rank" style={verylightGray}>Nifty 200 Momentm 30</option>
                            <option value="tri__Nifty200_Alpha_30_Pcnt_Rank" key="tri__Nifty200_Alpha_30_Pcnt_Rank" style={verylightGray}>Nifty 200 Alpha 30</option>
                            <option value="tri__Nifty100_Alpha_30_Pcnt_Rank" key="tri__Nifty100_Alpha_30_Pcnt_Rank" style={verylightGray}>Nifty 100 Alpha 30</option>
                            <option value="tri__NIFTY_ALPHA_50_Pcnt_Rank" key="tri__NIFTY_ALPHA_50_Pcnt_Rank" style={verylightGray}>NIFTY ALPHA 50</option>key
                            <option value="tri__NIFTY_QUALITY_LOWVOLATILITY_30_Pcnt_Rank" key="tri__NIFTY_QUALITY_LOWVOLATILITY_30_Pcnt_Rank" style={verylightGray}>NIFTY QUALITY LOW-VOLATILITY 30</option>
                            <option value="tri__NIFTY_ALPHA_QUALITY_LOWVOLATILITY_30_Pcnt_Rank" key="tri__NIFTY_ALPHA_QUALITY_LOWVOLATILITY_30_Pcnt_Rank" style={verylightGray}>NIFTY ALPHA QUALITY LOW-VOLATILITY 30</option>
                            <option value="tri__NIFTY_ALPHA_QUALITY_VALUE_LOWVOLATILITY_30_Pcnt_Rank" key="tri__NIFTY_ALPHA_QUALITY_VALUE_LOWVOLATILITY_30_Pcnt_Rank" style={verylightGray}>NIFTY ALPHA QUALITY VALUE LOW-VOLATILITY 30</option>
                            <option value="tri__Nifty_Div_Opps_50_Pcnt_Rank" key="tri__Nifty_Div_Opps_50_Pcnt_Rank" style={verylightGray}>Nifty Div Opps 50</option>
                            <option value="tri__Nifty_GrowSect_15_Pcnt_Rank" key="tri__Nifty_GrowSect_15_Pcnt_Rank" style={verylightGray}>Nifty GrowSect 15</option>
                            <option value="tri__NIFTY_HIGH_BETA_50_Pcnt_Rank" key="tri__NIFTY_HIGH_BETA_50_Pcnt_Rank" style={verylightGray}>NIFTY HIGH BETA 50</option>
                            <option value="tri__NIFTY_LOW_VOLATILITY_50_Pcnt_Rank" key="tri__NIFTY_LOW_VOLATILITY_50_Pcnt_Rank" style={verylightGray}>NIFTY LOW VOLATILITY 50</option>
                            <option value="tri__NIFTY100_QUALTY30_Pcnt_Rank" key="tri__NIFTY100_QUALTY30_Pcnt_Rank" style={verylightGray}>NIFTY 100 QUALTY 30</option>
                            <option value="tri__Nifty_Midcap150_Momentum_50_Pcnt_Rank" key="tri__Nifty_Midcap150_Momentum_50_Pcnt_Rank" style={verylightGray}>Nifty Midcap 150 Momentum 50</option>
                            <option value="tri__NIFTY_M150_QLTY50_Pcnt_Rank" key="tri__NIFTY_M150_QLTY50_Pcnt_Rank" style={verylightGray}>NIFTY M150 QLTY 50</option>
                            <option value="tri__Nifty_Smallcap250_Quality_50_Index_Pcnt_Rank" key="tri__Nifty_Smallcap250_Quality_50_Index_Pcnt_Rank" style={verylightGray}>Nifty Smallcap 250 Quality 50 Index</option>
                            <option value="tri__Nifty_Smallcap250_Momentum_Quality_100_Pcnt_Rank" key="tri__Nifty_Smallcap250_Momentum_Quality_100_Pcnt_Rank" style={verylightGray}>Nifty Smallcap 250 Momentum Quality 100</option>
                            <option value="tri__NIFTY50_EQL_WGT_Pcnt_Rank" key="tri__NIFTY50_EQL_WGT_Pcnt_Rank" style={verylightGray}>NIFTY 50 EQL WGT</option>
                            <option value="tri__NIFTY50_USD_Pcnt_Rank" key="tri__NIFTY50_USD_Pcnt_Rank" style={verylightGray}>NIFTY 50 USD</option>
                            <option value="tri__Nifty50_Value_20_Pcnt_Rank" key="tri__Nifty50_Value_20_Pcnt_Rank" style={verylightGray}>Nifty 50 Value 20</option>
                            <option value="tri__Nifty500_Value_50_Pcnt_Rank" key="tri__Nifty500_Value_50_Pcnt_Rank" style={verylightGray}>Nifty 500 Value 50</option>
                            <option value="tri__NIFTY200_QUALITY_30_Pcnt_Rank" key="tri__NIFTY200_QUALITY_30_Pcnt_Rank" style={verylightGray}>NIFTY 200 QUALITY 30</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Strategy Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Thematic Stock</option>
                            <option value="tri__NIFTY_ADITYA_BIRLA_GROUP_Pcnt_Rank" key="tri__NIFTY_ADITYA_BIRLA_GROUP_Pcnt_Rank"  style={verylightGray}>NIFTY ADITYA BIRLA GROUP</option>
                            <option value="tri__Nifty_Commodities_Pcnt_Rank" key="tri__Nifty_Commodities_Pcnt_Rank" style={verylightGray}>Nifty Commodities</option>
                            <option value="tri__Nifty_Core_Housing_Pcnt_Rank" key="tri__Nifty_Core_Housing_Pcnt_Rank" style={verylightGray}>Nifty Core Housing</option>
                            <option value="tri__Nifty_CPSE_Pcnt_Rank" key="tri__Nifty_CPSE_Pcnt_Rank" style={verylightGray}>Nifty CPSE</option>
                            <option value="tri__Nifty_Energy_Pcnt_Rank" key="tri__Nifty_Energy_Pcnt_Rank" style={verylightGray}>Nifty Energy</option>
                            <option value="tri__Nifty_Housing_Pcnt_Rank" key="tri__Nifty_Housing_Pcnt_Rank" style={verylightGray}>Nifty Housing</option>
                            <option value="tri__NIFTY100_ESG_Pcnt_Rank" key="tri__NIFTY100_ESG_Pcnt_Rank" style={verylightGray}>NIFTY 100 ESG</option>
                            <option value="tri__NIFTY100_Enhanced_ESG_Pcnt_Rank" key="tri__NIFTY100_Enhanced_ESG_Pcnt_Rank" style={verylightGray}>NIFTY 100 Enhanced ESG</option>
                            <option value="tri__Nifty100ESGSecLdr_Pcnt_Rank" key="tri__Nifty100ESGSecLdr_Pcnt_Rank" style={verylightGray}>Nifty 100 ESGSecLdr</option>
                            <option value="tri__Nifty_Consumption_Pcnt_Rank" key="tri__Nifty_Consumption_Pcnt_Rank" style={verylightGray}>Nifty Consumption</option>
                            <option value="tri__Nifty_India_Defence_Pcnt_Rank" key="tri__Nifty_India_Defence_Pcnt_Rank" style={verylightGray}>Nifty India Defence</option>
                            <option value="tri__NIFTY_IND_DIGITAL_Pcnt_Rank" key="tri__NIFTY_IND_DIGITAL_Pcnt_Rank" style={verylightGray}>NIFTY IND DIGITAL</option>
                            <option value="tri__NIFTY_INDIA_MFG_Pcnt_Rank" key="tri__NIFTY_INDIA_MFG_Pcnt_Rank" style={verylightGray}>NIFTY INDIA MFG</option>
                            <option value="tri__Nifty_Infra_Pcnt_Rank" key="tri__Nifty_Infra_Pcnt_Rank" style={verylightGray}>Nifty Infra</option>
                            <option value="tri__NIFTY_MAHINDRA_GROUP_Pcnt_Rank" key="tri__NIFTY_MAHINDRA_GROUP_Pcnt_Rank" style={verylightGray}>NIFTY MAHINDRA GROUP</option>
                            <option value="tri__Nifty_Mid_Liq_15_Pcnt_Rank" key="tri__Nifty_Mid_Liq_15_Pcnt_Rank" style={verylightGray}>Nifty Mid Liq 15</option>
                            <option value="tri__Nifty_MidSmall_India_Consumption_Pcnt_Rank" key="tri__Nifty_MidSmall_India_Consumption_Pcnt_Rank" style={verylightGray}>Nifty MidSmall India Consumption</option>
                            <option value="tri__Nifty_MNC_Pcnt_Rank" key="tri__Nifty_MNC_Pcnt_Rank" style={verylightGray}>Nifty MNC</option>
                            <option value="tri__Nifty_Mobility_Pcnt_Rank" key="tri__Nifty_Mobility_Pcnt_Rank" style={verylightGray}>Nifty Mobility</option>
                            <option value="tri__Nifty_PSE_Pcnt_Rank" key="tri__Nifty_PSE_Pcnt_Rank" style={verylightGray}>Nifty PSE</option>
                            <option value="tri__Nifty_NonCyclical_Consumer_Pcnt_Rank" key="tri__Nifty_NonCyclical_Consumer_Pcnt_Rank" style={verylightGray}>Nifty Non-Cyclical Consumer</option>
                            <option value="tri__Nifty_Serv_Sector_Pcnt_Rank" key="tri__Nifty_Serv_Sector_Pcnt_Rank" style={verylightGray}>Nifty Serv Sector</option>
                            <option value="tri__NIFTY_SHARIAH_25_Pcnt_Rank" key="tri__NIFTY_SHARIAH_25_Pcnt_Rank" style={verylightGray}>NIFTY SHARIAH 25</option>
                            <option value="tri__NIFTY_TATA_GROUP_Pcnt_Rank" key="tri__NIFTY_TATA_GROUP_Pcnt_Rank" style={verylightGray}>NIFTY TATA GROUP</option>
                            <option value="tri__NIFTY_TATA_GROUP_25_CAP_Pcnt_Rank" key="tri__NIFTY_TATA_GROUP_25_CAP_Pcnt_Rank" style={verylightGray}>NIFTY TATA GROUP 25% CAP</option>
                            <option value="tri__Nifty_Transportation__Logistics_Pcnt_Rank" key="tri__Nifty_Transportation__Logistics_Pcnt_Rank" style={verylightGray}>Nifty Transportation & Logistics</option>
                            <option value="tri__Nifty100_Liq_15_Pcnt_Rank" key="tri__Nifty100_Liq_15_Pcnt_Rank" style={verylightGray}>Nifty 100 Liq 15</option>
                            <option value="tri__NIFTY500_SHARIAH_Pcnt_Rank" key="tri__NIFTY500_SHARIAH_Pcnt_Rank" style={verylightGray}>NIFTY 500 SHARIAH</option>
                            <option value="tri__NIFTY_SME_EMERGE_Pcnt_Rank" key="tri__NIFTY_SME_EMERGE_Pcnt_Rank" style={verylightGray}>NIFTY SME EMERGE</option>
                        </select>
                        <LoadingButton disabled variant="contained" style={lodButton}>Compare All Thematic Stocks</LoadingButton>
                    </Box>
                </fieldset>
                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value);}} style={selectStyle}>
                            <option >Select Sector  Stock</option>
                            <option value="tri__Nifty_Bank_Pcnt_Rank" key="tri__Nifty_Bank_Pcnt_Rank" style={{ backgroundColor:"#98FF98" }}>Nifty Bank</option>

                            <option value="tri__Nifty_Auto_Pcnt_Rank" key="tri__Nifty_Auto_Pcnt_Rank" style={verylightGray}>Nifty Auto</option>
                            <option value="tri__Nifty_Fin_Service_Pcnt_Rank" key="tri__Nifty_Fin_Service_Pcnt_Rank" style={verylightGray}>Nifty Fin Service</option>
                            <option value="tri__NIFTY_FINSRV25_50_Pcnt_Rank" key="tri__NIFTY_FINSRV25_50_Pcnt_Rank" style={verylightGray}>NIFTY FINSRV25 50</option>
                            <option value="tri__Nifty_Financial_Services_ExBank_Pcnt_Rank" key="tri__Nifty_Financial_Services_ExBank_Pcnt_Rank" style={verylightGray}>Nifty Financial Services Ex-Bank</option>
                            <option value="tri__Nifty_FMCG_Pcnt_Rank" key="tri__Nifty_FMCG_Pcnt_Rank" style={verylightGray}>Nifty FMCG</option>
                            <option value="tri__NIFTY_HEALTHCARE_Pcnt_Rank" key="tri__NIFTY_HEALTHCARE_Pcnt_Rank" style={verylightGray}>NIFTY HEALTHCARE</option>
                            <option value="tri__Nifty_IT_Pcnt_Rank" key="tri__Nifty_IT_Pcnt_Rank" style={verylightGray}>Nifty IT</option>
                            <option value="tri__Nifty_Media_Pcnt_Rank" key="tri__Nifty_Media_Pcnt_Rank" style={verylightGray}>Nifty Media</option>
                            <option value="tri__Nifty_Metal_Pcnt_Rank" key="tri__Nifty_Metal_Pcnt_Rank" style={verylightGray}>Nifty Metal</option>
                            <option value="tri__Nifty_Pharma_Pcnt_Rank" key="tri__Nifty_Pharma_Pcnt_Rank" style={verylightGray}>Nifty Pharma</option>
                            <option value="tri__Nifty_Pvt_Bank_Pcnt_Rank" key="tri__Nifty_Pvt_Bank_Pcnt_Rank" style={verylightGray}>Nifty Pvt Bank</option>
                            <option value="tri__Nifty_PSU_Bank_Pcnt_Rank" key="tri__Nifty_PSU_Bank_Pcnt_Rank" style={verylightGray}>Nifty PSU Bank</option>
                            <option value="tri__Nifty_Realty_Pcnt_Rank" key="tri__Nifty_Realty_Pcnt_Rank" style={verylightGray}>Nifty Realty</option>
                            <option value="tri__NIFTY_CONSR_DURBL_Pcnt_Rank" key="tri__NIFTY_CONSR_DURBL_Pcnt_Rank" style={verylightGray}>NIFTY CONSR DURBL</option>
                            <option value="tri__NIFTY_OIL_AND_GAS_Pcnt_Rank" key="tri__NIFTY_OIL_AND_GAS_Pcnt_Rank" style={verylightGray}>NIFTY OIL AND GAS</option>
                            <option value="tri__Nifty_MidSmall_Financial_Services_Pcnt_Rank" key="tri__Nifty_MidSmall_Financial_Services_Pcnt_Rank" style={verylightGray}>Nifty MidSmall Financial Services</option>
                            <option value="tri__Nifty_MidSmall_Healthcare_Pcnt_Rank" key="tri__Nifty_MidSmall_Healthcare_Pcnt_Rank" style={verylightGray}>Nifty MidSmall Healthcare</option>
                            <option value="tri__Nifty_MidSmall_IT__Telecom_Pcnt_Rank" key="tri__Nifty_MidSmall_IT__Telecom_Pcnt_Rank" style={verylightGray}>Nifty MidSmall IT & Telecom</option>
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
