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
    <div>
      <p>verification</p>
      {status !== "sent" ? (
        <>
          <h3>Enter your Email</h3>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h3>Enter the code sent to your email</h3>
          <form onSubmit={handleCodeSubmit}>
            <input
              type="number"
              name="code"
              required
              max={6}
              min={6}
              placeholder="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}
