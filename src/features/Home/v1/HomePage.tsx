import { lazy, Suspense } from "react";
import HeroSec from "./Section/HeroSec";
import AboutUsSec from "./Section/AboutUsSec";
import WhatWeDoSec from "./Section/WhatWeDoSec";
import CommunitySec from "./Section/CommunitySec";
import OrganizersSec from "./Section/OrganizersSec";
import SponsorsSec from "./Section/SponsorsSec";
import TestimonialsSec from "./Section/TestimonialsSec";
import Achievement from "./Section/Achievement";

const UpcomingEvent = lazy(() => import("./Section/UpcomingEvent"));
const PastEvents = lazy(() => import("./Section/PastEvents"));

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSec />

      <Achievement />

      <AboutUsSec />

      <WhatWeDoSec />

      <OrganizersSec />

      <Suspense fallback={<div className="min-h-[100px]" />}>
        <UpcomingEvent />
      </Suspense>

      <Suspense fallback={<div className="min-h-[100px]" />}>
        <PastEvents />
      </Suspense>

      <SponsorsSec />

      <TestimonialsSec />

      <CommunitySec />
    </div>
  );
};

export default HomePage;
