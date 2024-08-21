import { refreshAccessToken } from "@/app/auth/login/loginService"
import { csrAxiosInstance } from "@/lib/axiosInstance"
import { AxiosError } from "axios"
import { deletePost as deletePostSlice } from "@/lib/features/postSlice"

const deletePost = async (postId: number | null, dispatch: any, router: any): Promise<void> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) throw new Error("User not authenticated.")

  if (postId !== null) {
    try {
      await csrAxiosInstance.delete(`post/${postId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log('post is deleted successfully')
      dispatch(deletePostSlice(postId))
      router.push('/')
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response && axiosError.response.status === 401) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          await csrAxiosInstance.delete(`post/${postId}/`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })
          console.log('post deleted successfully after token refresh')
          dispatch(deletePostSlice(postId))
          router.push('/')
        } else {
          throw new Error("failed to refresh access token")
        }
      }
      throw new Error('Error deleting post: ' + (axiosError.message || 'Unknown error'))
    }
  }
}

export const handleDelete = async (postId: number | null, dispatch: any, router: any) => {
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePost(postId, dispatch, router)
      return true
    } catch (error) {
      alert('Error deleting post: ' + (error as any).message)
      return false
    }
  }
  return false
}