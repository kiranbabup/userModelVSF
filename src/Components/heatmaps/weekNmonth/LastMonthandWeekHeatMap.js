// LastMonthandWeekHeatMap
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Heatmap from 'react-heatmap-grid';
const LastMonthandWeekHeatMap = ({ data, months }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const cellFontSize = isMobile ? '13px' : (isTablet ? '13px' : (isLaptop ? '14px' : '15px'));
    const cellminwidth = isMobile && '25px';
    const ywidth = isMobile ? 150 : 240;
    const cellMaxWidth = isMobile ? "100px" : "100%";

    return (
        <Box sx={{ width: { xs: "90%", md: '24%' }, fontSize: { xs: "10px", md: "16px" }, px: 2 }}>
            <Heatmap
                data={data.map((entry) => Object.values(entry).slice(1))}
                xLabels={months.slice(0,1)}
                yLabels={data.map((e) => e.stocks)}
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
                cellRender={(value) => value}
            />
        </Box>
    )
}
export default LastMonthandWeekHeatMap;