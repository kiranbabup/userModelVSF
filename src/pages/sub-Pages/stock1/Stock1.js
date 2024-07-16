import { Box,  } from "@mui/material"
import HeaderComponent from "../../../Components/mainComponents/HeaderComponent";
import SearchYourStocks from "./SearchYourStocks";
import CreateYourOwnBasket from "./CreateYourOwnBasket";
import IdentifyRightTime from "./IdentifyRightTime";

const Stock1 = () => {

    return (
        <Box>
            <HeaderComponent />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box p={1} />
                {/* Under Maintenance  */}
                {/* <SearchYourStocks /> */}
                <CreateYourOwnBasket />
                <Box p={2} />
                <IdentifyRightTime/>
                </Box>
        </Box>
    )
}
export default Stock1;