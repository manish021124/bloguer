'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"

export interface UserProps {
  id: number
  username: string
  email: string
  first_name: string | ''
  last_name: string | ''
  profile_pic: string | null
}

const fetchUser = async (): Promise<UserProps> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) throw new Error("User not authenticated")

  try {
    const response = await csrAxiosInstance.get<UserProps>('profile/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response.data[0])
    return response.data[0]
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          const retryResponse = await csrAxiosInstance.get<UserProps>('profile/', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })
          console.log(retryResponse.data)
          return retryResponse.data[0]
        }
      }
      throw new Error(error.response.data.message || 'Failed to get user detail.')
    }
    throw new Error('Failed to get user detail.')
  }
}

export default fetchUser
