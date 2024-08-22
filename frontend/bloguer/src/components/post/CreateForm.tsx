'use client'

import { FormEvent, useState } from "react"

export interface PostInput {
  title: string;
  content: string;
}

interface CreateFormProps {
  onSubmit: (postData: PostInput) => Promise<void>
}

const CreateForm: React.FC<CreateFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await onSubmit({ title, content })
      setSuccess(true)
      setTitle('')
      setContent('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Create Post</button>
      {error && <p>Error: {error}</p>}
      {success && <p>Post created successfully!</p>}
    </form>
  )
}

export default CreateForm