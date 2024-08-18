import { csrAxiosInstance } from "@/lib/axiosInstance";

export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await csrAxiosInstance.post('token/', { username, password })
    return response.data.access
  } catch (error) {
    console.error('Login failed: ', error);
    throw new Error('Login faile. Please try again.')
  }
}