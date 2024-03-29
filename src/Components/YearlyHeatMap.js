import { useMediaQuery, useTheme } from '@mui/material';
import Heatmap from 'react-heatmap-grid';
const YearlyHeatMap = ({data, months}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const cellFontSize = isMobile ? '10px' : (isTablet ? '12px' : (isLaptop ? '13px' : '15px'));
    const cellminwidth = isMobile && '22px';
    const ywidth = isMobile ? 23 : 40;

    return (
        <Heatmap
            data={data.map((e) => e.average)}
            xLabels={months}
            yLabels={data.map((e) => e.label)}
            yLabelWidth={ywidth}
            yLabelTextAlign="center"
            cellStyle={(background, value, min, max, data, x, y) => ({
                background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                fontSize: cellFontSize,
                minWidth: cellminwidth,
                border: '1px solid #ffffff',
                height: 35,
                margin: "0px",
                padding: "0px",
            })}
            cellRender={(value) => value && `${value.toFixed(2)}`}
        />
    )
}
export default YearlyHeatMap;