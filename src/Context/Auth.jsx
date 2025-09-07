import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return console.log("Invalid token")
    setIsLogged(true)
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ setIsLogged, isLogged, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
