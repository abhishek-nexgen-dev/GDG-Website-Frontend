// File: ../hook/useMemberProfileForm.ts
import { useForm } from "react-hook-form";
import type { MemberType } from "../../../Auth/v1/types/Auth.type";

// Define the argument type to accept optional initial data
interface UseMemberProfileFormProps {
  initialData?: MemberType;
}

export default function useMemberProfileForm({ initialData }: UseMemberProfileFormProps = {}) {
  const form = useForm<MemberType>({
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      Bio: "",
      email: "",
      Slug: "",
      location: {
        city: "",
        state: "",
        country: "",
        pinCode: "",
      },
      socialLinks: {
        linkedin: "",
        // ... add other defaults if needed
      },
      // ... ensure all fields in MemberType are covered
      membershipStatus: undefined, // Explicitly handle the type issue
    },
  });

  return form;
}