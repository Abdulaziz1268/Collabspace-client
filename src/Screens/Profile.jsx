import axios from "axios"
import React, { useEffect, useState } from "react"

function Profile() {
  const [data, setData] = useState({})

  useEffect(() => {
    handleClick()
  }, [])

  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2005/api/user/profile",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      setData(response.data)
      console.log(JSON.parse(localStorage.getItem("user")))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h4>{data.message}</h4>
      <p>{data.user?.username}</p>
    </div>
  )
}

export default Profile
