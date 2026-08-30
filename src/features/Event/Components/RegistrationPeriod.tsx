import { CalendarDays } from "lucide-react";
import type { EventFormData } from "../type/Event.type";
import Section from "../../../Components/Section";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";

interface Props {
  form: EventFormData;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const RegistrationPeriod = ({ form, update }: Props) => {
  return (
    <Section
      title="Registration Period"
      description="Set the registration start and end date & time"
      icon={<CalendarDays size={14} />}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label required>Registration Start</Label>

          <Input
            type="datetime-local"
            value={form.registrationStartAt}
            onChange={(value) => update("registrationStartAt", value)}
          />
        </div>

        <div>
          <Label required>Registration End</Label>

          <Input
            type="datetime-local"
            value={form.registrationEndAt}
            onChange={(value) => update("registrationEndAt", value)}
          />
        </div>
      </div>
    </Section>
  );
};

export default RegistrationPeriod;
