import { use, useContext, useEffect, useState } from "react"
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6"

import imagePlaceholder from "../assets/imagePlaceholder.png"
import placeholder from "../assets/placeholder.jpg"
import videoPlaceholder from "../assets/videoPlaceholder.png"
import { apiWithUserAuth, baseURL } from "../Config/Api"

export default function FeedCard({ feed, postLoading, userId }) {
  const [count, setCount] = useState(feed.likes.length)
  const [clicked, setClicked] = useState(feed.likes.includes(userId))
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    try {
      setIsLiking(true)
      const api = apiWithUserAuth()
      const { data } = await api.put(`/api/post/${feed._id}/like`)
      setCount(data.count)
      setClicked(data.liked)
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="bg-white my-1">
      <div className="flex">
        <img
          src={postLoading ? placeholder : `${baseURL}${feed.author.imageUrl}`}
          className={`w-15 h-15 m-2 rounded-full border border-gray-600 ${
            postLoading && "animate-pulse"
          }`}
        />
        <div className="m-2 py-2">
          <h2 className="font-semibold">{feed.author.username}</h2>
          <p className="font-extralight text-sm text-gray-400">
            {new Date(feed.updatedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
      <p className="m-2">{feed.content}</p>
      {feed.mediaUrl && feed.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) && (
        <div className="flex justify-center bg-black min-h-50">
          <img
            src={postLoading ? imagePlaceholder : `${baseURL}${feed.mediaUrl}`}
            alt="feed"
            className={`w-full max-h-96 object-contain rounded-md hover:cursor-pointer ${
              postLoading && "animate-pulse"
            }`}
          />
        </div>
      )}
      {feed.mediaUrl && feed.mediaUrl.match(/\.(mp4|webm|ogg)$/i) && (
        <div className="bg-black flex justify-center">
          {postLoading ? (
            <img
              src={videoPlaceholder}
              className="w-full aspect-video animate-pulse"
            />
          ) : (
            <video
              src={`${baseURL}${feed.mediaUrl}`}
              controls
              className="w-full aspect-video"
            />
          )}
        </div>
      )}
      <div className="flex w-full h-15 border-t border-gray-200 mt-2 justify-evenly gap-4 px-4 py-2">
        <div
          onClick={handleLike}
          className={`bg-gray-200 flex-1 flex hover:cursor-pointer hover:scale-105 ${
            isLiking && "opacity-50"
          } transition-transform duration-200 justify-center items-center rounded-full  gap-2`}
        >
          {clicked ? (
            <FaThumbsUp size={24} color="black" />
          ) : (
            <FaRegThumbsUp size={24} color="black" />
          )}{" "}
          {count}
        </div>
        <div className="bg-gray-200 flex-1 flex hover:cursor-pointer hover:scale-105 transition-transform duration-200 justify-center items-center rounded-full  gap-2">
          <FaRegComment size={24} color="black" /> Comment
        </div>
      </div>
    </div>
  )
}
