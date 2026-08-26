
import { singleEventData } from "../data/singleEventData";

const Partners = () => {
  const partners = singleEventData.partners ?? [];

  if (!partners.length) return null;

  return (
    <section className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
            Supporting the event
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">Our Partners</h2>
        </div>

        <span className="text-[10px] text-white/25">{partners.length} partners</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
     
      </div>
    </section>
  );
};

export default Partners;
