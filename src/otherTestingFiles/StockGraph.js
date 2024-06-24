import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);

const StockGraph = () => {
    const [series, setSeries] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const names = ['MSFT', 'AAPL', 'GOOG'];
            const promises = names.map(name =>
                fetch(`https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`)
                    .then(response => response.json())
                    .then(data => ({ name, data }))
            );

            try {
                const seriesData = await Promise.all(promises);
                setSeries(seriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only on mount
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

export default StockGraph;