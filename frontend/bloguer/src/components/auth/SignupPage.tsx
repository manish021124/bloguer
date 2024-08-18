'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { csrAxiosInstance } from "@/lib/axiosInstance";

export async function signup(email: string, username: string, password: string): Promise<string> {
  try {
    const response = await csrAxiosInstance.post('auth/users/', { email, username, password })
    return response.data.access
  } catch (error) {
    console.error('SignUp failed: ', error)
    throw new Error('Signup failed. Please try again.')
  }
}

export function SignupPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await signup(email, username, password)
      router.push('/auth/login')
    } catch (error) {
      setError('Login failed. Please check  your credentials.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}