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

export const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
    borderRadius: 20,
  },
}));

const LoginPage = ({ authSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await AuthServices.getGoogleUserInfo(tokenResponse.access_token);
        handleGoogleSubmit(result.data);
      } catch (err) {
        // showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleGoogleSubmit = async (data) => {
    setLoading(true);
    // console.log(data);
    try {
      var values = { first_name: data.given_name, last_name: data.family_name, email: data.email, email_verified: data.email_verified };

      const response = await AuthServices.googleLoginPerson(values);

      const responseData = response.data?.data ?? {};
      if (responseData.email_verified === 1 && responseData.is_subscribed === 1) {
        authSuccess(responseData);
        // console.log("nav full");
        navigate("/vipheatmap", { replace: true });
      } else if (responseData.email_verified === 1 && responseData.is_subscribed === 0) {
        authSuccess(responseData);
        // console.log("nav unsub");
        navigate("/heatmap", { replace: true });
      }
      setLoading(false);
    } catch (err) {
      //   showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      console.log(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
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
        <TextField id="outlined-basic" label="email@email.com" variant="outlined" fullWidth disabled />
        <Box p={1} />
        <CustomButton title="Login"
          // disabled
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
          hoverColor="white"
          hoverTxtColor="black !important"
          startIcon={
            <Box component="img"
              alt="VSFINTECH"
              src={gicon}
              sx={{ width: 32 }}
            />}
        />
      </Card>
    </Box>
  );
};
export default connect(null, { authSuccess })(LoginPage);