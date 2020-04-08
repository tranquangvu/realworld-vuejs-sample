import axios from "axios";
import { getUserFromLocalStorage } from "./storage";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://conduit.productionready.io/api"
  });
  const user = getUserFromLocalStorage();

  if (user) {
    instance.defaults.headers.common["Authorization"] = `Token ${user.token}`;
  }

  return instance;
}

export const api = createAxiosInstance();

export function setTokenToAxiosInstance(token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export function clearTokenFromAxiosInstance() {
  delete api.defaults.headers.common["Authorization"];
}
