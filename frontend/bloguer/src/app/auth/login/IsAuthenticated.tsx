'use client'

import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"

export default function IsAuthenticated() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const token = useAppSelector((state: RootState) => state.auth.token)

  return(
    <>
      <p>isauth: {isAuthenticated ? 'true' : 'false'}</p>
      <p>token: {token}</p>
    </>
  )
}