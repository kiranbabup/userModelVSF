import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ auth, type }) => {
  // console.log(auth.email_verified);
  // console.log(auth);
  if(auth.email_verified === 1 && auth.is_subscribed === 0){
    return type === "unsub" ? <Outlet /> : <Navigate to="/userModelVSF/404" replace />;
  }else if(auth.email_verified === 1 && auth.is_subscribed === 1){
    return type === "sub" ? <Outlet /> : <Navigate to="/userModelVSF/404" replace />;
  }else{
    return <Navigate to="/userModelVSF/login" replace />;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
