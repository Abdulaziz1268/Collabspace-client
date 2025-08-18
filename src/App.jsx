import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
function Regisiter() {
  return (
    <div>
      <h1>regisiter</h1>
    </div>
  )
}
function Feed() {
  return (
    <div>
      <h1>feed</h1>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="login">Login</Link> | <Link to="register">Register</Link> |{" "}
        <Link to="feed">Feed</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regisiter />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App
