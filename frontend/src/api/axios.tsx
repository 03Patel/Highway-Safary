import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "https://highwaysafarybackend.onrender.com/api"
    : "";


const API = axios.create({
  baseURL,
});

export default API;
