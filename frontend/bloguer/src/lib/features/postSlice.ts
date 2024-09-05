import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PostProps {
  id: number
  author: number
  author_name: string
  author_profile_pic: string | undefined
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface PostState {
  posts: PostProps[]
}

const initialState: PostState = {
  posts: [],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<PostProps>) => {
      state.posts.push(action.payload)
    },
    editPost: (state, action: PayloadAction<PostProps>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id)
      if (index !== -1) {
        state.posts[index] = action.payload
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
    },
    setPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.posts = action.payload
    },
  },
})

export const { createPost, editPost, deletePost, setPosts } = postSlice.actions
export default postSlice.reducer