// src/http/index.js
import axios from "axios"

const http = axios.create({
  baseURL: "https://testrestapi.cafe24.com",
  headers: { "content-type": "application/json" },
})

http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

export default http