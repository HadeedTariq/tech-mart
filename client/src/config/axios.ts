import axios from "axios";

const accountApi = axios.create({
  baseURL: "http://localhost:3500/account",
  withCredentials: true,
});

export { accountApi };
