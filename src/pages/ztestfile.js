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
import { months } from '../../constants';
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
    const [expiryMsg, setExpiryMsg] = useState("");
    const [daysLeft, setDaysLeft] = useState(20);
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
            body: JSON.stringify({"data": [dateString, selectedOption]}),
          });
          if(response.ok){
            const data = await response.json();
            console.log(data);

            const modifiedData = data.reverse().map((item) => {
                console.log(item);
                const year = new Date(item.DATE).getFullYear().toString().slice(-2);
                const month = new Date(item.DATE).getMonth() + 1;
                const value = item[selectedOption];
                return { label: year, month, value: value };
            });
            console.log(modifiedData);
            const groupedData = [];

            modifiedData.forEach((item) => {
                var index = groupedData.findIndex((e) => e.label === item.label);
                if (index !== -1) {
                    groupedData[index].data[item.month - 1].push(item.value);
                } else {
                    var newItem = {
                        label: item.label,
                        data: Array.from({ length: months.length }, () => []),
                        average: Array.from({ length: months.length }, () => 0)
                    };
                    newItem.data[item.month - 1].push(item.value);
                    groupedData.push(newItem);
                }
            });

            groupedData.forEach((item) => {
                for (var index in item.data) {
                    var sum = item.data[index].reduce((acc, val) => acc + val, 0);
                    var average = sum / item.data[index].length;
                    item.average[index] = isNaN(average) ? 0 : parseFloat(average.toFixed(1));
                }
            })

            const truncatedData = groupedData.slice(0, groupedData.length - 10);
            setData(truncatedData);
          } else {
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
        setDaysLeft(calculateDaysLeft(endingDate));
        if(daysLeft <= 5){
            setIsDrawerOpen(true);
            setExpiryMsg(`Subscription Expires in ${daysLeft} days`);
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
        if(daysLeft <= 0){
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
                            <option>Select Broad Stock</option>
                            <option value="NFT50" key="NFT50">NFT50</option>
                            <option value="NFTN50" key="NFTN50">NFTN50</option>
                            <option value="NFT100" key="NFT100">NFT100</option>
                            <option value="NFT200" key="NFT200">NFT200</option>
                            <option value="NFTTTLMAR" key="NFTTTLMAR">NFTTTLMAR</option>
                        </select>
                        <LoadingButton
                            onClick={onBroadHandle}
                            loading={isLoadingBroadHeatMap}
                            variant="contained"
                            sx={lodButton}
                        >
                            B
                        </LoadingButton>
                    </Box>
                </fieldset>

                <fieldset style={fieldsetStyle}>
                    <legend>Strategy</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock2} onChange={(e) => { setSelectedOptionStock2(e.target.value); handleStrategyStocksChange(e.target.value); }} style={selectStyle}>
                            <option>Select Strategy Stock</option>
                            <option value="NFTARS" key="NFTARS">NFTARS</option>
                            <option value="NFTCRP" key="NFTCRP">NFTCRP</option>
                            <option value="NFTGLD" key="NFTGLD">NFTGLD</option>
                            <option value="NFTIP" key="NFTIP">NFTIP</option>
                            <option value="NFTMSC" key="NFTMSC">NFTMSC</option>
                            <option value="NFTQNT" key="NFTQNT">NFTQNT</option>
                            <option value="NFTVAL" key="NFTVAL">NFTVAL</option>
                            <option value="NFTDIV" key="NFTDIV">NFTDIV</option>
                            <option value="NFTMOM" key="NFTMOM">NFTMOM</option>
                            <option value="NFTQUAL" key="NFTQUAL">NFTQUAL</option>
                            <option value="NFTBUYB" key="NFTBUYB">NFTBUYB</option>
                            <option value="NFTESG" key="NFTESG">NFTESG</option>
                            <option value="NFTLOVOL" key="NFTLOVOL">NFTLOVOL</option>
                            <option value="NFTSHVOL" key="NFTSHVOL">NFTSHVOL</option>
                            <option value="NFTCTB" key="NFTCTB">NFTCTB</option>
                            <option value="NFTAVGVOL" key="NFTAVGVOL">NFTAVGVOL</option>
                        </select>
                        <LoadingButton
                            onClick={onStrategyHandle}
                            loading={isLoadingStrategyHeatMap}
                            variant="contained"
                            sx={lodButton}
                        >
                            S
                        </LoadingButton>
                    </Box>
                </fieldset>

                <fieldset style={fieldsetStyle}>
                    <legend>Thematic</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock3} onChange={(e) => { setSelectedOptionStock3(e.target.value); handleThematicStocksChange(e.target.value); }} style={selectStyle}>
                            <option>Select Thematic Stock</option>
                            <option value="NFRA" key="NFRA">NFRA</option>
                            <option value="NFTHE" key="NFTHE">NFTHE</option>
                            <option value="NFTFNC" key="NFTFNC">NFTFNC</option>
                            <option value="NFTMBL" key="NFTMBL">NFTMBL</option>
                            <option value="NFTDTB" key="NFTDTB">NFTDTB</option>
                            <option value="NFTAGRI" key="NFTAGRI">NFTAGRI</option>
                            <option value="NFTDGRW" key="NFTDGRW">NFTDGRW</option>
                            <option value="NFTNRG" key="NFTNRG">NFTNRG</option>
                            <option value="NFTINS" key="NFTINS">NFTINS</option>
                            <option value="NFTINSX" key="NFTINSX">NFTINSX</option>
                        </select>
                        <LoadingButton
                            onClick={onThematicHandle}
                            loading={isLoadingThematicHeatMap}
                            variant="contained"
                            sx={lodButton}
                        >
                            T
                        </LoadingButton>
                    </Box>
                </fieldset>

                <fieldset style={fieldsetStyle}>
                    <legend>Sector</legend>
                    <Box style={columnStyle}>
                        <select value={selectedOptionStock4} onChange={(e) => { setSelectedOptionStock4(e.target.value); handleSectorStocksChange(e.target.value); }} style={selectStyle}>
                            <option>Select Sector Stock</option>
                            <option value="NFTMAT" key="NFTMAT">NFTMAT</option>
                            <option value="NFTCD" key="NFTCD">NFTCD</option>
                            <option value="NFTCS" key="NFTCS">NFTCS</option>
                            <option value="NFTENA" key="NFTENA">NFTENA</option>
                            <option value="NFTFINS" key="NFTFINS">NFTFINS</option>
                            <option value="NFTHC" key="NFTHC">NFTHC</option>
                            <option value="NFTINDU" key="NFTINDU">NFTINDU</option>
                            <option value="NFTINFT" key="NFTINFT">NFTINFT</option>
                            <option value="NFTRE" key="NFTRE">NFTRE</option>
                            <option value="NFTU" key="NFTU">NFTU</option>
                        </select>
                        <LoadingButton
                            onClick={onSectorHandle}
                            loading={isLoadingSectorHeatMap}
                            variant="contained"
                            sx={lodButton}
                        >
                            SE
                        </LoadingButton>
                    </Box>
                </fieldset>
            </div>
            <div>
                <fieldset style={fieldsetStyle}>
                    <legend>All</legend>
                    <Box style={columnStyle}>
                        <LoadingButton
                            onClick={onAllHandle}
                            loading={isLoadingAllHeatMap}
                            variant="contained"
                            sx={lodButton}
                        >
                            All
                        </LoadingButton>
                    </Box>
                </fieldset>
            </div>
            <div style={loadingSpace}>
                {isLoadingHeatMap && <CircularProgress />}
            </div>
            <div style={dsiplayMesgStyle}>
                {daysLeft <= 5 && expiryMsg && (
                    <Typography color="error">{expiryMsg}</Typography>
                )}
            </div>
            <div>
                {isSingleSheet && data.length > 0 && <YearlyHeatMap data={data} title={displayedOption} />}
                {isBroadSheet && <BroadHeatMap />}
                {isStrategySheet && <StrategyHeatMap />}
                {isThematicSheet && <ThematicHeatMap />}
                {isSectorSheet && <SectorHeatMap />}
                {isAllSheet && <AllHeatMap />}
            </div>
            <TopDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} daysLeft={daysLeft} />
        </div>
    )
}

export default VipHeatMapPage;