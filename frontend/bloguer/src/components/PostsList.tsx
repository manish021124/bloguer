'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance";
import { setPosts } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useEffect } from "react";
import { Post } from "@/lib/features/postSlice";

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await csrAxiosInstance.get<Post[]>('post/')
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
    const loadPosts = async() => {
      try {
        const fetchedPosts = await fetchPosts()
        dispatch(setPosts(fetchedPosts))
      } catch(err) {
        error = (err as Error).message
      }
    }
    loadPosts()
  }, [dispatch])


  return (
    <div>
      <h1>Posts</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.length > 0 ? (
            posts.map(post => (
              <div className="py-3" key={post.id}>
                <li>
                  <p>{post.author_name}</p>
                  <Link href={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p>{post.content}</p>
                </li>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default PostsList