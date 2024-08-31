'use client'

import Link from "next/link";
import { Post } from "@/lib/features/postSlice";

interface UserPostsProps {
  post: Post[]
}

const UserPostsList = ({ post }: UserPostsProps) => {
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {post.map(post => (
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
        ))}
      </ul>
    </>
  )
}

export default UserPostsList