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
const sellerApi = axios.create({
  baseURL: "http://localhost:3500/seller",
  withCredentials: true,
});
const chatApi = axios.create({
  baseURL: "http://localhost:3500/chats",
  withCredentials: true,
});

export { accountApi, productApi, adminApi, sellerApi, chatApi };
