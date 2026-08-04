import AboutUsSec from "./Section/AboutUsSec";
import Achievement from "./Section/Achievement";
import HeroSec from "./Section/HeroSec";

const HomePage = () => {
  return (
    <div>
      <HeroSec />
      <Achievement />
      <AboutUsSec />
      <div className="h-screen"></div>
    </div>
  );
};

export default HomePage;
