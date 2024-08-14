import axios from "axios";

const instance = axios.create({
  // baseURL: "https://heatmapapi.onrender.com",
  baseURL: "https://api.vsfintech.in",
  
});

export default instance;
