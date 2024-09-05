'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"
import { PostProps } from "@/lib/features/postSlice"

const fetchUserPosts = async (): Promise<PostProps[]> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) throw new Error("User not authenticated")

  try {
    const response = await csrAxiosInstance.get<PostProps[]>('my-posts/', {
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
          const retryResponse = await csrAxiosInstance.get<PostProps[]>('my-posts/', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })
          return retryResponse.data
        }
      }
      throw new Error(error.response.data.message || 'Failed to get user posts.')
    }
    throw new Error('Failed to get user posts.')
  }
}

export default fetchUserPosts
