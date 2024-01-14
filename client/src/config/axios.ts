import axios from "axios";

const accountApi = axios.create({
  baseURL: "http://localhost:3500/account",
  withCredentials: true,
});
const productApi = axios.create({
  baseURL: "http://localhost:3500/product",
  withCredentials: true,
});
const adminApi = axios.create({
  baseURL: "http://localhost:3500/admin",
  withCredentials: true,
});

export { accountApi, productApi, adminApi };
