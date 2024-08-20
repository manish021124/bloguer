'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/app/auth/login/loginService"
import { login as loginAction } from "@/lib/features/authSlice";

interface LoginState {
  username: string;
  password: string;
  error: string | null;
}

export function LoginPage() {
  const [username, setUsername] = useState<LoginState["username"]>('')
  const [password, setPassword] = useState<LoginState["password"]>('')
  const [error, setError] = useState<LoginState["error"]>('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setError(null)
    try {
      const token: string = await login(username, password)
      dispatch(loginAction(token))
      localStorage.setItem('token', token)
      router.push('/')
    } catch (error) {
      setError('Login failed. Please check  your credentials.')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Log In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}