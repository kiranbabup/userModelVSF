import { Container, Typography, Box, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import { useEffect, useState } from "react";
import CustomButton from "../Components/CustomButton";

const VerificationPage = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(120);
  const [isActive, setIsActive] = useState(false);

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

  const sendOtptoEmail = async () => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (isActive) {
      sendOtptoEmail();
      setIsActive(false);
      setTimer(120);
    }
  };

  const handleSubmit = async () => {
    if (otp.length != 6) {
      alert("OTPLENGTH_ERROR_MSG", "error");
      return;
    }

    setLoading(true);
    try {
      setLoading(false);
      setLoading(false);
        navigate("/120/heatmap", { replace: true });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
      <Box px={1} sx={{display:"flex", justifyContent:"center",alignItems:"center", height:"98vh", backgroundColor:"#2C2D3C"}} >

        <Container maxWidth="xs" disableGutters>
          <Card  sx={{ px: 5, pt: 3, pb: 6 }}>
            <Typography variant="subtitle2" fontSize={30} fontWeight={600}>
              OTP Verification
            </Typography>

            <Box p={2} />

            <Box sx={{ width: "100%" }}>
              <PinInput
                length={6}
                type="numeric"
                inputMode="number"
                onComplete={(value) => {
                  setOtp(value);
                }}
                style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                inputStyle={{ backgroundColor: "#2C2D3C", borderColor: "#2C2D3C", borderRadius: "6px", color: "white", fontSize: 18 }}
              />
            </Box>

            <Box p={1} />

            <Typography variant="body2" color="text.disabled" fontWeight="normal" textAlign="center" gutterBottom>
              Did n’t Receive code ?
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

          <Box p={7} />
        </Container>
      </Box>
  );
};

// export default connect(null, { authSuccess })(VerificationPage);
export default VerificationPage;
