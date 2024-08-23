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
              <div className="p-3 bg-[#1b1f23] rounded-md" key={post.id}>
                <li>
                  <div className="pb-3">
                    <Link href={`/post/${post.id}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <div className="text-xs font-light flex gap-x-1">
                      <span>{post.author_name}</span>
                      <span>.</span>
                      <span>{post.created_at}</span>
                    </div>
                  </div>
                  <p className="text-sm text-justify">{post.content}</p>
                </li>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </ul>
      )}
    </>
  )
}

export default PostsList