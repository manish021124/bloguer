import PostsList from "@/components/PostsList";
import IsAuthenticated from "./auth/login/IsAuthenticated";

const Home: React.FC = async () => {
  return (
    <div>
      <IsAuthenticated />
      <PostsList />
    </div>
  )
}

export default Home;
