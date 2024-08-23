import { csrAxiosInstance } from "@/lib/axiosInstance";

export interface LoginResponse {
  access: string;
  refresh: string;
  username: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await csrAxiosInstance.post<LoginResponse>('token/', { username, password })
    return {
      access: response.data.access,
      refresh: response.data.refresh,
      username: username,
    }
  } catch (error) {
    console.error('Login failed: ', error);
    throw new Error('Login faile. Please try again.')
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    const response = await csrAxiosInstance.post('token/refresh/', { refresh: refreshToken })
    localStorage.setItem('access_token', response.data.access)
    return response.data
  } catch (error) {
    console.log('Token refresh failed: ', error)
    throw error
  }
}