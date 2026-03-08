import axios from "axios";
<<<<<<< HEAD
=======


>>>>>>> dc8a79e2e7d7a817583381c622997efd9cd41426
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safary.onrender.com";
<<<<<<< HEAD

=======
>>>>>>> dc8a79e2e7d7a817583381c622997efd9cd41426

const API = axios.create({
  baseURL,
});

export default API;
