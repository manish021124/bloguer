'use client'

import React from 'react'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import UserDetail from "@/components/user/UserDetail"
import fetchUser from './detail'
import { UserProps } from './detail'

const User: React.FC = () => {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const fetchedUser = await fetchUser()
        setUser(fetchedUser)
      } catch (err) {
        setError((err as Error).message)
      }
    }
    loadUser()
  }, [])

  return (
    <>
      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : !user ? (
        <p className="text-center">Loading user details...</p>
      ) : (
        <UserDetail user={user} setUser={setUser} />
      )}
    </>
  )
}

export default User