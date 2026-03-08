import axios from "axios";

<<<<<<< HEAD

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "";
=======
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safary.onrender.com";
>>>>>>> 62f002e22f1acae979f4faca1986da2c81a03013

const API = axios.create({
  baseURL,
});

export default API;
<<<<<<< HEAD

=======
>>>>>>> 62f002e22f1acae979f4faca1986da2c81a03013
