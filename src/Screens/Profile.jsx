import { useContext, useEffect, useState } from "react"
import { apiWithUserAuth, baseURL } from "../Config/Api"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../Context/User"
import FeedCard from "../Components/FeedCard"
import { FaRegEdit } from "react-icons/fa"
import placeholder from "../assets/placeholder.jpg"

function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const { userData, loading } = useContext(UserContext)
  const { id: userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [userId, userData._id])

  const fetchProfile = async () => {
    try {
      setPostLoading(true)
      const api = apiWithUserAuth()
      const { data } = await api.get(
        `/api/user/getuser/${userId ? userId : userData._id}`
      )

      setUser(data.user)
      setPosts(data.posts)
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
    } finally {
      setPostLoading(false)
    }
  }
  return (
    <div className="w-full flex justify-center md:justify-end lg:justify-center">
      <div className="flex flex-col justify-center items-center shadow-2xl w-full md:w-2/3 lg:w-3/6">
        <h1 className="self-start mx-5 my-5 font-semibold text-4xl">
          Collab Space
        </h1>
        <div
          className={`w-full px-3 flex items-center  bg-white ${
            loading && "animate-pulse"
          }`}
        >
          <img
            src={!loading ? `${baseURL}${user.imageUrl}` : placeholder}
            className="w-30 h-30 m-2 rounded-full border border-gray-600"
          />
          <div className="mr-auto">
            <p className="text-3xl font-semibold pt-3 ml-5  flex-1">
              {user.username || "Unknown User"}
            </p>
            <p className="ml-5 font-normal text-gray-400">
              {posts.length} Posts
            </p>
          </div>
          {userId === userData._id && (
            <div className="self-center mr-5">
              <FaRegEdit
                color="black"
                size={30}
                className="hover:cursor-pointer hover:opacity-50"
                onClick={() => navigate("/editProfile")}
              />
            </div>
          )}
        </div>
        <div className="bg-gray-400 w-full pt-1 ">
          {posts.length > 0 ? (
            posts.map((feed, index) => (
              <FeedCard
                feed={feed}
                key={feed._id || index}
                postLoading={postLoading}
                userId={user._id}
              />
            ))
          ) : (
            <div className="bg-white h-full flex justify-center items-center ">
              <p className="my-10 ">No posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
