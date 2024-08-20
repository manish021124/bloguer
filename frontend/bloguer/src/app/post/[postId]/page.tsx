'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

async function fetchPost(postId: number): Promise<Post> {
  try {
    const response = await csrAxiosInstance.get<Post>(`post/${postId}/`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching post: ' + (error as Error).message)
  }
}

export default function PostDetail () {
  const params = useParams()
  const router = useRouter()

  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState<string | null>(null)
  const postId = params.postId ? parseInt(params.postId as string) : null

  useEffect(() => {
    const loadPost = async () => {
      if (postId !== null) {
        try {
          const fetchedPost = await fetchPost(postId)
          setPost(fetchedPost)
        } catch (err) {
          setError((err as Error).message)
        }
      } else {
        setError('Invalid post id.')
      }
    }
    loadPost()
  }, [postId])

  const handleEdit = () => {
    if (post) {
      const queryParams = new URLSearchParams({
        title: post.title,
        content: post.content,
      }).toString()

      router.push(`/post/edit/${post.id}?${queryParams}`)
    }
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>{post.created_at}</p>
          <button onClick={handleEdit}>Edit Post</button>
          <button onClick={() => router.push(`/post/delete/${post.id}`)}>Delete Post</button>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  )
}