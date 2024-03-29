import { Navigate, Routes, Route } from "react-router-dom";
import SubLandingPage from "./pages/SubLandingPage";
import UnsubLandingPage from "./pages/UnsubLandingPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./actions/ProtectedRoute";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
// import LastMonthHeatMap from "./otherTestingFiles/LastMonthHeatMap";

const CustomeRoutes = () => {
  return (
    <Routes>
      <Route path="/vsfintech/" element={<Navigate to="/vsfintech/login" />} />
      <Route path="/vsfintech/404" element={<Page404 />} />
      <Route path="/vsfintech/login" element={<LoginPage />} />

      {/* <Route path="/vsfintech/fullheatmap" element={<LastMonthHeatMap />} /> */}

      <Route path="/vsfintech/" element={<ProtectedRoute type="unsub" />} >
        {/* <Route path="/user" element={< />}> */}
          <Route path="heatmap" element={<UnsubLandingPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="profile" element={<ProfilePage/>}/>
          <Route path="blog" element={<BlogPage/>}/>
        {/* </Route> */}
      </Route>
      <Route path="/vsfintech/" element={<ProtectedRoute type="sub" />} >
        <Route path="vipheatmap" element={<SubLandingPage />} />
        <Route path="vipprofile" element={<ProfilePage/>}/>
        <Route path="vipblog" element={<BlogPage/>}/>
      </Route>

    </Routes>
  );
};

export default CustomeRoutes;
