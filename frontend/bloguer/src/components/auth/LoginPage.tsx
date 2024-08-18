'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/app/auth/login/loginService"
import { login as loginAction } from "@/lib/features/authSlice";

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const token = await login(username, password)
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