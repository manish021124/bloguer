'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { csrAxiosInstance } from "@/lib/axiosInstance";
import Button from "../Button";

export async function signup(email: string, username: string, password: string): Promise<string> {
  try {
    const response = await csrAxiosInstance.post<{ access: string }>('auth/users/', { email, username, password })
    return response.data.access
  } catch (error) {
    console.error('SignUp failed: ', error)
    throw new Error('Signup failed. Please try again.')
  }
}

export function SignupPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      await signup(email, username, password)
      router.push('/auth/login')
    } catch (error) {
      setError('Login failed. Please check  your credentials.')
    }
  }

  return (
    <div className="mt-11 px-5 py-20 bg-[#1b1f23] rounded-md">
      <h1 className="pb-11">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="mx-auto">
          <Button text="Sign Up" />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
      </form>
    </div>
  )
}