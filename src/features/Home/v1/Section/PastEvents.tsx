import EventCard from "../Components/EventCard";

const PastEvents = () => {
  return (
    <section className="px-6 py-16 sm:px-10 md:px-16 lg:px-[8%] lg:py-[7vh] xl:px-[10%] relative overflow-hidden bg-[#050505]">
      <h2 className="mt-8  text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
        Past{" "}
        <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] via-[#34A853] to-[#4285F4] bg-clip-text text-transparent">
          Events
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-[5vh] py-[3.8vh] mt-[5vh]">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
};

export default PastEvents;
