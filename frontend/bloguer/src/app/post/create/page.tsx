'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Post, createPost } from "@/lib/features/postSlice"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"
import CreateForm from "@/components/post/CreateForm"
import { PostInput } from "@/components/post/CreateForm"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const CreatePage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

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
    <>
      {isAuthenticated ? (
        <CreateForm onSubmit={handleCreatePost} />
      ) : (
        <p className="text-center">Redirecting...</p>
      )}
    </>
  )
}

export default CreatePage