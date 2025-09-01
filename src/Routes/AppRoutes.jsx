import { Link, Route, Routes } from "react-router-dom"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Verification from "../Screens/Verification"
import Profile from "../Screens/Profile"

export default function AppRoutes() {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/verification">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  )
}
