'use client'

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { PostProps } from "@/lib/features/postSlice";


interface PostDetailProps {
  post: PostProps
}

const Post = ({ post }: PostDetailProps) => {
  
  return (
    <div className="p-3 bg-[#1b1f23] rounded-md" key={post.id}>
      <div className="pb-3 flex items-center gap-2">
        <img src={post.author_profile_pic} alt="Author's Profile Picture" className="w-12 h-12 rounded-full" />
        <div>
          <Link href={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <div className="text-xs font-light flex gap-x-1">
            <span>{post.author_name}</span>
            <span>.</span>
            <span>{post.created_at}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-justify">{post.content}</p>
    </div>
  )
}

export default Post