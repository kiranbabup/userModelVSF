import { Box, Typography } from "@mui/material";
import sheetA from "../assets/data/homeSheet1.xlsx";
import sheetB from "../assets/data/homeSheet2.xlsx";
import ReadExcel from "../Components/ReadExcel";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import bgstrip from "../assets/images/bgstrip.jpg";

const HomePage = ()=>{

    return(
        <Box>
            <HeaderComponent />
            
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
                <Typography sx={{ width:"30%", 
                    // background:"linear-gradient(180deg, rgba(18,59,6,1) 0%, rgba(110,178,15,1) 100%, rgba(4,10,47,1) 100%)", 
                    backgroundImage: `url(${bgstrip})`,
                    color:"white", borderRadius:"1rem",
                    fontSize:"2rem", textAlign:"center", fontWeight:"bold"}}>Codes</Typography>
            <ReadExcel file={sheetA} name={"sheetA"} />
            
            <ReadExcel file={sheetB} name={"sheetB"} />
            </Box>
            <Box p={2}/>
        </Box>
    )
}
export default HomePage;