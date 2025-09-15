import { useNavigate } from "react-router-dom"
import FeedCard from "../Components/FeedCard"
import { Data } from "../Config/feedData"

export default function Feed() {
  const navigate = useNavigate()

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col justify-center items-center shadow-2xl sm:w-4/6">
        <div className="w-full px-6 flex items-center">
          <img
            src={Data[2].authorImage}
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
          {Data.map((feed, index) => (
            <FeedCard feed={feed} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
