import { Box,  } from "@mui/material"
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";

const Stock1 = () => {

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box p={1} />
                Under Maintenance 
                <Box p={2} />
                </Box>
        </Box>
    )
}
export default Stock1;