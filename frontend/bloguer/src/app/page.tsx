import PostsList from "@/components/PostsList";
import AuthCheck from "./auth/login/AuthCheck";

const Home: React.FC = () => {
  return (
    <div>
      <AuthCheck />
      <PostsList />
    </div>
  )
}

export default Home;
