import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function Verification() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmiting] = useState(false)
  const [status, setStatus] = useState("")
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSubmiting(true)
      const response = await axios.post(
        "http://localhost:2005/api/auth/sendEmail",
        { email }
      )
      if (response.data.status === "sent") setStatus("sent")
      toast.success("code sent")
      setIsSubmiting(false)
    } catch (error) {
      console.log(error.message)
      setStatus("")
      toast.error("error occured")
      setIsSubmiting(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSubmiting(true)
      const response = await axios.post(
        "http://localhost:2005/api/auth/verifyEmail",
        { email, code }
      )
      if (!response.data.verified) {
        console.log(response)
        setIsSubmiting(false)
        return toast.error(response.data.message)
      }
      navigate("/register", { state: { email } })
      setIsSubmiting(false)
    } catch (error) {
      console.log(error.message)
      toast.error(`error occured: ${error.message}`)
      setIsSubmiting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      {status !== "sent" ? (
        <>
          <h3 className="py-5 text-2xl">Enter your Email</h3>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col py-5 px-7 shadow-sm shadow-gray-300 rounded-2xl w-md"
          >
            <input
              className="border border-gray-300 rounded-lg p-2 mb-7"
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white p-2 rounded-lg hover:cursor-pointer hover:scale-103 disabled:opacity-30"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h3 className="py-5 text-2xl">Enter the code sent to your email</h3>
          <form
            onSubmit={handleCodeSubmit}
            className="flex flex-col py-5 px-7 shadow-sm shadow-gray-300 rounded-2xl w-md"
          >
            <div>
              <input type="number" />
            </div>
            <input
              className="border border-gray-300 rounded-lg p-2 mb-7"
              type="number"
              name="code"
              required
              maxl={6}
              min={6}
              placeholder="Verification Code"
              autoComplete="one-time-code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white p-2 rounded-lg hover:cursor-pointer hover:scale-103 disabled:opacity-30"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}
