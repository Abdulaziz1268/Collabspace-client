import React, { useContext, useRef, useState } from "react"
import { UserContext } from "../Context/User"
import { apiWithUserAuth, baseURL } from "../Config/Api"
import { Formik, validateYupSchema } from "formik"
import { editProfileValidationSchema } from "../Config/ValidationSchema"
import { FaArrowLeftLong, FaEye, FaEyeSlash } from "react-icons/fa6"
import { RiImageEditLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function EditProfile() {
  const { userData, loading } = useContext(UserContext)
  const [show, setShow] = useState({
    cuPass: false,
    nPass: false,
    coPass: false,
  })
  const imagePickerRef = useRef(null)
  const navigate = useNavigate()

  const toggleImagePicker = () => {
    imagePickerRef.current.click()
  }

  const handleShowPassword = (type) => {
    setShow((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setFieldValue("imagePreview", previewUrl)
      setFieldValue("imageUrl", file)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white flex flex-col items-center pt-5 shadow-2xl md:w-2/3 lg:w-3/6 min-h-[80vh] rounded-lg">
        <Formik
          initialValues={{
            imageUrl: "",
            imagePreview: "",
            username: userData.username,
            email: userData.email,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={editProfileValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true)
              const formData = new FormData()
              formData.append("username", values.username)
              formData.append("email", values.email)

              if (values.currentPassword) {
                formData.append("currentPassword", values.currentPassword)
                formData.append("newPassword", values.newPassword)
              }

              if (values.imageUrl && values.imageUrl instanceof File) {
                formData.append("imageUrl", values.imageUrl)
              }

              const api = apiWithUserAuth()
              const response = await api.post(
                `/api/user/editProfile/${userData._id}`,
                formData
              )
              console.log(response.data)
              toast.success(response.data.message)
              navigate(-1)
            } catch (error) {
              console.log(error.response?.data?.error || error.message)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
            isSubmitting,
            values,
            errors,
            touched,
            dirty,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col relative items-center gap-2 px-15 w-md h-full"
            >
              <FaArrowLeftLong
                color="gray"
                size={24}
                className="absolute left-0 top-0 hover:cursor-pointer hover:opacity-50"
                onClick={() => navigate(-1)}
              />
              <div className="mb-5 self-center relative">
                <img
                  src={
                    values.imagePreview
                      ? values.imagePreview
                      : `${baseURL}${userData.imageUrl}`
                  }
                  alt="avatar"
                  className="w-40 h-40 rounded-full border-2 border-gray-300"
                />
                <RiImageEditLine
                  color="gray"
                  size={25}
                  onClick={toggleImagePicker}
                  className="absolute z-10 bottom-[-10px] right-[-10px] hover:cursor-pointer hover:opacity-50"
                />
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  onBlur={handleBlur}
                  ref={imagePickerRef}
                />
              </div>
              <div className="flex flex-col gap-2 mb-5 shadow-sm shadow-gray-300 rounded-2xl py-10 px-15 w-md">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="p-2 border border-gray-400 rounded-lg"
                  placeholder={userData.username}
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <p className="text-red-600">{errors.username}</p>
                )}
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 border border-gray-400 rounded-lg"
                  placeholder={userData.email}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
                <p className="mt-6">Change Password</p>
                <div className="relative">
                  {/* <label htmlFor="currentPassword">Current Password</label> */}
                  <input
                    type={show.cuPass ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="current password"
                    className="p-2 border border-gray-400 rounded-lg w-full"
                    value={values.currentPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {show.cuPass ? (
                    <FaEyeSlash
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("cuPass")}
                    />
                  ) : (
                    <FaEye
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("cuPass")}
                    />
                  )}
                  {errors.currentPassword && touched.currentPassword && (
                    <p className="text-red-600">{errors.currentPassword}</p>
                  )}
                </div>
                <div className="relative">
                  {/* <label htmlFor="newPassword">New Password</label> */}
                  <input
                    type={show.nPass ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="new password"
                    className="p-2 border border-gray-400 rounded-lg w-full"
                    value={values.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {show.nPass ? (
                    <FaEyeSlash
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("nPass")}
                    />
                  ) : (
                    <FaEye
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("nPass")}
                    />
                  )}
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-600">{errors.newPassword}</p>
                  )}
                </div>
                <div className="relative">
                  {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                  <input
                    type={show.coPass ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirm password"
                    className="p-2 border border-gray-400 rounded-lg w-full"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {show.coPass ? (
                    <FaEyeSlash
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("coPass")}
                    />
                  ) : (
                    <FaEye
                      color="gray"
                      size={20}
                      className="absolute right-3 top-[10px] hover:cursor-pointer hover:opacity-50"
                      onClick={() => handleShowPassword("coPass")}
                    />
                  )}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  className="mt-7 hover:scale-103 disabled:opacity-30 hover:cursor-pointer p-2 rounded-lg text-xl bg-blue-600 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
