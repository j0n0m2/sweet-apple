import Background from './ui/Background';
import Header from './ui/Header';
import FaceCanvas from './FaceCanvas';

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Background />
      <Header />
      <FaceCanvas />

      <nav>
        <ul>
          <li>
            <a href="/about" className="text-white">
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
