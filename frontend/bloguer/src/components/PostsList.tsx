import { ssrAxiosInstance, csrAxiosInstance } from "@/lib/axiosInstance";

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
    console.error('error fetching posts: ', error)
    return []
  }
}

const PostsList: React.FC = async () => {
  const posts = await fetchPosts()
  
  return (
    <div>
      <h1>Posts</h1>
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
    </div>
  )
}

export default PostsList