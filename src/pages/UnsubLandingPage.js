import React from "react";
import UnSubHeatmap from "../Components/mainComponents/UnSubMap";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import UnSubscribedGraph from "../Components/mainComponents/UnSubscribedGraph";

const UnsubLandingPage = ()=>{
    return(
        <div>
            <HeaderComponent/>
            <UnSubHeatmap/>
            <UnSubscribedGraph/>
        </div>
    )
}
export default UnsubLandingPage;