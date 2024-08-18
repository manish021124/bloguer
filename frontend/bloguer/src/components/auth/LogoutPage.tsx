'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/authSlice";

export function LogoutPage() {
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      dispatch(logout())
      localStorage.removeItem('token')
      router.push('/')
    } catch (error) {
      setError('Logout failed. Please try again later.')
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div>
      <h1>Logout</h1>
      <h2>Are you sure, you want to logout?</h2>
      <button type="submit" onClick={handleLogout}>Yes, logout</button>
      <button type="submit" onClick={handleCancel}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}