'use client'

import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"

export default function AuthCheck() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const accessToken = useAppSelector((state: RootState) => state.auth.access_token)
  const refreshToken = useAppSelector((state: RootState) => state.auth.refresh_token)

  return (
    <>
      {isAuthenticated ? <p>true</p> : <p>false</p>}
      <p>access token: {accessToken}</p>
      <p>refresh token: {refreshToken}</p>
    </>
  )
}