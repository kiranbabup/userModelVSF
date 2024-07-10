import { Box } from "@mui/material"
import razorPayImg from "../assets/images/razorpayImage.jpg"
const RazorPayPage = ()=>{
    return(
        <Box sx={{}}>
            <Box
        component="img"
        sx={{
          height: "100vh",
          width: "100vw",
        }}
        alt="VSFINTECH"
        src={razorPayImg}
      />
        </Box>
    )
}
export default RazorPayPage;