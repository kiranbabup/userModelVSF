import { Typography, Box, Card, TextField, } from "@mui/material";
import { COMMON_ERROR_MSG, LOGIN_DISPLAY_MSG } from "../constants";
import CustomButton from "../Components/CustomButton";
import { useNavigate, Link } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { connect } from "react-redux";
import { authSuccess } from "../actions/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import gicon from "../assets/images/GoogleGLogo.png";
import vsfintechLogo from "../assets/images/vsfintechLogo.png";
import emailjs from "@emailjs/browser";
import PinInput from "react-pin-input";

export const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
    borderRadius: 20,
  },
}));

const LoginPage = ({ authSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [googleLoginMsg, setgoogleLoginMsg] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [loginWordString, setLoginWordString] = useState("");
  const [mailORphone, setmailORphone] = useState("");
  const [otp, setOtp] = useState("");
  const [saveOtp, setSaveOtp] = useState("");
  const [value, setValue] = useState({});
  const [timer, setTimer] = useState(120);
  const [isLoading, setLoading] = useState(false);
  const [isOtpsent, setIsOtpsent] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isActive && isOtpsent) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // 1000
    } else if (timer === 0 && !isActive) {
      setIsActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isActive, isOtpsent]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setgoogleLoginMsg("Authenticating with Google...")
        const result = await AuthServices.getGoogleUserInfo(tokenResponse.access_token);
        handleGoogleSubmit(result.data);
        // console.log(result.data);
      } catch (err) {
        // showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        // console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        setgoogleLoginMsg("Authentication Failed.");
      }
    },
    onError: () => {
      // console.log("Login Failed");
      setgoogleLoginMsg("Authentication Failed.");
    },
  });

  const handleGoogleSubmit = async (data) => {
    setLoading(true);
    // console.log(data);
    setgoogleLoginMsg("Logging in... Please wait...");
    try {
      var values = { first_name: data.given_name, last_name: data.family_name, email: data.email, email_verified: data.email_verified, is_subscribed: data.is_subscribed };

      const response = await AuthServices.googleLoginPerson(values);
      // console.log(response);
      const responseData = response.data?.data ?? {};
      // console.log(responseData);
      if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 1 || responseData.is_subscribed === true)) {
        authSuccess(responseData);
        // console.log("nav full");
        navigate("/120/viphome", { replace: true });
      } else if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 0 || responseData.is_subscribed === false)) {
        authSuccess(responseData);
        // console.log("nav unsub");
        navigate("/120/home", { replace: true });
      }
      setLoading(false);
    } catch (err) {
      //   showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      // console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setgoogleLoginMsg("Authentication Failed.");
      setLoading(false);
    }
  };

  function getOTP(length) {
    const charset = "0123456789";
    let otpPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otpPassword += charset[randomIndex];
    }

    return otpPassword;
  }

  const handleSendOtp = async () => {
    if (loginWordString === "") {
      setLoginErrorMsg("Please fill email-ID or Phone Number");
    } else {
      const isEmail = /\S+@\S+\.\S+/.test(loginWordString);
      const isPhoneNumber = /^\d{10}$/.test(loginWordString);

      if (!isEmail && !isPhoneNumber) {
        if (/^\d{1,9}$/.test(loginWordString)) {
          setLoginErrorMsg("Please enter valid 10 digits phone number or use an email instead");
        } else {
          setLoginErrorMsg("Please enter valid email id or use a phone number instead");
        }
        return;
      } else if (isPhoneNumber) {
        setLoginErrorMsg("");
        setmailORphone("phone");
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const uniqueEmail = `email${day}${month}${year}${hours}${minutes}${seconds}@gmail.com`;
        setValue({
          first_name: "first_name",
          last_name: "last_name",
          email: uniqueEmail,
          phone_no: loginWordString,
        });
        resendOtptoPhone();
      } else if (isEmail) {
        setLoginErrorMsg("");
        setmailORphone("email");
        const [firstName] = loginWordString.split("@");
        setValue({
          first_name: firstName,
          last_name: "last_name",
          email: loginWordString,
          phone_no: null,
        });
        resendOtptoEmail();
      }
    };
  }

  const resendOtptoPhone = async () => {
    setLoading(true);
    setLoginMsg("Validating Phone number...");
    
    setLoginMsg("Sending OTP to Phone number...");

    try {
      // console.log(value);

      const resendResponse = await fetch('https://heatmapapi.onrender.com/mobilevalidateuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_no: loginWordString }),
      });

      // console.log(resendResponse);
      const messageData = await resendResponse.json();
      // console.log(messageData);

      if (!resendResponse.ok) {
        throw new Error('Failed to send OTP');
      } else {
        setIsOtpsent(true);
        setLoginMsg("");
        setSaveOtp(messageData.otp);
      }
      setLoading(false);

    } catch (err) {
      console.error('Error sending OTP:', err);
      setLoginErrorMsg('Error sending OTP');
      setLoginMsg("");
      setLoading(false);
    }
  };

  const resendOtptoEmail = async () => {
    setLoading(true);
    setLoginMsg("Validating Email-Id...");
    setLoginMsg("Sending OTP to email id...");

    try {
      let otp = getOTP(6);
      setSaveOtp(otp);
      // console.log(value);
      const params = {
        to_email: loginWordString,
        reply_to: "noreply@vsfintech.com",
        pageText: "Your OTP for VS FINTECH Login.",
        html: "Test",
        to_name: "User",
        from_name: "VS Fintech Private Limited",
        message: otp
      };
      // console.log(params);
      const resendResponse = await emailjs.send(
        "service_3w6exqr",
        "template_rc2n9go",
        // "service_wq61tqr",
        // "template_4trtaca",
        params,
        "s39s25uz1KRlVhw4j"
        // "W820ReHOtXXQIx0dp"
      );


      if (resendResponse.text === "OK") {
        setIsOtpsent(true);
        setLoginMsg("");
      } else {
        throw new Error('Failed to send OTP');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setLoading(false);
      setLoginErrorMsg('Error sending OTP');
      setLoginMsg("");
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    setLoginErrorMsg("");
    setOtp("");
    if (isActive) {
      if (mailORphone === "phone") {
        resendOtptoPhone();
      } else {
        resendOtptoEmail();
      }
      setIsActive(false);
      setTimer(120);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setLoginErrorMsg("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoginErrorMsg("");
    setLoading(true);
    setLoginMsg("Validating OTP...");

    if (mailORphone === "phone") {
      if (saveOtp === otp) {
        // console.log("phone otp Matched");
        try {
          // console.log(value);
          setLoginMsg("Logging in... Please wait...");
          const createUserResponse = await fetch('https://heatmapapi.onrender.com/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
          });
          // console.log(createUserResponse);

          const errorData = await createUserResponse.json();
          // console.log(errorData);
          if (!createUserResponse.ok) {
            if (errorData.message === "User already exists") {

              const responseData = errorData.data;
              if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 1 || responseData.is_subscribed === true)) {
                authSuccess(responseData);
                navigate("/120/viphome", { replace: true });
              } else if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 0 || responseData.is_subscribed === false)) {
                authSuccess(responseData);
                navigate("/120/home", { replace: true });
              }
              throw new Error('User already exists');
            }
          } else {
            // console.log('User created successfully');
            const responseData = errorData.data;
            // console.log(responseData);

            if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 1 || responseData.is_subscribed === true)) {
              authSuccess(responseData);
              navigate("/120/viphome", { replace: true });
            } else if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 0 || responseData.is_subscribed === false)) {
              authSuccess(responseData);
              navigate("/120/home", { replace: true });
            }
          }
        } catch (error) {
          if (error.message !== 'User already exists') {
            // console.log(error.message);
            setLoginErrorMsg(COMMON_ERROR_MSG);
            setLoginMsg("");
            throw error;
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
        setLoginErrorMsg('Invalid OTP. Please try again.');
        setLoginMsg("");
      }
    } else {
      // console.log("email");
      if (saveOtp === otp) {
        // console.log("otp Matched");

        try {
          setLoginMsg("Logging in... Please wait...");
          // console.log(value);
          const createUserResponse = await fetch('https://heatmapapi.onrender.com/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
          });
          // console.log(createUserResponse);
          // console.log(createUserResponse.ok);

          const errorData = await createUserResponse.json();
          // console.log(errorData);

          if (!createUserResponse.ok) {
            if (errorData.message === "User already exists") {
              // console.log(errorData);

              const responseData = errorData.data;
              if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 1 || responseData.is_subscribed === true)) {
                authSuccess(responseData);
                navigate("/120/viphome", { replace: true });
              } else if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 0 || responseData.is_subscribed === false)) {
                authSuccess(responseData);
                navigate("/120/home", { replace: true });
              }
              throw new Error('User already exists');
            }
          } else {
            // console.log('User created successfully');
            const responseData = errorData.data;
            // console.log(responseData);

            if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 1 || responseData.is_subscribed === true)) {
              authSuccess(responseData);
              navigate("/120/viphome", { replace: true });
            } else if ((responseData.email_verified === 1 || responseData.email_verified === true) && (responseData.is_subscribed === 0 || responseData.is_subscribed === false)) {
              authSuccess(responseData);
              navigate("/120/home", { replace: true });
            }
          }
        } catch (error) {
          if (error.message !== 'User already exists') {
            // console.log(error.message);
            setLoginErrorMsg(COMMON_ERROR_MSG);
            setLoginMsg("");
            throw error;
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
        setLoginErrorMsg('Invalid OTP. Please try again.');
        setLoginMsg("");
      }
    }
  };

  return (
    <Box sx={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
    }}>
      <Card className={classes.card} sx={{ px: { xs: 2, sm: 5, md: 10 }, py: { xs: 2, sm: 5, md: 8 } }}>
        <Box
          component="img"
          sx={{
            height: {
              lg: 150, //above 1200px
              md: 100, //above 900px
              sm: 70, //above 600px
              xs: 50, //above 0px
            },
            width: "100%",
          }}
          alt="VSFINTECH"
          src={vsfintechLogo}
        />
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: 14, sm: 30, }, color: "black", textAlign: "center" }}>
          {LOGIN_DISPLAY_MSG}
        </Typography>
        <Box p={1} />

        {
          !isOtpsent ?
            (
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Enter Email-id or Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setLoginWordString(e.target.value)}
                  value={loginWordString}
                />
                {
                  loginErrorMsg !== "" &&
                  <Typography sx={{ color: "red", fontSize: "12px" }}>{loginErrorMsg}</Typography>
                }
                {
                  loginMsg !== "" &&
                  <Typography sx={{ color: "blue", fontSize: "12px" }}>{loginMsg}</Typography>
                }
                <Box p={1} />
                <CustomButton
                  title="send otp"
                  loading={isLoading}
                  onPressed={handleSendOtp}
                  fullWidth
                />
                <Box p={1} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ width: "40%" }}><hr /></Box>
                  <Typography sx={{ color: "gray" }}>or</Typography>
                  <Box sx={{ width: "40%" }}><hr /></Box>
                </Box>

                <Box p={1} />

                <CustomButton
                  title="Login with Google"
                  loading={isLoading}
                  onPressed={handleGoogleLogin}
                  fullWidth
                  sx={{ color: "black", backgroundColor: "white", fontSize: { md: 16, sm: 15, xs: 12 }, px: { xs: 0 }, py: { xs: 0, sm: 1 } }}
                  hoverColor="primary"
                  hoverTxtColor="white"
                  startIcon={
                    <Box component="img"
                      alt="VSFINTECH"
                      src={gicon}
                      sx={{ width: 32 }}
                    />}
                />
                {
                  googleLoginMsg !== "" &&
                  <Typography sx={{ color: "blue", fontSize: "12px" }}>{googleLoginMsg}</Typography>
                }
              </Box>
            ) : (
              <Box>
                <Typography sx={{ textAlign: "center", fontWeight: "bold" }}> {loginWordString} </Typography>
                <Box p={1} />
                <PinInput
                  length={6}
                  type="numeric"
                  inputMode="number"
                  onComplete={(value) => setOtp(value)}
                  style={{ width: "95%", display: "flex", justifyContent: "space-between" }}
                  inputStyle={{ backgroundColor: "#2C2D3C", borderColor: "#2C2D3C", borderRadius: "6px", color: "white", fontSize: 18 }}
                />

                <Box p={1} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {isActive ? (
                    <Link onClick={(e) => handleResend(e)} style={{ color: "#CED765" }}>
                      Resend Code
                    </Link>
                  ) : (
                    <Typography style={{ color: "#CED765" }}>Resend Code in {timer}s</Typography>
                  )}
                  <Link onClick={() => { setIsOtpsent(false); setLoginMsg(""); setLoginErrorMsg("") }} style={{ color: "#CED765" }}>
                    ReEnter Details
                  </Link>

                </Box>

                {
                  loginErrorMsg !== "" &&
                  <Typography sx={{ color: "red", fontSize: "12px" }}>{loginErrorMsg}</Typography>
                }
                {
                  loginMsg !== "" &&
                  <Typography sx={{ color: "blue", fontSize: "12px" }}>{loginMsg}</Typography>
                }
                <Box p={1} />

                <CustomButton
                  title="Login"
                  loading={isLoading}
                  onPressed={handleSubmit}
                  fullWidth
                />

              </Box>
            )
        }
      </Card>
    </Box>
  );
};
export default connect(null, { authSuccess })(LoginPage);