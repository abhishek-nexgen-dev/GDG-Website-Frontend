import { MapPin } from "lucide-react";

import Section from "../../../Components/Section";
import Label from "../../../Components/Label";
import Select from "../../../Components/Select";
import Input from "../../../Components/Input";
import type { EventFormData, EventMode } from "../type/Event.type";
import { EventMode_Constant } from "../Constant/Event.Constant";

interface Props {
  form: EventFormData;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const EventVenue = ({ form, update }: Props) => {
  return (
    <Section
      title="Event Venue"
      description="Provide venue details or online meeting link"
      icon={<MapPin size={14} />}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Mode</Label>
            <Select
              value={form.venue.mode}
              onChange={(value) => {
                const Mode = value as EventMode;
                update("venue", { ...form.venue, mode: Mode });
              }}
            >
              {EventMode_Constant.map((val) => {
                return <option value={val}>{val}</option>;
              })}
            </Select>
          </div>

          <div>
            <Label required>Venue Name</Label>
            <Input
              value={form.venue.venueName}
              onChange={(value) => update("venue", { ...form.venue, venueName: value })}
              placeholder="Enter venue name"
            />
          </div>
        </div>

        <div>
          <Label required>Address</Label>
          <Input
            value={form.venue.address}
            onChange={(value) => update("venue", { ...form.venue, address: value })}
            placeholder="Enter full address"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label required>City</Label>
            <Input
              value={form.venue.city}
              onChange={(value) => update("venue", { ...form.venue, city: value })}
            />
          </div>

          <div>
            <Label required>State</Label>
            <Input
              value={form.venue.state}
              onChange={(value) => update("venue", { ...form.venue, state: value })}
            />
          </div>

          <div>
            <Label required>Country</Label>
            <Input
              value={form.venue.country}
              onChange={(value) => update("venue", { ...form.venue, country: value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Latitude</Label>
            <Input
              value={form.venue.latitude?.toString() ?? ""}
              onChange={(value) =>
                update("venue", {
                  ...form.venue,
                  latitude: value ? parseFloat(value) : undefined,
                })
              }
              placeholder="e.g. 23.4165"
              type="number"
            />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input
              value={form.venue.longitude?.toString() ?? ""}
              onChange={(value) =>
                update("venue", {
                  ...form.venue,
                  longitude: value ? parseFloat(value) : undefined,
                })
              }
              placeholder="e.g. 85.4406"
              type="number"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EventVenue;
