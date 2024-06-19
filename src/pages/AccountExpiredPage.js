// AccountExpiredPage
import { Button, Typography, Container, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";

const AccountExpiredPage = ()=>{
    return(
        <Box>
            <Container>
        <Box sx={{ textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, Subscription has expired!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>Sorry, we can’t let you In unless you activate the Subscription.</Typography>

          <Box p={2} />

          <div>
            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Login
            </Button>
          </div>
        </Box>
      </Container>
        </Box>
    )
}
export default AccountExpiredPage;