import React from "react";
import HeaderComponent from "../Components/mainComponents/HeaderComponent";
import SubHeatMapPage from "../Components/mainComponents/SubHeatMapPage";
import FullGraphVip from "../Components/mainComponents/FullGraphVip";

// import { useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { setResultData, setIsLoadingHeatmap } from '../actions/actions';

const SubLandingPage = ()=>{
    // const dispatch = useDispatch();

  // const fetchData = async () => {
  //     dispatch(setIsLoadingHeatmap(true));
  //     try {
  //         const response = await fetch(`https://heatmapapi.onrender.com/getheatmappcntdata`);
  //         if (!response.ok) {
  //             throw new Error(`http error status:${response.status}`);
  //         }
  //         const result = await response.json();
  //         // console.log(result.data);
  //         // setResultData(result.data);
  //         dispatch(setResultData(result.data));
  //     } catch (error) {
  //         console.error("Error fetching stock data:", error);
  //     } finally {
  //         dispatch(setIsLoadingHeatmap(false));
  //     }
  // };
  
  // useEffect(() => {
  //     fetchData();
  // }, [dispatch]);
  
    return(
        <div>
            <HeaderComponent/>
            <SubHeatMapPage/>
            <FullGraphVip/>
        </div>
    )
}
export default SubLandingPage;