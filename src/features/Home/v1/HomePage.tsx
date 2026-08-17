import AboutUsSec from "./Section/AboutUsSec";
import Achievement from "./Section/Achievement";
import HeroSec from "./Section/HeroSec";

import PastEvents from "./Section/PastEvents";
import UpcomingEvent from "./Section/UpcomingEvent";
import WhatWeDoSec from "./Section/WhatWeDoSec";

const HomePage = () => {
  return (
    <div>
      <HeroSec />
      <Achievement />
      <AboutUsSec />

      <WhatWeDoSec />

      <UpcomingEvent />

      <PastEvents />
    </div>
  );
};

export default HomePage;
