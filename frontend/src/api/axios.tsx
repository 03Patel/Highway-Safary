import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "https://highway-safary.onrender.com"
    : "";


const API = axios.create({
  baseURL,
});

export default API;
