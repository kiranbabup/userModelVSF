import React from "react";
import UnSubHeatmap from "../Components/mainComponents/UnSubMap";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import UnSubGraph from "../Components/mainComponents/UnSubGraph";

const UnsubLandingPage = ()=>{
    return(
        <div>
            <HeaderComponent/>
            <UnSubHeatmap/>
            <UnSubGraph/>
        </div>
    )
}
export default UnsubLandingPage;