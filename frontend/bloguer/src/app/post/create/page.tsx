'use client'

import { useAppDispatch } from "@/lib/hooks"
import { Post, createPost } from "@/lib/features/postSlice"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"
import CreateForm from "@/components/post/CreateForm"
import { PostInput } from "@/components/post/CreateForm"

const CreatePage: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleCreatePost = async (postData: PostInput) => {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) throw new Error("User not authenticated")

    try {
      const response = await csrAxiosInstance.post<Post>('post/', postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      dispatch(createPost(response.data))
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          const newAccessToken = await refreshAccessToken()

          if (newAccessToken) {
            const retryResponse = await csrAxiosInstance.post<Post>('post/', postData, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            })
            dispatch(createPost(retryResponse.data))
          }
        }
        throw new Error(error.response.data.message || 'Failed to create post.')
      }
      throw new Error('Failed to create post')
    }
  }

  return (
    <div>
      <CreateForm onSubmit={handleCreatePost} />
    </div>
  )
}

export default CreatePage