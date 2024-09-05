'use client'

import { PostProps } from "@/lib/features/postSlice";
import Post from "../Post";

interface UserPostsProps {
  post: PostProps[]
}

const UserPostsList = ({ post }: UserPostsProps) => {
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {post.map(post => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserPostsList