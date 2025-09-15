import profilePicture from "../assets/images.jpeg"
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa"

export default function FeedCard({ feed }) {
  return (
    <div className="bg-white my-1">
      <div className="flex">
        <img
          src={feed.authorImage}
          className="w-15 h-15 m-2 rounded-full border border-gray-600"
        />
        <div className="m-2 py-2">
          <h2 className="font-semibold">{feed.author}</h2>
          <p className="font-extralight text-sm text-gray-400">
            {new Date(feed.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="m-2">{feed.content}</p>
      {feed.image && (
        <div className="flex justify-center bg-black min-h-50">
          <img src={feed.image} alt="feed" className="w-full" />
        </div>
      )}
      {feed.video && (
        <div className="bg-black flex justify-center">
          <video src={feed.video} controls className="w-full aspect-video" />
        </div>
      )}
      <div className="flex w-full h-15 border-t border-gray-200 mt-2 justify-evenly gap-4 px-4 py-2">
        <div className="bg-gray-200 flex-1 flex hover:cursor-pointer hover:scale-105 justify-center items-center rounded-full  gap-2">
          <FaRegThumbsUp size={24} color="black" /> Like
        </div>
        <div className="bg-gray-200 flex-1 flex hover:cursor-pointer hover:scale-105 justify-center items-center rounded-full  gap-2">
          <FaRegComment size={24} color="black" /> Comment
        </div>
      </div>
    </div>
  )
}
