import { baseURL } from "../core";
import axios from "axios";

// export const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.curruntUser?.accessToken;
// //console.log("token >>>", TOKEN);
// //console.log("localstorage >>>", localStorage.getItem("persist:root"));
export const TOKEN = localStorage.getItem("jToken");

export const publicRequest = axios.create({
  baseURL: baseURL,
});
export const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
