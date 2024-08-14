// AccountExpiredPage
import { Button, Typography, Container, Box } from "@mui/material"
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authLogout } from "../actions/auth";

const AccountExpiredPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    // try {
    //   const response = await fetch(`https://api.vsfintech.in/updateuser/${user.id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ first_name, last_name, email, phone_no, is_subscribed }),
    //   });
    //   // console.log(response);
    //   const errorData = await response.json();
    //   // console.log(errorData);

    //   if (response.ok) {
    //     try {
    //       const response = await instance.get(`/getuserbyid/${user.id}`,);
    //       LsService.updateCurrentUser(response.data.data);
    //     } catch (err) {
    //       console.error('Error getting data:', err);
    //     }
    //     setIsEditFN(false);
    //     setIsEditLN(false);
    //     setIsEditE(false);
    //     setIsEditP(false);
    //     setDisableIConBtn(false);
    //     window.location.reload();
    //   } else {
    //     alert(errorData.error);
    //     setDisableIConBtn(false);
    //     dispatch(authLogout());
    //     localStorage.clear();
    //     navigate('/120/login');
    //   }

    // } catch (error) {
    //   console.error('Error editing Profile:', error.message);
    //   alert('Something went wrong. Please try again later');
    //   window.location.reload();
    // }

  };

  return (
    <Box>
      <Container>
        <Box sx={{ textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, Subscription has expired!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>Sorry, we can’t let you In unless you activate the Subscription.</Typography>

          <Box p={2} />

          <div>
            <Button size="large" variant="contained" onClick={() => handleLogout()}>
              Go to Login
            </Button>
          </div>
        </Box>
      </Container>
    </Box>
  )
}
export default AccountExpiredPage;