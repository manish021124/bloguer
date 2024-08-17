'use client'

import { FormEvent, useState } from "react"
import { login } from "@/app/auth/login/login"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await login(username, password, dispatch)
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
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
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