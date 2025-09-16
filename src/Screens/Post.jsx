import { useRef, useState } from "react"
import { FaArrowLeft, FaFileImage, FaFileVideo } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { apiWithUserAuth } from "../Config/Api"
import { toast } from "sonner"

export default function Post() {
  const [post, setPost] = useState({
    content: "",
    media: null,
  })
  const navigate = useNavigate()
  const ImageInputRef = useRef(null)
  const VideoInputRef = useRef(null)

  const handleContentChange = (e) =>
    setPost((prevState) => ({ ...prevState, content: e.target.value }))

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPost((prevState) => ({ ...prevState, media: file }))
    }
  }

  const handleImageClick = () => ImageInputRef.current.click()
  const handleVideoClick = () => VideoInputRef.current.click()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("content", post.content)
      if (post.media) formData.append("media", post.media)

      const api = apiWithUserAuth()
      await api.post("/api/post/createPost", formData)
      navigate("/feed")
      toast.success("Posted Successfully")
    } catch (error) {
      toast.error("Something wrong happened. Please try again!")
      console.log(error.response?.data?.message || error.message)
    }
  }
  return (
    <div className="flex justify-center h-auto md:justify-end lg:justify-center">
      <div className="flex flex-col items-center shadow-2xl md:w-2/3 lg:w-3/6 p-4">
        <div className="flex justify-start items-center gap-3 border-b border-gray-300 pb-3 w-full">
          <FaArrowLeft
            size={24}
            color="black"
            onClick={() => navigate("/feed")}
            className="hover:cursor-pointer box-content p-2 hover:bg-gray-200 rounded-full"
          />
          <h1 className="font-semibold text-2xl">Post</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" h-full flex flex-col gap-3 items-center my-5 w-full"
        >
          <div className="flex items-center w-full gap-2 bg-gray-200 rounded-xl py-1">
            <textarea
              rows={post.media ? 10 : 20}
              type="text"
              placeholder="what's on your mind"
              onChange={handleContentChange}
              className="border border-none focus:outline-none indent-2 flex flex-1 "
            />
          </div>
          {post.media && (
            <div>
              {post.media.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(post.media)}
                  className="h-55 rounded-2xl border-2 border-gray-200"
                />
              ) : (
                <video
                  src={URL.createObjectURL(post.media)}
                  controls
                  className="h-55 rounded-2xl border-2 border-gray-200"
                />
              )}
              {post.media && (
                <p className="text-gray-600 mt-1">{post.media.name}</p>
              )}
            </div>
          )}
          <div className="flex gap-3 w-full">
            <div
              className="bg-gray-200 p-3 flex gap-3 items-center justify-center rounded-full flex-1 hover:cursor-pointer"
              onClick={handleImageClick}
            >
              <FaFileImage size={24} color="black" className="opacity-70" />
              <span>Select Image</span>
              <input
                type="file"
                ref={ImageInputRef}
                onChange={handleMediaChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div
              className="bg-gray-200 p-3 flex gap-3 items-center justify-center rounded-full flex-1 hover:cursor-pointer"
              onClick={handleVideoClick}
            >
              <FaFileVideo size={24} color="black" className="opacity-70" />
              <span>Select Video</span>
              <input
                type="file"
                ref={VideoInputRef}
                onChange={handleMediaChange}
                accept="video/*"
                className="hidden"
              />
            </div>
          </div>
          <div className="h-full  bg-amber-800"></div>
          <input
            type="submit"
            value="Post"
            className="bg-blue-600 self-end rounded-2xl text-white py-3 text-lg w-full hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}
