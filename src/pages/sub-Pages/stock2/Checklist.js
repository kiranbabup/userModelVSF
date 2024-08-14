import { Box, Typography } from '@mui/material';
import { centerBText, containerBox, headerTypo } from './stock2styles';

const Checklist = ({ display, headingText, embedHTML }) => {
    return (
        <Box style={containerBox}>
            <Typography style={headerTypo}>CHECKLIST</Typography>
            {/* <Box style={containerBox}> */}
            {
                !display &&
                <Box >
                    <Typography style={centerBText}>{headingText}</Typography>
                    <Box id="embedContainer" dangerouslySetInnerHTML={{ __html: embedHTML }} />
                </Box>
            }
            {/* </Box> */}
        </Box>
    );
};

export default Checklist;
