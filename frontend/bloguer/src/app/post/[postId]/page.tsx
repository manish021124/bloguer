'use client'

import { csrAxiosInstance } from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleDelete } from "@/app/post/[postId]/delete";
import { Post, setPosts } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Button from "@/components/Button";

async function fetchPost(postId: number): Promise<Post> {
  try {
    const response = await csrAxiosInstance.get<Post>(`post/${postId}/`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching post: ' + (error as Error).message)
  }
}

export default function PostDetail() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.auth.userId)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const postId = params.postId ? parseInt(params.postId as string) : null

  const post = useAppSelector((state: RootState) =>
    state.post.posts?.find(p => p.id === postId)
  )
  const [error, setError] = useState<string | null>(null)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

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
        <p className="text-center text-red-600">{error}</p>
      ) : !post ? (
        <p className="text-center">Loading post...</p>
      ) : !isAuthenticated ? (
        <p className="text-center">Redirecting...</p>
      ) : ( userId === post.author ? (
          <div className="px-5 py-20 bg-[#1b1f23] rounded-md" key={post.id}>
            <h1 className="mb-11">Post Detail</h1>
            <div className="pb-8">
              <h3>{post.title}</h3>
              <div className="text-xs font-light flex gap-x-1">
                <span>{post.author_name}</span>
                <span>.</span>
                <span>{post.created_at}</span>
              </div>
            </div>
            <p className="text-sm text-justify">{post.content}</p>
            <div className="flex justify-center gap-x-3">
              <Button text="Edit" onClick={handleEdit} />
              <Button text="Delete" onClick={handleDeleteClick} className="bg-red-700 hover:bg-red-600" />
            </div>
          </div>
        ) : (
          <p className="m-5 text-center">You don't have access to this post!</p>
        )
      )}
    </>
  )
}