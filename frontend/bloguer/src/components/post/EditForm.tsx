'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"

interface PostData {
  title: string;
  content: string;
}

interface EditFormProps {
  postId: number;
  initialData: PostData;
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
      if (error.response.status === 401 ) {
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
      throw new Error (error.response.data.message || 'Failed to edit post.')
    }
    throw new Error('Failed to edit post')
  }
}

const EditForm: React.FC<EditFormProps> = ({ postId, initialData }) => {
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
      await editPost(postId, formData)
      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      setSuccess(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      <textarea name="content" value={formData.content} onChange={handleInputChange} />
      <button type="submit">Update Post</button>
      {error && <p>Error: {error}</p>}
      {success && <p>Post updated successfully!</p>}
    </form>
  )
}

export default EditForm