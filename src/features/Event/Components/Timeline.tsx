import { singleEventData } from "../data/singleEventData";
import { formatDate, formatTime } from "../utils/Event.utils";


const Timeline = () => {
  const timeline = singleEventData.timeline ?? [];

  return (
    <div className="relative">
      {timeline.map((item, index) => {
        const isLast = index === timeline.length - 1;

        return (
          <div key={item._id} className="relative flex gap-4 pb-7 last:pb-0">
            {!isLast && <span className="absolute left-[7px] top-5 h-full w-px bg-white/10" />}

            <span className="relative mt-1 h-4 w-4 shrink-0 rounded-full border border-purple-400/50 bg-[#080808] shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <span className="absolute inset-[4px] rounded-full bg-purple-400" />
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xs font-semibold text-white/80">{item.title}</h3>

                {index === 0 && (
                  <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[8px] uppercase tracking-wider text-purple-300">
                    Start
                  </span>
                )}
              </div>

              <p className="mt-1 text-[10px] text-white/30">
                {formatDate(item.startAt)} · {formatTime(item.startAt)}
                {item.endAt && ` – ${formatTime(item.endAt)}`}
              </p>

              {item.description && (
                <p className="mt-2 max-w-lg text-[11px] leading-5 text-white/35">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline