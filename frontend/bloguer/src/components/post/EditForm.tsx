'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"
import Button from "../Button"

interface PostData {
  title: string;
  content: string;
}

interface EditFormProps {
  postId: number;
  initialData: PostData;
  onUpdate: (position: PostData) => Promise<void>
}

export const editPost = async (postId: number, postData: PostData): Promise<PostData> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) throw new Error("User not authenticated")

  try {
    const response = await csrAxiosInstance.put<PostData>(`post/${postId}/`, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          const retryResponse = await csrAxiosInstance.put<PostData>(`post/${postId}/`, postData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })
          return retryResponse.data
        }
      }
      throw new Error(error.response.data.message || 'Failed to edit post.')
    }
    throw new Error('Failed to edit post')
  }
}

const EditForm: React.FC<EditFormProps> = ({ postId, initialData, onUpdate }) => {
  const [formData, setFormData] = useState<PostData>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await onUpdate(formData)
      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      setSuccess(false)
    }
  }

  return (
    <div className="mt-11 px-5 py-20 bg-[#1b1f23] rounded-md">
      <h1 className="pb-11">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label>Content</label>
          <textarea name="content" value={formData.content} onChange={handleInputChange} className="h-24 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="mx-auto">
          <Button text="Edit" />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        {success && <p className="text-blue-600">Post updated successfully!</p>}
      </form>
    </div>
  )
}

export default EditForm