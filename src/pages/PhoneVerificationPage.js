import { Typography, Box, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import { useEffect, useState } from "react";
import CustomButton from "../Components/CustomButton";
import { useSelector } from "react-redux";
import { authSuccess } from "../actions/auth";
import { connect } from "react-redux";

const PhoneVerificationPage = ({ authSuccess }) => {
  const navigate = useNavigate();
  const loginWord = useSelector((state) => state.data.loginWord);
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://heatmapapi.onrender.com/alluserdata`);
        if (!response.ok) {
          throw new Error(`http error status:${response.status}`);
        }
        const result = await response.json();
        setUsersData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, [])
  // console.log("usersData", usersData);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !isActive) {
      setIsActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isActive]);

  const resendOtptoPhone = async () => {
    setLoading(true);
    try {
      const resendResponse = await fetch('https://heatmapapi.onrender.com/mobilevalidateuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_no: loginWord }),
      });

      if (!resendResponse.ok) {
        throw new Error('Failed to resend OTP');
      }      
      setLoading(false);
    } catch (err) {
      console.error('Error resending OTP:', err);
      setLoading(false);
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (isActive) {
      resendOtptoPhone();
      setIsActive(false);
      setTimer(120);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    // console.log(loginWord);
    try {
      const response = await fetch('https://heatmapapi.onrender.com/validateotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_no: loginWord, otp: otp }),
      });

      if (response.ok) {
        const data = usersData.find(u => u.phone_no === loginWord);
        // console.log("data:", data);
        
        if (data.email_verified === 1 && data.is_subscribed === 1) {
          authSuccess(data);
          // console.log("nav full");
          navigate("/120/viphome", { replace: true });
        } else if (data.email_verified === 1 && data.is_subscribed === 0) {
          authSuccess(data);
          // console.log("nav unsub");
          navigate("/120/home", { replace: true });
        }

        // navigate("/120/home", { replace: true });
      } else {
        alert('Invalid OTP. Please try again.');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error validating OTP:', err);
    }
  };

  return (
    <Box px={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh", backgroundColor: "#2C2D3C" }}>
      <Card sx={{ px: 2, pt: 3, pb: 6, maxWidth: "350px" }}>
        <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
          Phone OTP Verification
        </Typography>

        <Box p={2} />

        <PinInput
          length={6}
          type="numeric"
          inputMode="number"
          onComplete={(value) => setOtp(value)}
          style={{ width: "95%", display: "flex", justifyContent: "space-between" }}
          inputStyle={{ backgroundColor: "#2C2D3C", borderColor: "#2C2D3C", borderRadius: "6px", color: "white", fontSize: 18 }}
        />

        <Box p={1} />

        <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center" gutterBottom>
          Didn't Receive code?
        </Typography>

        <Box sx={{ textAlign: "center" }}>
          {isActive ? (
            <Link onClick={handleResend} style={{ color: "#CED765" }}>
              Resend Code
            </Link>
          ) : (
            <Typography style={{ color: "#CED765" }}>Resend Code in {timer}s</Typography>
          )}
        </Box>

        <Box p={1} />

        <CustomButton loading={isLoading} title="Confirm" onClick={handleSubmit} sx={{ width: "100%" }} />

        <Box p={1} />
      </Card>
    </Box>
  );
};
export default connect(null, { authSuccess })(PhoneVerificationPage);