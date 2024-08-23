'use client'

import { useEffect, useRef, useState } from 'react'
import { Provider } from "react-redux"
import { createStore, AppStore } from "../lib/store"
import { setAuthState } from '@/lib/features/authSlice'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
  user_id?: number
}

export default function StoreProvider({
  accessToken = '',
  refreshToken = '',
  isAuthenticated = false,
  children
}: {
  accessToken?: string
  refreshToken?: string
  isAuthenticated?: boolean
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(createStore())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const persistedAccessToken = localStorage.getItem('access_token')
    const persistedRefreshToken = localStorage.getItem('refresh_token')
    const persistedUsername = localStorage.getItem('username')
    const isUserAuthenticated = !!persistedAccessToken

    const decodedToken = persistedAccessToken ? jwt.decode(persistedAccessToken) as DecodedToken : null
    const userId = decodedToken?.user_id || null

    storeRef.current.dispatch(setAuthState({
      userId: userId,
      username: persistedUsername || '',
      access_token: persistedAccessToken || accessToken || '',
      refresh_token: persistedRefreshToken || refreshToken || '',
      isAuthenticated: isUserAuthenticated || isAuthenticated,
    }))

    setIsLoading(false)
  }, [accessToken, refreshToken, isAuthenticated])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}