import { Toaster } from "sonner"
import AppRoutes from "./Routes/AppRoutes"
import "./App.css"
import { AuthProvider } from "./Context/Auth"
import { UserProvider } from "./Context/User"

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRoutes />
        <Toaster richColors expand={false} position="bottom-center" />
      </UserProvider>
    </AuthProvider>
  )
}

export default App
