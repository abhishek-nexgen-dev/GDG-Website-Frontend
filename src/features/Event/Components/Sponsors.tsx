import { singleEventData } from "../data/singleEventData";

const Sponsors = () => {
  const sponsors = singleEventData.sponsors ?? [];

  if (!sponsors.length) return null;

  return (
    <section className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
          Backing the community
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">Our Sponsors</h2>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
       
      </div>
    </section>
  );
};

export default Sponsors;
