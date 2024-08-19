'use client'

import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"

export default function AuthCheck() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const token = useAppSelector((state: RootState) => state.auth.token)

  return (
    <>
      {isAuthenticated ? <p>true</p> : <p>false</p>}
      <p>{token}</p>
    </>
  )
}