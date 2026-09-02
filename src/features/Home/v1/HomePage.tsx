import AboutUsSec from "./Section/AboutUsSec";

import HeroSec from "./Section/HeroSec";

import PastEvents from "./Section/PastEvents";
import UpcomingEvent from "./Section/UpcomingEvent";
import WhatWeDoSec from "./Section/WhatWeDoSec";
import CommunitySec from "./Section/CommunitySec";
import OrganizersSec from "./Section/OrganizersSec";
import PartnersSec from "./Section/PartnersSec";

const HomePage = () => {
  return (
    <div>
      <HeroSec />
      <AboutUsSec />

      <WhatWeDoSec />

      <OrganizersSec />

      <UpcomingEvent />

      <PastEvents />

      <PartnersSec />

      <CommunitySec />
    </div>
  );
};

export default HomePage;
