import Posts from "./Posts";
import PostForm from "./PostForm";
function Home() {
  return (
    <div className="page">
      <PostForm />
      <Posts />
    </div>
  );
}

export default Home;
