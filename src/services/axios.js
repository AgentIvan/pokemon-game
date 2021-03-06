import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://reactmarathon-api.netlify.app/api",
});

const ejectData = (response) => response.data;

axios.interceptors.response.use(ejectData);

export default axios;
