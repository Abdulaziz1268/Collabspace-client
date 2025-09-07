import axios from "axios"
import { registerValidationSchema } from "../Config/ValidationSchema"
import { toast } from "sonner"
import { Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"

export default function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-screen">
      <p className="py-5 text-2xl">Sign Up</p>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            values.email = await location.state.email
            const response = await axios.post(
              "http://localhost:2005/api/auth/register",
              values
            )
            toast.success("success")
            console.log(response.data)
            setTimeout(() => {
              navigate("/login")
            }, 1500)
            setSubmitting(false)
          } catch (error) {
            toast.error("error oc")
            console.log(error.message)
            setSubmitting(false)
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
            className="flex flex-col gap-2 shadow-sm shadow-gray-300 rounded-2xl py-10 px-15 w-md"
          >
            <label htmlFor="username">Username</label>
            <input
              autoComplete="username"
              id="username"
              className="p-2 border border-gray-400 rounded-lg"
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <p className="text-red-600">{errors.username}</p>
            )}

            <label htmlFor="password" className="mt-7">
              Password
            </label>
            <input
              autoComplete="new-password"
              id="password"
              className="p-2 border border-gray-400 rounded-lg"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 hover:scale-103 disabled:opacity-30 hover:cursor-pointer p-2 rounded-lg text-xl bg-blue-600 text-white"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
