import { Calendar, Clock3, Plus, Trash2 } from "lucide-react";

import Section from "../../../Components/Section";
import Input from "../../../Components/Input";

import type { EventFormData, EventTimelineItem } from "../type/Event.type";

interface EventTimelineProps {
  form: EventFormData;

  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const EventTimeline = ({ form, update }: EventTimelineProps) => {
  /* =====================================================
     ADD TIMELINE ITEM
  ===================================================== */

  const addTimeline = () => {
    const newItem: EventTimelineItem = {
      title: "",
      startAt: "",
      endAt: "",
    };

    update("timeline", [...form.timeline, newItem]);
  };

  /* =====================================================
     REMOVE TIMELINE ITEM
  ===================================================== */

  const removeTimeline = (title: string) => {
    update(
      "timeline",
      form.timeline.filter((item) => item.title !== title),
    );
  };

  /* =====================================================
     UPDATE TIMELINE ITEM
  ===================================================== */

  const updateTimeline = (title: string, key: keyof EventTimelineItem, value: string) => {
    update(
      "timeline",
      form.timeline.map((item) =>
        item.title === title
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    );
  };

  return (
    <Section
      title="Event Timeline"
      description="Add important milestones and schedule"
      icon={<Clock3 size={15} />}
      action={
        <button
          type="button"
          onClick={addTimeline}
          className="
            flex
            items-center
            gap-1.5
            rounded-md
            bg-lime-500/10
            px-3
            py-1.5
            text-xs
            font-medium
            text-lime-400
            transition
            hover:bg-lime-500/20
          "
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add Milestone</span>
          <span className="sm:hidden">Add</span>
        </button>
      }
    >
      <div className="space-y-4">
        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {form.timeline.length === 0 ? (
          <div
            className="
              flex
              min-h-44
              flex-col
              items-center
              justify-center
              rounded-lg
              border
              border-dashed
              border-white/10
              bg-white/[0.01]
              px-4
              py-8
              text-center
            "
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-lime-500/10">
              <Clock3 size={20} className="text-lime-400" />
            </div>

            <p className="text-sm font-medium text-zinc-300">No milestones added yet</p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-600">
              Add important dates and milestones to create a clear schedule for your event.
            </p>

            <button
              type="button"
              onClick={addTimeline}
              className="
                mt-4
                flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-lime-400
                transition
                hover:text-lime-300
              "
            >
              <Plus size={14} />
              Create your first milestone
            </button>
          </div>
        ) : (
          /* =================================================
             TIMELINE
          ================================================= */

          <div className="relative">
            {/* Vertical Timeline Line */}

            <div
              className="
                absolute
                bottom-6
                left-[11px]
                top-6
                w-px
                bg-gradient-to-b
                from-lime-500/50
                via-white/10
                to-transparent
              "
            />

            <div className="space-y-4">
              {form.timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="
                      relative
                      flex
                      gap-3
                      sm:gap-4
                    "
                >
                  {/* =================================================
                        TIMELINE DOT
                    ================================================= */}

                  <div className="relative z-10 flex shrink-0 justify-center">
                    <div
                      className="
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-lime-400/40
                          bg-[#111311]
                          shadow-[0_0_12px_rgba(132,204,22,0.18)]
                        "
                    >
                      <div className="h-2 w-2 rounded-full bg-lime-400" />
                    </div>
                  </div>

                  {/* =================================================
                        TIMELINE CARD
                    ================================================= */}

                  <div
                    className="
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-[#171917]
                        p-3
                        transition
                        hover:border-lime-500/20
                        sm:p-4
                      "
                  >
                    {/* Header */}

                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <label className="mb-1.5 block text-[10px] font-medium text-zinc-500 sm:text-xs">
                          Milestone Title
                        </label>

                        <Input
                          value={item.title}
                          onChange={(value) => updateTimeline(item.title, "title", value)}
                          placeholder="e.g. Registration Opens"
                          className="
                              h-9
                              font-medium
                              text-zinc-100
                              placeholder:text-zinc-600
                            "
                        />
                      </div>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() => removeTimeline(item.title)}
                        title="Remove milestone"
                        className="
                            mt-6
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-zinc-600
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                          "
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Dates */}

                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {/* Start */}

                      <div>
                        <label className="mb-1.5 block text-[10px] font-medium text-zinc-500 sm:text-xs">
                          Start Date & Time
                        </label>

                        <div className="relative">
                          <Calendar
                            size={14}
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                z-10
                                -translate-y-1/2
                                text-zinc-600
                              "
                          />

                          <Input
                            type="datetime-local"
                            value={item.startAt}
                            onChange={(value) => updateTimeline(item.title, "startAt", value)}
                            className="
                                h-9
                                pl-9
                                text-xs
                                sm:text-sm
                              "
                          />
                        </div>
                      </div>

                      {/* End */}

                      <div>
                        <label className="mb-1.5 block text-[10px] font-medium text-zinc-500 sm:text-xs">
                          End Date & Time
                        </label>

                        <div className="relative">
                          <Calendar
                            size={14}
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                z-10
                                -translate-y-1/2
                                text-zinc-600
                              "
                          />

                          <Input
                            type="datetime-local"
                            value={item.endAt}
                            onChange={(value) => updateTimeline(item.title, "endAt", value)}
                            className="
                                h-9
                                pl-9
                                text-xs
                                sm:text-sm
                              "
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Number */}

                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-zinc-600">
                      <Clock3 size={11} />

                      <span>Milestone {index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            ADD ANOTHER
        ================================================= */}

        {form.timeline.length > 0 && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={addTimeline}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-dashed
                border-white/15
                px-4
                py-2
                text-xs
                font-medium
                text-zinc-500
                transition
                hover:border-lime-500/40
                hover:bg-lime-500/[0.03]
                hover:text-lime-400
              "
            >
              <Plus size={14} />
              Add Another Milestone
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default EventTimeline;
