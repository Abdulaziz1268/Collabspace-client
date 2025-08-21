import { Routes, Route, Link } from "react-router-dom"
import { Toaster } from "sonner"
import Login from "./Screens/Login"
import Register from "./Screens/Register"
import Verification from "./Screens/Verification"

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors expand={false} position="bottom-center" />
    </>
  )
}

function AppRoutes() {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/verification">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
