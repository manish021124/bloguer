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
    <>
      <div className="mt-11 px-5 py-20 bg-[#1b1f23] rounded-md">
        <h1 className="pb-11">Create Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label>Title</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-9 px-2 bg-transparent border border-white rounded-lg" />
          </div>
          <div className="flex flex-col">
            <label>Content</label>
            <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} className="h-24 px-2 bg-transparent border border-white rounded-lg" />
          </div>
          <button type="submit" className="mt-11">Create Post</button>
          {error && <p>Error: {error}</p>}
          {success && <p>Post updated successfully!</p>}
        </form>
      </div>
    </>
  )
}

export default CreateForm