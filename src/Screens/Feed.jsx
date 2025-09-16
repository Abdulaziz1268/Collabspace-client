import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { apiWithUserAuth } from "../Config/Api"
import FeedCard from "../Components/FeedCard"
import placeholder from "../assets/placeholder.jpg"
import { UserContext } from "../Context/User"

export default function Feed() {
  const [data, setData] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const navigate = useNavigate()
  const { userData, loading } = useContext(UserContext)

  useEffect(() => {
    setPostLoading(true)
    const fetchFeeds = async () => {
      try {
        const api = apiWithUserAuth()
        const response = await api.get("/api/post/getPosts")
        setData(response.data)
      } catch (error) {
        console.log(error.response?.data?.message || error.message)
      } finally {
        setTimeout(() => {
          setPostLoading(false)
        }, 5000)
      }
    }

    fetchFeeds()
  }, [])
  console.log(data)

  return (
    <div className="w-full flex justify-center md:justify-end lg:justify-center">
      <div className="flex flex-col justify-center items-center shadow-2xl md:w-2/3 lg:w-3/6">
        <div
          className={`w-full px-3 flex items-center bg-white ${
            loading && "animate-pulse"
          }`}
        >
          <img
            src={
              !loading
                ? `http://localhost:2005${userData.imageUrl}`
                : placeholder
            }
            className="w-15 h-15 m-2 rounded-full border border-gray-600"
          />
          <p
            className="hover:cursor-pointer text-xl bg-gray-300 py-3 pl-7 m-2 rounded-full flex-1"
            onClick={() => navigate("/post")}
          >
            What's on your mind?
          </p>
        </div>
        <div className="bg-gray-400 w-full">
          {data.map((feed, index) => (
            <FeedCard feed={feed} key={index} postLoading={postLoading} />
          ))}
        </div>
      </div>
    </div>
  )
}
