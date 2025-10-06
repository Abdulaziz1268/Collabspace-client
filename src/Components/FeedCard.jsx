import { useEffect, useState } from "react"
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6"

import imagePlaceholder from "../assets/imagePlaceholder.png"
import placeholder from "../assets/placeholder.jpg"
import videoPlaceholder from "../assets/videoPlaceholder.png"
import { apiWithUserAuth, baseURL } from "../Config/Api"
import Comment from "./Comment"
import { useNavigate } from "react-router-dom"

export default function FeedCard({ feed, postLoading, userId }) {
  const [likeCount, setLikeCount] = useState(feed.likes.length)
  const [commentCount, setCommentCount] = useState(0)
  const [comments, setComments] = useState([])
  const [likeClicked, setLikeClicked] = useState(feed.likes.includes(userId))
  const [commentClicked, setCommentClicked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const navigate = useNavigate()

  const handleLike = async () => {
    if (isLiking) return
    try {
      setIsLiking(true)
      const api = apiWithUserAuth()
      const { data } = await api.put(`/api/post/${feed._id}/like`)
      setLikeCount(data.count)
      setLikeClicked(data.liked)
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
    } finally {
      setIsLiking(false)
    }
  }

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const api = apiWithUserAuth()
        const { data } = await api.get(
          `/api/comment/getCommentCount/${feed._id}`
        )
        setCommentCount(data.count)
      } catch (error) {
        console.log(error.response?.data?.error || error.message)
      }
    }

    fetchCommentCount()
  }, [])

  const handleAddComment = async (content) => {
    try {
      const api = apiWithUserAuth()
      await api.post(`/api/comment/addComment/${feed._id}`, {
        content,
      })
      fetchComments()
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const api = apiWithUserAuth()
      await api.delete(`/api/comment/deleteComment/${commentId}`)
      fetchComments()
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
    }
  }

  const handleFetchComment = async () => {
    setCommentClicked((prev) => {
      if (!prev) fetchComments()

      return !prev
    })
  }

  const fetchComments = async () => {
    try {
      const api = apiWithUserAuth()
      const { data } = await api.get(`/api/comment/getComments/${feed._id}`)
      setComments(data.comments)
      setCommentCount(data.count)
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
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
          <h2
            className="font-semibold hover:opacity-50 hover:cursor-pointer"
            onClick={() => navigate(`/profile/${feed.author._id}`)}
          >
            {feed.author.username}
          </h2>
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
          {likeClicked ? (
            <FaThumbsUp size={24} color="black" />
          ) : (
            <FaRegThumbsUp size={24} color="black" />
          )}{" "}
          {likeCount}
        </div>
        <div
          onClick={handleFetchComment}
          className="bg-gray-200 flex-1 flex hover:cursor-pointer hover:scale-105 transition-transform duration-200 justify-center items-center rounded-full  gap-2"
        >
          <FaRegComment size={24} color="black" /> {commentCount}
        </div>
      </div>
      {commentClicked && (
        <Comment
          comments={comments}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      )}
    </div>
  )
}
