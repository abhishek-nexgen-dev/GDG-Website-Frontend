import { Zap } from "lucide-react";

import type { EventFormData, EventVisibility, EventStatus } from "../type/Event.type";

import Section from "../../../Components/Section";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";
import Select from "../../../Components/Select";

import { SearchableDropdown } from "../../../Components/SearchableDropdown";
import {
  EVENT_CONSTANT,
  EventStatus_Constant,
  EventVisibility_Constant,
} from "../Constant/Event.Constant";

interface Props {
  form: EventFormData;

  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const BasicInformation = ({ form, update }: Props) => {
  return (
    <Section
      title="Basic Information"
      description="Add the basic details about your event"
      icon={<Zap size={14} />}
    >
      <div className="space-y-4">
        {/* =================================================
            EVENT TITLE
        ================================================= */}

        <div>
          <Label required>Event Title</Label>

          <Input
            value={form.title}
            onChange={(value) => update("title", value)}
            placeholder="Enter event title"
          />

          <p className="mt-1 text-[12px] text-zinc-600">
            Choose a clear and descriptive title for your event.
          </p>
        </div>

        {/* =================================================
            SHORT DESCRIPTION
        ================================================= */}

        <div>
          <div className="mb-1 flex items-center justify-between">
            <Label required>Short Description</Label>

            <span
              className={`text-[9px] ${
                form.shortDescription.length > 400 ? "text-amber-400" : "text-zinc-600"
              }`}
            >
              {form.shortDescription.length}/400
            </span>
          </div>

          <textarea
            value={form.shortDescription}
            onChange={(event) => update("shortDescription", event.target.value)}
            maxLength={250}
            rows={3}
            placeholder="Briefly describe what your event is about..."
            className="w-full h-[15vh] resize-none rounded-md border border-white/[0.06] bg-[#202126] px-3 py-2.5 text-md  lg:text-[1rem] leading-5 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/10"
          />

          <p className="mt-1 text-[12px] text-zinc-600">
            Keep it short and informative. Maximum 200 characters.
          </p>
        </div>

        {/* =================================================
            CATEGORY / VISIBILITY / STATUS
        ================================================= */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* CATEGORY */}

          <div className="relative">
            <Label required>Category</Label>

            <SearchableDropdown
              options={EVENT_CONSTANT}
              onChange={(value) => update("category", value)}
              value={form.category}
            />
          </div>

          {/* VISIBILITY */}

          <div>
            <Label required>Visibility</Label>

            <Select
              value={form.visibility}
              onChange={(value) => update("visibility", value as EventVisibility | "")}
            >
              {EventVisibility_Constant.map((val) => {
                return <option value={val}>{val}</option>;
              })}
            </Select>
          </div>

          {/* STATUS */}

          <div>
            <Label required>Status</Label>

            <Select
              value={form.status}
              onChange={(value) => update("status", value as EventStatus)}
            >
              {EventStatus_Constant.map((val) => {
                return <option value={val}>{val}</option>;
              })}
            </Select>
          </div>
        </div>

        {/* =================================================
            STATUS INFORMATION
        ================================================= */}

        <div className="rounded-md border border-white/[0.05] bg-white/[0.015] px-3 py-2.5">
          <div className="flex items-start gap-2">
            <div
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full`}
            />

            <div>
              <p className="text-[10px] font-medium text-zinc-400">
                Current status: <span className="text-zinc-300">{form.status}</span>
              </p>

              <p className="mt-0.5 text-[12px] leading-4 text-zinc-600">
                You can save the event as a draft and publish it when all required information is
                complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BasicInformation;
