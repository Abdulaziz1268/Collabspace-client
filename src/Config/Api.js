import axios from "axios"

const baseURL = "http://localhost:2005"

const api = axios.create({
  baseURL,
  timeout: 1000,
})

export const apiWithUserAuth = () => {
  const token = localStorage.getItem("token")
  if (!token) return console.log("Invalid token")
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}

export default api
