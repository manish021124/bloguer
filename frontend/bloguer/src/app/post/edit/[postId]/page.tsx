'use client'

import EditForm from "@/components/post/EditForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post, editPost } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { editPost as editPostBackend } from "@/components/post/EditForm";

const EditPage = () => {
  const params = useParams()
  const postId = parseInt(params.postId as string, 10)
  const dispatch = useAppDispatch()

  const post = useAppSelector((state: RootState) =>
    state.post.posts?.find(p => p.id === postId)
  )

  const [initialData, setInitialData] = useState<{ title: string; content: string }>({ 
    title: '',
    content: '',
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (post) {
      setInitialData({
        title: post.title,
        content: post.content,
      })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [post])

  const handleUpdate = async (updatedPostData: { title: string; content: string }) => {
    if (post) {
      try {
        const updatedPost: Post ={
          ...post,
          title: updatedPostData.title,
          content: updatedPostData.content,
        }
        await editPostBackend(post.id, updatedPostData)
        dispatch(editPost(updatedPost))
      } catch (error) {
        console.log('failed to update post: ', error)
      }
    }
  }

  return (
    <>
      {postId ? (
        !loading ? (
          <EditForm postId={postId} initialData={initialData} onUpdate={handleUpdate} />
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <p>Invalid post id.</p>
      )}
    </>
  )
}

export default EditPage