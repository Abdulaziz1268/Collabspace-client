import { Link, Navigate, Route, Routes } from "react-router-dom"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Verification from "../Screens/Verification"
import Profile from "../Screens/Profile"
import { useContext } from "react"
import { AuthContext } from "../Context/Auth"
import Feed from "../Screens/Feed"
import Post from "../Screens/Post"

export default function AppRoutes() {
  const { isLogged, loading } = useContext(AuthContext)

  if (loading) return <p>Loading...</p>
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={isLogged ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/feed"
        element={isLogged ? <Feed /> : <Navigate to="/login" />}
      />
      <Route
        path="/post"
        element={isLogged ? <Post /> : <Navigate to="/login" />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}
