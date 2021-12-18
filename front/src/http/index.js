// src/http/index.js
import axios from "axios"

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { "content-type": "application/json" },
})

http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

export default http