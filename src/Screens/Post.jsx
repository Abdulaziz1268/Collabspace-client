import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import attach_file from "../assets/attach_file.svg"
import { FaFileImage, FaFileVideo } from "react-icons/fa"

export default function Post() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center shadow-2xl sm:w-4/6 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-center my-5 w-full"
        >
          <div className="flex items-center w-full gap-2 bg-gray-200 rounded-xl py-1">
            <textarea
              rows={5}
              type="text"
              placeholder="what's on your mind"
              className="border border-none focus:outline-none indent-2 flex flex-1 "
            />
          </div>
          <div className="flex gap-3 w-full">
            <div className="bg-gray-200 p-3 flex gap-3 items-center justify-center rounded-full flex-1">
              <FaFileImage size={24} color="black" className="opacity-70" />
              <span>Select Image</span>
            </div>
            <div className="bg-gray-200 p-3 flex gap-3 items-center justify-center rounded-full flex-1">
              <FaFileVideo size={24} color="black" className="opacity-70" />
              <span>Select Video</span>
            </div>
          </div>
          <input
            type="submit"
            value="Post"
            className="bg-blue-600 rounded-2xl text-white py-3 text-lg w-full hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}
