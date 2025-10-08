import * as Yup from "yup"

export const registerValidationSchema = Yup.object({
  username: Yup.string().required().min(3).label("Username"),
  password: Yup.string().required().min(3).max(8).label("Password"),
})

export const loginValidationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).max(8).label("Password"),
})

export const editProfileValidationSchema = Yup.object({
  username: Yup.string().min(3).label("Username"),
  email: Yup.string().email().label("Email"),

  currentPassword: Yup.string()
    .min(3, "Current password must be at least 3 characters")
    .max(8, "Current password must be at most 8 characters")
    .label("Current Password"),

  newPassword: Yup.string()
    .min(3, "New password must be at least 3 characters")
    .max(8, "New password must be at most 8 characters")
    .label("New Password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .label("Confirm Password"),
}).test(
  "passwords-required-together",
  "If you fill any password field, all password fields are required",
  function (values) {
    const { currentPassword, newPassword, confirmPassword } = values

    const anyFilled = currentPassword || newPassword || confirmPassword

    if (anyFilled) {
      // Check all are filled
      if (!currentPassword) {
        return this.createError({
          path: "currentPassword",
          message: "Current password is required",
        })
      }
      if (!newPassword) {
        return this.createError({
          path: "newPassword",
          message: "New password is required",
        })
      }
      if (!confirmPassword) {
        return this.createError({
          path: "confirmPassword",
          message: "Confirm password is required",
        })
      }
    }
    return true // valid
  }
)
