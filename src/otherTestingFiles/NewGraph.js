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

                    import React, { useEffect, useState } from 'react';
                    import Highcharts from 'highcharts/highstock';
                    import HighchartsExporting from 'highcharts/modules/exporting';
                    import HighchartsExportData from 'highcharts/modules/export-data';
                    import HighchartsAccessibility from 'highcharts/modules/accessibility';
                    
                    // Initialize Highcharts modules
                    HighchartsExporting(Highcharts);
                    HighchartsExportData(Highcharts);
                    HighchartsAccessibility(Highcharts);
                    
                    const StockGraph2 = () => {
                        const [isLoading, setIsLoading] = useState(false);
                        const [stockData, setStockData] = useState([]);
                        const mainOption = ["tri__Nifty_Midcap_50","tri__Nifty_50","tri__NIFTY_SMLCAP_50","tri__NIFTY_LARGEMIDCAP_250"];
                        // const [series, setSeries] = useState([]);
                        const [series2, setSeries2] = useState([]);
                    
                        useEffect(() => {
                            const fetchData = async () => {
                                const names = ['MSFT'];
                                const promises = names.map(name =>
                                    fetch(`https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`)
                                        .then(response => response.json())
                                        .then(data => ({ name, data }))
                                );
                    
                                try {
                                    const seriesData = await Promise.all(promises);
                                    setSeries2(seriesData);
                                } catch (error) {
                                    console.error('Error fetching data:', error);
                                }
                            };
                    
                            fetchData();
                    
                            const fetchStockData = async () => {
                                setIsLoading(true);
                                try {
                                    const response = await fetch("https://heatmap-node-1.onrender.com/getstockdata");
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
                            fetchStockData();
                            
                            // console.log(mainOptionDataPoints);
                    
                            // setSeries([{
                            //     name: mainName,
                            //     data: mainOptionDataPoints
                            // }])
                    
                        }, []); // Empty dependency array ensures useEffect runs only on mount
                        // console.log(stockData);
                    
                        // useEffect(() => {
                            
                        // }, [stockData])
                        const cleanOptionName = (option) => {
                            if (typeof option !== 'string') {
                                option = String(option);
                            }
                            return option.replace(/tri__/g, '').replace(/_/g, '');
                        };
                        // const mainName = cleanOptionName(mainOption);
                    
                        const generateDataPoints = (options) => {
                            const seriesData = options.map(option => {
                                const dps = [];
                                if (stockData.length > 0) {
                                    const values = stockData.map(entry => entry[option]);
                                    const minValue = Math.min(...values);
                                    const maxValue = Math.max(...values);
                                    for (let i = 0; i < stockData.length; i++) {
                                        let normalizedValue = 1 + ((stockData[i][option] - minValue) / (maxValue - minValue)) * 99;
                                        normalizedValue = parseFloat(normalizedValue.toFixed(2));
                                        const dataPoint = [
                                            new Date(stockData[i].date).getTime(),
                                            normalizedValue
                                        ];
                                        dps.push(dataPoint);
                                    }
                                }
                                return {
                                    name: cleanOptionName(option),
                                    data: dps
                                };
                            });
                            return seriesData;
                        };
                    
                        const series = generateDataPoints(mainOption);
                    
                    
                        console.log(series2);
                        console.log(series);
                    
                    
                        useEffect(() => {
                            // Create the chart once series data is updated
                            if (series.length > 0) {
                                Highcharts.stockChart('container', {
                                    rangeSelector: {
                                        selected: 4
                                    },
                                    yAxis: {
                                        labels: {
                                            // format: '{value}'
                                            format: '{#if (gt value 0)}+{/if}{value}%'
                                        },
                                        plotLines: [{
                                            value: 0,
                                            width: 2,
                                            color: 'silver'
                                        }]
                                    },
                                    plotOptions: {
                                        series: {
                                            compare: 'percent',
                                            showInNavigator: true
                                        }
                                    },
                                    tooltip: {
                                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                                        valueDecimals: 2,
                                        split: true
                                    },
                                    series
                                });
                            }
                        }, [series]); // Watch for changes in 'series' to update chart
                    
                        return (
                            <div id="container" style={{ height: '400px', minWidth: '310px' }}>
                                {/* Container for Highcharts */}
                            </div>
                        );
                    };
                    
                    // export default StockGraph2;