'use client'

import { UserProps } from "./detail"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { refreshAccessToken } from "@/app/auth/login/loginService"

const editUser = async (userData: FormData): Promise<UserProps> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) throw new Error("User not authenticated")

  try {
    const response = await csrAxiosInstance.patch<UserProps>(`profile/${userData.get('id')}/`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          const retryResponse = await csrAxiosInstance.patch<UserProps>(`profile/${userData.get('id')}/`, userData, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          return retryResponse.data
        }
      }
      throw new Error(error.response.data.message || 'Failed to edit user.')
    }
    throw new Error('Failed to edit user.')
  }
}

export default editUser