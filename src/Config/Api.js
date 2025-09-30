import axios from "axios"

export const baseURL = "http://localhost:2005"

const api = axios.create({
  baseURL,
  timeout: 1500,
})

export const apiWithUserAuth = () => {
  const token = localStorage.getItem("token")
  if (!token) return console.log("Invalid token")
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 1500,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}

export default api
