// MonthlyCompareStocksHeatMap
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Heatmap from 'react-heatmap-grid';
import { mapMonthName } from '../assets/data/functions';
import { mediaQueries } from '../assets/data/styles';
const MonthlyCompareStocksHeatMap = ({ data, months }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const cellFontSize = isMobile ? '9px' : (isTablet ? '12px' : (isLaptop ? '13px' : '15px'));
    const cellminwidth = isMobile && '19px';
    const cellHeight = isMobile ? '35px' : (isTablet ? '45px' : '55px');
    const ywidth = isMobile ? 40 : 140;
    return (
        <Box sx={{
            width: '100%',
            [mediaQueries.mobile]: {
                fontSize: "8px"
            },
            [mediaQueries.tablet]: {
                fontSize: "10px"
            },
            fontSize: "14px",
            padding: 0,
            margin: 0,
        }}>
            <Heatmap
                data={data.map((entry) => months.map(monthYear => entry[mapMonthName(monthYear)]))}
                xLabels={months}
                yLabels={data.map((e) => e.Stocks)}
                yLabelWidth={ywidth}
                yLabelTextAlign="left"
                cellStyle={(background, value, min, max, data, x, y) => ({
                    background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                    fontSize: cellFontSize,
                    minWidth: cellminwidth,
                    border: '1px solid #ffffff',
                    height: cellHeight,
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                })}
                cellRender={(value) => value && `${value.toFixed(2)}`}
            />
        </Box>
    )
}
export default MonthlyCompareStocksHeatMap;