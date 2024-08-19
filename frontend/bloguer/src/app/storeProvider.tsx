'use client'

import { useEffect, useRef, useState } from 'react'
import { Provider } from "react-redux"
import { createStore, AppStore } from "../lib/store"
import { setAuthState } from '@/lib/features/authSlice'

export default function StoreProvider({
  token = '',
  isAuthenticated = false,
  children
}: {
  token?: string
  isAuthenticated?: boolean
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(createStore())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const persistedToken = localStorage.getItem('token')
    const isUserAuthenticated = !!persistedToken

    storeRef.current.dispatch(setAuthState({
      token: persistedToken || token || '',
      isAuthenticated: isUserAuthenticated || isAuthenticated,
    }))

    setIsLoading(false)
  }, [token, isAuthenticated])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}