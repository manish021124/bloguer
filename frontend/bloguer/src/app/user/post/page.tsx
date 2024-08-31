'use client'

import React from 'react'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { setPosts } from "@/lib/features/postSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { RootState } from '@/lib/store'
import UserPostsList from '@/components/user/UserPostsList';
import fetchUserPosts from './post'

const UserPosts: React.FC = () => {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state: RootState) => state.post.posts)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const loadUserPosts = async () => {
      if(!isAuthenticated) return
      try {
        const fetchedUserPosts = await fetchUserPosts()
        dispatch(setPosts(fetchedUserPosts))
      } catch (err) {
        setError((err as Error).message)
      }
    }
    loadUserPosts()
  }, [isAuthenticated, dispatch])

  return (
    <>
      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        <UserPostsList post={posts} />
      )}
    </>
  )
}

export default UserPosts