import { Box } from "@mui/material";
import sheetA from "../assets/data/homeSheet1.xlsx";
import sheetB from "../assets/data/homeSheet2.xlsx";
import ReadExcel from "../Components/ReadExcel";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";

const HomePage = ()=>{

    return(
        <Box>
            <HeaderComponent />
            <ReadExcel file={sheetA} name={"sheetA"} />
            
            <ReadExcel file={sheetB} name={"sheetB"} />
            <Box p={2}/>
        </Box>
    )
}
export default HomePage;