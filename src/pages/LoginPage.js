import { Typography, Box, Card, TextField, } from "@mui/material";
import { COMMON_ERROR_MSG, LOGIN_DISPLAY_MSG } from "../constants";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { connect } from "react-redux";
import { authSuccess } from "../actions/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import gicon from "../assets/images/GoogleGLogo.png";
import vsfintechLogo from "../assets/images/vsfintechLogo.png";
import { useDispatch } from 'react-redux';
import { setLoginWord } from '../actions/actions';
// import { useSelector } from 'react-redux';

export const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
    borderRadius: 20,
  },
}));

const LoginPage = ({ authSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [loginWordString, setLoginWordString] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [googleLoginMsg, setgoogleLoginMsg] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setgoogleLoginMsg("Authenticating with Google...")
        const result = await AuthServices.getGoogleUserInfo(tokenResponse.access_token);
        handleGoogleSubmit(result.data);
        console.log(result.data);
      } catch (err) {
        // showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      }
    },
    onError: () => {
      console.log("Login Failed");
      setgoogleLoginMsg("Authentication Failed.");
    },
  });

  const handleGoogleSubmit = async (data) => {
    setLoading(true);
    // console.log(data);
    setgoogleLoginMsg("Authentication Successful.");
    try {
      var values = { first_name: data.given_name, last_name: data.family_name, email: data.email, email_verified: data.email_verified, is_subscribed: data.is_subscribed };

      const response = await AuthServices.googleLoginPerson(values);
      // console.log(response);
      setgoogleLoginMsg("Logging in...");
      const responseData = response.data?.data ?? {};
      console.log(responseData);
      if (responseData.email_verified === 1 && responseData.is_subscribed === 1) {
        authSuccess(responseData);
        console.log("nav full");
        navigate("/120/viphome", { replace: true });
      } else if (responseData.email_verified === 1 && responseData.is_subscribed === 0) {
        authSuccess(responseData);
        console.log("nav unsub");
        navigate("/120/home", { replace: true });
      }
      setLoading(false);
    } catch (err) {
      //   showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setgoogleLoginMsg("Authentication Failed.");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (loginWordString === "") {
      setLoginErrorMsg("Please fill Phone Number");
      // setLoginErrorMsg("Please fill email-ID or Phone Number");
    } else {
      const isEmail = /\S+@\S+\.\S+/.test(loginWordString);
      const isPhoneNumber = /^\d{10}$/.test(loginWordString);

      if (!isEmail && !isPhoneNumber) {
        if (/^\d{1,9}$/.test(loginWordString)) {
          setLoginErrorMsg("Please enter valid 10 digits phone number or use Gmail login instead");
          // setLoginErrorMsg("Please enter valid 10 digits phone number or use an email instead");
        } else {
          setLoginErrorMsg("Please enter valid Phone Number as email service unavailabe or use Gmail login");
          // setLoginErrorMsg("Please enter valid email id or use a phone number instead");
        }
        return;
      }

      setLoginErrorMsg(""); // Clear any previous error messages
      dispatch(setLoginWord(loginWordString));
      setLoading(true);
      try {
        let values;

        if (isEmail) {
      setLoginMsg("Validating E-Mail ID...");

          const [firstName] = loginWordString.split("@");
          values = {
            first_name: firstName,
            last_name: "last_name",
            email: loginWordString,
            phone_no: "0000000000",
          };
        } else {
          setLoginMsg("Validating Phone number...");
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const year = now.getFullYear();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');

          const uniqueEmail = `email${day}${month}${year}${hours}${minutes}${seconds}@gmail.com`;

          values = {
            first_name: "first_name",
            last_name: "last_name",
            email: uniqueEmail,
            phone_no: loginWordString,
          };
        }

        try {
          const createUserResponse = await fetch('https://heatmapapi.onrender.com/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (!createUserResponse.ok) {
            const errorData = await createUserResponse.json();
            if (errorData.message === "User already exists") {
              throw new Error('User already exists');
            } else {
              throw new Error('User creation failed');
            }
          }

          // alert('User created successfully');

        } catch (error) {
          if (error.message !== 'User already exists') {
            throw error;
          }
        }

        let validateUserResponse;
        if (isEmail) {
      setLoginMsg("Validating Phone number...");
          validateUserResponse = await fetch('https://heatmapapi.onrender.com/emailvalidateuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginWordString }),
          });

          if (validateUserResponse.ok) {
            navigate("/120/emailotpverification");
            // navigate("/120/verification");
          }
        } else {
          setLoginMsg("Sending OTP to Phone number...");
          validateUserResponse = await fetch('https://heatmapapi.onrender.com/mobilevalidateuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_no: loginWordString }),
          });

          if (validateUserResponse.ok) {
            navigate("/120/phoneotpverification");
          }
        }

        if (!validateUserResponse.ok) {
          setLoginMsg("OTP sending failed.");
          throw new Error('OTP sending failed');
        }

      } catch (error) {
        console.error('Error Sending OTP:', error.message);
        alert('Something went wrong. Please try again later.');
        setLoading(false);
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
        {/* email-id: email@email.com or */}
        <TextField id="outlined-basic" label="Enter Phone Number: 0000000000" variant="outlined" fullWidth onChange={(e) => setLoginWordString(e.target.value)} />
        {
          loginErrorMsg !== "" &&
          <Typography sx={{ color: "red", fontSize:"12px" }}>{loginErrorMsg}</Typography>
        }
        {
          loginMsg !== "" &&
          <Typography sx={{ color: "blue", fontSize:"12px" }}>{loginMsg}</Typography>
        }
        <Box p={1} />
        <CustomButton title="Login"
          // disabled
          loading={isLoading}
          onPressed={handleLogin}
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
          <Typography sx={{ color: "blue", fontSize:"12px" }}>{googleLoginMsg}</Typography>
        }
      </Card>
    </Box>
  );
};
export default connect(null, { authSuccess })(LoginPage);