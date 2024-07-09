import { Navigate, Routes, Route } from "react-router-dom";
import SubLandingPage from "./pages/SubLandingPage";
import UnsubLandingPage from "./pages/UnsubLandingPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./actions/ProtectedRoute";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import RazorPayPage from "./pages/RazorPayPage";
import AccountExpiredPage from "./pages/AccountExpiredPage";
import HomePage from "./pages/HomePage";
import VerificationPage from "./pages/VerificationPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
// import LastMonthHeatMap from "./otherTestingFiles/LastMonthHeatMap";

const CustomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/120/login" />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/120/login" element={<LoginPage />} />
      <Route path="/120/verification" element={<VerificationPage />} />
      
      <Route path="/120/phoneotpverification" element={<PhoneVerificationPage />} />
      <Route path="/120/emailotpverification" element={<EmailVerificationPage />} />

      <Route path="/" element={<ProtectedRoute type="unsub" />} >
          <Route path="120/home" element={<HomePage />} />
          <Route path="120/heatmap" element={<UnsubLandingPage />} />
          <Route path="120/subscription" element={<SubscriptionPage />} />
          <Route path="120/profile" element={<ProfilePage/>}/>
          <Route path="120/blog" element={<BlogPage/>}/>
          <Route path="120/paybyphonepe" element={<RazorPayPage />} />
      </Route>

      <Route path="/" element={<ProtectedRoute type="sub" />} >
        <Route path="120/viphome" element={<HomePage />} />
        <Route path="120/vipheatmap" element={<SubLandingPage />} />
        <Route path="120/vipprofile" element={<ProfilePage/>}/>
        <Route path="120/vipblog" element={<BlogPage/>}/>
        <Route path="120/subscriptionexpired" element={<AccountExpiredPage />} />
      </Route>
    </Routes>
  );
};

export default CustomeRoutes;
