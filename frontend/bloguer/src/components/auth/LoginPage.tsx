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
      const { access, refresh } = await login(username, password)
      dispatch(loginAction(access))
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      router.push('/')
    } catch (error) {
      setError('Login failed. Please check  your credentials.')
    }
  }

  return (
    <div className="mt-11 px-5 py-20 bg-[#1b1f23] rounded-md">
      <h1 className="pb-11">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
        </div>
        <button type="submit" className="mt-11">Log In</button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  )
}