'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/authSlice";
import Button from "../Button";

export function LogoutPage() {
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      dispatch(logout())
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('username')
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
      <h1 className="mb-11">Logout</h1>
      <h3>Are you sure, you want to logout?</h3>
      <div className="flex gap-x-3">
        <Button text="Log Out" onClick={handleLogout} className="bg-red-700 hover:bg-red-600" />
        <Button text="Cancel" onClick={handleCancel} />
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}