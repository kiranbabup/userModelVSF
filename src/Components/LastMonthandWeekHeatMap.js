// LastMonthandWeekHeatMap
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Heatmap from 'react-heatmap-grid';
import { mapMonthName } from '../assets/data/functions';
const LastMonthandWeekHeatMap = ({ data, months }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const cellFontSize = isMobile ? '11px' : (isTablet ? '13px' : (isLaptop ? '14px' : '16px'));
    const cellminwidth = isMobile && '30px';
    const ywidth = isMobile ? 140 : 355;
    const cellMaxWidth = isMobile ? "100px" : "100%";

    const mon = months.slice(1, -9)
    return (
        <Box sx={{ width: {xs:"90%", md:'50%'}, fontSize:{xs:"10px", md:"16px"}, px:2 }}>
            <Heatmap
                data={data.map((entry) => mon.map(monthYear => entry[mapMonthName(monthYear)]))}
                        // data={data.map((entry) => Object.values(entry).slice(1))}
                xLabels={months.slice(1, -9)}
                // xLabels={months}
                yLabels={data.map((e) => e.Stocks)}
                yLabelWidth={ywidth}
                yLabelTextAlign="left"
                cellStyle={(background, value, min, max, data, x, y) => ({
                    background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                    fontSize: cellFontSize,
                    minWidth: cellminwidth,
                    maxWidth: cellMaxWidth,
                    border: '1px solid #ffffff',
                    height: 30,
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
export default LastMonthandWeekHeatMap;