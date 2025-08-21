import axios from "axios"
import { registerValidationSchema } from "../Config/ValidationSchema"
import { toast } from "sonner"
import { Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"

export default function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div>
      <p>register</p>
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
          <form onSubmit={handleSubmit}>
            <input
              type="username"
              name="username"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}

            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
