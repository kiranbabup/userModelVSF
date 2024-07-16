import { Navigate, Routes, Route } from "react-router-dom";
import SubLandingPage from "./pages/SubLandingPage";
import UnsubLandingPage from "./pages/UnsubLandingPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./actions/ProtectedRoute";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import AccountExpiredPage from "./pages/AccountExpiredPage";
import HomePage from "./pages/HomePage";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import PaymentFailed from "./pages/PaymentFailed";
import Stock2 from "./pages/sub-Pages/stock2/Stock2";
import Stock1 from "./pages/sub-Pages/stock1/Stock1";
import MutualFunds from "./pages/sub-Pages/mutual/MutualFunds";

const CustomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/120/login" />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/120/login" element={<LoginPage />} />

      <Route path="/" element={<ProtectedRoute type="unsub" />} >
          <Route path="120/home" element={<HomePage />} />
          <Route path="120/heatmap" element={<UnsubLandingPage />} />
          <Route path="120/subscription" element={<SubscriptionPage />} />
          <Route path="120/profile" element={<ProfilePage/>}/>
          <Route path="120/blog" element={<BlogPage/>}/>
          <Route path="120/paymentsuccessful" element={<PaymentSuccessful/>}/>
          <Route path="120/paymentfailed" element={<PaymentFailed/>}/>

      </Route>

      <Route path="/" element={<ProtectedRoute type="sub" />} >
        <Route path="120/viphome" element={<HomePage />} />
        <Route path="120/vipheatmap" element={<SubLandingPage />} />
        <Route path="120/vipprofile" element={<ProfilePage/>}/>
        <Route path="120/vipblog" element={<BlogPage/>}/>
        <Route path="120/stock1" element={<Stock1/>}/>
        <Route path="120/stock2" element={<Stock2/>}/>
        <Route path="120/mutual_funds" element={<MutualFunds/>}/>
        <Route path="120/subscriptionexpired" element={<AccountExpiredPage />} />
      </Route>
    </Routes>
  );
};

export default CustomeRoutes;
