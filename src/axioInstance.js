import axios from "axios";

const AI = axios.create({
  baseURL: "http://localhost:3004/",
  timeout: 5000,
  timeoutErrorMessage: "Timeout! try after some time",
});

export default AI;
