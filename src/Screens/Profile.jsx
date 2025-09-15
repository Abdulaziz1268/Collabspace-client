// import { useEffect, useState } from "react"
// import { apiWithUserAuth } from "../Config/Api"

// function Profile() {
//   const [data, setData] = useState({})

//   useEffect(() => {
//     handleClick()
//   }, [])

//   const handleClick = async () => {
//     try {
//       const api = apiWithUserAuth()
//       const response = await api.get("/api/user/profile")

//       setData(response.data)
//       console.log(JSON.parse(localStorage.getItem("user")))
//       console.log(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <div>
//       <h4>{data.message}</h4>
//       <p>{data.user?.username}</p>
//     </div>
//   )
// }

// export default Profile
import { useEffect, useState } from "react"
import { apiWithUserAuth } from "../Config/Api"
import { Link } from "react-router-dom"

function Profile() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [localUser, setLocalUser] = useState(null)

  useEffect(() => {
    handleClick()
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setLocalUser(JSON.parse(userData))
    }
  }, [])

  const handleClick = async () => {
    try {
      const api = apiWithUserAuth()
      const response = await api.get("/api/user/profile")
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-indigo-500"></div>
          </div>
          <p className="text-center text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            User Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage your account information
          </p>
          <Link to="/feed" className="mt-2 text-blue-600">
            Go to feed
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white">
            <h3 className="text-lg leading-6 font-medium">
              Account Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-indigo-100">
              Personal details and account information.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.user?.username ||
                    localUser?.username ||
                    "Not available"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.user?.email || localUser?.email || "Not available"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Member since
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.user?.createdAt
                    ? new Date(data.user.createdAt).toLocaleDateString()
                    : "Not available"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  To edit your profile information, please contact our support
                  team.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-indigo-600">
                      Edit Profile
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information
                    </p>
                  </div>
                  <div className="bg-indigo-100 px-4 py-4 sm:px-6">
                    <div className="text-xs font-medium text-indigo-700 hover:text-indigo-900 cursor-pointer">
                      Edit details &rarr;
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-green-600">
                      Security
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Change password and security settings
                    </p>
                  </div>
                  <div className="bg-green-100 px-4 py-4 sm:px-6">
                    <div className="text-xs font-medium text-green-700 hover:text-green-900 cursor-pointer">
                      Security settings &rarr;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
