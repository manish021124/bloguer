'use client'

import EditForm from "@/components/post/EditForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  content: string;
}

const EditPage = () => {
  const params = useParams()
  const postId = parseInt(params.postId as string, 10)

  const [initialData, setInitialData] = useState<Post>({ title: '', content: '' })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    setInitialData({
      title: queryParams.get('title') || '',
      content: queryParams.get('content') || '',
    })

    setLoading(false)
  }, [postId])

  return (
    <div>
      {postId ? (
        !loading ? (
          <EditForm postId={postId} initialData={initialData} />
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <p>Invalid post id.</p>
      )}
    </div>
  )
}

export default EditPage