import { ssrAxiosInstance } from "@/lib/axiosInstance";

interface Post {
  id: number;
  title: string;
  content: string;
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await ssrAxiosInstance.get<Post[]>('post/')
    return response.data
  } catch (error) {
    throw new Error('Error fetching posts: ' + (error as Error).message)
  }
}

const PostsList: React.FC = async () => {
  let posts: Post[] = []
  let error: string | null = null

  try {
    posts = await fetchPosts()
  } catch (err) {
    error = (err as Error).message
  }
  
  return (
    <div>
      <h1>Posts</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default PostsList