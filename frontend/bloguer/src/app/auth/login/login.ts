import { csrAxiosInstance } from "@/lib/axiosInstance";
import { AppDispatch } from "@/lib/store";
import { login as loginAction } from "@/lib/features/authSlice";

export async function login(username: string, password: string, dispatch: AppDispatch): Promise<void> {
  try {
    const response = await csrAxiosInstance.post('token/', { username, password })
    const token = response.data.access

    localStorage.setItem('access_token', response.data.access)
    dispatch(loginAction(token))
  } catch (error) {
    console.error('Login failed: ', error);
    throw error
  }
}