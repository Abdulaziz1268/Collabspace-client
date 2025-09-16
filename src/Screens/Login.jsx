import { loginValidationSchema } from "../Config/ValidationSchema"
import { Formik } from "formik"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import api from "../Config/Api"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/Auth"

import visibility_on from "../assets/visibility.svg"
import visibility_off from "../assets/visibility_off.svg"

export default function Login() {
  const navigate = useNavigate()
  const { setIsLogged } = useContext(AuthContext)
  const [visibility, setVisibility] = useState(false)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="py-5 text-xl">Welcome Back!</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await api.post("/api/auth/login", values)
            setSubmitting(false)
            const { token, user } = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setIsLogged(true)
            navigate("/feed")
            toast.success("success", { duration: 3000 })
          } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setIsLogged(false)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 shadow-sm shadow-gray-300 rounded-2xl py-10 px-15"
          >
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="p-2 border border-gray-400 rounded-lg"
              type="email"
              name="email"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}

            <label htmlFor="password" className="mt-7">
              Password
            </label>
            <div className="relative w-xl flex items-center">
              <input
                id="password"
                className="p-2 border border-b-gray-400 rounded-lg w-full"
                type={visibility ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <img
                src={visibility ? visibility_off : visibility_on}
                onClick={() => setVisibility((prev) => !prev)}
                className="absolute right-4 hover:cursor-pointer"
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 hover:scale-103 disabled:opacity-30 hover:cursor-pointer p-2 rounded-lg text-xl bg-blue-600 text-white"
            >
              Login
            </button>
            <p className="text-center mt-5">
              Don't have an account?{" "}
              <Link to="/verification" className="text-blue-600">
                Sign Up
              </Link>
              .
            </p>
          </form>
        )}
      </Formik>
    </div>
  )
}
