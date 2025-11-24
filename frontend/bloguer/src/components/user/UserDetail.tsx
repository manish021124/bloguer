'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import Button from "@/components/Button"
import editUser from "@/app/user/profile/edit"
import { UserProps } from "@/app/user/profile/detail"

interface UserDetailProps {
  user: UserProps
  setUser: (user: UserProps) => void
}

export default function UserDetail({ user, setUser }: UserDetailProps) {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setUser({
        ...user,
        profile_pic: URL.createObjectURL(file), // Preview the image
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    formData.append("id", user.id.toString())
    formData.append("username", user.username)
    formData.append("email", user.email)
    formData.append("first_name", user.first_name)
    formData.append("last_name", user.last_name)

    if (selectedFile) {
      formData.append("profile_pic", selectedFile)
    }

    try {
      await editUser(formData)
      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      setSuccess(false)
    }
  }

  // const handleDeleteClick = async () => {
  //   await handleDelete(postId, dispatch, router)
  // }

  return (
    <>
      <div className="px-5 py-20 bg-[#1b1f23] rounded-md">
        <h1 className="mb-11">User Detail</h1>
        <div className="flex items-center gap-4 mb-5">
          <div>
            <img src={user.profile_pic} alt="Profile Picture" className="w-40 h-40 rounded-full"></img>
          </div>
          <div>
            <h1 className="text-4xl pb-3">{user.username}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <form encType="multipart/form-data" className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="me-8">First Name</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div>
            <label className="me-8">Last Name</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div>
            <label>Profile Picture</label>
            <input type="file" name="profile_pic" onChange={handleFileChange} className="h-9 px-2 ml-2 " />
          </div>
          <div className="flex justify-center gap-x-3">
            <Button text="Edit" type="submit" />
            <Button text="Delete" className="bg-red-700 hover:bg-red-600" />
          </div>
          {error && <p className="text-red-600">Error: {error}</p>}
          {success && <p className="text-blue-600">User detail edited successfully!</p>}
        </form>
      </div>
    </>
  )
}