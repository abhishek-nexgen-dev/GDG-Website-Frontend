import { useState } from "react";
import { EventsHero } from "./EventsHero";
import { EventsFilterBar } from "./EventsFilterBar";
import { UpcomingEventsList } from "./UpcomingEventsList";
import { PastEventsList } from "./PastEventsList";
import { EventsCTA } from "./EventsCTA";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <EventsHero />
      <EventsFilterBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      {(activeTab === "all" || activeTab === "upcoming") && (
        <UpcomingEventsList searchQuery={searchQuery} />
      )}
      {(activeTab === "all" || activeTab === "past") && (
        <PastEventsList searchQuery={searchQuery} />
      )}
      <EventsCTA />
    </div>
  );
};

export default Events;