import PostsList from "@/components/PostsList";
import AuthCheck from "./auth/login/AuthCheck";

const Home: React.FC = () => {
  return (
    <>
      {/* <AuthCheck /> */}
      <PostsList />
    </>
  )
}

export default Home;
