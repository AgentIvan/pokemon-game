import Axios from "axios";

const CancelToken = Axios.CancelToken;

const axios = Axios.create({
  baseURL: "https://reactmarathon-api.netlify.app/api",
});

const ejectData = (response) => response.data;

axios.interceptors.response.use(ejectData);

export const source = CancelToken.source();

export default axios;
