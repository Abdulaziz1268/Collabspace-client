import { useContext, useState } from "react"
import { baseURL } from "../Config/Api"
import { UserContext } from "../Context/User"
import { FaDeleteLeft, FaTrash } from "react-icons/fa6"
import { toast, Toaster } from "sonner"

export default function Comment({
  comments,
  handleAddComment,
  handleDeleteComment,
}) {
  const { userData } = useContext(UserContext)
  const [content, setContent] = useState("")

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="w-full h-[2px] bg-gray-300" />
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-2 my-4">
              <img
                src={`${baseURL}${comment.author.imageUrl}`}
                className="w-7 h-7 m-2 rounded-full border border-gray-600"
              />
              <div>
                <div className="p-2 rounded-xl bg-gray-300">
                  <h2 className="font-semibold">{comment.author.username}</h2>
                  <p>{comment.content}</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  {userData._id === comment.author._id && (
                    <p
                      className="mt-2 hover:cursor-pointer text-gray-600 font-semibold hover:opacity-50"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </p>
                  )}
                  <p
                    className="mt-2 hover:cursor-pointer text-gray-600 font-semibold hover:opacity-50"
                    onClick={() => toast.success("comming soon.")}
                  >
                    Like
                  </p>
                  <p
                    className="mt-2 hover:cursor-pointer text-gray-600 font-semibold hover:opacity-50"
                    onClick={() => toast.success("comming soon.")}
                  >
                    Reply
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-300 py-10 flex flex-col justify-center items-center">
            <h2 className="text-gray-500">No comments yet.</h2>
            {/* <h2 className="text-gray-500">Be the first to comment.</h2> */}
          </div>
        )}
        <div className="w-full h-[2px] bg-gray-300" />
      </div>
      <div className="flex px-4 gap-3 my-4">
        <img
          src={`${baseURL}${userData.imageUrl}`}
          className="w-10 h-10 rounded-full border border-gray-600"
        />
        <input
          type="text"
          placeholder="comment"
          className="flex-1 border-2 border-gray-400 rounded-full indent-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 rounded-xl hover:cursor-pointer"
          onClick={() => {
            handleAddComment(content)
            setContent("")
          }}
          disabled={!content.trim()}
        >
          Post
        </button>
      </div>
    </div>
  )
}
