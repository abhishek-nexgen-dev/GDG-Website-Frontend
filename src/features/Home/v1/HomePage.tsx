import AboutUsSec from "./Section/AboutUsSec";
import Achievement from "./Section/Achievement";
import HeroSec from "./Section/HeroSec";
import WhatWeDoSec from "./Section/WhatWeDoSec";

const HomePage = () => {
  return (
    <div>
      <HeroSec />
      <Achievement />
      <AboutUsSec />

      <WhatWeDoSec />
    </div>
  );
};

export default HomePage;
