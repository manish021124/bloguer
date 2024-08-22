import PostsList from "@/components/PostsList";
import AuthCheck from "./auth/login/AuthCheck";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto max-w-xl py-5">
      {/* <AuthCheck /> */}
      <PostsList />
    </div>
  )
}

export default Home;
