import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
<<<<<<< HEAD
    : "https://highway-safary.onrender.com/api";

=======
    : "https://highwaysafarybackend.onrender.com/api";
>>>>>>> a637c2c391be7b10037a0516c7fcf9b8f03992ed


const API = axios.create({
  baseURL,
});

export default API;
