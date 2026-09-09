import { lazy } from "react";
import HeroSec from "./Section/HeroSec";
import AboutUsSec from "./Section/AboutUsSec";
import WhatWeDoSec from "./Section/WhatWeDoSec";
import CommunitySec from "./Section/CommunitySec";
import OrganizersSec from "./Section/OrganizersSec";
import PartnersSec from "./Section/PartnersSec";

const UpcomingEvent = lazy(() => import("./Section/UpcomingEvent"));
const PastEvents = lazy(() => import("./Section/PastEvents"));

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
