import Feed from "../../components/Feed/Feed";
import PostLogin from "../../components/PostLogin/PostLogin";
import RightBar from "../../components/RightBar/RightBar";

const Home = () => {
  return (
    <PostLogin>
      <Feed />
      <RightBar />
    </PostLogin>
  );
};

export default Home;
