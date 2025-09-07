import { Toaster } from "sonner"
import AppRoutes from "./Routes/AppRoutes"
import "./App.css"
import { AuthProvider } from "./Context/Auth"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster richColors expand={false} position="bottom-center" />
    </AuthProvider>
  )
}

export default App
