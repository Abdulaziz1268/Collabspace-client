import { Toaster } from "sonner"
import AppRoutes from "./Routes/AppRoutes"

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors expand={false} position="bottom-center" />
    </>
  )
}

export default App
