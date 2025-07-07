import Background from "./ui/Background";
import Header from "./ui/Header";
import FaceCanvas from "./FaceCanvas";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <Header />
      <FaceCanvas />

      <div>
        <a href="/about" className="text-white">
          About
        </a>
      </div>
    </div>
  );
};

export default Home;
