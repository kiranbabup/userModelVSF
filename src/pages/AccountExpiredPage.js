// AccountExpiredPage
import { Button, Typography, Container, Box } from "@mui/material"
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authLogout } from "../actions/auth";
import { useEffect, useState } from "react";
import LsService from "../services/localstorage";
import { calculateDaysLeft } from "../assets/data/functions";

const AccountExpiredPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [isOver, setIsOver] = useState(true);

  useEffect(() => {
    const userdata = LsService.getCurrentUser();
    setUser(userdata);
    if (userdata && userdata.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.vsfintech.in/alluserdata`);
          if (!response.ok) {
            throw new Error(`http error status:${response.status}`);
          }
          const result = await response.json();
          const details = result.data.find(user => user.id === userdata.id);
          if (details) {
            const endingDate = details.subscribe_expired_on;
            // console.log(endingDate);
            const daysLeft = calculateDaysLeft(endingDate);
            if (daysLeft <= 0) {
              // console.log(daysLeft);
              setIsOver(true);
            } else {
              // console.log(daysLeft);
              setIsOver(false)
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      console.error("User data is not available.");
    }
  }, []);
  // console.log(user.id);

  const handleLogout = async () => {
    const is_subscribed = "false";
    try {
      const response = await fetch(`https://api.vsfintech.in/updateuser/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_subscribed }),
      });
      // console.log(response);
      // console.log(response.ok);

      if (response.ok) {
        dispatch(authLogout());
        localStorage.clear();
        navigate('/120/login');
      }

    } catch (error) {
      console.error('Error editing Profile:', error.message);
      alert('Something went wrong. Please try again later');
      window.location.reload();
    }

  };

  return (
    <Box>
      <Container>
        <Box sx={{ textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {
            isOver ? <>
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
            </> : <>
              <Typography variant="h3" paragraph>
                Subscription is Still active!
              </Typography>

              <Box p={2} />

              <div>
                <Button size="large" variant="contained" onClick={() => navigate("/120/viphome")}>
                  Go to Home
                </Button>
              </div>
            </>
          }
        </Box>
      </Container>
    </Box>
  )
}
export default AccountExpiredPage;