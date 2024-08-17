import { LoginPage } from "@/components/auth/LoginPage";

const Login: React.FC = async () => {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Login;




// export async function refreshToken() {
//   try {
//     const refreshToken = localStorage.getItem('refresh_token')
//     const response = await ssrAxiosInstance.post('token/refresh/', { refresh: refreshToken })
//     localStorage.setItem('access_token', response.data.access)
//     return response.data
//   } catch (error) {
//     console.log('Token refresh failed: ', error)
//     throw error
//   }
// }