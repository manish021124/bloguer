'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance";
import { setPosts } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { PostProps } from "@/lib/features/postSlice";
import Post from "./Post";

async function fetchPosts(): Promise<PostProps[]> {
  try {
    const response = await csrAxiosInstance.get<PostProps[]>('post/')
    return response.data
  } catch (error) {
    throw new Error('Error fetching posts: ' + (error as Error).message)
  }
}

const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state: RootState) => state.post.posts)

  let error: string | null = null

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts()
        dispatch(setPosts(fetchedPosts))
      } catch (err) {
        error = (err as Error).message
      }
    }
    loadPosts()
  }, [dispatch])


  return (
    <>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="flex flex-col gap-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post.id}>
                <Post post={post} />
              </li>
            ))
          ) : (
            <p className="text-center">No posts available.</p>
          )}
        </ul>
      )}
    </>
  )
}

export default PostsList