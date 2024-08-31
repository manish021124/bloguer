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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await editUser(user)
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

        <form className="flex flex-col gap-y-4">
          <div>
            <label>Username</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" value={user.email} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div>
            <label>First Name</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} className="h-9 px-2 ml-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div className="flex justify-center gap-x-3">
            <Button text="Edit" onClick={handleSubmit} />
            <Button text="Delete" className="bg-red-700 hover:bg-red-600" />
          </div>
          {error && <p className="text-red-600">Error: {error}</p>}
          {success && <p className="text-blue-600">User detail edited successfully!</p>}
        </form>
      </div>
    </>
  )
}