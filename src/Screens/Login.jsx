import axios from "axios"
import { loginValidationSchema } from "../Config/ValidationSchema"
import { Formik } from "formik"
import { toast } from "sonner"

export default function Login() {
  return (
    <div>
      <p>login</p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://localhost:2005/api/auth/login",
              values
            )
            setSubmitting(false)
            toast.success("success")
            console.log("success", response.data)
          } catch (error) {
            console.log(error.message)
            toast.error(error.message)
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
              type="email"
              name="email"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              required
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
