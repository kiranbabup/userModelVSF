import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { cleanOptionName } from '../../assets/data/functions';

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);

const StockGraph2 = ({options, stockData }) => {
    const [series, setSeries] = useState([]);
    useEffect(()=>{

    const generateDataPoints = (options) => {
        const seriesData = options.map(option => {
            const dps = [];
            if (stockData.length > 0) {
                for (let i = 0; i < stockData.length; i++) {
                    const dataPoint = [
                        new Date(stockData[i].DATE).getTime(),
                        stockData[i][option]
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
    const graphpoints = generateDataPoints(options);
    setSeries(graphpoints);
},[options, stockData])

    // console.log(stockData);
    // console.log(series);

    useEffect(() => {
        // Create the chart once series data is updated
        if (series.length > 0) {
            Highcharts.stockChart('container', {
                rangeSelector: {
                    selected: 4
                },
                yAxis: {
                    labels: {
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
        <div id="container" style={{ height: '500px', minWidth: '310px' }}>
            {/* Container for Highcharts */}
        </div>
    );
};

export default StockGraph2;