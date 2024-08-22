'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleDelete } from "@/components/post/deletePost";
import { Post, setPosts } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

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
  const dispatch = useAppDispatch()

  const postId = params.postId ? parseInt(params.postId as string) : null

  const post = useAppSelector((state: RootState) =>
    state.post.posts?.find(p => p.id === postId)
  )
  const [error, setError] = useState<string | null>(null)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      if (postId !== null && !post) {
        try {
          const fetchedPost = await fetchPost(postId)
          dispatch(setPosts([fetchedPost]))
        } catch (err) {
          setError((err as Error).message)
        }
      } else if (postId === null) {
        setError('Invalid post id.')
      }
    }
    loadPost()
  }, [postId, post, dispatch, isDeleted])

  const handleEdit = () => {
    if (post) {
      router.push(`/post/edit/${post.id}`)
    }
  }

  const handleDeleteClick = async () => {
    await handleDelete(postId, dispatch, router)
  }

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : post ? (
        <div className="p-3 bg-[#1b1f23] rounded-md">
          <h2>{post.title}</h2>
          <p>{post.author_name}</p>
          <p>{post.content}</p>
          <p>{post.created_at}</p>
          <button onClick={handleEdit}>Edit Post</button>
          <button onClick={handleDeleteClick}>Delete Post</button>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </>
  )
}